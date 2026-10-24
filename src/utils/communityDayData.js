// Current Community Day page content
export const eventInfo = {
  title: "AWS Student Community Day",
  tagline:
    "From the dunes of Udaipur to the cloud — students, builders, and professionals gathering at 3rd Space, Udaipur.",
  date: "31 Oct 2026",
  time: "10:00 AM – 4:00 PM IST",
  location: "3rd Space, Arihant Nagar, Udaipur",
  venue: "Cinema Hall, Ground floor",
  city: "Udaipur, Rajasthan",
  college: "Geetanjali Institute of Technical Studies",
};

export const venueSectionData = {
  heading: {
    eyebrow: "A place to meet",
    title: "Find your place in Udaipur.",
    subtitle:
      "One day of cloud, community, and new connections—together at 3rd Space.",
  },
  name: "3rd Space, Udaipur",
  address: eventInfo.location,
  room: eventInfo.venue,
  date: eventInfo.date,
  time: eventInfo.time,
  city: eventInfo.city,
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=3rd%20Space%2C%20Arihant%20Nagar%2C%20Udaipur%2C%20India",
  photos: [
    {
      layout: "city",
      src: "/venue/v1.webp",
      alt: "Udaipur City Palace glowing above Lake Pichola at dusk",
      label: "UDAIPUR · RAJASTHAN",
      caption: "A city made for moments.",
    },
    {
      layout: "community",
      src: "/venue/v2.webp",
      alt: "Community members sharing a moment at a student event",
      label: "COMMUNITY, TOGETHER",
    },
    {
      layout: "builders",
      src: "/venue/v3.webp",
      alt: "Student builders gathered at a community event",
      label: "BUILT BY THE COMMUNITY",
    },
  ],
};

export const stats = [
  { label: "Expected attendees", value: 150, suffix: "+" },
  { label: "Speakers", value: 6, suffix: "" },
  { label: "Sessions", value: 8, suffix: "" },
  { label: "Hours of cloud", value: 6, suffix: "" },
];

export const tracks = [
  "Cloud Native / DevOps",
  "FinOps",
  "Kubernetes",
  "Student Builders",
  "Community & Career",
  "Hands-on Labs",
];

export const keynoteSpeakers = [];

export const eventSpeakers = [
  {
    name: "Aditya Pancholi",
    role: "CEO of Turf Dev Pvt Ltd",
    image: "/speakers/s1.jpeg",
    linkedin: "https://www.linkedin.com/in/pancholi-aditya/",
    topic: "Your Developers Don’t Need Kubernetes - They Need a Platform.",
  },
  {
    name: "Harsh Soni",
    role: "SDE-3 at Tide",
    image: "/speakers/s6.png",
    linkedin: "https://www.linkedin.com/in/cscipher/",
    topic: "Scaling server driven UI on apps with AWS.",
  },
  {
    name: "Ashwin Sharma",
    role: "AWS Cloud and Devops Engineer at Eternal Web Pvt Ltd",
    image: "/speakers/s2.jpeg",
    linkedin: "https://www.linkedin.com/in/iamashwins/",
    topic: "Costly AWS Mistakes: A FinOps Survival Guide for Engineers.",
  },
  {
    name: "Hardik maheshwari",
    role: "Cloud & Infrastructure Engineer at Dhinex",
    image: "/speakers/s3.jpeg",
    linkedin: "https://www.linkedin.com/in/hardikmaheshwarii/",
    topic:
      "Ingress is not your Network Architecture : The rise of gateway api And AWS VPC Lattice.",
  },
  {
    name: "Lakhan Dadhich",
    role: "Devops Engineer at Dhinex",
    image: "/speakers/s4.webp",
    linkedin: "https://www.linkedin.com/in/lakhan-dadhich-77a801230/",
    topic:
      "Ingress is not your Network Architecture : The rise of gateway api And AWS VPC Lattice.",
  },
  {
    name: "Abhishek Joshi",
    role: "DevOps Engineer at ScaleCapacity",
    image: "/speakers/s5.png",
    linkedin: "https://www.linkedin.com/in/abhishek-joshi-160b3b228/",
    topic: "Access Denied: Who Decides What Your AI Agent Can Do on AWS?",
  },
];

