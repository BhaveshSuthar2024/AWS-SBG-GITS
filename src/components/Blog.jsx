import React, { useState } from "react";
import {
  Search,
  Calendar,
  Clock,
  BookOpen,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import "./Blog.css";

const ARTICLES = [
  {
    id: "nodejs-optimization",
    title: "Optimizing Node.js Performance under Heavy Load",
    excerpt:
      "Deep dive into event loop blocking, clustering, streams, and memory profiling techniques to scale Express servers.",
    date: "June 15, 2026",
    readTime: "6 min read",
    category: "Backend",
    featured: true,
    content: {
      introduction:
        "Node.js is famous for its non-blocking I/O model, but it is single-threaded. When CPU-intensive operations block the event loop, performance degrades rapidly. This article explains how to diagnose and resolve event loop bottlenecks.",
      sections: [
        {
          id: "event-loop",
          title: "1. The Event Loop Bottleneck",
          text: "Because Node.js runs JS code on a single thread, any synchronous task (like JSON parsing of massive objects or heavy cryptography) blocks the thread. While blocked, Node cannot handle incoming HTTP requests. Always offload heavy tasks using worker threads or message queues.",
        },
        {
          id: "clustering",
          title: "2. Implementing Clustering",
          text: "By default, Node.js uses a single core. The cluster module allows you to easily spawn child processes (workers) that share the same server port. Typically, you spawn one worker per CPU core, maximizing server utilization.",
          code: `const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isPrimary) {
  // Spawn workers equal to CPU cores
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Workers share the TCP connection
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello from Worker!');
  }).listen(8000);
}`,
        },
        {
          id: "streams",
          title: "3. Using Streams for Big Files",
          text: "Using fs.readFile loads the entire file into memory. If a 1GB file is requested by multiple users, the server will quickly run out of memory. Streams read files in small chunks, piping them directly to the HTTP response.",
          code: `const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {
  // Efficiently stream file chunk-by-chunk
  const stream = fs.createReadStream('huge_report.pdf');
  stream.pipe(res);
}).listen(8000);`,
        },
      ],
      conclusion:
        "By avoiding blocking synchronous operations, clustering your processes, and streaming large payloads, you can comfortably scale a single Node.js server to handle thousands of requests per second.",
    },
  },
  {
    id: "aws-vpc-guide",
    title: "A Guide to VPC Design on AWS",
    excerpt:
      "How to design a secure virtual private cloud with public/private subnets, NAT gateways, and secure route tables.",
    date: "May 28, 2026",
    readTime: "5 min read",
    category: "AWS",
    featured: false,
    content: {
      introduction:
        "Security in the cloud starts at the network layer. Setting up a Virtual Private Cloud (VPC) correctly is essential to protect database engines and internal microservices.",
      sections: [
        {
          id: "subnets",
          title: "1. Public vs. Private Subnets",
          text: "A public subnet has a route to an Internet Gateway (IGW), making its instances accessible from the web. A private subnet does not. Always place database instances (RDS) and application servers (ECS tasks) in private subnets, keeping only your load balancer in the public subnets.",
        },
        {
          id: "nat-gateways",
          title: "2. NAT Gateways",
          text: "Instances in private subnets often need internet access to download patches or call external APIs. A NAT Gateway sits in a public subnet and translates private traffic, allowing outbound requests while blocking inbound connections.",
        },
      ],
      conclusion:
        "Designing a multi-AZ VPC with strict security groups and routing tables ensures that your infrastructure is secure by default.",
    },
  },
  {
    id: "database-sharding",
    title: "Understanding Database Sharding",
    excerpt:
      "When and how to partition your databases horizontally to support massive write-heavy applications.",
    date: "April 12, 2026",
    readTime: "8 min read",
    category: "System Design",
    featured: false,
    content: {
      introduction:
        "When a database grows too large for a single server, vertical scaling (buying a bigger server) becomes cost-prohibitive. Horizontal partitioning, or sharding, is the ultimate scaling strategy.",
      sections: [
        {
          id: "what-is-sharding",
          title: "1. What is Sharding?",
          text: "Sharding splits a single database table horizontally across multiple database engines. For example, users with IDs 1-1M go to Shard A, and IDs 1M-2M go to Shard B.",
        },
        {
          id: "shard-keys",
          title: "2. Choosing a Shard Key",
          text: 'The shard key determines how data is distributed. A poor shard key (like country code) can lead to "hot shards," where one database handles 90% of the traffic. A good shard key distributes writes evenly (like a hashed User ID).',
        },
      ],
      conclusion:
        "While sharding adds significant complexity (like handling cross-shard joins), it provides virtually infinite horizontal scalability.",
    },
  },
];

const CATEGORIES = ["All", "Backend", "AWS", "System Design"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Filter articles
  const filteredArticles = ARTICLES.filter((art) => {
    const matchesCategory =
      activeCategory === "All" || art.category === activeCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get featured and regular articles
  const featuredArticle = filteredArticles.find(
    (art) => art.featured && searchQuery === "",
  );
  const regularArticles = featuredArticle
    ? filteredArticles.filter((art) => art.id !== featuredArticle.id)
    : filteredArticles;

  const handleBack = () => {
    setSelectedArticle(null);
    // Scroll back to blog section
    const el = document.getElementById("blog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (selectedArticle) {
    return (
      <section id="blog" className="blog-section">
        <div className="container">
          <button onClick={handleBack} className="blog-back-btn">
            <ArrowLeft size={16} />
            <span>Back to Articles</span>
          </button>

          <div className="blog-read-container">
            {/* Table of Contents - Sidebar */}
            <aside className="blog-toc-sidebar">
              <h4 className="toc-title">Table of Contents</h4>
              <ul className="toc-list">
                {selectedArticle.content.sections.map((sec) => (
                  <li key={sec.id}>
                    <a href={`#${sec.id}`} className="toc-link">
                      {sec.title}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Article Content */}
            <article className="blog-full-article">
              <div className="article-meta-header">
                <span className="article-category-badge">
                  {selectedArticle.category}
                </span>
                <h1 className="article-title-large">{selectedArticle.title}</h1>
                <div className="article-meta-row">
                  <div className="meta-item">
                    <Calendar size={14} />
                    <span>{selectedArticle.date}</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={14} />
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="article-body-content">
                <p className="article-intro-p">
                  {selectedArticle.content.introduction}
                </p>

                {selectedArticle.content.sections.map((sec) => (
                  <div
                    key={sec.id}
                    id={sec.id}
                    className="article-section-block"
                  >
                    <h3 className="article-section-heading">{sec.title}</h3>
                    <p className="article-section-text">{sec.text}</p>

                    {sec.code && (
                      <div className="article-code-block-wrapper">
                        <pre className="article-code-pre">
                          <code>{sec.code}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                ))}

                <div className="article-conclusion-block">
                  <h4 className="conclusion-heading">Conclusion</h4>
                  <p className="article-section-text">
                    {selectedArticle.content.conclusion}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="blog-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <h2 className="section-title">Technical Blog</h2>
          <div className="section-underline" />
          <p className="section-subtitle">
            Sharing my learnings and deep-dives on backend scaling, AWS
            infrastructure, and systems.
          </p>
        </div>

        {/* Search & Filters Controls */}
        <div className="blog-controls-row">
          {/* Search */}
          <div className="blog-search-box glass">
            <Search size={18} className="search-icon-blog" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="blog-search-input"
            />
          </div>

          {/* Categories */}
          <div className="blog-category-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`blog-cat-btn ${activeCategory === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="blog-grid-layout">
          {/* Featured Article (Top, Full Width) */}
          {featuredArticle && (
            <div
              className="blog-card featured-card glass"
              onClick={() => setSelectedArticle(featuredArticle)}
            >
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span className="blog-cat-tag">
                    {featuredArticle.category}
                  </span>
                  <div className="meta-sub-row">
                    <Calendar size={12} />
                    <span>{featuredArticle.date}</span>
                    <span className="meta-divider">•</span>
                    <Clock size={12} />
                    <span>{featuredArticle.readTime}</span>
                  </div>
                </div>

                <h3 className="blog-card-title">{featuredArticle.title}</h3>
                <p className="blog-card-excerpt">{featuredArticle.excerpt}</p>

                <span className="blog-read-more">
                  <span>Read Article</span>
                  <ChevronRight size={14} />
                </span>
              </div>
            </div>
          )}

          {/* Regular Articles Grid */}
          <div className="blog-articles-grid">
            {regularArticles.map((art) => (
              <div
                key={art.id}
                className="blog-card glass"
                onClick={() => setSelectedArticle(art)}
              >
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span className="blog-cat-tag">{art.category}</span>
                    <div className="meta-sub-row">
                      <Calendar size={12} />
                      <span>{art.date}</span>
                      <span className="meta-divider">•</span>
                      <Clock size={12} />
                      <span>{art.readTime}</span>
                    </div>
                  </div>

                  <h3 className="blog-card-title">{art.title}</h3>
                  <p className="blog-card-excerpt">{art.excerpt}</p>

                  <span className="blog-read-more">
                    <span>Read Article</span>
                    <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="blog-empty-state text-center">
              <BookOpen size={32} className="empty-icon" />
              <p>No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
