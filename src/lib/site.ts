/* ============================================================
   Central site data — all REAL content for Shree Agrasen Trust
   (sourced from the scrape: Scraped_Website/13_Content)
   ============================================================ */

export const site = {
  name: "Shree Agrasen Trust",
  nameFull: "Shree Agrasen Trust, Chinchwad–Pradhikaran",
  nameMarathi: "श्री अग्रसेन ट्रस्ट, चिंचवड–प्राधिकरण",
  tagline: "Serving the Agrawal community of PCMC since 1981",
  venue: "Shree Agrasen Bhawan",
  founded: "12 October 1981",
  foundedYear: 1981,
  address: {
    line1: "Shree Agrasen Bhawan, Chinchwad-Pradhikaran",
    line2: "SN-161, Pune–Mumbai Road, Chinchwad",
    city: "Pune",
    pin: "411019",
    state: "Maharashtra, India",
    full: "Shree Agrasen Bhawan, SN-161, Pune–Mumbai Road, Chinchwad, Pune – 411019, Maharashtra",
  },
  phones: ["+91 88881 92183", "+91 95118 18049"],
  whatsapp: "918888192183", // used in wa.me link — verify/update
  email: "shreeagrasentrust@gmail.com",
  hours: "Open all days",
  hoursDetail: "Monday – Sunday · 12:00 AM to 12:00 AM · No Holiday",
  facebook: "https://www.facebook.com/shreeagrasentrust.chinchwad",
  youtube: "https://www.youtube.com/watch?v=2GqExKSwTEA",
  youtubeId: "2GqExKSwTEA",
  // Social links present on the original site. Fill real URLs when available;
  // empty strings are skipped when rendering the social row.
  twitter: "",
  linkedin: "",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120964.66028329641!2d73.69074664833363!3d18.657459699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b82bffffffff%3A0x8c61a39bb443857d!2sShri%20Agrasen%20Trust%20Chinchwad%20Pradhikaran!5e0!3m2!1sen!2sin!4v1664043248206!5m2!1sen!2sin",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Shri+Agrasen+Trust+Chinchwad+Pradhikaran",
  bank: {
    name: "The Cosmos Co-op. Bank Ltd.",
    branch: "Chinchwad",
    account: "SHREE AGRASEN TRUST",
    accountNo: "00605010183208",
    ifsc: "COSB0000006",
  },
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Committee", href: "/committee" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Halls", href: "/services#hall-booking" },
      { label: "Rooms", href: "/services#hall-booking" },
      { label: "Health Centers", href: "/services#health-services" },
      { label: "Cultural Programs", href: "/services#cultural-programs" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Membership", href: "/membership" },
  { label: "Contact", href: "/contact" },
];

export const services = [
  {
    slug: "hall-booking",
    title: "Hall & Room Booking",
    icon: "Building2",
    short:
      "Air-conditioned, sound-proof, beautifully decorated banquet hall (approx. 130 × 29 ft) for weddings, functions and community events.",
    features: [
      "Decorated sound-proof A/C hall",
      "Water supply facility",
      "Hygienic & well-maintained",
      "Rooms available for guests",
    ],
  },
  {
    slug: "health-services",
    title: "Health Services",
    icon: "HeartPulse",
    short:
      "Free medicine, blood-donation drives and medical check-ups at discounted rates for trust members — compassionate community healthcare.",
    features: [
      "Free medicine for members",
      "Regular blood-donation drives",
      "Discounted medical check-ups",
      "Preventive health awareness",
    ],
  },
  {
    slug: "cultural-programs",
    title: "Cultural Programs",
    icon: "PartyPopper",
    short:
      "Festivals, cultural gatherings and community programs that keep the traditions and unity of the Agrawal community alive.",
    features: [
      "Community festivals",
      "Cultural gatherings",
      "Youth & family programs",
      "Social & religious events",
    ],
  },
];

/* Regular cultural & community programs the trust runs every year. */
export const culturalPrograms = [
  "Agrasen Jayanti (every year)",
  "Holi Dahan & Natkhat",
  "Diwali Milan",
  "Students Motivation & Felicitation",
  "Agrasen Samaj Mahila Programs",
  "Publishing Books on Hindu Festivals & Culture",
];

