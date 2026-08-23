import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
    {
        question: "Why should I order from Almighty instead of other food delivery apps?",
        answer:
            "Because you shouldn't have to pay extra for the same meal. Almighty partners with local restaurants to offer offline prices, rewarding every order with Almighty Coins while delivering your food quickly and reliably.",
    },
    {
        question: 'What do you mean by "Offline Prices"?',
        answer:
            "Offline Prices means the menu prices on Almighty match the prices you'd pay if you visited the restaurant directly. No inflated online menu prices—just fair, transparent pricing.",
    },
    {
        question: "How do Almighty Coins work?",
        answer:
            "You earn 100 Almighty Coins for every ₹100 you spend. 100 Almighty Coins = ₹1, which you can redeem on future orders to save even more.",
    },
    {
        question: "What can I order on Almighty?",
        answer:
            `Almighty is more than just food delivery. You can order 🍔 Food from nearby restaurants 🛒 Groceries from local stores 💊 Medicines from pharmacies 🎧 Electronics and daily essentials Everything you need, delivered from trusted local businesses.`,
  },
  {
    question:"Are there any hidden charges?",
    answer:"No. We believe in transparent pricing. You'll always see the complete order value before checkout, so there are no unexpected surprises when you pay."
  }
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
                    className={`h-5 w-5 text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out ${isOpen
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

export const FAQCustomer = () => {

    const [activeIndex, setActiveIndex] = useState(0);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="w-full py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-14 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold text-black">
                        Frequently Asked Questions
                    </h2>

                    <p className="mt-4 text-primary-bg2-color">
                        Everything you need to know about our services.
                    </p>
                </div>

                <div className="rounded-3xl border  bg-black text-partner-text-color px-6 md:px-10">
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