import React from "react";

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: (
      <>
        <p>
          Welcome to <strong>Almighty Hyperlocal Private Limited</strong>
          ("Almighty", "we", "our", or "us").
        </p>

        <p>
          Almighty operates a technology-enabled hyperlocal commerce platform
          through its website, mobile applications, and related services
          (collectively, the "Platform"). The Platform may connect customers
          with participating restaurants, local stores, pharmacies,
          retailers, and other eligible businesses for the purchase and
          delivery of food, groceries, medicines, electronics, household
          products, and other everyday goods, depending on availability and
          applicable laws.
        </p>

        <p>
          This Privacy Policy explains how we collect, use, process, disclose,
          store, retain, and protect personal information when you use the
          Almighty Platform.
        </p>

        <p>
          This Privacy Policy applies to customers, vendors/stores, delivery
          partners/riders, website visitors, and other individuals who
          interact with Almighty.
        </p>

        <p>
          By using the Platform, you acknowledge that you have read and
          understood this Privacy Policy. Where consent is required by
          applicable law, we will obtain consent through appropriate means.
        </p>
      </>
    ),
  },

  {
    id: "information",
    title: "2. Information We Collect",
    content: (
      <>
        <p>
          We collect information that is necessary to provide, maintain,
          secure, and improve our services. The information we collect depends
          on how you use the Platform.
        </p>

        <h3 className="font-semibold text-xl mt-6">
          A. Information You Provide Directly
        </h3>

        <ul>
          <li>Name and profile information.</li>
          <li>Mobile phone number.</li>
          <li>Email address.</li>
          <li>Delivery and billing addresses.</li>
          <li>Account login and authentication information.</li>
          <li>Order and product information.</li>
          <li>Customer support communications.</li>
          <li>Feedback, ratings, and reviews.</li>
          <li>Information provided when reporting an order issue.</li>
          <li>
            Photographs, videos, or other evidence voluntarily submitted for
            refund, damaged-item, incorrect-order, or support verification.
          </li>
        </ul>

        <h3 className="font-semibold text-xl mt-6">
          B. Transaction Information
        </h3>

        <p>
          When you place an order or make a payment, we may collect or receive
          information relating to the transaction, such as:
        </p>

        <ul>
          <li>Order ID and order details.</li>
          <li>Products purchased.</li>
          <li>Order amount and applicable fees.</li>
          <li>Payment status.</li>
          <li>Refund and cancellation information.</li>
          <li>Payment method or payment-provider transaction references.</li>
        </ul>

        <p>
          Depending on the payment method, payment information may be processed
          directly by third-party payment service providers. We do not
          necessarily receive or store complete card, UPI, or banking
          credentials.
        </p>

        <h3 className="font-semibold text-xl mt-6">
          C. Location Information
        </h3>

        <p>
          Where required for delivery, store discovery, service availability,
          address verification, order tracking, fraud prevention, or other
          legitimate purposes, Almighty may process location information.
        </p>

        <p>
          Location information may include the delivery location entered by
          you and, where you grant the relevant device permission, location
          information obtained from your device.
        </p>

        <p>
          You can control device-level location permissions through your
          device settings. Certain features, such as location-based store
          discovery or delivery tracking, may not function correctly if the
          relevant permission is disabled.
        </p>

        <h3 className="font-semibold text-xl mt-6">
          D. Device and Technical Information
        </h3>

        <p>
          When you access the Platform, we and our service providers may
          automatically process certain technical information, where
          applicable, including:
        </p>

        <ul>
          <li>Device type and operating system.</li>
          <li>Application version.</li>
          <li>IP address.</li>
          <li>Device identifiers or advertising identifiers, where applicable and permitted.</li>
          <li>Network and connectivity information.</li>
          <li>Crash and diagnostic information.</li>
          <li>Security and authentication information.</li>
          <li>General interaction and usage information.</li>
        </ul>

        <p>
          The exact information collected depends on the technologies and
          third-party services enabled in the version of the Platform you use.
        </p>
      </>
    ),
  },

  {
    id: "firebase",
    title: "3. Firebase and Technology Services",
    content: (
      <>
        <p>
          Almighty may use technology and infrastructure services provided by
          third parties, including Google Firebase and related Google
          services, to operate and secure portions of the Platform.
        </p>

        <p>
          Depending on the features enabled in our production application,
          these services may include authentication, database infrastructure,
          cloud storage, application diagnostics, crash reporting, analytics,
          messaging, or other technical functionality.
        </p>

        <p>
          Information processed through such services is handled in accordance
          with our instructions, applicable agreements, applicable law, and the
          relevant provider's privacy and security practices.
        </p>

        <p>
          The precise Firebase products used may change as the Platform
          develops. We will update our disclosures where material changes
          occur.
        </p>
      </>
    ),
  },

  {
    id: "use",
    title: "4. How We Use Information",
    content: (
      <>
        <p>
          We may use information collected through the Platform for purposes
          including:
        </p>

        <ul>
          <li>Creating and managing user accounts.</li>
          <li>Authenticating users and securing accounts.</li>
          <li>Processing and fulfilling orders.</li>
          <li>Connecting customers with participating vendors.</li>
          <li>Coordinating deliveries.</li>
          <li>Providing order tracking and status updates.</li>
          <li>Processing payments and refunds.</li>
          <li>Providing customer and vendor support.</li>
          <li>Investigating damaged, incorrect, missing, or disputed orders.</li>
          <li>Detecting and preventing fraud and abuse.</li>
          <li>Preventing unauthorized access and security incidents.</li>
          <li>Improving Platform performance and reliability.</li>
          <li>Understanding usage and improving products and services.</li>
          <li>Sending service-related communications.</li>
          <li>Sending promotional communications where permitted and appropriate.</li>
          <li>Complying with legal and regulatory obligations.</li>
          <li>Protecting the rights, safety, property, and security of users and Almighty.</li>
        </ul>
      </>
    ),
  },

  {
    id: "legal-basis",
    title: "5. Legal Basis and Consent",
    content: (
      <>
        <p>
          Depending on the applicable law and the nature of the processing,
          Almighty may process personal information based on one or more
          lawful grounds, including:
        </p>

        <ul>
          <li>Your consent.</li>
          <li>Performance of a contract or steps taken at your request.</li>
          <li>Compliance with legal or regulatory obligations.</li>
          <li>Legitimate and lawful business purposes, where applicable.</li>
          <li>Protection of users, the Platform, or other persons from fraud, abuse, or security risks.</li>
        </ul>

        <p>
          Where processing is based on consent and applicable law provides a
          right to withdraw that consent, you may withdraw it using the
          available controls or by contacting us. Withdrawal of consent may
          affect the availability of certain features.
        </p>
      </>
    ),
  },

  {
    id: "sharing",
    title: "6. How We Share Information",
    content: (
      <>
        <p>
          We do not sell your personal information to third parties for money.
          We may share information where necessary to provide services,
          complete transactions, protect users, or comply with law.
        </p>

        <h3 className="font-semibold text-xl mt-6">
          A. Vendors and Stores
        </h3>

        <p>
          When you place an order, relevant information may be shared with the
          applicable vendor or store so that it can prepare and fulfill the
          order.
        </p>

        <p>
          This may include information such as your name, order details,
          delivery information, and relevant contact information necessary for
          fulfillment.
        </p>

        <h3 className="font-semibold text-xl mt-6">
          B. Delivery Partners / Riders
        </h3>

        <p>
          Relevant information may be shared with the delivery partner
          responsible for delivering an order. This may include the customer's
          name, delivery location, order information, and contact information
          reasonably necessary to complete the delivery.
        </p>

        <h3 className="font-semibold text-xl mt-6">
          C. Service Providers
        </h3>

        <p>
          We may share information with trusted service providers that support
          our operations, such as:
        </p>

        <ul>
          <li>Cloud hosting and database providers.</li>
          <li>Payment processors.</li>
          <li>Authentication providers.</li>
          <li>Analytics and diagnostics providers.</li>
          <li>Customer support providers.</li>
          <li>Communication and notification providers.</li>
          <li>Fraud prevention and security providers.</li>
          <li>Mapping and location service providers.</li>
          <li>Professional advisers and legal or accounting service providers.</li>
        </ul>

        <h3 className="font-semibold text-xl mt-6">
          D. Legal and Safety Requirements
        </h3>

        <p>
          We may disclose information where reasonably necessary to comply
          with applicable law, legal process, governmental requests, court
          orders, regulatory requirements, or to investigate fraud, security
          incidents, or unlawful activity.
        </p>

        <h3 className="font-semibold text-xl mt-6">
          E. Business Transfers
        </h3>

        <p>
          If Almighty is involved in a merger, acquisition, restructuring,
          financing, sale of assets, or similar transaction, information may be
          transferred as part of that transaction subject to applicable law and
          appropriate safeguards.
        </p>
      </>
    ),
  },

  {
    id: "vendors-riders",
    title: "7. Information Shared During Orders",
    content: (
      <>
        <p>
          Because Almighty facilitates transactions between customers,
          vendors, and delivery partners, certain information must be shared
          to complete an order.
        </p>

        <div className="rounded-xl border bg-gray-50 p-5">
          <h3 className="font-semibold text-lg mb-3">
            Customer → Vendor
          </h3>

          <p>
            Relevant customer and order information may be provided to the
            vendor so the vendor can identify, prepare, and fulfill the order.
          </p>
        </div>

        <div className="rounded-xl border bg-gray-50 p-5">
          <h3 className="font-semibold text-lg mb-3">
            Customer → Delivery Partner
          </h3>

          <p>
            Relevant delivery information may be provided to the assigned
            delivery partner to enable successful delivery.
          </p>
        </div>

        <div className="rounded-xl border bg-gray-50 p-5">
          <h3 className="font-semibold text-lg mb-3">
            Vendor → Delivery Partner
          </h3>

          <p>
            Relevant order and pickup information may be shared with delivery
            partners to enable collection and delivery of the order.
          </p>
        </div>

        <p>
          Parties receiving information through the Platform are expected to
          use it only for legitimate purposes connected with the applicable
          transaction and in accordance with applicable law and their
          contractual obligations.
        </p>
      </>
    ),
  },

  {
    id: "communications",
    title: "8. Communications and Notifications",
    content: (
      <>
        <p>
          We may send transactional and service-related communications,
          including:
        </p>

        <ul>
          <li>OTP and authentication messages.</li>
          <li>Order confirmations.</li>
          <li>Order status updates.</li>
          <li>Delivery notifications.</li>
          <li>Payment and refund updates.</li>
          <li>Security alerts.</li>
          <li>Customer support communications.</li>
        </ul>

        <p>
          Where permitted by law, we may also send promotional communications
          about products, services, offers, or features.
        </p>

        <p>
          You may be able to control promotional communications through the
          available unsubscribe mechanism or account/device settings.
          Transactional and security-related communications may still be sent
          when necessary to provide the service or protect your account.
        </p>
      </>
    ),
  },

  {
    id: "cookies",
    title: "9. Cookies and Similar Technologies",
    content: (
      <>
        <p>
          Our website and certain Platform features may use cookies, local
          storage, SDKs, pixels, or similar technologies to provide
          functionality, remember preferences, maintain sessions, understand
          usage, improve security, and analyze performance.
        </p>

        <p>
          The specific technologies used may vary between our website and
          mobile applications.
        </p>

        <p>
          You may be able to control certain cookies through browser settings.
          Disabling required technologies may affect website functionality.
        </p>
      </>
    ),
  },

  {
    id: "location",
    title: "10. Location and Delivery Information",
    content: (
      <>
        <p>
          Location information is important to Almighty's hyperlocal delivery
          model.
        </p>

        <p>
          We may use location and address information to:
        </p>

        <ul>
          <li>Identify stores and services available in your area.</li>
          <li>Determine delivery availability.</li>
          <li>Calculate or estimate delivery routes and times.</li>
          <li>Provide delivery instructions.</li>
          <li>Enable order tracking where supported.</li>
          <li>Prevent fraud and delivery abuse.</li>
        </ul>

        <p>
          We request device location permission only where a feature requires
          it. You may manage location permissions through your device settings.
        </p>
      </>
    ),
  },

  {
    id: "security",
    title: "11. Data Security",
    content: (
      <>
        <p>
          Almighty takes reasonable technical and organizational measures
          designed to protect personal information against unauthorized
          access, alteration, disclosure, loss, misuse, or destruction.
        </p>

        <p>
          Security measures may include access controls, authentication,
          encryption where appropriate, secure infrastructure, monitoring,
          logging, and other safeguards appropriate to the nature of the
          information and processing.
        </p>

        <p>
          However, no internet transmission, electronic storage system, or
          technology can be guaranteed to be completely secure.
        </p>

        <p>
          If we become aware of a personal-data incident requiring notification
          under applicable law, we will take appropriate steps in accordance
          with our legal obligations.
        </p>
      </>
    ),
  },

  {
    id: "retention",
    title: "12. Data Retention",
    content: (
      <>
        <p>
          We retain personal information only for as long as reasonably
          necessary for the purposes described in this Privacy Policy,
          including providing services, maintaining business and transaction
          records, resolving disputes, preventing fraud, enforcing agreements,
          and complying with legal, accounting, tax, and regulatory
          requirements.
        </p>

        <p>
          Retention periods may vary depending on the type of information and
          the reason for processing.
        </p>

        <p>
          When information is no longer required, we may delete it,
          anonymize it, or securely dispose of it, subject to applicable law
          and legitimate retention requirements.
        </p>
      </>
    ),
  },

  {
    id: "deletion",
    title: "13. Account Deletion and Data Deletion",
    content: (
      <>
        <p>
          Where account creation is available, users may request deletion of
          their Almighty account and associated personal information through
          the account deletion functionality provided by the Platform or by
          contacting us.
        </p>

        <p>
          Account deletion may not result in immediate deletion of every
          record. Certain information may need to be retained where required
          by law, necessary to establish or defend legal claims, prevent fraud,
          resolve disputes, complete financial or accounting records, or
          satisfy other legitimate legal obligations.
        </p>

        <p>
          Where information is retained after an account deletion request, it
          will be retained only for the applicable purpose and period.
        </p>

        <div className="rounded-xl border bg-blue-50 border-blue-200 p-5">
          <h3 className="font-semibold text-lg">
            Deletion Requests
          </h3>

          <p className="mt-2">
            To request account or personal-data deletion, contact us at{" "}
            <a
              href="mailto:support@almightyapp.in"
              className="text-blue-600 hover:underline"
            >
              support@almightyapp.in
            </a>
            .
          </p>
        </div>
      </>
    ),
  },

  {
    id: "rights",
    title: "14. Your Privacy Rights",
    content: (
      <>
        <p>
          Depending on your location and applicable law, you may have rights
          relating to your personal information, which may include rights to:
        </p>

        <ul>
          <li>Request access to personal information.</li>
          <li>Request correction of inaccurate information.</li>
          <li>Request deletion where legally available.</li>
          <li>Withdraw consent where processing is based on consent.</li>
          <li>Raise concerns or complaints about processing.</li>
          <li>Exercise other rights available under applicable law.</li>
        </ul>

        <p>
          We may need to verify your identity before processing certain
          requests to protect your account and personal information.
        </p>

        <p>
          Some requests may be subject to legal exceptions or limitations.
        </p>
      </>
    ),
  },

  {
    id: "children",
    title: "15. Children's Privacy",
    content: (
      <>
        <p>
          Almighty's services are not intentionally directed toward children
          who are not legally permitted to independently use the applicable
          services.
        </p>

        <p>
          We do not knowingly collect personal information from children in
          violation of applicable law.
        </p>

        <p>
          If you believe that a child has provided personal information to us
          inappropriately, please contact us so that we can review and take
          appropriate action.
        </p>
      </>
    ),
  },

  {
    id: "third-party",
    title: "16. Third-Party Services",
    content: (
      <>
        <p>
          Almighty may rely on third-party services for payments, maps,
          authentication, hosting, analytics, diagnostics, notifications,
          communications, fraud prevention, customer support, and other
          functions.
        </p>

        <p>
          Third-party providers may process information according to their own
          terms and privacy policies. We encourage users to review the privacy
          practices of services they interact with.
        </p>

        <p>
          Examples of third-party technologies may include Google Firebase and
          payment, mapping, communication, hosting, or analytics providers
          integrated into the Platform.
        </p>
      </>
    ),
  },

  {
    id: "international",
    title: "17. Data Transfers and Processing",
    content: (
      <>
        <p>
          Depending on the infrastructure and service providers used by
          Almighty, personal information may be processed or stored in India
          or other jurisdictions where our service providers operate.
        </p>

        <p>
          Where applicable, we will take steps required by law to ensure that
          personal information is processed with appropriate safeguards.
        </p>
      </>
    ),
  },

  {
    id: "fraud",
    title: "18. Fraud Prevention and Security Monitoring",
    content: (
      <>
        <p>
          We may process information to detect, investigate, and prevent
          fraudulent, abusive, unauthorized, or suspicious activity.
        </p>

        <p>This may include investigating:</p>

        <ul>
          <li>Fake or fraudulent orders.</li>
          <li>Fraudulent payment activity.</li>
          <li>Abusive refund or cancellation claims.</li>
          <li>Coupon and promotional abuse.</li>
          <li>Unauthorized account access.</li>
          <li>Manipulation of ratings, reviews, or order information.</li>
          <li>Misuse involving vendors or delivery partners.</li>
        </ul>

        <p>
          Where permitted by law, appropriate account or transaction
          restrictions may be applied following such investigations.
        </p>
      </>
    ),
  },

  {
    id: "legal",
    title: "19. Legal Disclosures",
    content: (
      <>
        <p>
          We may retain or disclose personal information where reasonably
          necessary to comply with applicable laws, regulations, legal
          proceedings, court orders, governmental requests, or lawful
          enforcement requirements.
        </p>

        <p>
          We may also process or disclose information where necessary to
          protect the rights, safety, security, and property of Almighty,
          customers, vendors, delivery partners, employees, or other persons.
        </p>
      </>
    ),
  },

  {
    id: "changes",
    title: "20. Changes to this Privacy Policy",
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect
          changes in our services, technology, data practices, or applicable
          laws.
        </p>

        <p>
          The updated version will be published on this page together with the
          revised "Last Updated" date.
        </p>

        <p>
          Where required by applicable law, we will provide additional notice
          or obtain consent before material changes become effective.
        </p>
      </>
    ),
  },

  {
    id: "grievance",
    title: "21. Privacy Complaints and Grievance Contact",
    content: (
      <>
        <p>
          If you have questions, concerns, requests, or complaints regarding
          the processing of your personal information, please contact
          Almighty using the details below.
        </p>

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
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://almightyhyperlocal.in
              </a>
            </p>
          </div>
        </div>

        <p>
          Please include sufficient information in your request for us to
          understand and respond to the issue. We may request reasonable
          information to verify your identity before processing a privacy
          request.
        </p>
      </>
    ),
  },

  {
    id: "contact",
    title: "22. Contact Us",
    content: (
      <>
        <p>
          For general questions about this Privacy Policy or Almighty's
          privacy practices, you can contact us at:
        </p>

        <div className="rounded-2xl border bg-gray-50 p-6">
          <h3 className="font-bold text-xl mb-4">
            Almighty Hyperlocal Private Limited
          </h3>

          <div className="space-y-3 text-gray-700">
            <p>
              📧{" "}
              <a
                href="mailto:contact@almightyhyperlocal.in"
                className="text-blue-600 hover:underline"
              >
                contact@almightyhyperlocal.in
              </a>
            </p>

            <p>
              🌐{" "}
              <a
                href="https://almightyhyperlocal.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://almightyhyperlocal.in
              </a>
            </p>
          </div>
        </div>
      </>
    ),
  },
];

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="border-b">
        <div className="max-w-6xl mx-auto px-6 py-20">

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Privacy Policy
          </h1>

          <p className="text-lg max-w-3xl text-gray-600 leading-8">
            This Privacy Policy explains how Almighty collects, uses, shares,
            protects, and retains information when you use our food delivery
            and hyperlocal commerce platform.
          </p>

          <div className="mt-6 inline-flex items-center rounded-lg border bg-primary-bg2-color px-5 py-2 font-medium">
            Last Updated: September 2026
          </div>

        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-4 gap-12">

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 self-start">

          <div className="rounded-2xl border border-neutral-800 bg-black p-6">

            <h3 className="font-semibold mb-5 text-primary-bg2-color">
              Table of Contents
            </h3>

            <ul className="space-y-3 text-sm max-h-[70vh] overflow-y-auto pr-2">

              {sections.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-secondary-bg-color hover:text-primary-bg2-color transition"
                  >
                    {item.title}
                  </a>
                </li>
              ))}

            </ul>

          </div>

        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">

          <div className="space-y-12">

            {sections.map((section) => (
              <section
                id={section.id}
                key={section.id}
                className="border-b border-neutral-200 pb-10 scroll-mt-28"
              >

                <h2 className="text-3xl font-semibold mb-5 text-gray-900">
                  {section.title}
                </h2>

                <div className="leading-8 text-gray-700 space-y-5">

                  {React.Children.toArray(section.content)}

                </div>

              </section>
            ))}

          </div>

          {/* Footer */}
          <div className="mt-20 rounded-2xl border bg-primary-bg2-color p-8">

            <h3 className="text-2xl font-semibold mb-4">
              Your Privacy Matters
            </h3>

            <p className="leading-8 text-gray-800">
              Almighty is committed to handling personal information
              responsibly and transparently. By using the Platform, you
              acknowledge that you have read this Privacy Policy and understand
              how your information may be processed as described above.
            </p>

          </div>

        </main>

      </div>

    </div>
  );
};

export default PrivacyPolicy;