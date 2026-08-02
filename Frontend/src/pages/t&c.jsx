// TermsAndConditions.jsx

import React from "react";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using the ALMIGHTY platform, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please discontinue using our services immediately.",
  },
  {
    id: "services",
    title: "2. Services",
    content:
      "ALMIGHTY provides a digital platform that enables businesses to register their stores, manage menus, showcase products, and access various business-related services. We reserve the right to modify or discontinue any service without prior notice.",
  },
  {
    id: "eligibility",
    title: "3. Eligibility",
    content:
      "You must be at least 18 years old and legally capable of entering into binding agreements to use our platform. By registering, you confirm that the information provided is accurate and complete.",
  },
  {
    id: "account",
    title: "4. User Accounts",
    content:
      "You are responsible for maintaining the confidentiality of your account credentials. ALMIGHTY shall not be liable for any loss resulting from unauthorized access due to your negligence.",
  },
  {
    id: "responsibilities",
    title: "5. User Responsibilities",
    content:
      "Users agree not to upload false information, violate any applicable laws, misuse the platform, attempt unauthorized access, distribute malware, or interfere with platform operations.",
  },
  {
    id: "payments",
    title: "6. Payments & Fees",
    content:
      "Certain services may require payment. All applicable charges, taxes, and payment terms will be displayed before completing any transaction. Payments are generally non-refundable unless otherwise stated.",
  },
  {
    id: "privacy",
    title: "7. Privacy",
    content:
      "Your use of ALMIGHTY is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information.",
  },
  {
    id: "intellectual",
    title: "8. Intellectual Property",
    content:
      "All trademarks, logos, graphics, software, content, and branding available on ALMIGHTY are the exclusive property of ALMIGHTY unless otherwise stated. Unauthorized reproduction or distribution is prohibited.",
  },
  {
    id: "termination",
    title: "9. Termination",
    content:
      "We reserve the right to suspend or terminate your account without prior notice if you violate these Terms or engage in activities harmful to the platform or other users.",
  },
  {
    id: "liability",
    title: "10. Limitation of Liability",
    content:
      "ALMIGHTY shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our platform.",
  },
  {
    id: "changes",
    title: "11. Changes to Terms",
    content:
      "We may update these Terms and Conditions periodically. Continued use of the platform after updates constitutes acceptance of the revised terms.",
  },
  {
    id: "contact",
    title: "12. Contact Information",
    content:
      "For questions regarding these Terms and Conditions, please contact the ALMIGHTY support team through the contact details available on our website.",
  },
];

export const TermsAndConditions = () => {
  return (
    <div className=" min-h-screen">
      {/* Hero */}
      <div className="border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h1 className="text-5xl font-bold mb-4">
            Terms & Conditions
          </h1>

          <p className="text-lg  max-w-3xl">
            Please read these Terms and Conditions carefully before using the
            ALMIGHTY platform. By accessing our services, you agree to comply
            with and be bound by these terms.
          </p>

          <div className="mt-6 inline-flex items-center rounded-full border border-red-600/40 bg-red-600/10 px-5 py-2 text-red-400">
            Last Updated: July 2026
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-4 gap-12">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
            <h3 className=" font-semibold mb-5 text-partner-primary-bg-color">
              Table of Contents
            </h3>

            <ul className="space-y-3 text-sm ">
              {sections.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className=" text-secondary-bg-color hover:text-partner-primary-bg-color transition"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Content */}
        <main className="lg:col-span-3">
          <div className="space-y-12">
            {sections.map((section) => (
              <section
                id={section.id}
                key={section.id}
                className="border-b border-neutral-800 pb-10 scroll-mt-28"
              >
                <h2 className="text-3xl font-semibold  mb-5">
                  {section.title}
                </h2>

                <p className="leading-8 ">
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-20 rounded-2xl border border-red-600/30 bg-partner-primary-bg-color p-8">
            <h3 className="text-2xl font-semibold  mb-4">
              Agreement
            </h3>

            <p className=" leading-8">
              By continuing to access or use ALMIGHTY, you acknowledge that you
              have read, understood, and agreed to these Terms and Conditions.
              If you have any questions, please contact our support team before
              using our services.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

// export default TermsAndConditions;