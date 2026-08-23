import { collection, query, where, onSnapshot, getDoc, addDoc, updateDoc, doc, serverTimestamp, deleteField, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { auth, db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";

const storage = getStorage();


// -----------------------------------------------------
// REALTIME OUTLET INVENTORY
// -----------------------------------------------------

export const subscribeInventory = (
    ownerId,
    businessId,
    outletId,
    callback
) => {

    const inventoryRef = collection(
        db,
        "owners",
        ownerId,
        "businesses",
        businessId,
        "outlets",
        outletId,
        "inventory"
    );


    return onSnapshot(

        inventoryRef,

        (snapshot) => {

            const inventory = snapshot.docs.map(
                (inventoryDoc) => ({

                    id: inventoryDoc.id,

                    ...inventoryDoc.data()

                })
            );


            callback(inventory);

        },

        (error) => {

            console.error(
                "Error subscribing to inventory:",
                error
            );

        }

    );

};



// -----------------------------------------------------
// REALTIME INVENTORY
// -----------------------------------------------------

export const subscribeOutletInventory = (
    ownerId,
    businessId,
    outletId,
    callback
) => {

    const inventoryRef = collection(
        db,
        "owners",
        ownerId,
        "businesses",
        businessId,
        "outlets",
        outletId,
        "inventory"
    );

    return onSnapshot(
        inventoryRef,
        async (snapshot) => {

            try {

                const inventory = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                const products = await Promise.all(

                    inventory.map(async (inventoryItem) => {

                        const productId =
                            inventoryItem.productId;

                        if (!productId) {
                            return null;
                        }

                        // --------------------------------
                        // FETCH PRODUCT USING productId
                        // --------------------------------

                        const productRef = doc(
                            db,
                            "products",
                            productId
                        );

                        const productSnapshot =
                            await getDoc(productRef);

                        if (!productSnapshot.exists()) {
                            return null;
                        }

                        const product = {
                            id: productSnapshot.id,
                            ...productSnapshot.data()
                        };

                        // --------------------------------
                        // MERGE PRODUCT + INVENTORY
                        // --------------------------------

                        return {

                            ...product,

                            // inventory values override
                            // product values
                            ...inventoryItem

                        };

                    })

                );

                callback(
                    products.filter(Boolean)
                );

            } catch (error) {

                console.error(
                    "Error loading outlet products:",
                    error
                );

            }

        }
    );
};

// -----------------------------------------------------
// GET PRODUCT BY PRODUCT ID
// -----------------------------------------------------

export const getProductById = async (productId) => {

    try {

        const productRef = doc(
            db,
            "products",
            productId
        );


        const productSnapshot = await getDoc(productRef);

        if (!productSnapshot.exists()) {

            console.warn(
                "Product not found:",
                productId
            );

            return null;
        }


        return {

            id: productSnapshot.id,

            ...productSnapshot.data()

        };

    } catch (error) {

        console.error(
            "Error fetching product:",
            productId,
            error
        );

        return null;

    }

};



const getInventoryRef = (
    ownerId,
    businessId,
    outletId,
    productId
) => {

    return doc(
        db,
        "owners",
        ownerId,
        "businesses",
        businessId,
        "outlets",
        outletId,
        "inventory",
        productId
    );

};



// -----------------------------------------------------
// IMAGE UPLOAD
// -----------------------------------------------------



export const uploadProductImages = async (ownerId, businessId, outletId, files) => {

    const imageUrls = [];

    for (const file of files) {

        // Create the Storage reference FIRST
        const storageRef = ref(
            storage,
            `product-images/${ownerId}/${businessId}/${outletId}/${file.name}`
        );

        // Debug
        console.log(
            "Current Firebase user:",
            auth.currentUser
        );

        console.log(
            "UID:",
            auth.currentUser?.uid
        );

        console.log(
            "Storage path:",
            storageRef.fullPath
        );

        // Upload
        await uploadBytes(storageRef, file);

        // Get URL
        const downloadURL = await getDownloadURL(storageRef);

        imageUrls.push(downloadURL);
    }

    return imageUrls;
};




// -----------------------------------------------------
// CREATE PRODUCT
// -----------------------------------------------------


export const createProduct = async (product, imageFiles) => {


    // ==========================================
    // 1. UPLOAD PRODUCT IMAGES
    // ==========================================

    const imageUrls = await uploadProductImages(product.ownerId, product.businessId, product.outletId, imageFiles);


    // ==========================================
    // 2. CREATE MAIN PRODUCT DOCUMENT
    // ==========================================

    const docRef = await addDoc(
        collection(db, "products"),
        {
            ...product,

            images: imageUrls,

            deleted: false,
            rating: 0,
            reviews: 0,
            status: "active",

            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        }
    );


    // ==========================================
    // 3. ADD PRODUCT ID TO MAIN PRODUCT
    // ==========================================


    await updateDoc(docRef, {
        productId: docRef.id
    });


    // ==========================================
    // 4. CREATE INVENTORY DOCUMENT
    // ==========================================

    const inventoryRef = getInventoryRef(
        product.ownerId,
        product.businessId,
        product.outletId,
        docRef.id
    );


    await setDoc(inventoryRef, {

        // Product identification
        productId: docRef.id,

        price: Number(product.price),

        discountPrice:
            product.discountPrice !== undefined &&
                product.discountPrice !== null &&
                product.discountPrice !== ""
                ? Number(product.discountPrice)
                : null,

        stock: Number(product.stock || 0),

        available: true,

        isDisabled: false,

        status: "active",

        updatedAt: serverTimestamp(),

        createdAt: serverTimestamp()

    });


};



// -----------------------------------------------------
// UPDATE PRODUCT
// -----------------------------------------------------


export const updateProduct = async (
    productId,
    updatedData,
    newImages = []
) => {


    // ==========================================
    // 1. PREPARE PRODUCT DATA
    // ==========================================

    const data = {
        ...updatedData,
        updatedAt: serverTimestamp(),
    };


    // ==========================================
    // 2. UPLOAD NEW IMAGES
    // ==========================================

    let uploadedUrls = [];

    // Upload new images only if user selected any
    if (newImages.length > 0) {

        uploadedUrls = await uploadProductImages(
            updatedData.ownerId,
            updatedData.businessId,
            updatedData.outletId,
            newImages
        );

    }


    // ==========================================
    // 3. UPDATE IMAGE ARRAY
    // ==========================================

    data.images = [
        ...(updatedData.images || []),
        ...uploadedUrls
    ];


    // ==========================================
    // 4. REMOVE EMPTY DISCOUNT
    // ==========================================

    // If discount is empty, remove it from Firestore
    if (
        data.discountPrice === "" ||
        data.discountPrice === null
    ) {
        data.discountPrice = deleteField();
    }
    else {
        data.discountPrice = Number(data.discountPrice);
    }


    // ---------------------------------------------
    // Ensure numeric values
    // ---------------------------------------------

    if (data.price !== undefined) {

        data.price = Number(data.price);

    }


    if (data.stock !== undefined) {

        data.stock = Number(data.stock);

    }

    // ==========================================
    // 5. UPDATE MAIN PRODUCT
    // ==========================================

    const ref = doc(db, "products", productId);
    await updateDoc(ref, data);



    // ==========================================
    // 6. UPDATE INVENTORY DOCUMENT
    // ==========================================

    const inventoryRef = getInventoryRef(
        updatedData.ownerId,
        updatedData.businessId,
        updatedData.outletId,
        productId
    );

    const available = 
        updatedData.available !== undefined
            ? Boolean(updatedData.available)
            : updatedData.status === "active";


    const inventoryData = {

        productId,

        price: Number(
            updatedData.price
        ),

        stock: Number(
            updatedData.stock || 0
        ),


        available,

        isDisabled: !available,

        updatedAt:
            serverTimestamp()

    };


    // Only write discountPrice when it exists
    if (
        updatedData.discountPrice !== "" &&
        updatedData.discountPrice !== null &&
        updatedData.discountPrice !== undefined
    ) {

        inventoryData.discountPrice =
            updatedData.discountPrice;

    } else {

        inventoryData.discountPrice =
            deleteField();

    }


    await setDoc(
        inventoryRef,
        inventoryData,
        { merge: true }
    );
};




// -----------------------------------------------------
// DELETE PRODUCT
// -----------------------------------------------------

export const deleteProduct = async (productId) => {

    await updateDoc(doc(db, "products", productId),
        {
            deleted: true,
            deletedAt: serverTimestamp()
        }
    );
};




// -----------------------------------------------------
// TOGGLE AVAILABILITY
// -----------------------------------------------------

export const toggleStock = async (
    ownerId,
    businessId,
    outletId,
    productId,
    available
) => {

    const inventoryRef = getInventoryRef(
        ownerId,
        businessId,
        outletId,
        productId
    );

    await updateDoc( inventoryRef, {
            available,
            isDisabled: !available,
            status: available
                ? "active"
                : "out_of_stock",
            updatedAt: serverTimestamp()
        }
    );
};