export const schedule = [
  {
    time: "10:00 – 10:15",
    title: "Welcome Note",
    desc: "Opening by AWS Student Builder Club, GITS.",
    type: "talk",
  },
  {
    time: "10:15 – 11:15",
    title: "Keynote",
    desc: "The student path into cloud, community, and real-world AWS.",
    type: "talk",
  },
  {
    time: "11:15 – 11:35",
    title: "Technical Talks + Quiz Round 1",
    desc: "Architecture, IAM, and building on AWS.",
    type: "quiz",
  },
  {
    time: "11:40 – 12:15",
    title: "Panel: Campus to Cloud",
    desc: "Mentors and builders on careers, certifications, and first jobs.",
    type: "panel",
  },
  {
    time: "12:20 – 13:00",
    title: "DevOps & AI Track",
    desc: "From pipelines to Bedrock — practical sessions.",
    type: "talk",
  },
  {
    time: "13:00 – 14:00",
    title: "Lunch & Networking",
    desc: "Meet speakers, sponsors, and fellow builders.",
    type: "break",
  },
  {
    time: "14:00 – 15:10",
    title: "Labs & Architecture",
    desc: "Hands-on labs and cost-aware design.",
    type: "talk",
  },
  {
    time: "15:15 – 15:50",
    title: "Closing Panel",
    desc: "Engineering in the age of AI, from Udaipur outward.",
    type: "panel",
  },
  {
    time: "15:50 – 16:00",
    title: "Closing Ceremony",
    desc: "Awards, contest winners, swag, and group photo.",
    type: "ceremony",
  },
];

export const sponsors = {
  platinum: [{ name: "AWS" }],
  gold: [{ name: "Sponsor TBA" }],
  community: [
    { name: "AWS Student Builder Club, GITS" },
    // { name: "Geetanjali Institute of Technical Studies" },
    { name: "Community Partner TBA" },
    { name: "Community Partner TBA" },
  ],
};

export const coreTeam = [
  {
    name: "Manish Sahu",
    role: "Leader, SBG",
    image: "/team/t1.jpeg",
    linkedin: "https://www.linkedin.com/in/manish-sahu99/",
  },
  {
    name: "Mahak Rahi",
    role: "Leader, SBG",
    image: "team/t4.jpeg",
    linkedin: "https://www.linkedin.com/in/mahak-rahi/",
  },
  {
    name: "Bhavesh Suthar",
    role: "Tech Lead",
    image: "/team/t3.webp",
    linkedin: "https://www.linkedin.com/in/bhavesh-suthar-048587332/",
  },
  {
    name: "Sohail Ansari",
    role: "Tech Lead",
    image: "/team/t2.jpeg",
    linkedin: "https://www.linkedin.com/in/sohailansari163/",
  },

  {
    name: "Daksh Soni",
    role: "Non Tech Lead",
    image: "team/t5.jpeg",
    linkedin: "https://www.linkedin.com/in/daksh-soni-2945a4328/",
  },
  {
    name: "Gunjal Gupta",
    role: "Non Tech Lead",
    image: "team/t6.jpeg",
    linkedin: "https://www.linkedin.com/in/gunjal-gupta-a4028825b/",
  },
  {
    name: "Chanchal Mali",
    role: "Non Tech Lead",
    image: "team/t7.jpeg",
    linkedin: "https://www.linkedin.com/in/chanchal-mali-23221a329/",
  },
];

