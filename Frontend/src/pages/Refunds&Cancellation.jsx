import React from "react";

const Section = ({ title, children }) => (
  <section className="border-b border-gray-200 pb-8 last:border-none last:pb-0">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
    <div className="text-gray-700 leading-8 space-y-4">{children}</div>
  </section>
);

const RefundCancellationPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-primary-bg2-color text-black ">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold">
            Refund & Cancellation Policy
          </h1>

          <p className="mt-5 text-lg md:text-xl text-white max-w-3xl">
            This policy explains how cancellations, refunds, and order-related
            issues are handled on the Almighty platform.
          </p>

          <div className="inline-flex mt-6 rounded-full bg-black text-white px-5 py-2 text-sm font-medium">
            Effective Date: August 15, 2026
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 lg:p-12 space-y-10">
          {/* Introduction */}
          <div className="space-y-5 text-gray-700 leading-8">
            <p>
              Welcome to{" "}
              <strong>Almighty Hyperlocal Private Limited</strong> ("Almighty",
              "we", "our", or "us").
            </p>

            <p>
              Almighty is a hyperlocal commerce platform that connects customers
              with nearby local stores for the purchase and delivery of food,
              groceries, medicines, electronics, and other everyday essentials.
            </p>

            <p>
              This Refund & Cancellation Policy explains how cancellations and
              refunds are handled for orders placed through the Almighty
              platform.
            </p>
          </div>

          {/* Section 1 */}
          <Section title="1. Order Cancellation">
            <div className="bg-gray-50 rounded-xl p-5 border">
              <h3 className="font-semibold text-lg">
                Before Store Acceptance
              </h3>

              <p className="mt-2">
                Customers may cancel an order before the store has accepted and
                started processing it.
              </p>

              <p className="mt-2">
                If the cancellation is successful, any eligible prepaid amount
                will be refunded to the original payment method.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border">
              <h3 className="font-semibold text-lg">After Store Acceptance</h3>

              <p className="mt-2">
                Once the store starts preparing your order, cancellation may not
                be possible, especially for:
              </p>

              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Freshly prepared food</li>
                <li>Medicines</li>
                <li>Perishable grocery items</li>
                <li>Customized or specially packed products</li>
              </ul>

              <p className="mt-3">
                Cancellation requests after this stage are reviewed on a
                case-by-case basis.
              </p>
            </div>
          </Section>

          {/* Section 2 */}
          <Section title="2. Cancellation by the Store">
            <p>
              A store may cancel an order for reasons including:
            </p>

            <ul className="grid sm:grid-cols-2 gap-4 mt-4">
              {[
                "Product out of stock",
                "Store closure",
                "Technical issues",
                "Operational constraints",
                "Item unavailable",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-xl border bg-gray-50 p-4"
                >
                  {item}
                </li>
              ))}
            </ul>

            <p>
              If a prepaid order is cancelled by the store, the eligible amount
              paid by the customer will be refunded.
            </p>
          </Section>

          {/* Section 3 */}
          <Section title="3. Cancellation Due to Delivery Issues">
            <ul className="list-disc pl-6 space-y-2">
              <li>Incorrect or incomplete delivery address.</li>
              <li>Customer cannot be contacted.</li>
              <li>Customer unavailable during delivery.</li>
              <li>Delivery cannot be completed due to safety concerns.</li>
            </ul>

            <p>
              Refund eligibility will depend on the stage of the order and the
              circumstances involved.
            </p>
          </Section>

          {/* Section 4 */}
          <Section title="4. Refund Eligibility">
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Order cancelled before fulfillment",
                "Store unable to fulfill the order",
                "Incorrect product delivered",
                "Damaged product received",
                "Missing items",
                "Verified payment or billing error",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border bg-green-50 border-green-200 p-5"
                >
                  {item}
                </div>
              ))}
            </div>

            <p>
              Each refund request is reviewed individually.
            </p>
          </Section>

          {/* Section 5 */}
          <Section title="5. Non-Refundable Situations">
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Incorrect delivery address",
                "Customer unavailable",
                "Change of mind after preparation begins",
                "Weather or traffic delays",
                "Minor packaging differences",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border bg-red-50 border-red-200 p-5"
                >
                  {item}
                </div>
              ))}
            </div>
          </Section>

          {/* Section 6 */}
          <Section title="6. Damaged, Incorrect or Missing Items">
            <p>
              If you receive a damaged product, incorrect item, or have missing
              items, please report the issue through the Almighty application or
              contact customer support as soon as possible.
            </p>

            <p>
              Supporting photographs or additional information may be requested
              during verification.
            </p>
          </Section>

          {/* Section 7 */}
          <Section title="7. Refund Process">
            <div className="space-y-4">
              <div className="border rounded-xl p-5 bg-gray-50">
                ✓ Approved refunds are initiated to the original payment method.
              </div>

              <div className="border rounded-xl p-5 bg-gray-50">
                ✓ Processing time depends on your payment provider or bank.
              </div>

              <div className="border rounded-xl p-5 bg-gray-50">
                ✓ Customers will receive confirmation once the refund has been
                initiated.
              </div>
            </div>
          </Section>

          {/* Section 8 */}
          <Section title="8. Cash on Delivery (COD)">
            <p>
              No refund is applicable for unpaid cancelled COD orders.
            </p>

            <p>
              If any amount was collected incorrectly, the matter will be
              reviewed after verification.
            </p>
          </Section>

          {/* Section 9 */}
          <Section title="9. Promotional Offers & Coupons">
            <p>
              Orders placed using coupons, discount codes, cashback offers, or
              promotional credits are subject to the terms of the respective
              promotion.
            </p>
          </Section>

          {/* Section 10 */}
          <Section title="10. Fraud Prevention">
            <p>Almighty reserves the right to:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Investigate suspicious refund requests.</li>
              <li>Decline fraudulent or abusive claims.</li>
              <li>Restrict refunds where misuse is identified.</li>
            </ul>
          </Section>

          {/* Section 11 */}
          <Section title="11. Force Majeure">
            <p>
              Almighty is not responsible for delays or cancellations caused by
              events beyond reasonable control including natural disasters,
              government restrictions, technical outages, severe weather,
              transportation disruptions, or public emergencies.
            </p>
          </Section>

          {/* Section 12 */}
          <Section title="12. Changes to this Policy">
            <p>
              We may update this Refund & Cancellation Policy from time to time.
              The latest version will always be available on our website.
            </p>
          </Section>

          {/* Contact */}
          <Section title="13. Contact Us">
            <div className="rounded-2xl bg-primary-bg2-color/10 border border-primary-bg2-color p-6">
              <h3 className="font-bold text-xl mb-4">
                Almighty Hyperlocal Private Limited
              </h3>

              <div className="space-y-3 text-gray-700">
                <p>
                  📧 Email:{" "}
                  <a
                    href="mailto:support@almightyapp.in"
                    className="text-blue-600 hover:underline"
                  >
                    support@almightyapp.in
                  </a>
                </p>

                <p>📞 Phone: +91 6264758852</p>

                <p>
                  🌐 Website:{" "}
                  <a
                    href="https://almightyapp.in"
                    className="text-blue-600 hover:underline"
                  >
                    https://almightyapp.in
                  </a>
                </p>
              </div>
            </div>
          </Section>

          {/* Footer */}
          <div className="border-t pt-8">
            <p className="text-center text-gray-600 leading-7">
              By using the Almighty platform and placing an order, you
              acknowledge that you have read, understood, and agree to this
              Refund & Cancellation Policy.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RefundCancellationPolicy;