// Single source of truth for the "What We Do" timeline.
// Add, remove, or reorder entries here - Timeline.jsx derives every node,
// every spacing gap, and every animation purely from this array's length.
// No CSS or component code needs to change when this list grows or shrinks.

const whatWeDoEvents = [
  {
    title: "Introduction to Cloud Computing",
    description:
      "Learn the fundamentals of cloud computing, how cloud services work, and where they are used.",
    image: "whatwedo1.jpg",
    category: "Cloud Fundamentals",
  },
  {
    title: "Expert Talk on Cloud Computing",
    description:
      "Featuring Akshat S, a software engineering specialist focused on observability and DevOps, with AWS SLA and CLP certifications and previous experience at MBRDI.",
    image: "whatwedo2.jpeg",
    category: "Expert Talk",
  },
  {
    title: "AWS Free Tier Account Creation",
    description:
      "Get started with AWS by learning how to create an account and use the AWS Free Tier.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
    category: "Getting Started",
  },
  {
    title: "Static Website Hosting on AWS S3",
    description:
      "Learn the core steps for hosting a static website with Amazon S3.",
    image: "whatwedo4.jpeg",
    category: "Hands-on Lab",
  },
  {
    title: "Introduction to Serverless Computing",
    description:
      "Explore how serverless computing works and when it can be useful.",
    image: "whatwedo5.jpeg",
    category: "Cloud Concepts",
  },
];

export default whatWeDoEvents;
