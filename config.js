/* ==================================================================
   SITE SETTINGS — Sir Suhail Aziz · SAZ
   Everything personal on the site comes from this file, so edits
   (new batch, new number, timings, a new video) happen here only.
   Anything left as "" or [] is hidden on the site.
   ================================================================== */
window.SITE = {

  teacher: {
    name: "Sir Suhail Aziz",
    brand: "SAZ",
    tagline: "Good Chemistry. Brighter Futures.",
    experienceYears: 33,
    photo: "images/sir-suhail-aziz.webp",
    subjects: [
      { name: "A Level", code: "9701" },
      { name: "O Level", code: "5070" },
      { name: "IGCSE",   code: "0620" }
    ],
    bio: [
      "Sir Suhail Aziz has been teaching chemistry for 33 years. He prepares students for Cambridge A Level (9701), O Level (5070) and IGCSE (0620), in classrooms at the schools and academies listed below and live online on Zoom.",
      "His approach is the one you’ll see on every SAZ post: chemistry isn’t hard, it’s a pattern. Learn the trends, understand the logic behind each reaction, and stop memorising everything.",
      "On @chemwithsuhail he shares quick lessons, exam tips and motivation for students."
    ]
  },

  // The batch currently open for registration
  batch: { label: "May/June 2027 batch", status: "Registration open" },

  // Class formats (from his posters)
  modes: ["Physical classes", "Evening batches", "Online on Zoom"],

  // What every batch includes (from his registration poster)
  included: [
    "Exam-focused preparation",
    "Complete syllabus coverage",
    "Exclusive preparation material",
    "Comprehensive past-paper coverage",
    "Recorded lectures, available 24/7",
    "WhatsApp queries support",
    "Interactive live sessions"
  ],

  // Where he teaches — "Physical + online affiliation" (from his poster)
  affiliations: [
    { name: "Alpha College" },
    { name: "Whales College", note: "A Level" },
    { name: "Meritorious International School" },
    { name: "Beaconhouse College Programme", short: "BCP" },
    { name: "SWK North" },
    { name: "SWK Gulshan" },
    { name: "Orb-Ed", note: "Online" },
    { name: "IVY Online", note: "Online" },
    { name: "Aurora Academy" },
    { name: "Vectors Academy" }
  ],

  contact: {
    whatsapp: "923212592025",          // digits only, with country code
    phone: "+92 321 2592025",
    instagram: "chemwithsuhail",       // handle from his posters
    facebook: "chemwithsuhail",
    youtube: "https://www.youtube.com/@chemwithsuhail"
  },

  // Classes table. Leave days/time empty and the row shows "Ask for timings" (opens WhatsApp).
  classes: [
    { course: "A Level · AS", code: "9701", covers: "Topics 1–22 + practical skills · Papers 1, 2 & 3", days: "", time: "" },
    { course: "A Level · A2", code: "9701", covers: "Topics 23–37 + practical skills · Papers 4 & 5", days: "", time: "" },
    { course: "O Level",      code: "5070", covers: "Cambridge O Level Chemistry", days: "", time: "" },
    { course: "IGCSE",        code: "0620", covers: "Cambridge IGCSE Chemistry", days: "", time: "" }
  ],

  // Videos. "topic" links a video to a syllabus sub-topic on the tracker page.
  videos: [
    { src: "videos/catalyst-explainer.mp4", poster: "images/catalyst-explainer-poster.webp",
      title: "How can a catalyst make a reaction faster?", length: "0:38", topic: "8.3",
      note: "Activation energy, the alternative pathway, and what a catalyst does not change." },
    { src: "videos/chemistry-everywhere.mp4", poster: "images/chemistry-everywhere-poster.webp",
      title: "Chemistry apki zindagi mein kahan hai?", length: "0:48", topic: "",
      note: "Sir Suhail on where chemistry turns up in everyday life. In Urdu." }
  ],

  // Posts shown in the @chemwithsuhail strip
  posts: [
    { img: "images/post-its-a-pattern.webp",          alt: "SAZ post: Chemistry isn't hard. It's a pattern." },
    { img: "images/post-same-group.webp",             alt: "SAZ post: Same group, similar chemistry — group 1 alkali metals" },
    { img: "images/post-why-reactions-happen.webp",   alt: "SAZ post: Stop learning reactions by heart, start understanding why they happen" },
    { img: "images/post-build-the-bonds.webp",        alt: "SAZ post: Build the bonds that take you further — May/June 2027 batch" },
    { img: "images/post-periodically-confused.webp",  alt: "SAZ post: Periodically confused? Let's make chemistry make sense" },
    { img: "images/post-chemistry-around-you.webp",   alt: "SAZ post: Chemistry is happening around you" }
  ]
};
