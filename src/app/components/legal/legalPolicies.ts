export interface LegalPolicy {
  id: string;
  title: string;
  badge: string;
  lastUpdated: string;
  summary: string;
  sections: { heading: string; content: string[] }[];
}

export const LEGAL_POLICIES: Record<string, LegalPolicy> = {
  privacy: {
    id: "privacy",
    title: "Privacy Policy",
    badge: "Official Legal Policy",
    lastUpdated: "September 28, 2026",
    summary:
      "This Privacy Policy applies to the Tashil Delegate mobile application and the Switch Point digital product studio web platform. We are committed to protecting your personal data, location privacy, and operational records.",
    sections: [
      {
        heading: "1. Scope & Application",
        content: [
          "This Privacy Policy applies to both the Switch Point studio website (https://sw-point.com) and the Tashil Delegate mobile application, intended for internal use by authorized corporate employees, field representatives, and delegates.",
          "Switch Point operates as a digital product engineering studio with registered offices in Alexandria, Egypt and Dubai, United Arab Emirates.",
        ],
      },
      {
        heading: "2. Information Collection and Use (Tashil Delegate App)",
        content: [
          "Location Data: The application collects precise GPS location data exclusively to verify attendance (check-in and check-out) at designated company zones and branch geofences. Location tracking operates strictly during active work shifts.",
          "Camera and Photos: The application requests access to the device camera strictly to allow delegates to scan dynamic QR codes for attendance verification and upload real-time proof-of-performance photos. Native gallery uploads are restricted to ensure audit authenticity.",
          "Personal Information: Information such as employee full name, verified phone number, mother's name (for three-factor authentication), and national employee ID are used solely for employee identification, shift scheduling, and internal HR management.",
        ],
      },
      {
        heading: "3. Website Data Collection & Analytics",
        content: [
          "When visiting https://sw-point.com, we may collect basic technical telemetry including browser type, device specifications, IP address, and anonymized user interaction analytics to improve website performance.",
          "Contact form submissions (name, email address, phone number, and project scope) are processed strictly to respond to customer inquiries, provide project estimates, and execute commercial service agreements.",
        ],
      },
      {
        heading: "4. Zero Third-Party Data Sharing",
        content: [
          "All data is stored securely in our internal Google Cloud Firestore and encrypted Firebase Storage databases.",
          "We do NOT sell, lease, rent, trade, or distribute delegate personal data, location records, or client project information to any third parties or advertisers whatsoever.",
          "Data is strictly accessible only to authorized corporate administrators and human resources personnel within the client's isolated tenant hierarchy.",
        ],
      },
      {
        heading: "5. Security & Encryption Standards",
        content: [
          "We value your trust in providing personal and business information. We implement commercial-grade AES-256 encryption at rest and TLS 1.3 encryption in transit.",
          "Role-based Firestore security rules enforce strict least-privilege boundaries, preventing unauthorized data queries between organizations or across unauthenticated devices.",
        ],
      },
      {
        heading: "6. Data Retention & User Rights",
        content: [
          "Employees and clients may request access to, correction of, or deletion of their personal records by contacting the company administration or designated HR compliance officer.",
          "Operational attendance logs are retained according to the statutory labor compliance requirements of the operating jurisdiction (Egypt or the United Arab Emirates).",
        ],
      },
      {
        heading: "7. Contact Administration & Official Offices",
        content: [
          "Website: https://sw-point.com",
          "Official Email: support@sw-point.com",
          "Egypt Office: Commercial Market, Smouha, Alexandria, Egypt · Phone: +20 121 185 7725",
          "UAE Office: Dubai, United Arab Emirates · WhatsApp: +971 55 871 5615",
        ],
      },
    ],
  },

  delivery: {
    id: "delivery",
    title: "Delivery & Fulfillment Policy",
    badge: "Digital Services & SaaS",
    lastUpdated: "September 28, 2026",
    summary:
      "Information regarding the digital delivery, provisioning timelines, and fulfillment of Switch Point digital products, engineering services, and Tashil SaaS licenses.",
    sections: [
      {
        heading: "1. Nature of Products & Digital Services",
        content: [
          "Switch Point provides bespoke software engineering, mobile application development (Flutter), web platform engineering (Angular, React, Next.js), UI/UX product design, and Enterprise SaaS licensing (Tashil Platform).",
          "All deliverables provided by Switch Point are 100% digital goods and professional services. No physical parcel shipping or physical freight handling is involved.",
        ],
      },
      {
        heading: "2. SaaS Platform Provisioning (Tashil)",
        content: [
          "Upon execution of a commercial agreement or online subscription, client tenant organizations are provisioned within 24 business hours.",
          "Administrative access credentials, supervisor login tokens, and API credentials are delivered securely via encrypted email to the client's designated administrator.",
          "Mobile application distribution is facilitated via Apple TestFlight / App Store, Google Play Store private track, or direct enterprise MDM APK distribution.",
        ],
      },
      {
        heading: "3. Custom Development & Milestone Deliverables",
        content: [
          "Custom engineering projects are executed under mutually agreed sprint milestones defined in the Master Services Agreement (MSA) and Statement of Work (SOW).",
          "Deliverables (including Figma UI design source files, GitHub repository access, staging deployments, and cloud infrastructure setup) are handed over digitally at each approved milestone checkpoint.",
        ],
      },
      {
        heading: "4. Confirmation of Delivery",
        content: [
          "Digital fulfillment is formally confirmed once the client administrator acknowledges receipt of access credentials, repository access, or staging deployment links via written email confirmation.",
        ],
      },
    ],
  },

  refund: {
    id: "refund",
    title: "Refund & Cancellation Policy",
    badge: "Consumer & Enterprise Protection",
    lastUpdated: "September 28, 2026",
    summary:
      "Clear terms governing subscription cancellations, service termination, dispute handling, and refund eligibility for Switch Point services and software licenses.",
    sections: [
      {
        heading: "1. Tashil SaaS Subscription Cancellation",
        content: [
          "Clients on monthly or annual SaaS billing plans may cancel their subscription at any time by providing written notice or submitting a cancellation request to support@sw-point.com at least 7 business days prior to the next billing cycle.",
          "Upon cancellation, access remains active through the conclusion of the paid billing period, with zero automated renewal charges applied thereafter.",
        ],
      },
      {
        heading: "2. 14-Day Money-Back Guarantee (SaaS Pilot)",
        content: [
          "For new corporate clients subscribing to the Tashil Enterprise SaaS platform, we offer an unconditional 14-day satisfaction guarantee.",
          "If the platform fails to meet operational requirements during the initial 14-day pilot onboarding, the client is entitled to a 100% refund of the initial subscription setup fee.",
        ],
      },
      {
        heading: "3. Custom Engineering & Development Projects",
        content: [
          "For custom software engineering and UI/UX design projects, billing is executed against agreed milestone deliverables.",
          "If a client decides to terminate a project before completion, fees are billed only for completed and approved sprint milestones. Any unutilized deposit balances for uncommenced sprints will be refunded in full.",
        ],
      },
      {
        heading: "4. Refund Processing Timelines",
        content: [
          "Approved refund requests are processed within 5 to 10 business days.",
          "Refunds are credited directly back to the original method of payment (bank wire transfer, credit card, or commercial merchant account) used during initial checkout.",
        ],
      },
      {
        heading: "5. Dispute Resolution & Customer Inquiries",
        content: [
          "If you have any billing questions, service discrepancies, or refund inquiries, please email our financial administration directly at support@sw-point.com or contact our Egypt office at +20 121 185 7725 / UAE office at +971 55 871 5615.",
        ],
      },
    ],
  },

  terms: {
    id: "terms",
    title: "Terms of Service",
    badge: "Contractual Agreement",
    lastUpdated: "September 28, 2026",
    summary:
      "Terms and conditions governing the use of Switch Point digital products, web platforms, and mobile enterprise applications.",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        content: [
          "By accessing the Switch Point website (https://sw-point.com) or utilizing the Tashil Delegate application, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service.",
        ],
      },
      {
        heading: "2. Intellectual Property Rights",
        content: [
          "All proprietary software, codebases, design architectures, graphics, and trademarks associated with Tashil and Switch Point remain the exclusive intellectual property of Switch Point.",
          "Custom project deliverables transferred to clients under bespoke development contracts become the client's property upon complete receipt of agreed milestone compensation.",
        ],
      },
      {
        heading: "3. Authorized Use & Code of Conduct",
        content: [
          "Users of Tashil Delegate agree not to deploy mock GPS software, reverse engineer APKs, attempt unauthorized database queries, or share credentials with unauthorized third parties.",
          "Any deliberate attempts to tamper with geolocation or server time stamps constitute grounds for immediate account suspension and corporate audit.",
        ],
      },
      {
        heading: "4. Limitation of Liability & SLA",
        content: [
          "Switch Point commits to a 99.9% platform availability SLA for enterprise cloud backends.",
          "Switch Point shall not be liable for indirect, incidental, or consequential damages resulting from third-party mobile network carrier failures or local telecommunication outages.",
        ],
      },
    ],
  },

  about: {
    id: "about",
    title: "About Switch Point",
    badge: "Company Overview",
    lastUpdated: "September 28, 2026",
    summary:
      "Switch Point is an international digital product studio specializing in UI/UX design, Flutter mobile engineering, Angular web platforms, and enterprise serverless backends.",
    sections: [
      {
        heading: "1. Who We Are",
        content: [
          "Switch Point is a premium digital product studio founded in 2022 with operational hubs in Alexandria, Egypt and Dubai, United Arab Emirates.",
          "We bridge the gap between world-class product design and robust engineering rigor, crafting mission-critical software solutions for enterprise clients across the Middle East, North Africa, and the United Kingdom.",
        ],
      },
      {
        heading: "2. Our Flagship Product: Tashil Enterprise",
        content: [
          "Tashil is our premier enterprise field workforce platform, unifying Flutter mobile apps with Angular web command centers.",
          "The platform manages over 4,800 active field delegates across hundreds of retail branches with anti-fraud geofencing, dynamic rotating QR verification, and real-time supervisory tracking.",
        ],
      },
      {
        heading: "3. Registered Corporate Locations",
        content: [
          "Egypt Office: Commercial Market, Smouha, Alexandria, Egypt · Phone: +20 121 185 7725",
          "UAE Office: Dubai, United Arab Emirates · WhatsApp: +971 55 871 5615",
          "Email: support@sw-point.com · Website: https://sw-point.com",
        ],
      },
    ],
  },
};
