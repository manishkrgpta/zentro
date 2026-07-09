/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, Project, Testimonial, ProcessStep, TeamMember, Stat, PricingService, SimpleServicePrice, PricingPackage } from './types';

export const servicesData: Service[] = [
  {
    id: 'ai-automation',
    title: 'AI Automation & Agents',
    shortDesc: 'Automate repetitive tasks using state-of-the-art custom AI agentic workflows.',
    longDesc: 'We build autonomous AI agents, semantic search tools, and custom LLM integrations that streamline operations, handle customer feedback, and perform analytical reasoning, reducing human error and cutting operational overhead by up to 75%.',
    iconName: 'Cpu',
    features: [
      'Multi-agent orchestration workflows',
      'Retrieval-Augmented Generation (RAG)',
      'Automated email & document synthesizers',
      'Custom LLM fine-tuning & prompt security',
      'API-driven automated decision engines'
    ],
    metrics: {
      label: 'Efficiency Gains',
      value: '+75%'
    },
    techStack: ['Python', 'LangChain', 'Gemini API', 'Pinecone', 'FastAPI']
  },
  {
    id: 'custom-websites',
    title: 'Custom Websites & Web Apps',
    shortDesc: 'Modern, lightning-fast digital storefronts and marketing apps built for maximum conversions.',
    longDesc: 'We construct beautiful, performance-optimized, and SEO-boosted websites designed to tell your brand story and drive sales. Leveraging modern front-end frameworks, your site loads in milliseconds globally and looks exceptional on any screen.',
    iconName: 'Globe',
    features: [
      'Vite & React speed-optimized builds',
      'Tailwind CSS customized utility layouts',
      'Full responsive styling & fluid animations',
      'SEO audit-perfect structure & page speed',
      'Interactive visual canvas integrations'
    ],
    metrics: {
      label: 'Load-time reduction',
      value: '4.2x'
    },
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite']
  },
  {
    id: 'saas-development',
    title: 'SaaS Platform Development',
    shortDesc: 'From rapid prototype MVP to resilient, secure, and auto-scaling enterprise platforms.',
    longDesc: 'We engineer complex multi-tenant SaaS architectures featuring secure subscription systems, automated database provisioning, granular permissions matrices, and real-time operational state tracking designed to handle millions of active connections.',
    iconName: 'Layers',
    features: [
      'Multi-tenant database structures',
      'Stripe & billing cycle integration',
      'RBAC (Role-Based Access Control) security',
      'Real-time sync and collaboration engine',
      'Scalable serverless microservices'
    ],
    metrics: {
      label: 'Security compliance',
      value: 'SOC2-Ready'
    },
    techStack: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'Redis']
  },
  {
    id: 'mobile-apps',
    title: 'High-Performance Mobile Apps',
    shortDesc: 'Immersive native and cross-platform mobile experiences for iOS and Android.',
    longDesc: 'We build beautiful, highly fluid native mobile applications utilizing React Native and Swift/Kotlin. With offline support, biometric authentication, and smooth hardware interactions, our apps maintain 5-star engagement scores.',
    iconName: 'Smartphone',
    features: [
      'Cross-platform React Native codebases',
      'Biometric auth & secure keychains',
      'Push notification automation engines',
      'Offline-first synchronization models',
      'Native device hardware integration'
    ],
    metrics: {
      label: 'App Store Rating Avg',
      value: '4.9★'
    },
    techStack: ['React Native', 'Swift', 'Kotlin', 'Expo', 'SQLite']
  },
  {
    id: 'business-dashboards',
    title: 'Intelligent Dashboards & Analytics',
    shortDesc: 'Beautiful data visualization layers that turn dark data into real-time business action.',
    longDesc: 'We design unified administrative command hubs that aggregate multi-source telemetry, transactional databases, and marketing funnels into highly scannable, beautifully styled, interactive bento grids and real-time chart displays.',
    iconName: 'BarChart3',
    features: [
      'Interactive SVG/Canvas charts and maps',
      'Real-time WebSocket telemetry updates',
      'Customized PDF & CSV report generators',
      'Personalized executive widgets configurations',
      'Actionable AI insight recommendations'
    ],
    metrics: {
      label: 'Decision-making speed',
      value: '+140%'
    },
    techStack: ['React', 'Recharts', 'D3.js', 'Tailwind CSS', 'WebSockets']
  },
  {
    id: 'api-development',
    title: 'Scalable APIs & Backend Systems',
    shortDesc: 'Bulletproof backends with high throughput, strict security, and low latency.',
    longDesc: 'We build high-availability RESTful and GraphQL backend infrastructures. With optimized indexing, automated load balancing, and strict rate-limiting, our backends handle intensive data routing with near-zero latency.',
    iconName: 'Network',
    features: [
      'REST & GraphQL structured endpoints',
      'Automated load balancing & caching layers',
      'JWT/OAuth authorization security schemes',
      'Strict API rate-limiting and dDoS guard',
      'Comprehensive Swagger/OpenAPI docs'
    ],
    metrics: {
      label: 'Request latency',
      value: '<30ms'
    },
    techStack: ['NestJS', 'GraphQL', 'Redis', 'PostgreSQL', 'Kubernetes']
  }
];