export const faqs = [
  {
    q: "Who can attend AWS Student Community Day at 3rd Space Udaipur?",
    a: "Students from GITS and other colleges, plus early-career builders interested in AWS, cloud, and community. Registration is required.",
  },
  {
    q: "Where is the venue and how do I reach it?",
    a: "The Event is at 3rd Space Shyam Nagar, Pulla Bhuwana, Arihant Nagar, Pahada, Bhuwana, Rajasthan (313001) in Cinema Hall at Ground Floor, Personal Vehicles or Public Transport from Pratap Nagar.",
  },
  {
    q: "Is this a paid event?",
    a: "No the Event will be completely free just register yourself.",
  },
  {
    q: "Will I get a certificate or swag?",
    a: "Attendees who check in receive a participation certificate. Swag, credits, and contest prizes are limited and announced during the closing ceremony.",
  },
  {
    q: "Who organizes this?",
    a: "AWS Student Builder Group at Geetanjali Institute of Technical Studies, with support from mentors, volunteers, and community partners.",
  },
  {
    q: "How do I ask something else?",
    a: "Use the Contact section on the club site or write to the club email. We typically reply within a couple of days.",
  },
];

// event
export const eventData = {
  name: "AWS Community Day",
  edition: "Udaipur '26",
  year: "2026",
  date: "February 28, 2026",
  dateFormatted: "FEB 28, 2026",
  day: "Saturday",
  venue: {
    name: "Geetanjali Institute of Technical Studies",
    shortName: "GITS, Udaipur",
    address: "Airport Road, Dabok, Udaipur, Rajasthan 313022",
    city: "Udaipur",
    state: "Rajasthan",
    country: "India",
    coordinates: "24.6174° N, 73.8824° E",
    mapUrl:
      "https://maps.google.com/?q=Geetanjali+Institute+of+Technical+Studies+Udaipur",
  },
  tagline: "WHERE CLOUD MEETS COMMUNITY.",
  subHeadline: "SAME CITY • NEW PERSPECTIVES • BIGGER IDEAS",
  cfpUrl: "https://sessionize.com/aws-community-day-udaipur-2026",
  stats: [
    { value: "1,200+", label: "Cloud Builders & Architects" },
    { value: "24+", label: "Technical Deep Dives" },
    { value: "3", label: "Parallel Tracks" },
    { value: "100%", label: "Community Driven" },
  ],
  socials: {
    twitter: "https://x.com/awsugudaipur",
    linkedin: "https://linkedin.com/company/aws-user-group-udaipur",
    discord: "https://discord.gg/awsugindia",
    github: "https://github.com/aws-community-udaipur",
  },
};

// schedule
export const scheduleData = [
  {
    time: "08:30 — 09:30",
    slot: "CHECK-IN",
    title: "Registration, Morning Brew & Community Assembly",
    speaker: "Community Organizers",
    track: "Main Foyer",
    description:
      "Badge pickup, welcome swag distribution, and morning coffee with fellow cloud builders against the backdrop of the Aravalli hills.",
  },
  {
    time: "09:30 — 10:30",
    slot: "KEYNOTE",
    title:
      "The Cloud Frontier: From Serverless Primitives to Autonomous Intelligence",
    speaker: "AWS Leadership & Community Heroes",
    track: "Auditorium Prime",
    description:
      "Opening visionary keynote exploring the convergence of hyper-scale cloud infrastructure, custom silicon, and generative reasoning agents.",
  },
  {
    time: "10:45 — 11:45",
    slot: "DEEP DIVE 01",
    title: "Architecting Resilient Foundation Models at Hyper-Scale",
    speaker: "Dr. Aisha Sharma",
    track: "Track A — AI & Data",
    description:
      "Scaling distributed inference clusters, optimizing memory footprints, and structuring high-throughput Bedrock pipelines.",
  },
  {
    time: "11:45 — 12:45",
    slot: "DEEP DIVE 02",
    title: "Zero-Latency Event-Driven Topologies on AWS",
    speaker: "Vikramaditya Rathore",
    track: "Track B — Cloud Architecture",
    description:
      "Deep dive into EventBridge, Kinesis, and Lambda internals for mission-critical, ultra-low latency transaction pipelines.",
  },
  {
    time: "12:45 — 14:00",
    slot: "LUNCH & EXPO",
    title: "Rajasthani Culinary Experience & Sponsor Tech Pavilion",
    speaker: "GITS Dining Lawn",
    track: "Networking Arena",
    description:
      "Authentic Mewari lunch, live architecture review clinics, sponsor booths, and unstructured community connection.",
  },
  {
    time: "14:00 — 15:00",
    slot: "DEEP DIVE 03",
    title: "Sovereign Cloud, Graviton4 & Next-Gen Edge Compute",
    speaker: "Elena Rostova",
    track: "Track A — Systems & Silicon",
    description:
      "Unlocking up to 40% price-performance advantages using Graviton4 architectures and localized edge points of presence.",
  },
  {
    time: "15:15 — 16:30",
    slot: "WORKSHOPS",
    title:
      "Hands-on Jam: Building Autonomous AI Agents with LangGraph & Bedrock",
    speaker: "Interactive Lab Mentors",
    track: "Lab 1 & Lab 2",
    description:
      "Bring your laptop: live coding session deploying self-correcting agents with sandbox tool-calling on AWS infrastructure.",
  },
  {
    time: "16:45 — 17:45",
    slot: "PANEL & CLOSING",
    title: "The Future of Cloud Engineering in Bharat & Community Awards",
    speaker: "All Speakers & Organizers",
    track: "Auditorium Prime",
    description:
      "Community panel discussion, lightning demos, volunteer appreciation, and closing celebratory announcements.",
  },
];