/* Hall & room booking terms / description (from the original booking page). */
export const bookingTerms = [
  "130 × 29 Sq. Ft. decorated sound-proof A.C. hall",
  "Only rooms will not be given",
  "For social organisations, hall can be made available if programs are done jointly",
  "No alcohol and no non-veg allowed",
  "Lodging electricity bill ₹1000/- per day",
  "Cleaning ₹3000/- per booking charges",
  "Payment 50% advance by cheque or online booking",
  "No cancellation charges",
  "Booking can be done 90 days in advance",
  "Full payment before 8 days of the program or event",
];

/* The trust runs two service tracks — for members and for the public at large. */
export const memberServices = [
  "Cultural Programs",
  "Festival Celebrations",
  "Identity Cards",
  "Medical Facilities",
  "Scholarships",
  "Bhawan Facilities for Family Functions",
  "Entertainment Programs",
  "Career Guidance for Students",
  "Mahila Mandal Activities",
  "Agarwal Youth Wing",
  "Senior Citizens Activities",
  "Match-Making",
];

export const publicServices = [
  "Concessional / Free Medical Consultation & Dispensary",
  "Periodical Preventive Health Check-up Camps",
  "Free Cataract Surgery",
  "Palki / Warkari Medical Seva at Bhawan / Velhe",
  "Bhawan Facility at Nominal Rates for family functions",
  "Career Guidance Programs",
  "Food Services for the Needy",
  "Tree Plantations",
  "Vaccinations",
  "Meritorious Students Felicitations",
];

export const stats = [
  { value: "1981", label: "Serving since" },
  { value: "40+", label: "Years of service" },
  { value: "500+", label: "Events hosted" },
  { value: "1", label: "United community" },
];

export const founderTrustees = [
  "Shri Jaiprakash Sadhuram Gupta",
  "Shri Nathuram Gyaniram Gupta",
  "Shri Baburam Chitarmal Agarwal",
  "Shri Mamanchand Choturam Agarwal",
  "Shri Devichand Ratiram Agarwal",
  "Shri Manoharlal Ratiram Agarwal",
  "Shri Omprakash Balbhadraprasad Agarwal",
  "Shri Hukumchand Anantram Agarwal",
  "Shri Jagdishprasad Gyaniram Agarwal",
  "Shri Tilakram Gyaniram Agarwal",
  "Shri Lakhmichand Masudiram Agarwal",
];

export const pastChairmen = [
  { name: "Shri Omprakash Balbhadraprasad Agarwal", post: "Founder Chairman", year: "1981" },
  { name: "Shri Mahenderprasad Jaiprakash Gupta", post: "Chairman", year: "1991" },
  { name: "Shri Deendayal Jaikumar Agarwal", post: "Chairman", year: "1997" },
  { name: "Shri Premchand Ramsarup Mittal", post: "Chairman", year: "2006" },
  { name: "Shri Ramesh Kashmirilal Goyal", post: "Chairman", year: "2007" },
  { name: "Shri Vinod Shivnarayan Bansal", post: "Chairman", year: "2008" },
  { name: "Shri Rajkumar Maichand Gupta", post: "Chairman", year: "2009" },
  { name: "Shri Jagdishprasad Preetamchand Singhal", post: "Chairman", year: "2012" },
  { name: "Shri Ramesh Kashmirilal Goyal", post: "Chairman", year: "2014" },
  { name: "Shri Subhash Devichand Bansal", post: "Chairman", year: "2016" },
  { name: "Shri Bhimsen Chitarmal Agarwal", post: "Chairman", year: "2019" },
  { name: "Shri Sunil Rameshwar Agarwal", post: "Chairman", year: "2022" },
];

export const panchCommittee = [
  "Shri Mamanchand Choturam Agarwal",
  "Shri Pannalal Gyaniram Gupta",
  "Shri Ramdhari Surajbhan Agarwal",
  "Shri Vedprakash Maichand Gupta",
  "Shri Ramavtar Baburam Agarwal",
  "Dr. Shri Ramesh Shivnarayn Bansal",
  "Shri Krishankumar Kishorilal Goyal",
];

/* Present elected committee 2022–2025.
   Full roster (15 members) with posts and public office contact numbers,
   exactly as published on the official invitation / trust roster.
   NOTE: `img` filenames map a card to a photo in /public/images/committee.
   Members 14 & 15 have no photo yet (img: null → initials avatar). */
export type CommitteeMember = {
  name: string;
  post: string;
  phone: string | null;
  img: string | null;
};

