import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion } from "framer-motion";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What is the check-in and check-out time?",
      answer:
        "Check-in begins at 3:00 PM, and check-out is at 11:00 AM. Early check-ins and late check-outs may be available upon request and subject to availability.",
    },
    {
      question: "Do you allow pets?",
      answer:
        "Yes, our hotel is pet-friendly! However, additional charges and certain restrictions may apply. Please contact us for more details.",
    },
    {
      question: "Does the hotel have Wi-Fi?",
      answer:
        "Yes, complimentary high-speed Wi-Fi is available throughout the property, including guest rooms and common areas.",
    },
    {
      question: "Is parking available at the hotel?",
      answer: "Yes, we provide free on-site parking for all our guests.",
    },
    {
      question: "Can I modify or cancel my booking?",
      answer:
        "Yes, bookings can be modified or canceled based on the terms and conditions of your reservation. Please refer to your booking confirmation email or contact us directly.",
    },
  ];

  return (
    <div className="container mx-auto p-6 mt-20">
      <motion.h2
        className="text-3xl font-bold text-left text-gray-700 mb-6"
        initial={{
          y: 70,
          opacity: 0,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        viewport={{ once: true }}
        transition={{
          delay: 0.4,
          duration: 1,
          ease: "easeInOut",
        }}
      >
        (FAQ) Frequently Asked Questions
      </motion.h2>
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <motion.div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-md"
            initial={{
              y: 70,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{
              delay: 0.4,
              duration: 1,
              ease: "easeInOut",
            }}
          >
            {/* Accordion Header */}
            <div
              onClick={() => toggleAccordion(index)}
              className="flex justify-between items-center p-4 bg-gray-800 text-white cursor-pointer hover:bg-gray-700 transition duration-300 ease-in-out"
            >
              <h3 className="text-lg font-medium">{item.question}</h3>
              {openIndex === index ? (
                <FiChevronUp size={24} />
              ) : (
                <FiChevronDown size={24} />
              )}
            </div>

            {/* Accordion Content */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === index ? "max-h-screen p-4 bg-gray-50" : "max-h-0"
              }`}
            >
              <p className="text-gray-700">{item.answer}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