// sponsors
export const sponsorsData = [
  {
    tier: "TITLE SPONSOR",
    sponsors: [
      {
        name: "Amazon Web Services",
        tagline: "Cloud Computing Services",
        category: "Cloud Leader",
        logoType: "aws",
        url: "https://aws.amazon.com",
      },
    ],
  },
  {
    tier: "ACADEMIC & VENUE PARTNER",
    sponsors: [
      {
        name: "Geetanjali Institute of Technical Studies",
        tagline: "Excellence in Engineering & Research",
        category: "Venue Host",
        logoType: "gits",
        url: "https://www.gits.ac.in",
      },
    ],
  },
  {
    tier: "PLATINUM PARTNERS",
    sponsors: [
      {
        name: "MongoDB",
        tagline: "The Developer Data Platform",
        category: "Database & Cloud Data",
        logoType: "mongodb",
        url: "https://www.mongodb.com",
      },
      {
        name: "GitHub",
        tagline: "Where the world builds software",
        category: "Developer Platform",
        logoType: "github",
        url: "https://github.com",
      },
      {
        name: "Cloudflare",
        tagline: "Connecting and protecting digital infrastructure",
        category: "Global Network & Security",
        logoType: "cloudflare",
        url: "https://cloudflare.com",
      },
    ],
  },
  {
    tier: "COMMUNITY & ECOSYSTEM PARTNERS",
    sponsors: [
      {
        name: "KonfHub",
        tagline: "Official Ticketing Partner",
        category: "Ticketing & Experience",
        logoType: "konfhub",
        url: "https://konfhub.com",
      },
      {
        name: "AWS User Group India",
        tagline: "National Cloud Builder Community",
        category: "Community Network",
        logoType: "awsug",
        url: "https://aws.amazon.com/developer/community/usergroups/",
      },
      {
        name: "Docker",
        tagline: "Accelerating containerized workflows",
        category: "DevOps Tooling",
        logoType: "docker",
        url: "https://docker.com",
      },
    ],
  },
];

// team
// AWS Community Day Udaipur '26 — Core Team Members Data
// Exactly 7 Core Team Members across 2 editorial marquee rows: 4 in the top row and 3 in the bottom row.

// volunteers
// AWS Community Day Udaipur '26 — Volunteers Data
// Exactly 12 Community Volunteers across 3 moving community wall rows