export const projectsData: Project[] = [
  {
    id: 'ai-crm-dashboard',
    title: 'Enterprise AI CRM Platform',
    category: 'AI SaaS',
    description: 'An intelligent sales dashboard featuring semantic client lead scoring, real-time sentiment analytics, and automated response synthesizers.',
    fullOverview: 'We designed and engineered a full-scale AI CRM that automatically reads incoming client conversations, rates client retention risk with machine learning, and synthesizes personalized responses. This dashboard empowers enterprise teams to close deals twice as fast.',
    metrics: {
      label: 'Sales Velocity Increase',
      value: '+118%'
    },
    stack: ['React', 'TypeScript', 'Recharts', 'FastAPI', 'Gemini API'],
    demoType: 'crm',
    details: {
      problem: 'The client had thousands of inbound leads but their sales team was bogged down reading extensive emails and manually typing repetitive, low-context followups.',
      solution: 'Developed an automated pipeline that ingests emails, scores lead interest using fine-tuned semantic models, and queues context-aware smart response templates.',
      results: [
        'Reduced email triage duration from 8 hours/day to 45 minutes.',
        'Boosted inbound close rate by 34% in the first quarter.',
        'Enabled automated agent escalations with high accuracy.'
      ]
    }
  },
  {
    id: 'ai-support-bot',
    title: 'Omni-Channel Customer Agent',
    category: 'AI Automation',
    description: 'A 24/7 intelligent customer care bot featuring advanced intent extraction, automated ticketing, and vector DB semantic lookup.',
    fullOverview: 'This multi-channel support agent handles over 10,000 requests daily. Connected directly to an active database with semantic search, it answers 85% of standard customer inquiries instantly, with high empathy and perfect contextual precision.',
    metrics: {
      label: 'Ticket Deflection Rate',
      value: '84.6%'
    },
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Pinecone', 'Gemini'],
    demoType: 'chat',
    details: {
      problem: 'An e-commerce business was drowning in simple shipping, return, and inventory tickets, causing support staff exhaustion and slow response ratings.',
      solution: 'Built a custom chat agent integrated with Pinecone vector search and Shopify APIs to fetch shipping statuses and handle returns instantly.',
      results: [
        '84.6% of tickets fully resolved without human intervention.',
        'Customer satisfaction scores climbed from 3.8★ to 4.8★.',
        'Zero downtime during peak shopping holiday events.'
      ]
    }
  },
  {
    id: 'finance-analytics-platform',
    title: 'Hedge Intelligence Web App',
    category: 'Fintech Dashboard',
    description: 'A quantitative trading interface showing real-time portfolio stress-tests, automated trend charts, and asset volatility analytics.',
    fullOverview: 'We built a high-fidelity quantitative workspace for asset managers. Processing heavy financial streams, it performs complex calculations and visualizes live pricing spreads with responsive canvas drawings and lightning-fast state synchronization.',
    metrics: {
      label: 'Data Processing Speed',
      value: '<12ms'
    },
    stack: ['React', 'D3.js', 'WebSockets', 'Go', 'Redis'],
    demoType: 'finance',
    details: {
      problem: 'Portfolio managers needed to run on-the-fly portfolio stress-tests across multiple stock profiles but their current tools took minutes to re-calculate assets.',
      solution: 'Engineered a highly optimized WebAssembly-driven mathematical solver combined with real-time Redis subscription tickers to sync state under 12ms.',
      results: [
        'Enabled instant portfolio simulation with up to 1,000 active tickers.',
        'Lowered data stream overhead on user browsers by 65%.',
        'Helped save millions in capital during high-volatility events.'
      ]
    }
  },
  {
    id: 'healthcare-saas',
    title: 'HIPAA Patient Summarizer',
    category: 'Healthcare App',
    description: 'A secure, HIPAA-compliant patient charting companion that transcribes live clinic visits and generates organized diagnostic outlines.',
    fullOverview: 'An interface designed for practitioners to reduce administrative charting burnout. While doctors converse with patients, the app records, structures notes, and maps medical ICD-10 billing codes, saving hours of manual data entry.',
    metrics: {
      label: 'Clinic Admin Time Saved',
      value: '3.2 hrs/day'
    },
    stack: ['React', 'TypeScript', 'WebRTC', 'FastAPI', 'AWS HIPAA Cloud'],
    demoType: 'healthcare',
    details: {
      problem: 'Medical practitioners were spending a third of their active workday filling out complex Electronic Health Records (EHR) instead of attending to patients.',
      solution: 'Designed an ambient audio charting assistant that transcribes patient visits, filters out casual chat, and auto-generates clean clinical outlines.',
      results: [
        'Doctors saved an average of 3.2 hours of record entry every single day.',
        'Drastically reduced doctor burnout and improved face-to-face patient engagement.',
        'Achieved full SOC2 type II and HIPAA compliant cloud certification.'
      ]
    }
  },
  {
    id: 'restaurant-smart-menu',
    title: 'Savory AI Food Hub',
    category: 'SaaS Platform',
    description: 'A unified smart-ordering platform featuring dynamic, demand-priced menus and fully automated chef kitchen routing.',
    fullOverview: 'We created a custom software suite for multi-site restaurants. Combining client web-app menus, kitchen display terminals, and automated ordering bots, it dynamic prices dishes based on real-time inventory and customer queues.',
    metrics: {
      label: 'Table Turnover Increase',
      value: '+28.3%'
    },
    stack: ['React', 'Express', 'Tailwind', 'MongoDB', 'Socket.io'],
    demoType: 'restaurant',
    details: {
      problem: 'A high-volume restaurant franchise was struggling with peak-hour bottle-necks, menu item waste, and slow customer table turnovers.',
      solution: 'Created an intelligent dining interface that adapts meal suggestions based on current inventory, matches kitchen capacity, and streamlines contactless pay.',
      results: [
        'Turned over tables 28.3% faster by shortening order and pay bottlenecks.',
        'Decreased waste of perishables by 18% with dynamic ingredient matching.',
        'Fully integrated into existing POS hardware without extra developer overhead.'
      ]
    }
  },
  {
    id: 'realestate-marketplace',
    title: 'PropVision Intelligent Agent',
    category: 'Marketplace',
    description: 'An immersive housing database using automated property valuation, custom smart-filters, and simulated spatial layouts.',
    fullOverview: 'We designed a next-generation real estate hub. It predicts property value fluctuations using historical local trends and generates spatial visual representations of interior layout changes to accelerate remote property buying.',
    metrics: {
      label: 'Remote Closing Cycle',
      value: '-14 Days'
    },
    stack: ['React', 'Three.js Canvas', 'Python', 'PostgreSQL', 'Docker'],
    demoType: 'realestate',
    details: {
      problem: 'Real estate listings with static 2D photographs struggled to attract long-distance buyers, resulting in extended contract negotiation timelines.',
      solution: 'Crafted a platform showing spatial layout designs, automatic local market forecasts, and interactive virtual floor plans.',
      results: [
        'Accelerated real estate remote closings by a remarkable average of 14 days.',
        'Increased virtual property walkthrough engagement rate by 240%.',
        'Enhanced buyer lead-to-view conversions by 45%.'
      ]
    }
  }
];

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Discovery',
    phase: 'Understand',
    description: 'We host interactive workshops to map out your business goals, user personas, technical constraints, and desired business outcomes.',
    deliverables: ['Product strategy brief', 'Technical architecture map', 'Milestone & cost breakdown']
  },
  {
    number: 2,
    title: 'Strategy',
    phase: 'Design Architecture',
    description: 'We draft the technical execution plan, selecting optimal databases, backend frameworks, security compliance standards, and AI models.',
    deliverables: ['System sequence diagrams', 'Security & regulatory assessment', 'Data schema layout']
  },
  {
    number: 3,
    title: 'Design',
    phase: 'UI/UX Crafting',
    description: 'We craft high-fidelity, premium mockups featuring customized dark mode aesthetics, clean typographic pairings, and glassmorphic layouts.',
    deliverables: ['Figma style guide & tokens', 'Interactive UX clickthroughs', 'Micro-interaction guides']
  },
  {
    number: 4,
    title: 'Development',
    phase: 'Build & Code',
    description: 'We code your application in modular, strictly typed, and lint-proof TypeScript. Utilizing fast compilers, the product is built for raw performance.',
    deliverables: ['Modular GitHub repository', 'Fully unit-tested application', 'CI/CD deployment pipeline']
  },
  {
    number: 5,
    title: 'AI Integration',
    phase: 'Intelligence layer',
    description: 'We integrate custom AI agents, deploy secure system prompts, seed vector stores, and set up evaluation pipelines to guarantee AI safety and speed.',
    deliverables: ['Configured vector database', 'Secure prompt configurations', 'Latency-optimized LLM proxy']
  },
  {
    number: 6,
    title: 'Launch',
    phase: 'Deploy Globally',
    description: 'We deploy the platform onto hyper-scalable, auto-balanced cloud microservices (Vercel, AWS, GCP) under automated health monitoring networks.',
    deliverables: ['Live production service url', 'Automated cloud scaling setup', 'SSL & SSL-Wildcard configurations']
  },
  {
    number: 7,
    title: 'Growth & Support',
    phase: 'Optimize',
    description: 'Our engineers monitor performance metrics, optimize queries, and run bi-weekly feature cycles to ensure the platform scales as your business grows.',
    deliverables: ['Bi-weekly progress updates', 'Query optimization reports', '24/7 telemetry monitoring alert']
  }
];

