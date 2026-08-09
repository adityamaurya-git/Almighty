import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebase";


export const submitVendorApplication = async (formData) => {

    let fssaiLicenseUrl = "";
    if (formData.fssaiLicense) {
        const storageRef = ref(
            storage,
            `vendor-applications/fssai/${Date.now()}-${formData.fssaiLicense.name}`
        );
        await uploadBytes(storageRef, formData.fssaiLicense);
        fssaiLicenseUrl = await getDownloadURL(storageRef);
    }

    await addDoc(
        collection(db, "vendor_applications"),
        {
            shopName: formData.shopName,
            ownerName: formData.ownerName,
            address: formData.address,
            lat: formData.lat,
            lng: formData.lng,
            phone: formData.phone,
            category: formData.category,
            panCard: formData.panCard,
            aadhaarNumber: formData.aadhaarNumber,
            gstNumber: formData.gstNumber || "",
            fssaiLicenseUrl,
            accountHolderName: formData.accountHolderName,
            accountNumber: formData.accountNumber,
            ifscCode: formData.ifscCode,
            status: "pending",
            submittedAt: serverTimestamp(),
            reviewedAt: null,
            reviewedBy: null
        }
    );
};