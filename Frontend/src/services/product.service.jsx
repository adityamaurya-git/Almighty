import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, deleteField } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db } from "../firebase/firebase";

const storage = getStorage();


// -----------------------------------------------------
// REALTIME PRODUCTS
// -----------------------------------------------------

export const subscribeProducts = (vendorId, callback) => {

    const q = query(
        collection(db, "products"),
        where("vendorId", "==", vendorId),
        where("deleted", "==", false)
    );

    return onSnapshot(q, snapshot => {
        const products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
            .filter(product => !product.deleted);

        callback(products);
    });
};



// -----------------------------------------------------
// IMAGE UPLOAD
// -----------------------------------------------------



export const uploadProductImages = async (vendorId, files) => {

    const imageUrls = [];

    for (const file of files) {
        const storageRef = ref(storage,
            `product-images/${vendorId}/${Date.now()}_${file.name}`
        );

        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        imageUrls.push(downloadURL);
    }
    return imageUrls;

};


// -----------------------------------------------------
// CREATE PRODUCT
// -----------------------------------------------------


export const createProduct = async (product, imageFiles) => {

    const imageUrls = await uploadProductImages(product.vendorId, imageFiles);

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

    await updateDoc(docRef, {
        productId: docRef.id
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

    const data = {
        ...updatedData,
        updatedAt: serverTimestamp(),
    };

    let uploadedUrls = [];

    // Upload new images only if user selected any
    if (newImages.length > 0) {

        uploadedUrls = await uploadProductImages(
            updatedData.vendorId,
            newImages
        );

    }

    data.images = [
        ...(updatedData.images || []),
        ...uploadedUrls
    ];

    // If discount is empty, remove it from Firestore
    if (
        data.discountPrice === "" ||
        data.discountPrice === null
    ) {
        data.discountPrice = deleteField();
    }

    // console.log("Updating product with data:", data);

    const ref = doc(db, "products", productId);
    await updateDoc(ref, data);
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

export const toggleStock = async ( productId, status ) => {

    await updateDoc(
        doc(db, "products", productId),
        {
            status
        }
    );
};