export const committee: CommitteeMember[] = [
  { name: "Shri Sunil Rameshwar Agarwal", post: "Chairman", phone: "9850043850", img: "sunil-rameshwar-agarwal.jpg" },
  { name: "Shri Subhash Devichand Bansal", post: "Karyadhyaksh", phone: "9960074929", img: null },
  { name: "Shri Satpal Bhagatram Mittal", post: "Secretary", phone: "9822032660", img: "satpal-mittal.jpg" },
  { name: "Shri Sunil Jaikumar Agarwal", post: "Co-Secretary", phone: "9850100099", img: "sunil-jaikumar-agarwal.jpg" },
  { name: "Shri Ashok Premchand Bansal", post: "Treasurer", phone: "9822244043", img: "ashok-bansal.jpg" },
  { name: "Shri Vinod Balkishan Mittal", post: "Bhawan Adhikari", phone: "9822097543", img: "vinod-mittal.jpg" },
  { name: "Shri Joginder Jaibhagwan Mittal", post: "Bhawan Adhikari", phone: "9822001645", img: "joginder-mittal.jpg" },
  { name: "CA. Shri Krishanlal Jialal Bansal", post: "Chairman, Medical & Nav Nirman Committee", phone: "9371010904", img: "krishanlal-bansal.jpg" },
  { name: "Shri Vinod Shivnarayan Bansal", post: "Member, Medical & Nav Nirman Committee", phone: "9371092910", img: "vinod-shivnarayan-bansal.jpg" },
  { name: "Shri Gaurav Bhagwandas Agarwal", post: "Member, Cultural Committee", phone: "9823096363", img: "gaurav-agarwal.jpg" },
  { name: "Shri Dharmender Jaikumar Agarwal", post: "Member, Cultural Committee", phone: "9822950719", img: "dharmender-agarwal.jpg" },
  { name: "Shri Anand Nathuram Agarwal", post: "Member, Cultural Committee", phone: "9822552966", img: "anand-agarwal.jpg" },
  { name: "Shri Sandeep Vijendra Gupta", post: "Member, Cultural Committee", phone: "9822654487", img: "sandeep-gupta.jpg" },
  { name: "Shri Sagar Omprakash Agarwal", post: "Member, Cultural Committee", phone: "9860767943", img: null },
  { name: "Shri Jagdishprasad Preetamchand Siinghal", post: "Margdarshak", phone: "9822651310", img: null },
];

export const galleryImages = [
  "gallery-item-01.jpg","gallery-item-02.jpg","gallery-item-03.jpg",
  "gallery-item-04.jpg","gallery-item-05.jpg","gallery-item-06.jpg",
  "gallery-item-07.jpg","gallery-item-08.jpg","gallery-item-10.jpg",
  "gallery-item-11.jpg","gallery-item-12.jpg","gallery-item-13.jpg",
];

/* Sample events/notices — replace/extend as the trust publishes new ones.
   `lang: "mr"` marks Marathi content for correct font + a11y. */
