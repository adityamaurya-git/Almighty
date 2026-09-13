import React from "react";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: (
      <>
        <p>
          These Terms and Conditions ("Terms") govern your access to and use of
          the Almighty website, mobile application, and related services
          (collectively, the "Platform") operated by{" "}
          <strong>Almighty Hyperlocal Private Limited</strong> ("Almighty",
          "we", "our", or "us").
        </p>

        <p>
          By accessing, registering on, or using the Platform, placing an
          order, registering as a vendor, or otherwise using any service
          provided by Almighty, you acknowledge that you have read, understood,
          and agreed to these Terms.
        </p>

        <p>
          If you do not agree with these Terms, you must not access or use the
          Platform.
        </p>

        <p>
          These Terms should be read together with our Privacy Policy and
          Refund & Cancellation Policy, which form part of the terms governing
          your use of the Platform.
        </p>
      </>
    ),
  },

  {
    id: "about",
    title: "2. About Almighty",
    content: (
      <>
        <p>
          Almighty is a hyperlocal commerce and technology platform that
          connects customers with participating local stores, restaurants,
          pharmacies, retailers, and other eligible businesses for the
          purchase and delivery of food, groceries, medicines, electronics,
          household products, and other everyday goods, depending on
          availability in the customer's location.
        </p>

        <p>
          Almighty primarily provides the technology and coordination layer
          through which customers may discover products, place orders, make
          payments, receive order updates, and coordinate delivery.
        </p>

        <p>
          Products and services available through the Platform may be provided
          by independent third-party vendors or stores. Accordingly, the
          availability, quality, description, preparation, packaging, and
          fulfillment of a product may be the responsibility of the applicable
          vendor, subject to applicable law and Almighty's platform policies.
        </p>
      </>
    ),
  },

  {
    id: "platform-role",
    title: "3. Nature and Role of the Platform",
    content: (
      <>
        <p>
          Almighty operates as a technology-enabled platform facilitating
          interactions and transactions between customers and participating
          vendors and, where applicable, delivery partners.
        </p>

        <p>
          Unless expressly stated otherwise for a particular product or
          service, Almighty does not manufacture, prepare, produce, or own the
          products listed by third-party vendors.
        </p>

        <p>
          Vendor-provided products remain subject to the vendor's applicable
          licenses, registrations, quality standards, and legal obligations.
        </p>

        <p>
          Almighty may facilitate ordering, payment processing, customer
          support, order tracking, refunds, and delivery coordination, but the
          precise role of Almighty may vary depending on the product,
          location, vendor, and service available at the time of the order.
        </p>
      </>
    ),
  },

  {
    id: "eligibility",
    title: "4. Eligibility",
    content: (
      <>
        <p>
          You must be legally capable of entering into a binding agreement
          under applicable law to use the Platform.
        </p>

        <p>
          Customers who are under the age required to independently enter into
          contracts under applicable law must use the Platform only with the
          involvement and supervision of a parent or legal guardian.
        </p>

        <p>
          By using the Platform, you represent that the information provided
          by you is accurate, complete, and current.
        </p>

        <p>
          Almighty reserves the right to restrict or refuse access where we
          reasonably believe that eligibility requirements have not been met.
        </p>
      </>
    ),
  },

  {
    id: "accounts",
    title: "5. User Accounts and Security",
    content: (
      <>
        <p>
          Certain features of the Platform may require you to create an
          account. You are responsible for providing accurate information and
          keeping your account information updated.
        </p>

        <p>
          You are responsible for maintaining the confidentiality of your
          login credentials, OTPs, passwords, and other authentication
          information.
        </p>

        <p>
          You must not share your account credentials or knowingly permit
          another person to misuse your account.
        </p>

        <p>
          You must promptly notify Almighty if you suspect unauthorized access,
          fraudulent activity, or misuse of your account.
        </p>

        <p>
          Almighty will not be responsible for losses arising from your failure
          to protect your account credentials or authentication information,
          except to the extent required by applicable law.
        </p>
      </>
    ),
  },

  {
    id: "customers",
    title: "6. Customer Responsibilities",
    content: (
      <>
        <p>
          Customers agree to use the Platform honestly, lawfully, and
          responsibly.
        </p>

        <p>Customers are responsible for:</p>

        <ul>
          <li>Providing accurate name and contact information.</li>
          <li>Providing a complete and accurate delivery address.</li>
          <li>Providing correct order and product information.</li>
          <li>Being available to receive the order where required.</li>
          <li>Providing accurate payment information.</li>
          <li>Checking applicable order details before confirming an order.</li>
          <li>Using the Platform only for legitimate purposes.</li>
        </ul>

        <p>
          Customers must not harass, threaten, abuse, or engage in unlawful
          conduct toward vendors, delivery partners, customer support
          personnel, or other Platform users.
        </p>
      </>
    ),
  },

  {
    id: "orders",
    title: "7. Orders and Order Acceptance",
    content: (
      <>
        <p>
          Customers may place orders for products displayed on the Platform,
          subject to product availability, applicable geographical
          restrictions, operating hours, minimum order requirements, and other
          conditions displayed at the time of purchase.
        </p>

        <p>
          Placing an order constitutes a request to purchase the selected
          products. An order may be subject to acceptance by the applicable
          vendor and/or Almighty.
        </p>

        <p>
          An order may be rejected, cancelled, or modified where appropriate
          due to reasons including product unavailability, incorrect pricing,
          store closure, technical issues, operational limitations, suspected
          fraud, or circumstances beyond reasonable control.
        </p>

        <p>
          Where an eligible prepaid order is cancelled by Almighty or the
          applicable vendor, the customer's refund will be handled in
          accordance with the Refund & Cancellation Policy.
        </p>
      </>
    ),
  },

  {
    id: "products",
    title: "8. Product Information, Availability and Pricing",
    content: (
      <>
        <p>
          Product descriptions, photographs, prices, availability, quantities,
          nutritional information, specifications, and other information may
          be provided by participating vendors or other authorized sources.
        </p>

        <p>
          Almighty takes reasonable steps to facilitate accurate information
          but does not guarantee that every listing will always be complete,
          current, or error-free.
        </p>

        <p>
          Products may become unavailable after an order is placed. Where this
          occurs, the order may be cancelled, modified, or otherwise resolved
          in accordance with the applicable circumstances and policies.
        </p>

        <p>
          Prices, taxes, delivery charges, platform or convenience fees, and
          other applicable charges will be displayed or made available before
          completion of the transaction, where reasonably practicable.
        </p>
      </>
    ),
  },

  {
    id: "vendors",
    title: "9. Vendor / Store Responsibilities",
    content: (
      <>
        <p>
          Vendors and stores using Almighty are independent businesses and are
          responsible for complying with applicable laws, regulations,
          licenses, registrations, and industry requirements relating to the
          products and services they offer.
        </p>

        <p>Vendors are responsible for:</p>

        <ul>
          <li>Providing accurate product and store information.</li>
          <li>Maintaining accurate product availability.</li>
          <li>Providing products of the required quality and condition.</li>
          <li>Preparing and packing orders appropriately.</li>
          <li>Fulfilling accepted orders within applicable preparation times.</li>
          <li>Complying with applicable food, consumer, tax, safety, and other laws.</li>
          <li>Maintaining required licenses and registrations.</li>
        </ul>

        <p>
          Vendors must not intentionally provide misleading information,
          manipulate prices, create fraudulent orders, or engage in conduct
          that compromises customers, delivery partners, or the integrity of
          the Platform.
        </p>
      </>
    ),
  },

  {
    id: "vendor-payment",
    title: "10. Vendor Fulfillment and Payment Protection",
    content: (
      <>
        <p>
          Where a vendor correctly prepares and fulfills an order in accordance
          with the customer's order, maintains applicable quality standards,
          and prepares or hands over the order within the applicable
          preparation or fulfillment time, the vendor may remain eligible for
          its applicable payment or payout where a subsequent cancellation,
          delivery failure, or non-completion occurs for reasons not
          attributable to the vendor.
        </p>

        <p>
          Almighty may review order records, timestamps, fulfillment status,
          delivery information, customer complaints, and other relevant
          information before determining the applicable vendor payout or
          adjustment.
        </p>

        <p>
          Where an order fails because of a vendor-attributable issue,
          including failure to prepare the correct order, failure to maintain
          applicable quality standards, or failure to fulfill an accepted
          order, the vendor may not be eligible for the applicable payout and
          may be subject to adjustments under the applicable vendor agreement
          or platform policies.
        </p>
      </>
    ),
  },

  {
    id: "delivery",
    title: "11. Delivery and Delivery Partners",
    content: (
      <>
        <p>
          Delivery may be performed by delivery partners engaged, coordinated,
          or otherwise made available through Almighty or its service
          partners, depending on the applicable service and location.
        </p>

        <p>
          Delivery estimates are indicative and may be affected by traffic,
          weather, order preparation time, store delays, demand, road
          conditions, technical issues, government restrictions, or other
          circumstances.
        </p>

        <p>
          Customers must provide a safe and accessible delivery location and
          reasonably cooperate with the delivery process.
        </p>

        <p>
          Where delivery cannot be completed because of an incorrect address,
          customer unavailability, inability to contact the customer, refusal
          to accept the order, or other customer-attributable circumstances,
          the customer may not be eligible for a refund.
        </p>
      </>
    ),
  },

  {
    id: "rider",
    title: "12. Delivery Partner / Rider Responsibility",
    content: (
      <>
        <p>
          Delivery partners are expected to handle orders with reasonable care
          and follow applicable delivery procedures and instructions.
        </p>

        <p>
          Where a delivery issue is attributable to a delivery partner,
          including material delay, misplaced or lost orders, delivery of the
          wrong order, delivery to the wrong customer or location, or damage
          resulting from improper handling, Almighty may investigate the
          incident.
        </p>

        <p>
          Following verification, Almighty may take appropriate action under
          the applicable delivery partner terms, including applicable
          penalties, deductions, restrictions, suspension, or other measures.
        </p>

        <p>
          Any customer refund or replacement resulting from a verified
          delivery issue is separate from any action taken against the
          delivery partner.
        </p>
      </>
    ),
  },

  {
    id: "cancellation",
    title: "13. Customer Cancellation",
    content: (
      <>
        <div className="rounded-xl border bg-gray-50 p-5">
          <h3 className="font-semibold text-lg mb-2">
            Before Vendor Acceptance
          </h3>

          <p>
            Customers may generally cancel an order before the vendor has
            accepted and started processing it. Eligible prepaid amounts will
            be handled in accordance with the Refund & Cancellation Policy.
          </p>
        </div>

        <div className="rounded-xl border bg-red-50 border-red-200 p-5">
          <h3 className="font-semibold text-lg mb-2">
            After Vendor Acceptance
          </h3>

          <p>
            Once a vendor has accepted an order and started preparing,
            processing, packing, or fulfilling it, customer cancellation will
            generally not be permitted and{" "}
            <strong>no refund will ordinarily be provided for such
            cancellation</strong>.
          </p>

          <p className="mt-3">
            Exceptions may apply where the order is subsequently verified to
            have a material issue, including damage, incorrect products,
            missing items, or another circumstance for which a refund or other
            remedy is required under applicable law or Almighty's policies.
          </p>
        </div>
      </>
    ),
  },

  {
    id: "refunds",
    title: "14. Refunds, Replacements and Order Issues",
    content: (
      <>
        <p>
          Refunds, replacements, and other order-related resolutions are
          governed by Almighty's Refund & Cancellation Policy.
        </p>

        <p>
          Customers may report an order that is damaged, incorrect,
          materially different from the order placed, or missing items.
        </p>

        <p>
          Almighty may conduct a verification check before approving a refund,
          replacement, credit, or other resolution.
        </p>

        <p>
          Customers may be required to provide photographs, videos, order
          details, delivery information, or other evidence reasonably necessary
          to verify the complaint.
        </p>

        <p>
          Where an issue is verified, Almighty may provide an eligible refund,
          replacement, credit, partial refund, or other appropriate resolution
          depending on the circumstances.
        </p>

        <p>
          Refund processing times may depend on the payment provider, bank,
          card network, UPI provider, or other payment service.
        </p>
      </>
    ),
  },

  {
    id: "payments",
    title: "15. Payments, Taxes and Fees",
    content: (
      <>
        <p>
          Customers may be offered payment methods such as UPI, cards, net
          banking, wallets, cash on delivery, or other payment methods made
          available on the Platform.
        </p>

        <p>
          The payment methods available may vary based on location, order
          value, product category, vendor, and other operational factors.
        </p>

        <p>
          Customers agree to provide valid payment information and authorize
          applicable charges associated with confirmed orders.
        </p>

        <p>
          Depending on the transaction, applicable charges may include product
          prices, taxes, delivery fees, platform or convenience fees, service
          fees, surge or demand-related charges, or other clearly disclosed
          charges.
        </p>

        <p>
          Payments may be processed by third-party payment service providers.
          Almighty does not store or control payment credentials except as
          permitted by applicable law and the relevant payment provider's
          systems and policies.
        </p>

        <p>
          In the event of a failed, reversed, duplicated, or incorrectly
          processed payment, the transaction may be investigated and resolved
          in accordance with applicable payment-provider procedures and
          Almighty's policies.
        </p>
      </>
    ),
  },

  {
    id: "cod",
    title: "16. Cash on Delivery",
    content: (
      <>
        <p>
          Cash on Delivery ("COD") may be available for eligible orders,
          locations, vendors, and product categories.
        </p>

        <p>
          COD availability is not guaranteed for every order.
        </p>

        <p>
          Customers must pay the applicable order amount when the order is
          delivered where COD is selected.
        </p>

        <p>
          Unpaid cancelled COD orders do not ordinarily qualify for a refund
          because no payment has been made. Any amount incorrectly collected
          will be reviewed following verification.
        </p>
      </>
    ),
  },

  {
    id: "promotions",
    title: "17. Promotions, Coupons and Credits",
    content: (
      <>
        <p>
          Almighty may offer promotional codes, discounts, cashback, credits,
          referral benefits, loyalty benefits, or other promotional offers.
        </p>

        <p>
          Each promotion may have separate eligibility requirements,
          expiration dates, usage limits, minimum order values, product or
          location restrictions, and other conditions.
        </p>

        <p>
          Promotions may not be combined unless expressly permitted.
        </p>

        <p>
          Almighty may cancel or withdraw promotional benefits where fraud,
          misuse, technical errors, manipulation, or violation of promotional
          conditions is identified.
        </p>
      </>
    ),
  },

  {
    id: "prohibited",
    title: "18. Prohibited Activities and Fraud Prevention",
    content: (
      <>
        <p>You must not use the Platform to:</p>

        <ul>
          <li>Create fake, fraudulent, or unauthorized orders.</li>
          <li>Submit false refund or damage claims.</li>
          <li>Abuse coupons, cashback, referral programs, or promotional offers.</li>
          <li>Attempt unauthorized access to accounts or systems.</li>
          <li>Introduce malware, viruses, or harmful code.</li>
          <li>Interfere with the operation or security of the Platform.</li>
          <li>Scrape, copy, or systematically extract Platform data without authorization.</li>
          <li>Impersonate another person or business.</li>
          <li>Use another person's payment method without authorization.</li>
          <li>Harass, threaten, or abuse vendors, riders, employees, or users.</li>
          <li>Use the Platform for unlawful activities.</li>
          <li>Attempt to manipulate ratings, reviews, order status, or delivery records.</li>
        </ul>

        <p>
          Almighty may investigate suspected abuse and may suspend accounts,
          cancel transactions, restrict benefits, refuse refunds, or take other
          appropriate action where misuse is identified, subject to applicable
          law.
        </p>
      </>
    ),
  },

  {
    id: "age-restricted",
    title: "19. Age-Restricted and Regulated Products",
    content: (
      <>
        <p>
          Certain products may be subject to age, identity, prescription,
          licensing, or other legal restrictions.
        </p>

        <p>
          Where applicable, customers may be required to provide valid
          identification, age verification, prescriptions, or other documents
          before an order can be fulfilled or delivered.
        </p>

        <p>
          Almighty and participating vendors may refuse or cancel an order
          where the applicable legal requirements cannot be satisfied.
        </p>

        <p>
          Customers must not attempt to purchase or receive regulated products
          in violation of applicable law.
        </p>
      </>
    ),
  },

  {
    id: "food",
    title: "20. Food, Grocery and Product Quality",
    content: (
      <>
        <p>
          Food and other perishable products may have characteristics that vary
          due to preparation methods, ingredients, availability, seasonality,
          storage conditions, or other factors.
        </p>

        <p>
          Vendors are responsible for complying with applicable food safety,
          hygiene, packaging, labeling, storage, and quality requirements for
          the products they provide.
        </p>

        <p>
          Customers with food allergies or specific dietary requirements should
          review available product information and, where appropriate, contact
          the vendor before ordering.
        </p>

        <p>
          Product images are illustrative unless expressly stated otherwise.
          Minor differences in appearance, packaging, size, or presentation do
          not necessarily constitute a defective or incorrect product.
        </p>
      </>
    ),
  },

  {
    id: "reviews",
    title: "21. Ratings, Reviews and User Content",
    content: (
      <>
        <p>
          Customers may be permitted to submit ratings, reviews, photographs,
          comments, or other content relating to their experience.
        </p>

        <p>
          You must ensure that submitted content is truthful, relevant, lawful,
          and does not infringe the rights of another person or business.
        </p>

        <p>
          You must not submit defamatory, abusive, fraudulent, misleading,
          obscene, discriminatory, or unlawful content.
        </p>

        <p>
          Almighty may moderate, remove, restrict, or decline to publish
          content that violates applicable law or our policies.
        </p>
      </>
    ),
  },

  {
    id: "intellectual",
    title: "22. Intellectual Property",
    content: (
      <>
        <p>
          The Platform, including its software, design, user interface, logos,
          trademarks, graphics, text, photographs, videos, databases, and
          other content provided by Almighty, is owned by or licensed to
          Almighty and is protected by applicable intellectual property laws.
        </p>

        <p>
          You may use the Platform only for its intended lawful purpose.
        </p>

        <p>
          You must not copy, reproduce, modify, distribute, sell, lease,
          reverse engineer, decompile, create derivative works from, or exploit
          any part of the Platform without prior written authorization, except
          where such restriction is prohibited by applicable law.
        </p>
      </>
    ),
  },

  {
    id: "third-party",
    title: "23. Third-Party Services and Links",
    content: (
      <>
        <p>
          The Platform may integrate with or contain links to third-party
          services, payment providers, mapping services, communication
          services, or other external platforms.
        </p>

        <p>
          Third-party services may be governed by their own terms and privacy
          policies. Almighty is not responsible for third-party services to
          the extent permitted by applicable law.
        </p>
      </>
    ),
  },

  {
    id: "availability",
    title: "24. Platform Availability",
    content: (
      <>
        <p>
          Almighty aims to keep the Platform available and functioning
          reliably but does not guarantee uninterrupted, error-free, secure, or
          continuously available access.
        </p>

        <p>
          The Platform may occasionally be unavailable due to maintenance,
          upgrades, technical problems, network failures, security incidents,
          third-party failures, or other circumstances.
        </p>
      </>
    ),
  },

  {
    id: "force",
    title: "25. Force Majeure",
    content: (
      <>
        <p>
          Almighty will not be responsible for delay, interruption, failure, or
          cancellation caused by circumstances beyond our reasonable control,
          including natural disasters, severe weather, epidemics or public
          emergencies, government restrictions, civil unrest, transportation
          disruptions, strikes, utility failures, telecommunications failures,
          cyber incidents, or other events of force majeure.
        </p>
      </>
    ),
  },

  {
    id: "disclaimer",
    title: "26. Disclaimer",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, the Platform and
          its services are provided on an "as available" and "as is" basis.
        </p>

        <p>
          Almighty does not guarantee that the Platform or every product
          listing will always be accurate, uninterrupted, timely, complete, or
          free from errors.
        </p>

        <p>
          Nothing in these Terms excludes any consumer rights, statutory
          warranties, or protections that cannot lawfully be excluded under
          applicable law.
        </p>
      </>
    ),
  },

  {
    id: "liability",
    title: "27. Limitation of Liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, Almighty will not
          be liable for indirect, incidental, special, punitive, exemplary, or
          consequential losses arising from your use of the Platform.
        </p>

        <p>
          This may include loss of profits, business interruption, loss of
          data, or other indirect losses, except where liability cannot
          lawfully be excluded or limited.
        </p>

        <p>
          Nothing in these Terms limits liability for matters that cannot be
          limited or excluded under applicable law.
        </p>
      </>
    ),
  },

  {
    id: "indemnification",
    title: "28. Indemnification",
    content: (
      <>
        <p>
          To the extent permitted by applicable law, you agree to indemnify and
          hold harmless Almighty, its officers, directors, employees,
          representatives, and authorized service providers from claims,
          losses, liabilities, damages, costs, or expenses arising from:
        </p>

        <ul>
          <li>Your violation of these Terms.</li>
          <li>Your unlawful or fraudulent use of the Platform.</li>
          <li>Your misuse of another person's account or payment method.</li>
          <li>Your violation of applicable law or third-party rights.</li>
          <li>Your fraudulent or abusive order, refund, or promotional activity.</li>
        </ul>
      </>
    ),
  },

  {
    id: "suspension",
    title: "29. Suspension and Termination",
    content: (
      <>
        <p>
          Almighty may suspend, restrict, or terminate access to an account or
          Platform feature where reasonably necessary to protect customers,
          vendors, delivery partners, Almighty, or the integrity and security
          of the Platform.
        </p>

        <p>
          Grounds may include fraud, misuse, repeated policy violations,
          unauthorized access, unlawful activity, payment abuse, fraudulent
          refund claims, or other conduct that presents a material risk.
        </p>

        <p>
          Where required by applicable law, appropriate notice or other
          procedural safeguards will be provided.
        </p>
      </>
    ),
  },

  {
    id: "privacy",
    title: "30. Privacy and Personal Information",
    content: (
      <>
        <p>
          Almighty's collection, use, storage, disclosure, and protection of
          personal information are governed by our Privacy Policy.
        </p>

        <p>
          By using the Platform, you acknowledge that personal information may
          be processed as described in the Privacy Policy and as otherwise
          permitted or required by applicable law.
        </p>

        <p>
          Please review our Privacy Policy for details regarding the categories
          of information collected, purposes of processing, sharing,
          retention, security, and available user rights.
        </p>
      </>
    ),
  },

  {
    id: "grievance",
    title: "31. Customer Support and Grievance Redressal",
    content: (
      <>
        <p>
          Customers may contact Almighty regarding order issues, payments,
          refunds, account concerns, or other Platform-related complaints
          through the support channels made available on the Platform.
        </p>

        <p>
          Almighty will make reasonable efforts to review and resolve
          complaints in accordance with applicable law and our internal
          policies.
        </p>

        <div className="rounded-xl border bg-gray-50 p-5">
          <h3 className="font-semibold text-lg mb-3">
            Almighty Hyperlocal Private Limited
          </h3>

          <p>
            Email:{" "}
            <a
              href="mailto:contact@almightyhyperlocal.in"
              className="text-blue-600 hover:underline"
            >
              contact@almightyhyperlocal.in
            </a>
          </p>

          <p className="mt-2">
            Website:{" "}
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

        <p>
          Where applicable under Indian law, grievance-related contact details
          and procedures may also be made available through the Platform or
          relevant legal notices.
        </p>
      </>
    ),
  },

  {
    id: "disputes",
    title: "32. Governing Law and Dispute Resolution",
    content: (
      <>
        <p>
          These Terms shall be governed by and interpreted in accordance with
          the laws of India, subject to applicable mandatory consumer
          protection and other statutory rights.
        </p>

        <p>
          Almighty encourages customers, vendors, and other users to first
          contact our support team to attempt to resolve complaints or
          disputes amicably.
        </p>

        <p>
          Nothing in these Terms prevents a consumer from exercising any right
          or remedy available under applicable consumer protection law.
        </p>

        <p>
          Subject to applicable law, disputes that cannot be resolved
          amicably may be submitted to the courts or other legally competent
          forum having jurisdiction over the relevant matter.
        </p>
      </>
    ),
  },

  {
    id: "changes",
    title: "33. Changes to These Terms",
    content: (
      <>
        <p>
          Almighty may update these Terms from time to time to reflect changes
          in our services, technology, business practices, or applicable law.
        </p>

        <p>
          The updated version will be published on the Platform with the
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
    id: "severability",
    title: "34. Severability",
    content: (
      <>
        <p>
          If any provision of these Terms is determined to be invalid,
          unlawful, or unenforceable, that provision will be interpreted or
          modified to the minimum extent necessary to make it enforceable, and
          the remaining provisions will continue in full force to the extent
          permitted by law.
        </p>
      </>
    ),
  },

  {
    id: "entire",
    title: "35. Entire Agreement",
    content: (
      <>
        <p>
          These Terms, together with the Privacy Policy, Refund & Cancellation
          Policy, applicable vendor or delivery partner terms, promotional
          terms, and other policies expressly incorporated into the Platform,
          constitute the terms governing your use of the applicable Almighty
          services.
        </p>

        <p>
          Where a specific product, service, promotion, or agreement contains
          additional terms, those terms will apply to the relevant transaction
          to the extent of any inconsistency.
        </p>
      </>
    ),
  },

  {
    id: "contact",
    title: "36. Contact Information",
    content: (
      <>
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
      </>
    ),
  },
];