export const statsData: Stat[] = [
  {
    value: 50,
    suffix: '+',
    label: 'Digital Projects Delivered',
    subtext: 'Websites, custom SaaS platforms, APIs, and native mobile apps.'
  },
  {
    value: 99.9,
    suffix: '%',
    label: 'Production System Uptime',
    subtext: 'Highly available, fault-tolerant cloud cluster configurations.'
  },
  {
    value: 15,
    suffix: '+',
    label: 'Modern Technologies Mastered',
    subtext: 'Expertise across the frontend, backend, database, and AI stacks.'
  },
  {
    value: 120,
    suffix: '%',
    label: 'Average Client ROI Boost',
    subtext: 'Achieved through automated intelligent software workflows.'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Jenkins',
    role: 'VP of Product',
    company: 'Synergy Retail',
    logoText: 'SYN',
    comment: 'Zentro completely re-engineered our e-commerce checkout. By building a custom mobile app and integrating automated AI support, our support tickets dropped by 80% while conversions rose 22%. They feel like an elite internal team rather than an agency.',
    rating: 5,
    avatarSeed: 'sarah'
  },
  {
    id: 'test-2',
    name: 'Marcus Chen',
    role: 'Founder & CTO',
    company: 'QuantIQ Solutions',
    logoText: 'QIQ',
    comment: 'The speed of execution was breathtaking. Zentro took our complex trading analytics algorithm, rewrote the frontend in React using WebSockets, and delivered a SOC2-ready financial dashboard in under six weeks. Truly outstanding engineering.',
    rating: 5,
    avatarSeed: 'marcus'
  },
  {
    id: 'test-3',
    name: 'Dr. Evelyn Martinez',
    role: 'Chief Medical Officer',
    company: 'Apex Health Group',
    logoText: 'APX',
    comment: 'Integrating AI into patient data is extremely sensitive. Zentro engineered a fully compliant, secure medical charting summarizer that has saved our clinic doctors hours of typing daily. Their commitment to security and elegant UI is unparalleled.',
    rating: 5,
    avatarSeed: 'evelyn'
  }
];

