import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-bg2-color text-black">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shipping Policy
          </h1>
          <p className="text-lg md:text-xl text-white max-w-3xl">
            Learn how orders are processed, shipped, and delivered through
            Almighty Hyperlocal Private Limited.
          </p>

          <div className="mt-6 inline-flex items-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white">
            Effective Date: August 15, 2026
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 space-y-10">
          <p className="text-gray-700 leading-8">
            Welcome to <strong>Almighty</strong>, a hyperlocal commerce platform
            that connects customers with nearby local stores for the delivery of
            food, groceries, medicines, electronics, and other everyday
            essentials.
          </p>

          <p className="text-gray-700 leading-8">
            This Shipping Policy explains how orders are processed and delivered
            through the Almighty platform.
          </p>

          {/* Section */}
          <PolicySection
            title="1. Delivery Areas"
            content={
              <>
                <p>
                  Almighty currently provides delivery services only in Bhopal.
                </p>

                <p className="mt-4">
                  Delivery availability depends on:
                </p>

                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Your delivery address</li>
                  <li>Availability of nearby partner stores</li>
                  <li>Availability of delivery partners</li>
                </ul>

                <p className="mt-4">
                  If your location is outside our service area, you may not be
                  able to place an order.
                </p>
              </>
            }
          />

          <PolicySection
            title="2. Order Processing"
            content={
              <>
                <p>
                  Orders are processed immediately after successful payment or
                  order confirmation.
                </p>

                <p className="mt-4">
                  Once the store accepts your order, it is prepared and
                  handed over to a delivery partner for delivery.
                </p>

                <p className="mt-4">
                  Processing time depends on:
                </p>

                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Store preparation time</li>
                  <li>Product availability</li>
                  <li>Peak demand</li>
                  <li>Weather and traffic conditions</li>
                </ul>
              </>
            }
          />

          <PolicySection
            title="3. Estimated Delivery Time"
            content={
              <>
                <p>
                  Estimated delivery times are displayed during checkout.
                </p>

                <div className="mt-6 overflow-hidden rounded-xl border">
                  <table className="w-full text-left">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-4 font-semibold">Category</th>
                        <th className="p-4 font-semibold">
                          Estimated Delivery
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="border-t">
                        <td className="p-4">Food</td>
                        <td className="p-4">20–45 Minutes</td>
                      </tr>

                      <tr className="border-t">
                        <td className="p-4">Groceries</td>
                        <td className="p-4">20–60 Minutes</td>
                      </tr>

                      <tr className="border-t">
                        <td className="p-4">Medicines</td>
                        <td className="p-4">20–60 Minutes</td>
                      </tr>

                      <tr className="border-t">
                        <td className="p-4">
                          Electronics & Essentials
                        </td>
                        <td className="p-4">30–90 Minutes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-5">
                  Delivery times are estimates only and may vary depending on
                  external factors.
                </p>
              </>
            }
          />

          <PolicySection
            title="4. Shipping Charges"
            content={
              <>
                <p>
                  Delivery charges are calculated based on factors such as:
                </p>

                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Distance from the store</li>
                  <li>Order value</li>
                  <li>Demand and delivery partner availability</li>
                  <li>Promotional offers (if applicable)</li>
                </ul>

                <p className="mt-4">
                  The applicable delivery fee will always be shown before you
                  place an order.
                </p>
              </>
            }
          />

          <PolicySection
            title="5. Order Tracking"
            content={
              <>
                <p>
                  Customers can track their orders in real time through the
                  Almighty application.
                </p>

                <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-5">
                  {[
                    "Order Confirmed",
                    "Store Accepted",
                    "Preparing Order",
                    "Out for Delivery",
                    "Delivered",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border p-4 text-center font-medium bg-gray-50"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </>
            }
          />

          <PolicySection
            title="6. Delays"
            content={
              <>
                <p>Delays may occur due to:</p>

                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Heavy rainfall or severe weather</li>
                  <li>Traffic congestion</li>
                  <li>Festivals or public holidays</li>
                  <li>High order volume</li>
                  <li>Store preparation delays</li>
                  <li>Delivery partner availability</li>
                </ul>

                <p className="mt-4">
                  We appreciate your patience in such situations.
                </p>
              </>
            }
          />

          <PolicySection
            title="7. Failed Deliveries"
            content={
              <>
                <p>A delivery may be unsuccessful if:</p>

                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>The customer is unavailable.</li>
                  <li>The address is incorrect or incomplete.</li>
                  <li>
                    Delivery cannot be completed due to safety or accessibility
                    reasons.
                  </li>
                  <li>The customer refuses to accept the order.</li>
                </ul>

                <p className="mt-4">
                  Additional delivery charges may apply for re-delivery.
                </p>
              </>
            }
          />

          <PolicySection
            title="8. Product Availability"
            content={
              <>
                <p>
                  Products listed on Almighty are supplied by independent local
                  stores.
                </p>

                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Products may become unavailable.</li>
                  <li>Stores may cancel due to stock issues.</li>
                  <li>
                    Substitutions may be offered with customer approval.
                  </li>
                </ul>
              </>
            }
          />

          <PolicySection
            title="9. Delivery Verification"
            content={
              <>
                <p>
                  Customers may be required to provide the following for
                  successful delivery:
                </p>

                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Valid phone number</li>
                  <li>Delivery instructions</li>
                  <li>
                    Identity verification for medicines or high-value products
                  </li>
                </ul>
              </>
            }
          />

          <PolicySection
            title="10. Damaged or Incorrect Orders"
            content={
              <>
                <p>
                  If you receive damaged, incorrect, or missing items, please
                  report the issue through the Almighty application or contact
                  customer support as soon as possible.
                </p>
              </>
            }
          />

          <PolicySection
            title="11. Delivery Responsibility"
            content={
              <>
                <p>
                  Almighty acts as a technology platform connecting customers,
                  local merchants, and delivery partners.
                </p>

                <p className="mt-4">
                  Delivery times are estimates and are not guaranteed. Delays
                  caused by factors beyond our control may occasionally occur.
                </p>
              </>
            }
          />

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold mb-6">12. Contact Us</h2>

            <div className="rounded-2xl bg-primary-bg2-color/10 border-amber-400 p-6">
              <p className="font-semibold text-lg">
                Almighty Hyperlocal Private Limited
              </p>

              <div className="mt-4 space-y-2 text-gray-700">
                <p>
                  📧 Email:{" "}
                  <a
                    href="mailto:contact@almightyhyperlocal.in"
                    className="text-indigo-600"
                  >
                    contact@almightyhyperlocal.in
                  </a>
                </p>

                <p>
                  🌐 Website:{" "}
                  <a
                    href="https://almightyhyperlocal.in"
                    className="text-indigo-600"
                  >
                    https://almightyhyperlocal.in
                  </a>
                </p>
              </div>
            </div>
          </section>

          <div className="border-t pt-8">
            <p className="text-gray-600 text-center leading-7">
              By placing an order through Almighty, you acknowledge that you
              have read, understood, and agreed to this Shipping Policy.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

const PolicySection = ({ title, content }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-5">{title}</h2>

      <div className="text-gray-700 leading-8 space-y-2">{content}</div>
    </section>
  );
};

export default ShippingPolicy;