export const events = [
  {
    slug: "agrasen-statue-garden",
    title: "अग्रसेन महाराज पुतळा उभारणी व उद्यान सुशोभिकरण मागणीसाठी निदर्शने",
    lang: "mr" as const,
    date: "2024-01-15",
    image: "gallery-item-04.jpg",
    excerpt:
      "भक्ती-शक्ती शेजारी अग्रसेन महाराजांचा पुतळा उभारणी व उद्यान सुशोभिकरणाच्या मागणीसाठी आगरवाल बांधवांकडून निगडी येथील टिळक पुतळ्यासमोर काळे झेंडे दाखवून निदर्शने.",
    body:
      "निगडी (प्रतिनिधी) — भक्ती-शक्ती शेजारी असलेल्या अग्रसेन महाराजांचा पुतळा आणि उद्यान सुशोभिकरण त्वरित करावे या मागणीसाठी आगरवाल बांधवांनी निगडी येथील टिळक पुतळ्यासमोर काळे झेंडे दाखवून निदर्शने केली.\n\n" +
      "माजी उपमहापौर राजू मिसाळ, शैलजा मोरे, माजी नगरसेविका शर्मिला बाबर, माजी नगरसेवक अमित गावडे, सचिन चिखले यांनी उपस्थित राहून पाठिंबा दर्शविला. श्री अग्रसेन ट्रस्ट चिंचवड प्राधिकरणचे अध्यक्ष सुनील रामेश्वर अगरवाल, पुतळा समितीचे अध्यक्ष सुनील जयकुमार आगरवाल, कार्याध्यक्ष सुभाष बन्सल, सचिव सत्पाल मित्तल, सीए के. एल. बन्सल, गौरव आगरवाल, अशोक बन्सल, वेदप्रकाश गुप्ता, वेदप्रकाश मित्तल, जोगिंदर मित्तल, आशिष गर्ग, विकास गर्ग, संदीप गुप्ता, विशाल मित्तल, धर्मेंद्र आगरवाल, तरुण मित्तल, सु. अग्रवाल, अनिल दयाराम अग्रवाल, नरेश जैन, आनंद अग्रवाल, रजनी अग्रवाल, रेणू मित्तल, लता अग्रवाल, सामाजिक कार्यकर्ते सचिन काळभोर, सुधीर आगरवाल आदी उपस्थित होते.\n\n" +
      "यावेळी ट्रस्टचे अध्यक्ष सुनील आगरवाल म्हणाले की, पालिकेने २ फेब्रुवारी २०२२ च्या बैठकीमध्ये अग्रसेन महाराजांचा पुतळ्याची उभारणी करून उद्यानाचे सुशोभीकरण करण्याचा ठराव मंजूर झालेला आहे. मात्र पालिकेने अद्याप काम सुरू केले नाही. या कामाला गती यावी यासाठी आम्ही आज पालिकेला निवेदन दिले आहे. आज आमच्या समाजाचे शहरात लाखो नागरिक आहेत. आगरवाल समाजाचे शहराच्या विकासामध्ये मोठे योगदान आहे. समाज कार्यात अग्रेसर असतो. सर्व समाजांना भूखंड दिलेत, मात्र आम्हाला अद्याप दिले नाही.\n\n" +
      "पुतळा समिती अध्यक्ष सुनील ज. अगरवाल म्हणाले की, आम्ही वेळोवेळी कर तर भरतोच, औद्योगिक व सामाजिक क्षेत्रात पुढे असतोच. तरी पालिका या पुतळ्याकडे दुर्लक्ष करीत आहे. निगडी येथील उद्यानाचा विकास करावा आणि भव्य पुतळा उभारण्यात यावा, यासाठी पालिकेने दिरंगाई करू नये, असे मत त्यांनी मांडले.",
  },
  {
    slug: "blood-donation-camp",
    title: "Blood Donation & Free Health Check-up Camp",
    lang: "en" as const,
    date: "2024-02-10",
    image: "gallery-item-06.jpg",
    excerpt:
      "The trust organized a blood-donation drive and free medical check-up camp for members and the wider community.",
    body:
      "As part of our ongoing health-services initiative, Shree Agrasen Trust organized a blood-donation drive along with free medical check-ups. Trust members received free medicine and preventive health guidance. We thank all donors and volunteers for their compassionate service.",
  },
  {
    slug: "cultural-program",
    title: "Annual Cultural Program",
    lang: "en" as const,
    date: "2024-03-20",
    image: "gallery-item-08.jpg",
    excerpt:
      "A vibrant evening of culture, tradition and community togetherness at Shree Agrasen Bhawan.",
    body:
      "Families from across the Agrawal community gathered at Shree Agrasen Bhawan for our annual cultural program — an evening filled with performances, tradition and unity that celebrates our shared heritage.",
  },
];

/* Historical event invitation posters (Agrasen Jayanti Samaroh, etc.).
   Drop full-size images in /public/images/events and add newest-first entries. */
export type EventPoster = { title: string; year: string; image: string };
export const eventPosters: EventPoster[] = [];

export const eventTypes = [
  "Wedding",
  "Engagement / Ring Ceremony",
  "Reception",
  "Birthday / Anniversary",
  "Religious Function",
  "Community / Cultural Event",
  "Corporate / Meeting",
  "Other",
];

export const venues = ["Main Banquet Hall (A/C)", "Room(s) only", "Hall + Rooms"];

/* Property type & member type dropdowns for the booking enquiry form. */
export const propertyTypes = ["Banquet Hall (A/C)", "Room / Lodging", "Hall + Rooms"];
export const memberTypes = ["Trust Member", "Non-Member", "Guest / Outsider"];