export const volunteersRow1 = [
  {
    id: "vol-01",
    name: "Vipin Pancholi",
    role: "Stage Operations",
    track: "Main Auditorium",
    image: "/volunteers/v2.jpeg",
  },
  {
    id: "vol-02",
    name: "Aman Nahar",
    role: "Registration Desk",
    track: "Welcome Hub",
    image: "/volunteers/v1.jpeg",
  },
  {
    id: "vol-03",
    name: "Raghav Shukla",
    role: "Speaker Concierge",
    track: "VIP Lounge",
    image: "/volunteers/v3.jpeg",
  },
  {
    id: "vol-04",
    name: "Divya Mehta",
    role: "Event Host",
    track: "AWS Workshops",
    image: "/volunteers/v4.webp",
  },
  {
    id: "vol-05",
    name: "Yukta Sukheja",
    role: "Event Host",
    track: "AWS Workshops",
    image: "/volunteers/v5.jpeg",
  },
  {
    id: "vol-06",
    name: "Parth Purbia",
    role: "Logistics & Quiz",
    track: "AWS Workshops",
    image: "/volunteers/v6.jpeg",
  },
  {
    id: "vol-07",
    name: "Rohit Suthar",
    role: "Logistics & Quiz",
    track: "AWS Workshops",
    image: "/volunteers/v7.webp",
  },
  {
    id: "vol-08",
    name: "Manish Sen",
    role: "Registration Desk",
    track: "AWS Workshops",
    image: "/volunteers/v8.jpeg",
  },
];

export const volunteersRow2 = [
  {
    id: "vol-01",
    name: "Vipin Pancholi",
    role: "Stage Operations",
    track: "Main Auditorium",
    image: "/volunteers/v2.jpeg",
  },
  {
    id: "vol-02",
    name: "Aman Nahar",
    role: "Registration Desk",
    track: "Welcome Hub",
    image: "/volunteers/v1.jpeg",
  },
  {
    id: "vol-03",
    name: "Raghav Shukla",
    role: "Speaker Concierge",
    track: "VIP Lounge",
    image: "/volunteers/v3.jpeg",
  },
  {
    id: "vol-04",
    name: "Divya Mehta",
    role: "Event Host",
    track: "AWS Workshops",
    image: "/volunteers/v4.webp",
  },
  {
    id: "vol-05",
    name: "Yukta Sukheja",
    role: "Event Host",
    track: "AWS Workshops",
    image: "/volunteers/v5.jpeg",
  },
  {
    id: "vol-06",
    name: "Parth Purbia",
    role: "Logistics & Quiz",
    track: "AWS Workshops",
    image: "/volunteers/v6.jpeg",
  },
  {
    id: "vol-07",
    name: "Rohit Suthar",
    role: "Logistics & Quiz",
    track: "AWS Workshops",
    image: "/volunteers/v7.webp",
  },
  {
    id: "vol-08",
    name: "Manish Sen",
    role: "Registration Desk",
    track: "AWS Workshops",
    image: "/volunteers/v8.jpeg",
  },
];

export const volunteersRow3 = [
  {
    id: "vol-01",
    name: "Vipin Pancholi",
    role: "Stage Operations",
    track: "Main Auditorium",
    image: "/volunteers/v2.jpeg",
  },
  {
    id: "vol-02",
    name: "Aman Nahar",
    role: "Registration Desk",
    track: "Welcome Hub",
    image: "/volunteers/v1.jpeg",
  },
  {
    id: "vol-03",
    name: "Raghav Shukla",
    role: "Speaker Concierge",
    track: "VIP Lounge",
    image: "/volunteers/v3.jpeg",
  },
  {
    id: "vol-04",
    name: "Divya Mehta",
    role: "Event Host",
    track: "AWS Workshops",
    image: "/volunteers/v4.webp",
  },
  {
    id: "vol-05",
    name: "Yukta Sukheja",
    role: "Event Host",
    track: "AWS Workshops",
    image: "/volunteers/v5.jpeg",
  },
  {
    id: "vol-06",
    name: "Parth Purbia",
    role: "Logistics & Quiz",
    track: "AWS Workshops",
    image: "/volunteers/v6.jpeg",
  },
  {
    id: "vol-07",
    name: "Rohit Suthar",
    role: "Logistics & Quiz",
    track: "AWS Workshops",
    image: "/volunteers/v7.webp",
  },
  {
    id: "vol-08",
    name: "Manish Sen",
    role: "Registeration Desk",
    track: "AWS Workshops",
    image: "/volunteers/v8.jpeg",
  },
];
