import { useState } from "react";
import { Mail, MapPin, Phone, Send, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";


export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim())
      newErrors.name = "Name is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.message.trim())
      newErrors.message = "Please enter your message.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }


    try{
      await addDoc(collection(db, "contactMessages"),{
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        status: "new",
        createdAt: serverTimestamp(),
        readAt: null,
      });

      toast.success("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setErrors({});
    }catch(error){
      toast.error("Failed to send message. Please try again later.");
    }


  };

  return (
    <div className=" min-h-screen">

      {/* Hero */}

      <section className="">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">

          <span className="inline-block rounded-lg border bg-primary-bg2-color px-4 py-2 text-black text-sm">
            Contact ALMIGHTY
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-6">
            We'd Love to Hear
            <span className="block text-primary-bg2-color">
              From You
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto  text-lg leading-8">
            Have a question, suggestion, or feedback? Fill out the form below
            and our team will get back to you as soon as possible.
          </p>

        </div>
      </section>

      {/* Main Section */}

      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-5 gap-12">

        {/* Contact Info */}

        <div className="lg:col-span-2 space-y-6">

          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8">

            <MessageSquare className="text-primary-bg2-color" size={36} />

            <h2 className="text-3xl font-bold mt-6 text-secondary-bg-color">
              Get in Touch
            </h2>

            <p className=" mt-4 leading-8 text-secondary-bg-color">
              Whether you have a question about an order, partnership,
              delivery, or simply want to share your feedback, we're here to
              help.
            </p>

          </div>

          <div className="rounded-3xl border border-neutral-800 p-6 flex items-start gap-4">
            <Mail className="text-primary-bg2-color mt-1" />
            <div>
              <h3 className="font-semibold text-lg">
                Email
              </h3>
              <p className="">
                contact@almightyhyperlocal.in
              </p>
            </div>
          </div>

          {/* <div className="rounded-3xl border border-neutral-800 p-6 flex items-start gap-4">
            <Phone className="text-primary-bg2-color mt-1" />
            <div>
              <h3 className="font-semibold text-lg">
                Phone
              </h3>
              <p className="">
                +91 62647 58852 
              </p>
            </div>
          </div> */}

          <div className="rounded-3xl border border-neutral-800 p-6 flex items-start gap-4">
            <MapPin className="text-primary-bg2-color mt-1" />
            <div>
              <h3 className="font-semibold text-lg">
                Office
              </h3>
              <p className="">
                Awadhpuri , Bhopal , M.P.
              </p>
            </div>
          </div>

        </div>

        {/* Contact Form */}

        <div className="lg:col-span-3 rounded-3xl border border-neutral-800 bg-neutral-900 p-8">

          <h2 className="text-3xl font-bold mb-8 text-primary-text-color">
            Send Us a Message
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <label className="block mb-2 text-gray-300">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl text-white bg-neutral-950 border border-neutral-700 px-5 py-4 outline-none focus:border-red-500"
              />

              {errors.name && (
                <p className="text-partner-primary-bg-color text-sm mt-2">
                  {errors.name}
                </p>
              )}

            </div>

            <div>

              <label className="block mb-2 text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl bg-neutral-950 border text-white border-neutral-700 px-5 py-4 outline-none focus:border-red-500"
              />

              {errors.email && (
                <p className="text-partner-primary-bg-color text-sm mt-2">
                  {errors.email}
                </p>
              )}

            </div>

            <div>

              <label className="block mb-2 text-gray-300">
                Feedback / Message
              </label>

              <textarea
                rows={6}
                name="message"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                className="w-full resize-none rounded-xl bg-neutral-950 border text-white border-neutral-700 px-5 py-4 outline-none focus:border-red-500"
              />

              {errors.message && (
                <p className="text-partner-primary-bg-color text-sm mt-2">
                  {errors.message}
                </p>
              )}

            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-primary-bg2-color py-4 font-semibold hover:bg-amber-400 cursor-pointer transition flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Send Message
            </button>

          </form>

        </div>

      </section>

    </div>
  );
}