export const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="border-b">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Terms & Conditions
          </h1>

          <p className="text-lg max-w-3xl text-gray-600 leading-8">
            These Terms and Conditions govern your use of the Almighty
            platform, including ordering, payments, delivery, vendor services,
            customer responsibilities, and other services provided through the
            Platform.
          </p>

          <div className="mt-6 inline-flex items-center rounded-lg border bg-primary-bg2-color px-5 py-2 font-medium">
            Last Updated: September 2026
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 grid lg:grid-cols-4 gap-12">

        {/* Sidebar */}
        <aside className="lg:w-65 lg:sticky lg:top-24 self-start">
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

        {/* Content */}
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
                  {section.content}
                </div>
              </section>
            ))}

          </div>

          {/* Footer Agreement */}
          <div className="mt-20 rounded-2xl border bg-primary-bg2-color p-8">
            <h3 className="text-2xl font-semibold mb-4">
              Agreement
            </h3>

            <p className="leading-8 text-gray-800">
              By accessing or using Almighty, creating an account, placing an
              order, registering as a vendor, or otherwise using our services,
              you acknowledge that you have read, understood, and agreed to
              these Terms and Conditions, together with our Privacy Policy and
              Refund & Cancellation Policy.
            </p>
          </div>

        </main>
      </div>
    </div>
  );
};

export default TermsAndConditions;

