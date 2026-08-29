import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What services does ALMIGHTY provide?",
    answer:
      "ALMIGHTY is a comprehensive platform that offers food delivery, instant grocery, medicine, and electronics services. We connect customers with local restaurants and stores to provide a seamless shopping experience.",
  },
  {
    question: "How much commission will I be charged by ALMIGHTY?",
    answer:
      "Almighty charges 0% commission to its registered restaurants, ensuring maximum profitability for our partners.",
  },
  {
    question: "How can I get help and support from ALMIGHTY if I get stuck?",
    answer:
      "The ALMIGHTY team is here to help! Email us at support@almighty.com with your restaurant ID, and we’ll resolve your query within 24 hours.",
  },
  {
    question: "How will I get my payouts?",
    answer:
      "Registered restaurants on Almighty receive payouts everyday or every week as per their convenience.",
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

export const FAQ = () => {

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