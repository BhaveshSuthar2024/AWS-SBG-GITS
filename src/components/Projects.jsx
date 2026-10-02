import React, { useState } from 'react';
import { ExternalLink, BookOpen, Layers } from 'lucide-react';

const Github = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
import './Projects.css';

// Rich project data including full case study details
export const PROJECTS_DATA = [
  {
    id: 'ecommerce-backend',
    title: 'Cloud-Native E-Commerce Backend',
    description: 'A high-availability, microservices-based e-commerce backend built with Node.js and deployed on AWS ECS Fargate using private subnets.',
    categories: ['Backend', 'Cloud', 'AWS', 'DevOps'],
    tags: ['Node.js', 'Express', 'ECS Fargate', 'VPC', 'PostgreSQL', 'Redis', 'SQS'],
    github: 'https://github.com/bhaveshsuthar/cloud-ecommerce-backend',
    demo: 'https://api.bhaveshsuthar.dev/health',
    // Case study details
    caseStudy: {
      overview: 'This project is a production-grade, highly available e-commerce API. It is designed to handle thousands of concurrent checkout operations while keeping the database private and secure.',
      problem: 'Traditional monolithic backends suffer from single-point-of-failures, slow scaling, and security vulnerabilities due to exposing database instances directly to the internet.',
      solution: 'Architected a microservices solution inside a custom AWS VPC. The application servers run on AWS ECS Fargate inside private subnets, accessible only through an Application Load Balancer in public subnets. Session caching is handled by Redis, and background tasks are queued via SQS.',
      architecture: [
        'VPC with Public and Private Subnets across 3 Availability Zones.',
        'Application Load Balancer (ALB) handles SSL termination and routes traffic.',
        'ECS Fargate Tasks auto-scale based on CPU/Memory thresholds.',
        'PostgreSQL database hosted on Amazon RDS in private subnets.',
        'Redis ElastiCache manages session data and product catalog caching.'
      ],
      database: 'PostgreSQL with relational tables for Users, Products, Orders, and Transactions. Implemented indexes on order_id and user_id to optimize search queries by 40%.',
      apiFlow: 'Client -> HTTPS -> ALB -> ECS Task -> Redis Cache (Hit) -> Return. If Cache Miss -> RDS Query -> Update Redis -> Return.',
      challenges: 'Handling race conditions during inventory deduction under high concurrent traffic.',
      optimizations: 'Implemented Redis-based distributed locking (Redlock) during checkout to guarantee that inventory is never double-sold. Reduced checkout latency from 450ms to 95ms.',
      lessons: 'Learned the critical importance of connection pooling in PostgreSQL and how to manage secrets securely using AWS Secrets Manager.',
      future: 'Transitioning the inventory service to a serverless AWS Lambda-based event-driven model to further reduce idle compute costs.'
    }
  },
  {
    id: 'video-transcoder',
    title: 'Serverless Video Transcoder Pipeline',
    description: 'An event-driven media processing pipeline that automatically transcodes uploaded video files into adaptive HLS streaming formats.',
    categories: ['Cloud', 'AWS', 'DevOps'],
    tags: ['AWS Lambda', 'S3', 'MediaConvert', 'CloudFront', 'Node.js', 'Terraform'],
    github: 'https://github.com/bhaveshsuthar/serverless-video-transcoder',
    demo: 'https://video.bhaveshsuthar.dev',
    caseStudy: {
      overview: 'An automated pipeline that processes raw video uploads, transcodes them into multiple resolutions (1080p, 720p, 480p), generates an HLS playlist, and distributes them globally.',
      problem: 'Video transcoding is highly CPU-intensive. Hosting dedicated transcoding servers is expensive because they remain idle most of the day but struggle to handle sudden spikes in uploads.',
      solution: 'Built a 100% serverless, event-driven pipeline. When a user uploads a video to an input S3 bucket, it triggers an AWS Lambda function. The function submits a job to AWS Elemental MediaConvert. Once completed, the transcoded files are saved to an output S3 bucket and served via Amazon CloudFront CDN.',
      architecture: [
        'AWS S3 Input Bucket receives raw video files.',
        'S3 Event Notification triggers an AWS Lambda function.',
        'Lambda parses metadata and triggers an AWS Elemental MediaConvert Job.',
        'MediaConvert outputs HLS (.m3u8) streams into an Output S3 Bucket.',
        'Amazon CloudFront CDN caches and serves the HLS streams globally.'
      ],
      database: 'Serverless DynamoDB table tracking video processing states (Pending, Transcoding, Completed, Failed) with TTL on temporary records.',
      apiFlow: 'Upload -> S3 Bucket -> Lambda Trigger -> MediaConvert Job -> Output Bucket -> CDN -> Player.',
      challenges: 'Managing large video uploads (greater than 5GB) securely without exposing AWS credentials to the client.',
      optimizations: 'Implemented S3 Presigned URLs for secure multipart uploads directly from the frontend. Configured CloudFront caching policies to optimize video segment delivery.',
      lessons: 'Gained deep understanding of HLS streaming protocols, video codecs (H.264/H.265), and Infrastructure as Code using Terraform to provision the entire pipeline.',
      future: 'Adding AI-powered automatic thumbnail generation and video content moderation using Amazon Rekognition.'
    }
  },
  {
    id: 'collab-workspace',
    title: 'Real-time Collaboration Workspace',
    description: 'A Slack-like workspace and collaborative rich-text editor with real-time cursor tracking, document sharing, and live voice channels.',
    categories: ['Frontend', 'Backend', 'MERN'],
    tags: ['React', 'Node.js', 'Socket.IO', 'MongoDB', 'Redis', 'Tailwind CSS'],
    github: 'https://github.com/bhaveshsuthar/collab-workspace',
    demo: 'https://collab.bhaveshsuthar.dev',
    caseStudy: {
      overview: 'A real-time workspace application allowing teams to create channels, write documents collaboratively, and view active cursors of other team members in real-time.',
      problem: 'Real-time document synchronization suffers from synchronization conflicts when multiple users edit the same line simultaneously.',
      solution: 'Created a MERN stack application integrated with Socket.IO. Implemented Conflict-free Replicated Data Types (CRDTs) for document state sync. Integrated a Redis adapter for Socket.IO to scale WebSocket connections across multiple Node.js instances.',
      architecture: [
        'React frontend with Slate.js editor and Tailwind CSS.',
        'Node.js & Express server handling REST APIs and user auth.',
        'Socket.IO manages bi-directional real-time communication.',
        'Redis pub/sub adapter coordinates socket events across server instances.',
        'MongoDB stores persistent user profiles, channels, and document snapshots.'
      ],
      database: 'MongoDB with schemas for Users, Workspaces, Channels, and Documents. Document content is stored as hierarchical JSON blocks representing CRDT nodes.',
      apiFlow: 'User types -> Local Editor State -> WebSocket Event -> Server -> Redis Pub/Sub -> Other Connected Clients -> Render Edit.',
      challenges: 'Scaling WebSocket connections beyond a single server instance, as sockets are stateful.',
      optimizations: 'Deployed a Redis Adapter to sync socket events across multiple backend nodes behind an ALB with sticky sessions enabled. Optimized editor rendering to prevent unnecessary React re-renders.',
      lessons: 'Deepened knowledge of WebSocket state management, event-driven server design, and real-time synchronization algorithms.',
      future: 'Integrating WebRTC to support native video calling directly inside workspace channels.'
    }
  },
  {
    id: 'ai-auditor',
    title: 'AI-Powered Code Auditor',
    description: 'An automated repository auditing platform that uses Large Language Models to scan commits for security vulnerabilities and code quality issues.',
    categories: ['Backend', 'AI', 'MERN'],
    tags: ['Node.js', 'Next.js', 'OpenAI API', 'LangChain', 'GitHub Webhooks', 'Docker'],
    github: 'https://github.com/bhaveshsuthar/ai-code-auditor',
    demo: 'https://auditor.bhaveshsuthar.dev',
    caseStudy: {
      overview: 'An AI-powered SaaS tool that connects to GitHub repositories. It listens for Pull Requests and automatically reviews code changes, identifying security flaws, performance bottlenecks, and style guide violations.',
      problem: 'Manual code reviews are slow and often miss critical security vulnerabilities like SQL injections or hardcoded credentials.',
      solution: 'Developed a platform that integrates with GitHub Webhooks. When a PR is opened, a webhook triggers a Node.js worker. The worker fetches the git diff, processes it using LangChain and OpenAI LLMs, and posts review comments directly on the GitHub PR.',
      architecture: [
        'GitHub Webhook sends payload to Node.js backend.',
        'Worker pulls repository details and diff content.',
        'LangChain splits code into manageable chunks and sends them to OpenAI GPT-4.',
        'AI generates structured feedback with line-specific suggestions.',
        'GitHub API is used to post inline comments on the PR.'
      ],
      database: 'MongoDB storing user subscriptions, repository tokens (encrypted), audit history, and feedback accuracy ratings.',
      apiFlow: 'PR Event -> Webhook -> Worker -> AI Analysis -> GitHub API -> Inline PR Review.',
      challenges: 'Exceeding LLM token limits when processing large git diffs containing thousands of lines.',
      optimizations: 'Implemented intelligent diff filtering (ignoring lockfiles, assets, and node_modules) and chunked code analysis using LangChain token splitters to review code within context limits.',
      lessons: 'Gained hands-on experience with LLM prompting techniques, vector embeddings, and managing secure third-party OAuth integrations (GitHub App).',
      future: 'Training a lightweight custom model specifically on security patches to reduce reliance on the OpenAI API and lower operating costs.'
    }
  }
];

