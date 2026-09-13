// import React from "react";

// const Section = ({ title, children }) => (
//   <section className="border-b border-gray-200 pb-8 last:border-none last:pb-0">
//     <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
//     <div className="text-gray-700 leading-8 space-y-4">{children}</div>
//   </section>
// );

// const RefundCancellationPolicy = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero */}
//       <section className="bg-primary-bg2-color text-black ">
//         <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
//           <h1 className="text-4xl md:text-5xl font-bold">
//             Refund & Cancellation Policy
//           </h1>

//           <p className="mt-5 text-lg md:text-xl text-white max-w-3xl">
//             This policy explains how cancellations, refunds, and order-related
//             issues are handled on the Almighty platform.
//           </p>

//           <div className="inline-flex mt-6 rounded-full bg-black text-white px-5 py-2 text-sm font-medium">
//             Effective Date: August 15, 2026
//           </div>
//         </div>
//       </section>

//       {/* Main */}
//       <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
//         <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 lg:p-12 space-y-10">
//           {/* Introduction */}
//           <div className="space-y-5 text-gray-700 leading-8">
//             <p>
//               Welcome to{" "}
//               <strong>Almighty Hyperlocal Private Limited</strong> ("Almighty",
//               "we", "our", or "us").
//             </p>

//             <p>
//               Almighty is a hyperlocal commerce platform that connects customers
//               with nearby local stores for the purchase and delivery of food,
//               groceries, medicines, electronics, and other everyday essentials.
//             </p>

//             <p>
//               This Refund & Cancellation Policy explains how cancellations and
//               refunds are handled for orders placed through the Almighty
//               platform.
//             </p>
//           </div>

//           {/* Section 1 */}
//           <Section title="1. Order Cancellation">
//             <div className="bg-gray-50 rounded-xl p-5 border">
//               <h3 className="font-semibold text-lg">
//                 Before Store Acceptance
//               </h3>

//               <p className="mt-2">
//                 Customers may cancel an order before the store has accepted and
//                 started processing it.
//               </p>

//               <p className="mt-2">
//                 If the cancellation is successful, any eligible prepaid amount
//                 will be refunded to the original payment method.
//               </p>
//             </div>

//             <div className="bg-gray-50 rounded-xl p-5 border">
//               <h3 className="font-semibold text-lg">After Store Acceptance</h3>

//               <p className="mt-2">
//                 Once the store starts preparing your order, cancellation may not
//                 be possible, especially for:
//               </p>

//               <ul className="list-disc pl-6 mt-3 space-y-2">
//                 <li>Freshly prepared food</li>
//                 <li>Medicines</li>
//                 <li>Perishable grocery items</li>
//                 <li>Customized or specially packed products</li>
//               </ul>

//               <p className="mt-3">
//                 Cancellation requests after this stage are reviewed on a
//                 case-by-case basis.
//               </p>
//             </div>
//           </Section>

//           {/* Section 2 */}
//           <Section title="2. Cancellation by the Store">
//             <p>
//               A store may cancel an order for reasons including:
//             </p>

//             <ul className="grid sm:grid-cols-2 gap-4 mt-4">
//               {[
//                 "Product out of stock",
//                 "Store closure",
//                 "Technical issues",
//                 "Operational constraints",
//                 "Item unavailable",
//               ].map((item) => (
//                 <li
//                   key={item}
//                   className="rounded-xl border bg-gray-50 p-4"
//                 >
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             <p>
//               If a prepaid order is cancelled by the store, the eligible amount
//               paid by the customer will be refunded.
//             </p>
//           </Section>

//           {/* Section 3 */}
//           <Section title="3. Cancellation Due to Delivery Issues">
//             <ul className="list-disc pl-6 space-y-2">
//               <li>Incorrect or incomplete delivery address.</li>
//               <li>Customer cannot be contacted.</li>
//               <li>Customer unavailable during delivery.</li>
//               <li>Delivery cannot be completed due to safety concerns.</li>
//             </ul>

