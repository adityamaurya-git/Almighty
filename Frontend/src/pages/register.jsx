import { useState } from "react";
import { submitVendorApplication } from "../services/VendorApplication.service";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Register = () => {

  const foodStores = [
    "Food Delivery",
    "Bakery"
  ];

  const [formData, setFormData] = useState({

    shopName: "",
    ownerName: "",
    address: "",
    lat: null,
    lng: null,
    phone: "",
    category: "",
    panCard: "",
    aadhaarNumber: "",
    gstNumber: "",
    fssaiLicense: null,
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    consent: false
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};

    // Store Name
    if (!formData.shopName.trim()) {
      newErrors.shopName = "Shop name is required";
    }

    // Owner Name
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "Owner name is required";
    }

    // Address
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    // Mobile
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    // Category
    if (!formData.category) {
      newErrors.category = "Please select a store type";
    }

    //Aadhaar Number (optional)
    if (!/^\d{12}$/.test(formData.aadhaarNumber)) {
      newErrors.aadhaarNumber = "Enter a valid Aadhaar Number";
    }

    // PAN
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panCard)) {
      newErrors.panCard = "Invalid PAN number";
    }

    // GST (optional)
    if (
      formData.gstNumber &&
      !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
        formData.gstNumber
      )
    ) {
      newErrors.gstNumber = "Invalid GST number";
    }

    // FSSAI
    if (
      foodStores.includes(formData.category) &&
      !formData.fssaiLicense
    ) {
      newErrors.fssaiLicense =
        "FSSAI License is required";
    }

    // Bank Details
    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = "Account holder name is required";
    }

    if (!/^\d{9,18}$/.test(formData.accountNumber)) {
      newErrors.accountNumber = "Invalid account number";
    }

    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
      newErrors.ifscCode = "Invalid IFSC code";
    }


    // Consent
    if (!formData.consent) {
      newErrors.consent =
        "You must accept Terms & Conditions and Privacy Policy";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const getCurrentLocation = () => {

    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      setFormData(prev => ({
        ...prev,
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }));
    }, () => {
      toast.error("Unable to fetch location");
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await submitVendorApplication(formData);
      toast.success("Application submitted successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit application. Please try again.");
    }

  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
            ? files[0]
            : value,
    }));
  };

  const InputError = ({ error }) =>
    error ? (
      <p className="mt-1 text-sm text-red-500">{error}</p>
    ) : null;




  return (
    <section className="min-h-screen px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto w-full max-w-5xl rounded-2xl border border-zinc-700 bg-zinc-900/90 p-5 shadow-2xl shadow-black/30 backdrop-blur-sm sm:rounded-3xl sm:p-8 lg:p-10">
        <div className="mb-8 space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-400 sm:text-base">
            Partner onboarding
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Store Registration
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
            Fill in the details below to register your store.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">

          {/* Shop Name */}
          <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium text-white sm:text-base">
              Shop Name *
            </label>
            <input
              type="text"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-600 bg-zinc-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-primary-bg2-color focus:ring-2 focus:ring-partner-primary-bg-color/10 sm:text-base"
              />
            <InputError error={errors.shopName} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white sm:text-base">
              Owner Name *
            </label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-600 bg-zinc-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-primary-bg2-color focus:ring-2 focus:ring-partner-primary-bg-color/10 sm:text-base"
              />
            <InputError error={errors.ownerName} />
          </div>
        </div>

          {/* Address */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white sm:text-base">
              Address *
            </label>
            <textarea
              rows="4"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-600 bg-zinc-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-primary-bg2-color focus:ring-2 focus:ring-partner-primary-bg-color/10  sm:text-base"
            />
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={getCurrentLocation}
                className="rounded-lg cursor-pointer bg-primary-bg2-color px-4 py-2 text-white"
              >📍 Detect Current Location
              </button>
              {
                formData.lat && (
                  <span className="text-sm text-green-500">
                    Location Captured
                  </span>
                )
              }
            </div>
            <InputError error={errors.address} />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-white sm:text-base">
                Mobile Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-600 bg-zinc-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-primary-bg2-color focus:ring-2 focus:ring-partner-primary-bg-color/10  sm:text-base"
              />
              <InputError error={errors.phone} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white sm:text-base">
                Category *
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-600 bg-zinc-800 px-4 py-3 text-sm text-white outline-none transition focus:border-primary-bg2-color focus:ring-2 focus:ring-partner-primary-bg-color/10 sm:text-base"
              >
                <option value="">Select Store Type</option>
                <option>Food Delivery</option>
                <option>Electronics</option>
                <option>Kirana Store</option>
                <option>Medical</option>
                <option>Fruits & Vegetables</option>
                <option>Stationery</option>
                <option>Bakery</option>
              </select>

              <InputError error={errors.category} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Aadhaar Number *
              </label>

              <input
                type="text"
                maxLength={12}
                name="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-600 bg-zinc-800 px-4 py-3 text-sm text-white outline-none transition focus:border-primary-bg2-color focus:ring-2 focus:ring-partner-primary-bg-color/10 sm:text-base"
              />
              <InputError error={errors.aadhaarNumber} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white sm:text-base">
                PAN Card *
              </label>
              <input
                type="text"
                name="panCard"
                value={formData.panCard}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    panCard: e.target.value.toUpperCase(),
                  })
                }
                className="w-full rounded-xl border border-zinc-600 bg-zinc-800 px-4 py-3 text-sm text-white outline-none transition focus:border-primary-bg2-color focus:ring-2 focus:ring-partner-primary-bg-color/10 sm:text-base"
              />
              <InputError error={errors.panCard} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white sm:text-base">
                GST Number (If Applicable)
              </label>
              <input
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gstNumber: e.target.value.toUpperCase(),
                  })
                }
                className="w-full rounded-xl border border-zinc-600 bg-zinc-800 px-4 py-3 text-sm text-white outline-none transition focus:border-primary-bg2-color focus:ring-2 focus:ring-partner-primary-bg-color/10 sm:text-base"
              />
              <InputError error={errors.gstNumber} />
            </div>

            {
              ["Food Delivery", "Bakery"].includes(formData.category) && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    FSSAI License *
                  </label>

                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    name="fssaiLicense"
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-600 bg-zinc-800 px-4 py-3 text-white"
                  />
                  <InputError error={errors.fssaiLicense} />
                </div>

              )

            }

          </div>

          {/* Bank Details */}
          <div className="rounded-2xl border border-zinc-700 bg-zinc-950/40 p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-white sm:text-2xl">
              Bank Details
            </h3>

            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="Account Holder Name"
                  name="accountHolderName"
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-600 bg-zinc-800 px-4 py-3 text-sm text-white outline-none transition focus:border-primary-bg2-color focus:ring-2 focus:ring-partner-primary-bg-color/10 sm:text-base"
                />
                <InputError error={errors.accountHolderName} />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Account Number"
                  name="accountNumber"
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-600 bg-zinc-800 px-4 py-3 text-sm text-white outline-none transition focus:border-primary-bg2-color focus:ring-2 focus:ring-partner-primary-bg-color/10 sm:text-base"
                />
                <InputError error={errors.accountNumber} />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="IFSC Code"
                  name="ifscCode"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ifscCode: e.target.value.toUpperCase(),
                    })
                  }
                  className="w-full rounded-xl border border-zinc-600 bg-zinc-800 px-4 py-3 text-sm text-white outline-none transition focus:border-primary-bg2-color focus:ring-2 focus:ring-partner-primary-bg-color/10 sm:text-base"
                />
                <InputError error={errors.ifscCode} />
              </div>
            </div>
          </div>


          {/* Consent */}
          <div>
            <label className="flex items-start gap-3 rounded-2xl border border-zinc-700 bg-zinc-950/40 p-4 text-sm text-white sm:text-base">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-zinc-500 text-red-600 focus:ring-primaborder-primary-bg2-color"
              />

              <span className="leading-6 text-zinc-200">
                I agree to the{" "}
                <a href="/terms" className="font-medium text-red-400 underline decoration-red-400/60 underline-offset-4">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy-policy" className="font-medium text-red-400 underline decoration-red-400/60 underline-offset-4">
                  Privacy Policy
                </a>
              </span>
            </label>

            <InputError error={errors.consent} />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-primary-bg2-color px-6 py-3.5 text-sm font-semibold text-black transition cursor-pointer hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-primaborder-primary-bg2-color focus:ring-offset-2 focus:ring-offset-zinc-900 sm:py-4 sm:text-base"
          >
            Submit Registration
          </button>
        </form>
      </div>
    </section>
  );
}