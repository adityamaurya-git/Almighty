import { collection, onSnapshot, getDoc, addDoc, updateDoc, doc, serverTimestamp, deleteField, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { auth, db } from "../firebase/firebase";
import { requiresInventory } from "../utils/productRules";

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

    console.log("🔥 CREATE PRODUCT DATA:", product);
    console.log("🔥 CREATE PRODUCT UNIT:", product.unit);
    console.log("🔥 CREATE PRODUCT STOCK:", product.stock);
    console.log("🔥 CREATE PRODUCT CATEGORY:", product.category);

    // ==========================================
    // 1. UPLOAD PRODUCT IMAGES
    // ==========================================

    const imageUrls = await uploadProductImages(product.ownerId, product.businessId, product.outletId, imageFiles);


    const inventoryStore = requiresInventory(product.category);


    if (inventoryStore) {

        if (
            product.stock === undefined ||
            product.stock === null ||
            product.stock === ""
        ) {
            throw new Error("Stock is required");
        }

        if (!product.unit) {
            throw new Error("Unit is required");
        }

        if (Number(product.stock) < 0) {
            throw new Error("Stock cannot be negative");
        }
    }

    // ==========================================
    // 2. CREATE MAIN PRODUCT DOCUMENT
    // ==========================================

    const productData = {
        name: product.name,
        description: product.description,
        // price: Number(product.price),
        // discountPrice:
        //     product.discountPrice !== undefined &&
        //         product.discountPrice !== null &&
        //         product.discountPrice !== ""
        //         ? Number(product.discountPrice)
        //         : null,

        status: "active",

        vendorId: product.vendorId,

        // outletId: product.outletId,
        shopName: product.shopName,
        ownerId: product.ownerId,
        businessId: product.businessId,
        category: product.category,

        images: imageUrls,

        // deleted: false,
        rating: 0,
        reviews: 0,

        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    }

    const docRef = await addDoc(
        collection(db, "products"),
        productData
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

    const inventoryData = {

        productId: docRef.id,

        businessId: product.businessId,
        ownerId: product.ownerId,
        outletId: product.outletId,

        price: Number(product.price),

        discountPrice:
            product.discountPrice !== undefined &&
                product.discountPrice !== null &&
                product.discountPrice !== ""
                ? Number(product.discountPrice)
                : null,

        available: true,

        isDisabled: false,

        vendorId: product.vendorId,

        deleted: false,

        status: "active",

        updatedAt: serverTimestamp(),

        createdAt: serverTimestamp()

    };


    console.log("🔥 INVENTORY STORE:", inventoryStore);
    console.log("🔥 CATEGORY:", product.category);

    if (inventoryStore) {

        console.log("🔥 STOCK:", product.stock);
        console.log("🔥 UNIT:", product.unit);

        if (
            product.stock === undefined ||
            product.stock === null ||
            product.stock === ""
        ) {
            throw new Error("Stock is required for this category");
        }

        if (!product.unit) {
            throw new Error("Unit is required for this category");
        }

        if (Number(product.stock) < 0) {
            throw new Error("Stock cannot be negative");
        }

        inventoryData.stock = Number(product.stock);
        inventoryData.unit = product.unit;
    }


    console.log("🔥 FINAL INVENTORY DATA:", inventoryData);

    await setDoc(
        inventoryRef,
        inventoryData
    );

    return docRef.id;

};



// -----------------------------------------------------
// UPDATE PRODUCT
// -----------------------------------------------------

export const updateProduct = async (
    productId,
    updatedData,
    newImages = []
) => {

    console.log("🔥 UPDATE PRODUCT DATA:", updatedData);


    // ==========================================
    // 1. DETERMINE INVENTORY REQUIREMENT
    // ==========================================

    const inventoryRequired =
        requiresInventory(updatedData.category);


    // ==========================================
    // 2. BASIC VALIDATION
    // ==========================================

    if (!updatedData.vendorId) {
        throw new Error("Vendor ID is required");
    }

    if (!updatedData.ownerId) {
        throw new Error("Owner ID is required");
    }

    if (!updatedData.businessId) {
        throw new Error("Business ID is required");
    }

    if (!updatedData.outletId) {
        throw new Error("Outlet ID is required");
    }


    // ==========================================
    // 3. VALIDATE STOCK / UNIT
    // ==========================================

    if (inventoryRequired) {

        if (
            updatedData.stock === undefined ||
            updatedData.stock === null ||
            updatedData.stock === ""
        ) {
            throw new Error(
                "Stock is required for this category"
            );
        }

        if (!updatedData.unit) {
            throw new Error(
                "Unit is required for this category"
            );
        }

        if (Number(updatedData.stock) < 0) {
            throw new Error(
                "Stock cannot be negative"
            );
        }

    }


    // ==========================================
    // 4. UPLOAD NEW IMAGES
    // ==========================================

    let uploadedUrls = [];


    if (newImages.length > 0) {

        uploadedUrls =
            await uploadProductImages(
                updatedData.ownerId,
                updatedData.businessId,
                updatedData.outletId,
                newImages
            );

    }


    // ==========================================
    // 5. PREPARE MAIN PRODUCT DATA
    // ==========================================
    //
    // IMPORTANT:
    // NO stock
    // NO unit
    //
    // ==========================================

    const data = {

        name: updatedData.name,
        description: updatedData.description,
        // price: Number(updatedData.price),

        status: updatedData.status,

        vendorId: updatedData.vendorId,
        ownerId: updatedData.ownerId,
        businessId: updatedData.businessId,

        // outletId: updatedData.outletId,

        shopName: updatedData.shopName,
        category: updatedData.category,
        images: [
            ...(updatedData.images || []),
            ...uploadedUrls
        ],
        updatedAt: serverTimestamp()
    };


    // ==========================================
    // 7. UPDATE MAIN PRODUCT
    // ==========================================

    const productRef = doc( db, "products", productId);

    await updateDoc(productRef,data);


    // ==========================================
    // 8. INVENTORY REFERENCE
    // ==========================================

    const inventoryRef =
        getInventoryRef(
            updatedData.ownerId,
            updatedData.businessId,
            updatedData.outletId,
            productId
        );


    // ==========================================
    // 9. DETERMINE AVAILABILITY
    // ==========================================

    const available =
        updatedData.available !== undefined
            ? Boolean(updatedData.available)
            : updatedData.status === "active";


    // ==========================================
    // 10. PREPARE INVENTORY DATA
    // ==========================================

    const inventoryData = {

        productId,
        vendorId:
            updatedData.vendorId,

        ownerId:
            updatedData.ownerId,

        businessId:
            updatedData.businessId,

        outletId:
            updatedData.outletId,

        price:
            Number(updatedData.price),

        available,
        isDisabled:
            !available,

        updatedAt:
            serverTimestamp()
    };


    // ==========================================
    // 11. DISCOUNT PRICE IN INVENTORY
    // ==========================================

    if (
        updatedData.discountPrice !== undefined &&
        updatedData.discountPrice !== null &&
        updatedData.discountPrice !== ""
    ) {

        inventoryData.discountPrice =
            Number(updatedData.discountPrice);

    }
    else {

        inventoryData.discountPrice =
            deleteField();

    }


    // ==========================================
    // 12. STOCK + UNIT
    // ==========================================
    //
    // OTHER CATEGORY:
    //     add/update stock + unit
    //
    // FOOD DELIVERY:
    //     remove stock + unit
    //
    // ==========================================

    if (inventoryRequired) {

        inventoryData.stock =
            Number(updatedData.stock);

        inventoryData.unit =
            updatedData.unit;

    }
    else {

        inventoryData.stock =
            deleteField();

        inventoryData.unit =
            deleteField();

    }


    console.log(
        "🔥 FINAL UPDATED PRODUCT DATA:",
        data
    );

    console.log(
        "🔥 FINAL UPDATED INVENTORY DATA:",
        inventoryData
    );


    // ==========================================
    // 13. UPDATE INVENTORY
    // ==========================================

    await setDoc(
        inventoryRef,
        inventoryData,
        {
            merge: true
        }
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

    await updateDoc(inventoryRef, {
        available,
        isDisabled: !available,
        // status: available
        //     ? "active"
        //     : "out_of_stock",
        updatedAt: serverTimestamp()
    }
    );
};