//             <p>
//               Refund eligibility will depend on the stage of the order and the
//               circumstances involved.
//             </p>
//           </Section>

//           {/* Section 4 */}
//           <Section title="4. Refund Eligibility">
//             <div className="grid md:grid-cols-2 gap-4">
//               {[
//                 "Order cancelled before fulfillment",
//                 "Store unable to fulfill the order",
//                 "Incorrect product delivered",
//                 "Damaged product received",
//                 "Missing items",
//                 "Verified payment or billing error",
//               ].map((item) => (
//                 <div
//                   key={item}
//                   className="rounded-xl border bg-green-50 border-green-200 p-5"
//                 >
//                   {item}
//                 </div>
//               ))}
//             </div>

//             <p>
//               Each refund request is reviewed individually.
//             </p>
//           </Section>

//           {/* Section 5 */}
//           <Section title="5. Non-Refundable Situations">
//             <div className="grid md:grid-cols-2 gap-4">
//               {[
//                 "Incorrect delivery address",
//                 "Customer unavailable",
//                 "Change of mind after preparation begins",
//                 "Weather or traffic delays",
//                 "Minor packaging differences",
//               ].map((item) => (
//                 <div
//                   key={item}
//                   className="rounded-xl border bg-red-50 border-red-200 p-5"
//                 >
//                   {item}
//                 </div>
//               ))}
//             </div>
//           </Section>

//           {/* Section 6 */}
//           <Section title="6. Damaged, Incorrect or Missing Items">
//             <p>
//               If you receive a damaged product, incorrect item, or have missing
//               items, please report the issue through the Almighty application or
//               contact customer support as soon as possible.
//             </p>

//             <p>
//               Supporting photographs or additional information may be requested
//               during verification.
//             </p>
//           </Section>

//           {/* Section 7 */}
//           <Section title="7. Refund Process">
//             <div className="space-y-4">
//               <div className="border rounded-xl p-5 bg-gray-50">
//                 ✓ Approved refunds are initiated to the original payment method.
//               </div>

//               <div className="border rounded-xl p-5 bg-gray-50">
//                 ✓ Processing time depends on your payment provider or bank.
//               </div>

//               <div className="border rounded-xl p-5 bg-gray-50">
//                 ✓ Customers will receive confirmation once the refund has been
//                 initiated.
//               </div>
//             </div>
//           </Section>

//           {/* Section 8 */}
//           <Section title="8. Cash on Delivery (COD)">
//             <p>
//               No refund is applicable for unpaid cancelled COD orders.
//             </p>

//             <p>
//               If any amount was collected incorrectly, the matter will be
//               reviewed after verification.
//             </p>
//           </Section>

//           {/* Section 9 */}
//           <Section title="9. Promotional Offers & Coupons">
//             <p>
//               Orders placed using coupons, discount codes, cashback offers, or
//               promotional credits are subject to the terms of the respective
//               promotion.
//             </p>
//           </Section>

//           {/* Section 10 */}
//           <Section title="10. Fraud Prevention">
//             <p>Almighty reserves the right to:</p>

//             <ul className="list-disc pl-6 space-y-2">
//               <li>Investigate suspicious refund requests.</li>
//               <li>Decline fraudulent or abusive claims.</li>
//               <li>Restrict refunds where misuse is identified.</li>
//             </ul>
//           </Section>

//           {/* Section 11 */}
//           <Section title="11. Force Majeure">
//             <p>
//               Almighty is not responsible for delays or cancellations caused by
//               events beyond reasonable control including natural disasters,
//               government restrictions, technical outages, severe weather,
//               transportation disruptions, or public emergencies.
//             </p>
//           </Section>

//           {/* Section 12 */}
//           <Section title="12. Changes to this Policy">
//             <p>
//               We may update this Refund & Cancellation Policy from time to time.
//               The latest version will always be available on our website.
//             </p>
//           </Section>

