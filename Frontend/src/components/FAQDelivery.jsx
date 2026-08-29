import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "Who is a Almighty Delivery Partner?",
    answer:
      "Almighty Delivery Partners are independent contractors, who are required to pick up food , grocery , medicine or electronic items ordered by customers from restaurants / outlets and deliver to customers. Delivery Partners use their own vehicles (Bike/Cycle) to deliver orders to Almighty customers.",
  },
  {
    question: " How to become a Almighty Delivery Partner?",
    answer:
      "Download the ALMIGHTY Delivery Partner app from the Google Play Store or Apple App Store. Sign up with your personal details, upload the required documents, and complete the registration process.",
  },
  {
    question: "How will I get paid?",
    answer:
      "We will transfer your earnings on a daily or weekly basis directly in your bank account as per your convenience. You can check your earnings in your app under the Payments section.",
  },
  {
    question: "What are the requirements to become a Almighty Delivery Partner?",
    answer:"You must be at least 18 years old . A two-wheeler that meets all applicable law and safety requirements . Driving License, Registration Certificate (RC) and Insurance Certificate . Address proof . A valid PAN (Permanent Account Number) Card . Bank Account proof"
  },
  {
    question:"When do I start delivering orders?",
    answer:"Once your registration is complete, our team will run a background check after which you can start delivering orders."
  },
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-zinc-800 py-5">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left"
      >
        <h3 className="text-lg md:text-xl font-semibold text-white">
          {item.question}
        </h3>

        <ChevronDown
          className={`h-5 w-5 text-zinc-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-4"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-zinc-400 leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export const FAQDelivery = () => {

  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-partner-text2-color">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-primary-bg2-color">
            Everything you need to know about our services.
          </p>
        </div>

        <div className="rounded-3xl border  bg-partner-text2-color text-partner-text-color px-6 md:px-10">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={activeIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}