export const teamMembersData: TeamMember[] = [
  {
    name: 'Aron Vance',
    role: 'Founder & AI Architect',
    bio: 'Formerly Principal AI researcher. Specializes in multi-agent orchestration, custom language models fine-tuning, and robust vector store indexing pipelines.',
    avatarSeed: 'aron',
    specialties: ['AI Agents', 'RAG Systems', 'Cloud Systems']
  },
  {
    name: 'Nadia El-Sayed',
    role: 'Director of Engineering',
    bio: 'Infrastructure and backend specialist with 12+ years building high-availability multi-tenant SaaS engines. Obsessed with microsecond API performance.',
    avatarSeed: 'nadia',
    specialties: ['Node.js', 'System Architecture', 'Kubernetes']
  },
  {
    name: 'Tyler Kross',
    role: 'Lead UX Designer & Front-End Developer',
    bio: 'Creates beautiful, high-contrast, motion-guided visual user interfaces. Believes every digital interaction should be butter-smooth, tactile, and meaningful.',
    avatarSeed: 'tyler',
    specialties: ['Design Systems', 'Framer Motion', 'React']
  },
  {
    name: 'Elena Rostova',
    role: 'Full-Stack & Integrations Specialist',
    bio: 'Expert in secure database models, API structures, and financial webhook configurations. Connects legacy platforms safely to modern cloud tech.',
    avatarSeed: 'elena',
    specialties: ['API Security', 'PostgreSQL', 'Stripe Billing']
  }
];