//           {/* Contact */}
//           <Section title="13. Contact Us">
//             <div className="rounded-2xl bg-primary-bg2-color/10 border border-primary-bg2-color p-6">
//               <h3 className="font-bold text-xl mb-4">
//                 Almighty Hyperlocal Private Limited
//               </h3>

//               <div className="space-y-3 text-gray-700">
//                 <p>
//                   📧 Email:{" "}
//                   <a
//                     href="mailto:support@almightyapp.in"
//                     className="text-blue-600 hover:underline"
//                   >
//                     support@almightyapp.in
//                   </a>
//                 </p>

//                 <p>📞 Phone: +91 6264758852</p>

//                 <p>
//                   🌐 Website:{" "}
//                   <a
//                     href="https://almightyapp.in"
//                     className="text-blue-600 hover:underline"
//                   >
//                     https://almightyapp.in
//                   </a>
//                 </p>
//               </div>
//             </div>
//           </Section>

//           {/* Footer */}
//           <div className="border-t pt-8">
//             <p className="text-center text-gray-600 leading-7">
//               By using the Almighty platform and placing an order, you
//               acknowledge that you have read, understood, and agree to this
//               Refund & Cancellation Policy.
//             </p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default RefundCancellationPolicy;





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
      <section className="bg-primary-bg2-color text-black">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold">
            Refund & Cancellation Policy
          </h1>

          <p className="mt-5 text-lg md:text-xl text-white max-w-3xl">
            This policy explains how cancellations, refunds, vendor payments,
            rider responsibilities, and order-related issues are handled on
            the Almighty platform.
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
              Almighty is a hyperlocal commerce platform that connects
              customers with nearby local stores for the purchase and delivery
              of food, groceries, medicines, electronics, and other everyday
              essentials.
            </p>

            <p>
              This Refund & Cancellation Policy explains how cancellations,
              refunds, vendor payments, rider responsibilities, and
              order-related issues are handled for orders placed through the
              Almighty platform.
            </p>
          </div>

          {/* Section 1 */}
          <Section title="1. Order Cancellation by Customer">
            <div className="bg-gray-50 rounded-xl p-5 border">
              <h3 className="font-semibold text-lg">
                Before Store Acceptance
              </h3>

              <p className="mt-2">
                Customers may cancel an order before the store/vendor has
                accepted the order and started processing it.
              </p>

              <p className="mt-2">
                If the cancellation is successful, any eligible prepaid amount
                will be refunded to the original payment method.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <h3 className="font-semibold text-lg text-gray-900">
                After Store Acceptance
              </h3>

              <p className="mt-2">
                Once the store/vendor has accepted the order and started
                preparing, processing, packing, or fulfilling it, the customer
                may not cancel the order and{" "}
                <strong>no refund will ordinarily be provided for such
                cancellation</strong>.
              </p>

              <p className="mt-3">
                This applies particularly to products or orders that cannot
                reasonably be resold or reused once preparation or fulfillment
                has started, including:
              </p>

              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Freshly prepared food</li>
                <li>Medicines</li>
                <li>Perishable grocery items</li>
                <li>Customized or specially packed products</li>
                <li>Other products already prepared or processed for the customer</li>
              </ul>

              <p className="mt-3">
                Exceptions may apply where the order itself is verified to be
                damaged, incorrect, materially different from the order placed,
                contains missing items, or where a refund is otherwise required
                under applicable law.
              </p>
            </div>
          </Section>

          {/* Section 2 */}
          <Section title="2. Cancellation by the Store / Vendor">
            <p>
              A store/vendor may cancel an order for reasons including:
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
              If a prepaid order is cancelled by the store/vendor because the
              store/vendor is unable to fulfill the order, the eligible amount
              paid by the customer will be refunded.
            </p>

            <p>
              However, where the vendor has already correctly prepared and
              fulfilled the order in accordance with the customer's order and
              the cancellation or delivery failure occurs for reasons outside
              the vendor's control, the vendor may remain eligible for its
              applicable payment or payout, subject to Almighty's verification
              and applicable vendor terms.
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

            <p>
              Where the delivery issue is caused by the customer, including an
              incorrect address, failure to respond to the rider, or
              unavailability at the delivery location, the customer may not be
              eligible for a refund.
            </p>
          </Section>

          {/* Section 4 */}
          <Section title="4. Refund Eligibility for Customers">
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
              Each refund request is reviewed individually. Refunds for
              damaged, incorrect, materially different, or missing products
              will be processed only after Almighty completes its verification
              check.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <h3 className="font-semibold text-lg">
                Damaged or Incorrect Order
              </h3>

              <p className="mt-2">
                If a customer receives an order that is damaged, incorrect,
                materially different from the order placed, or contains missing
                items, the customer should report the issue to Almighty as soon
                as possible.
              </p>

              <p className="mt-2">
                After receiving the complaint, Almighty may conduct a
                verification check. Supporting photographs, videos, order
                details, delivery information, or other relevant information
                may be requested.
              </p>

              <p className="mt-2">
                If the issue is verified, Almighty may provide an eligible
                refund, replacement, or other appropriate resolution.
              </p>
            </div>
          </Section>

          {/* Section 5 */}
          <Section title="5. Non-Refundable Situations">
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Incorrect delivery address",
                "Customer unavailable",
                "Change of mind after preparation begins",
                "Customer cancellation after store acceptance",
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

            <p>
              The above situations are generally non-refundable unless
              Almighty determines otherwise based on the circumstances or
              applicable law.
            </p>
          </Section>

          {/* Section 6 */}
          <Section title="6. Damaged, Incorrect or Missing Items">
            <p>
              If you receive a damaged product, incorrect item, materially
              different product, or have missing items, please report the issue
              through the Almighty application or contact customer support as
              soon as possible.
            </p>

            <p>
              Almighty may request supporting photographs, videos, order
              details, or additional information during the verification
              process.
            </p>

            <p>
              If the issue is verified by Almighty, the customer may be
              eligible for a refund, replacement, or another appropriate
              resolution depending on the circumstances.
            </p>
          </Section>

          {/* Section 7 */}
          <Section title="7. Refund Process">
            <div className="space-y-4">
              <div className="border rounded-xl p-5 bg-gray-50">
                ✓ Approved refunds are initiated to the original payment
                method.
              </div>

              <div className="border rounded-xl p-5 bg-gray-50">
                ✓ Processing time depends on your payment provider or bank.
              </div>

              <div className="border rounded-xl p-5 bg-gray-50">
                ✓ Customers will receive confirmation once the refund has been
                initiated.
              </div>

              <div className="border rounded-xl p-5 bg-gray-50">
                ✓ Refunds for damaged, incorrect, or missing orders are subject
                to successful verification by Almighty.
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

            <p>
              Where a refund is approved for an order using a promotional
              offer, the treatment of the promotional benefit will be
              determined according to the applicable promotional terms.
            </p>
          </Section>

          {/* Section 10 */}
          <Section title="10. Vendor Protection & Payment Eligibility">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h3 className="font-semibold text-lg">
                Vendor Fulfillment Protection
              </h3>

              <p className="mt-2">
                If a vendor correctly prepares and fulfills an order in
                accordance with the customer's order, maintains the applicable
                quality standards, and prepares or hands over the order within
                the applicable preparation or fulfillment time, the vendor will
                remain eligible for its applicable payment or payout where the
                subsequent cancellation, delivery failure, or non-completion
                occurs for reasons not attributable to the vendor.
              </p>

              <p className="mt-2">
                Almighty may review the order, fulfillment records, timestamps,
                delivery status, customer complaint, and other relevant
                information before determining the applicable vendor payment or
                adjustment.
              </p>
            </div>

            <p>
              If an order is cancelled or cannot be fulfilled because of a
              vendor-related issue, including failure to prepare the correct
              order, unavailability of the ordered item, failure to meet
              applicable quality requirements, or other vendor-attributable
              circumstances, the vendor may not be eligible for the applicable
              payout and may be subject to adjustments in accordance with the
              applicable vendor terms.
            </p>
          </Section>

          {/* Section 11 */}
          <Section title="11. Rider Responsibility & Delivery Issues">
            <p>
              Riders are responsible for handling and delivering orders with
              reasonable care and in accordance with Almighty's applicable
              delivery requirements.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Late delivery attributable to the rider",
                "Order misplaced or lost during delivery",
                "Wrong order delivered",
                "Order delivered to the wrong customer or location",
                "Damage caused by improper handling",
                "Failure to follow applicable delivery procedures",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border bg-orange-50 border-orange-200 p-5"
                >
                  {item}
                </div>
              ))}
            </div>

            <p>
              Where a delivery issue is attributable to the rider, Almighty
              may investigate the incident and take appropriate action,
              including applying applicable penalties or deductions to the
              rider in accordance with the rider's applicable terms.
            </p>

            <p>
              Rider penalties may depend on the nature and severity of the
              incident, available evidence, delivery records, timestamps,
              customer feedback, vendor information, and the outcome of
              Almighty's verification process.
            </p>
          </Section>

          {/* Section 12 */}
          <Section title="12. Customer & Vendor Resolution for Rider-Related Issues">
            <p>
              If a delivery issue attributable to the rider results in the
              customer receiving no order, a wrong order, or a materially
              damaged order, Almighty may provide an eligible refund,
              replacement, or other appropriate resolution to the customer
              following verification.
            </p>

            <p>
              Where appropriate, Almighty may also protect, adjust, or provide
              the applicable vendor payment where the vendor correctly prepared
              and fulfilled the order and the issue occurred during the
              delivery stage.
            </p>

            <div className="bg-gray-50 border rounded-xl p-5">
              <h3 className="font-semibold text-lg">
                Important
              </h3>

              <p className="mt-2">
                A customer refund and a rider penalty are separate matters.
                Where an incident is verified as rider-attributable, Almighty
                may refund or otherwise resolve the customer's issue while
                separately determining the appropriate action against the
                rider.
              </p>
            </div>
          </Section>

          {/* Section 13 */}
          <Section title="13. Fraud Prevention & Verification">
            <p>Almighty reserves the right to:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Investigate suspicious refund requests.</li>
              <li>Verify damaged, incorrect, missing, or disputed orders.</li>
              <li>Request photographs, videos, order details, or other evidence.</li>
              <li>Decline fraudulent or abusive claims.</li>
              <li>Restrict refunds where misuse is identified.</li>
              <li>
                Review vendor and rider responsibility before making a final
                determination.
              </li>
            </ul>
          </Section>

          {/* Section 14 */}
          <Section title="14. Force Majeure">
            <p>
              Almighty is not responsible for delays or cancellations caused
              by events beyond reasonable control including natural disasters,
              government restrictions, technical outages, severe weather,
              transportation disruptions, or public emergencies.
            </p>

            <p>
              Refunds, vendor payments, or other resolutions in such
              circumstances will be determined based on the specific
              circumstances and applicable terms.
            </p>
          </Section>

          {/* Section 15 */}
          <Section title="15. Changes to this Policy">
            <p>
              We may update this Refund & Cancellation Policy from time to
              time. The latest version will always be available on our website.
            </p>
          </Section>

          {/* Section 16 */}
          <Section title="16. Contact Us">
            <div className="rounded-2xl bg-primary-bg2-color/10 border border-primary-bg2-color p-6">
              <h3 className="font-bold text-xl mb-4">
                Almighty Hyperlocal Private Limited
              </h3>

              <div className="space-y-3 text-gray-700">
                <p>
                  📧 Email:{" "}
                  <a
                    href="mailto:contact@almightyhyperlocal.in"
                    className="text-blue-600 hover:underline"
                  >
                    contact@almightyhyperlocal.in
                  </a>
                </p>

                <p>
                  🌐 Website:{" "}
                  <a
                    href="https://almightyhyperlocal.in"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://almightyhyperlocal.in
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