const FILTERS = ['All', 'Backend', 'Frontend', 'Cloud', 'AWS', 'DevOps', 'AI', 'MERN'];

export default function Projects({ onOpenProjectDetail }) {
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter projects
  const filteredProjects = activeFilter === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.categories.includes(activeFilter));

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    card.style.setProperty('--mouse-x', `${x * 100}%`);
    card.style.setProperty('--mouse-y', `${y * 100}%`);
    card.style.setProperty('--tilt-x', `${y * 10}deg`);
    card.style.setProperty('--tilt-y', `${x * 10}deg`);
    card.style.setProperty('--shadow-offset-x', `${x * 12}px`);
    card.style.setProperty('--shadow-offset-y', `${y * 12}px`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty('--mouse-x', '50%');
    card.style.setProperty('--mouse-y', '50%');
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    card.style.setProperty('--shadow-offset-x', '0px');
    card.style.setProperty('--shadow-offset-y', '0px');
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <h2 className="section-title">Featured Projects</h2>
          <div className="section-underline" />
          <p className="section-subtitle">
            A curated selection of my work, demonstrating expertise in backend scaling, cloud architecture, and full-stack development.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="projects-filter-tabs">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-tab-btn ${activeFilter === filter ? 'active' : ''}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="project-card card-glow"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Card Header Info */}
              <div className="project-card-header">
                <div className="project-icon-box">
                  <Layers size={18} />
                </div>
                <h3 className="project-title-text">{project.title}</h3>
              </div>

              {/* Description */}
              <p className="project-desc-text">{project.description}</p>

              {/* Tags */}
              <div className="project-tags-list">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="project-tag-pill">{tag}</span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="project-actions-row">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-secondary project-action-btn"
                  title="View Source Code"
                >
                  <Github size={15} />
                  <span>Code</span>
                </a>
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-secondary project-action-btn"
                  title="View Live Demo"
                >
                  <ExternalLink size={15} />
                  <span>Demo</span>
                </a>
                <button
                  onClick={() => onOpenProjectDetail(project)}
                  className="btn btn-primary project-action-btn case-study-btn"
                  title="Read Deep Dive Case Study"
                >
                  <BookOpen size={15} />
                  <span>Case Study</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