export const zentroPricingData: PricingService[] = [
  { name: 'Landing Page', marketPrice: '$800–$2,500', zentroPrice: '$499' },
  { name: 'Business Website (5–8 Pages)', marketPrice: '$2,000–$6,000', zentroPrice: '$1,299' },
  { name: 'Premium Business Website', marketPrice: '$4,000–$10,000', zentroPrice: '$2,999' },
  { name: 'Website Redesign', marketPrice: '$2,000–$5,000', zentroPrice: '$1,199' },
  { name: 'E-commerce Website', marketPrice: '$3,500–$12,000', zentroPrice: '$2,499' },
  { name: 'Booking/Appointment System', marketPrice: '$500–$2,000', zentroPrice: '$399' },
  { name: 'AI Chatbot', marketPrice: '$1,000–$5,000', zentroPrice: '$799' },
  { name: 'AI Appointment Assistant', marketPrice: '$1,500–$6,000', zentroPrice: '$999' },
  { name: 'AI Customer Support Agent', marketPrice: '$2,500–$10,000', zentroPrice: '$1,999' },
  { name: 'CRM Integration', marketPrice: '$1,000–$4,000', zentroPrice: '$699' },
  { name: 'Email Automation', marketPrice: '$700–$2,500', zentroPrice: '$499' },
  { name: 'AI Lead Generation System', marketPrice: '$1,500–$5,000', zentroPrice: '$999' },
  { name: 'Admin Dashboard', marketPrice: '$2,500–$10,000', zentroPrice: '$1,499' },
  { name: 'SaaS MVP Development', marketPrice: '$20,000–$80,000+', zentroPrice: '$9,999', isStartingAt: true },
  { name: 'Mobile App (Basic)', marketPrice: '$8,000–$25,000', zentroPrice: '$4,999', isStartingAt: true }
];

export const monthlyServicesData: SimpleServicePrice[] = [
  { name: 'Website Hosting & Maintenance', price: '$99/mo' },
  { name: 'AI Chatbot Hosting', price: '$79/mo' },
  { name: 'Local SEO', price: '$349/mo' },
  { name: 'Google Business Profile Management', price: '$149/mo' },
  { name: 'Website Content Updates', price: '$99/mo' },
  { name: 'Security Monitoring', price: '$49/mo' },
  { name: 'Analytics & Monthly Reports', price: '$49/mo' },
  { name: 'AI Customer Support Agent', price: '$149/mo' },
  { name: 'AI Voice Receptionist', price: '$199/mo' },
  { name: 'AI Email Assistant', price: '$99/mo' }
];

export const aiAutomationServicesData: SimpleServicePrice[] = [
  { name: 'AI FAQ Bot', price: '$499' },
  { name: 'AI WhatsApp Automation', price: '$699' },
  { name: 'AI Instagram DM Bot', price: '$599' },
  { name: 'AI Facebook Messenger Bot', price: '$599' },
  { name: 'AI Lead Qualification Bot', price: '$999' },
  { name: 'AI CRM Automation', price: '$1,299' },
  { name: 'AI Email Reply Agent', price: '$799' },
  { name: 'AI Review Response System', price: '$499' },
  { name: 'AI Proposal Generator', price: '$699' },
  { name: 'AI Document Processing', price: '$999' }
];

export const marketingServicesData: SimpleServicePrice[] = [
  { name: 'Local SEO Setup', price: '$399' },
  { name: 'Google Ads Setup', price: '$499' },
  { name: 'Meta Ads Setup', price: '$499' },
  { name: 'Conversion Rate Optimization', price: '$699' },
  { name: 'Speed Optimization', price: '$249' },
  { name: 'Technical SEO Audit', price: '$199' },
  { name: 'Google Analytics Setup', price: '$149' },
  { name: 'Monthly SEO', price: '$349/mo' }
];

export const pricingPackagesData: PricingPackage[] = [
  {
    name: 'Starter',
    price: '$499',
    iconName: 'Rocket',
    description: 'Perfect for small businesses looking to establish a highly professional online footprint.',
    features: [
      '5-page business website',
      'Mobile responsive architecture',
      'Basic search engine optimization (SEO)',
      'Secure contact and inquiry form',
      'Google Maps listing integration',
      '30 days of direct technical support'
    ]
  },
  {
    name: 'Growth',
    price: '$999',
    iconName: 'Star',
    description: 'Designed for scaling operations looking to integrate automated AI communication pathways.',
    features: [
      'Everything in Starter package',
      'Custom AI chatbot assistant',
      'Online booking / appointment system',
      'Elite speed optimization (Lighthouse 95+)',
      'Google Business Profile optimization',
      'Basic analytics dashboard implementation'
    ],
    popular: true
  },
  {
    name: 'Premium',
    price: '$1,999',
    iconName: 'Gemini',
    description: 'Ultimate end-to-end custom development and workflow intelligence for market-leading growth.',
    features: [
      'Everything in Growth package',
      '100% custom bespoke branding & design',
      'Bi-directional CRM integration',
      'Advanced AI and workflow automation',
      'Proactive email marketing automation',
      'Advanced off-page and on-page SEO suite',
      '3 months of hyper-priority technical support'
    ]
  }
];

export const servicesListToSelect: string[] = [
  'AI Agents & Automation',
  'Custom Websites',
  'Web Applications',
  'SaaS Development',
  'Mobile App Development',
  'AI Chatbots',
  'AI Voice Receptionist',
  'AI Appointment Booking',
  'CRM Integration',
  'API Development',
  'Dashboard Development',
  'E-commerce Development',
  'Landing Pages',
  'Website Redesign',
  'Local SEO',
  'Google Business Optimization',
  'Email Automation',
  'Workflow Automation',
  'Website Maintenance',
  'Cloud Deployment',
  'Technical Support',
  'Analytics & Reporting'
];

