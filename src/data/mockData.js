// Default seed data for first load. All data is persisted in localStorage and
// fully editable via the Admin Dashboard. No content is hardcoded inside components.

export const defaultData = {
  settings: {
    name: "Farzeen Soha",
    tagline: "Software Engineer. Designer. Problem Solver.",
    intro:
      "Hi, I am a Software Engineer - passionate about designing, building, leading and interacting with both people and technology.",
    resumeUrl: "https://drive.google.com/file/d/1c3V9GpbMqjjqxVyTwUZn6uVyI5vq7H7X/view?usp=sharing",
    email: "sohafarzeen@gmail.com",
    socials: {
      linkedin: "https://linkedin.com/in/farzeen-soha-b858aa274",
      github: "https://github.com/farzeensoha",
      email: "mailto:sohafarzeen@gmail.com",
    },
  },
  hero: {
    images: [
      { url: "https://www.image2url.com/r2/default/images/1781159264849-30bb9fa1-2c38-4f97-a2df-4a1a896d2a5a.jpeg", position: "center 58%" },
      { url: "https://www.image2url.com/r2/default/images/1780722717474-e677533b-b72c-45fc-b7c7-0cf6e83446b7.png", position: "center 60%" },
      { url: "https://www.image2url.com/r2/default/images/1781159170812-de941135-3965-46ba-bbd1-42debdee60e9.jpeg", position: "center 56%" },
      { url: "https://www.image2url.com/r2/default/images/1780724989847-aae0d002-5491-4dd0-bef1-e31c81bb18c7.jpeg", position: "center 60%" },
    ],
  },
  experience: [
  {
    id: "exp-1",
    company: "Synamedia",
    role: "Associate Software Developer",
    duration: "June 2026 - Present",
    location: "Bangalore, India",
    tech: ["Qt/QML", "C++", "Python", "Selenium", "PyTest"],
    description:
      "Building and shipping STB UI components and system automation modules integrated into production Digital TV platform builds.\n Engineering automated test scripts in Python, Selenium, and PyTest, improving regression coverage and cutting manual verification overhead. Monitor test execution, evaluate failures, and perform debugging to maintain release stability.",
  },
  {
    id: "exp-2",
    company: "Synamedia",
    role: "Graduate Intern",
    duration: "Feb 2026 - June 2026",
    location: "Bangalore, India",
    tech: ["Qt/QML", "C++", "Python", "Selenium", "PyTest"],
    description:
      "Contributed to Digital TV platform development and quality engineering, working on STB UI implementation, automation frameworks and system validation processes. Improved testing efficiency through automation solutions, collaborated on debugging and troubleshooting activities, and gained exposure to enterprise-scale software architecture, backend communication and integration workflows.",
  },

  {
    id: "exp-3",
    company: "UST",
    role: "AI/ML Intern",
    duration: "Sep 2024 - Dec 2024",
    location: "Bangalore, India",
    tech: [
      "Python",
      "PyTorch",
      "OpenCV",
      "Librosa",
      "CNN",
      "Deep Learning",
    ],
    description:
      "Developed and evaluated Multimodal Emotion Recognition (MER) models using benchmark datasets including RAVDESS, IEMOCAP and MELD. Contributed to feature engineering, deep learning experimentation, model optimization and research analysis, strengthening emotion-aware AI systems and multimodal learning techniques.",
  },
],
  education: [
  {
    id: "edu-1",
    institution: "BNM Institute of Technology",
    degree: "Bachelor of Engineering",
    specialization: "Computer Science and Engineering",
    grade: "CGPA 9.2",
    duration: "2022 - 2026",
    description:
      "Secretary of the RPA Club (Automation & AI Club), where I mentored students, organized technical workshops and events, and led branding and outreach initiatives. Actively participated in NSS and volunteered with Surabhi Foundation, contributing to community engagement and social impact activities.",
  },

  {
    id: "edu-2",
    institution: "Delhi Public School, GBN",
    degree: "Schooling (CBSE)",
    specialization: "Science",
    grade: "92%",
    duration: "2013 - 2022",
    description:
      "Member of the Rotary Club and Cultural Team, actively participating in leadership, cultural and extracurricular activities while building a strong academic foundation.",
  },
],
  projects: [
  {
    id: "proj-1",
    name: "MindEase",
    subtitle: "AI-Powered Digital Wellness Ecosystem",
    description:
      "An intelligent web platform and Chrome extension designed to monitor toxicity, reduce doomscrolling and provide personalized emotional support through LLMs and behavioral analysis. Features productivity tracking, behavioral insights and AI-driven interventions to promote healthier digital habits.",
    tech: [
      "React",
      "FastAPI",
      "MongoDB",
      "Chrome Extension",
      "LLM Integration",
      "Python"
    ],
    github: "",
    live: "https://github.com/farzeensoha/Mind-at-Ease",
    featured: true,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf4Af7AQyDqczKBETCSX8-0E9qoVIj4qGyb_Op1MoxWEVdfPVMdQ6TFVv2&s=10"
    ],
  },

  {
    id: "proj-2",
    name: "Prediction of Osteoarthritis with Dosha Analysis",
    subtitle: "Machine Learning Meets Personalized Healthcare",
    description:
      "Developed a healthcare prediction system that combines clinical indicators with Ayurvedic dosha analysis to assess osteoarthritis risk and provide personalized recommendations. Focused on predictive analytics, data preprocessing and personalized healthcare insights.",
    tech: [
      "Python",
      "Machine Learning",
      "Pandas",
      "NumPy",
      "Scikit-Learn",
      "Healthcare AI"
    ],
    github: "",
    live: "",
    featured: true,
    images: [
      "https://www.image2url.com/r2/default/images/1780926156268-0ab3a87b-398a-44c9-a7a4-3ecfa3a109e4.jpg"
    ],
  },

  {
    id: "proj-3",
    name: "Heart Disease Prediction using Explainable AI",
    subtitle: "Interpretable Healthcare Risk Assessment",
    description:
      "Built an explainable machine learning model leveraging SHAP and LIME to identify critical risk factors and improve transparency in cardiovascular disease prediction. Designed to enhance trust and interpretability in healthcare AI systems.",
    tech: [
      "Python",
      "Machine Learning",
      "SHAP",
      "LIME",
      "Explainable AI",
      "Data Analysis"
    ],
    github: "",
    live: "https://heart-disease-pred-abquvergml5jzqintsnh6j.streamlit.app",
    featured: true,
    images: [
      "https://www.news-medical.net/images/news/ImageForNews_794881_17307843182864580.jpg"
    ],
  },

  {
    id: "proj-4",
    name: "Open Source Incident Management System",
    subtitle: "DevOps Incident Tracking Platform",
    description:
      "Developed a Flask-based incident management platform supporting role-based access control, incident tracking, email notifications and Dockerized deployment. Designed to streamline incident reporting and resolution workflows.",
    tech: [
      "Flask",
      "SQLite",
      "Docker",
      "Python",
      "Bootstrap"
    ],
    github: "https://github.com/farzeensoha/IMS-incident-management-system",
    live: "",
    featured: false,
    images: [
      "https://s48686.pcdn.co/wp-content/uploads/1/2020/05/ecaad819-incident-management-management-roles-responsibilities-hero.png"
    ],
  },

  {
    id: "proj-8",
    name: "IoT Smart Irrigation System",
    subtitle: "Data-Driven Water Optimization",
    description:
      "Built a sensor-driven irrigation system that analyzes environmental conditions and weather data to optimize water usage. Designed to improve agricultural efficiency and sustainability through IoT-enabled automation.",
    tech: [
      "IoT",
      "Sensors",
      "Automation",
      "Data Analysis"
    ],
    github: "",
    live: "",
    featured: false,
    images: [
      "https://www.netafimindia.com/contentassets/56b4db493ff74411823ec87b3230174c/smart-drip-irrigation-using-iot.png?v=4909f9"
    ],
  },

  {
    id: "proj-7",
    name: "Wildfire Scout",
    subtitle: "Autonomous Forest Protection Robot",
    description:
      "Designed an autonomous robotic solution during the Unisys Innovation Program to assist in wildfire detection, suppression and post-fire recovery. Focused on environmental monitoring, automation and disaster management.",
    tech: [
      "IoT",
      "Robotics",
      "Automation",
      "Sensors"
    ],
    github: "",
    live: "",
    featured: false,
    images: [
      "ADD_WILDFIRE_SCOUT_IMAGE_1"
    ],
  },

  {
    id: "proj-6",
    name: "Serverless Card Generator",
    subtitle: "Cloud Native Dynamic Card Generation",
    description:
      "Developed a serverless solution for generating event, employee and business cards using AWS Lambda and API Gateway. Implemented scalable cloud-native architecture with automated card creation workflows.",
    tech: [
      "AWS Lambda",
      "API Gateway",
      "Python",
      "Serverless Architecture",
      "AWS"
    ],
    github: "",
    live: "",
    featured: false,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvVForudgraV9Bbkq5iaVSAMBPqA__uc1kk2Eo_lte23PdyyBrTFY9TcE&s=10"
    ],
  }
],
  events: [
  {
    id: "ev-1",
    title: "Secretary · RPA Club (Automation & AI Club)",
    description:
      "Led student engagement initiatives, organized technical workshops and events, mentored juniors, and managed branding and outreach activities for the club.",
    images: [
      "https://www.image2url.com/r2/default/images/1780721007477-eb750952-b009-46c3-8f8c-7fbb5afc858c.jfif"
    ],
    link: "",
  },

  {
    id: "ev-2",
    title: "BNMIT Podcast",
    description:
      "Honored and delighted to have hosted a podcast on Self-Awareness with Prof. Priyanka Padki as part of the BNMIT initiative",
    image: "https://media.licdn.com/dms/image/v2/D5622AQHtFakxwDUrRQ/feedshare-image-high-res/feedshare-image-high-res/0/1733159604921?e=1782345600&v=beta&t=BLshoSoiL-Hgt91_4rYFV36nRBZSAUYUKhe4SQXxVg4",
    link: "https://www.youtube.com/watch?v=XzU-Ms-K2bM",
  },

  {
    id: "ev-3",
    title: "IEEE ECMI 2026 Research Presentation",
    description:
      "Presented the research paper 'Social Media Wellness Tracker and Toxicity Reducer' at IEEE ECMI 2026, showcasing AI-driven approaches for digital well-being and online toxicity reduction.",
    images: [
      "https://www.image2url.com/r2/default/images/1780722008942-b81defc5-e5ea-4d69-b305-fc8a26e073cd.jpeg","https://www.image2url.com/r2/default/images/1780722717474-e677533b-b72c-45fc-b7c7-0cf6e83446b7.png"
    ],
    link: "",
  },

  {
    id: "ev-4",
    title: "IBM MindScape Hackathon Finalist",
    description:
      "Developed innovative technology solutions under competitive constraints and qualified as a finalist among participating teams during the IBM MindScape Hackathon.",
    images: [
      "https://www.image2url.com/r2/default/images/1780724095950-be689b6c-64e7-44b4-b1d8-59dfc75e4ede.jpeg"
    ],
    link: "",
  },

  {
    id: "ev-5",
    title: "BNMIT Open Day Project Exhibition - 2026",
    description:
      "Demonstrated technical projects and research work to faculty members, industry professionals and visitors during the institute's annual project exhibition.",
    images: [
      "https://www.image2url.com/r2/default/images/1780723716151-38d57e68-4612-4de1-b77e-6874758b2b15.jfif"
    ],
    link: "",
  },
  {
    id: "ev-6",
    title: "TechX 2024 · Comedkares",
    description:
      "Secured 2nd Place in the UI Design Challenge organized by Comedkares. Designed a mobile application for an industrial equipment rental platform, focusing on user experience, workflow efficiency and business usability.",
    image: "https://www.image2url.com/r2/default/images/1780724989847-aae0d002-5491-4dd0-bef1-e31c81bb18c7.jpeg",
    link: "",
  },

  {
    id: "ev-7",
    title: "Future Student Founder",
    description:
      "Recognized and felicitated as a Future Student Founder by Simsy Startups and Innovation Platform for demonstrating enthusiasm towards entrepreneurship, innovation and problem-solving.",
    image: "https://www.image2url.com/r2/default/images/1780725297293-e9274fda-f208-40b2-b5cf-3f9eb9a065b0.jpeg",
    link: "",
  },

  {
    id: "ev-8",
    title: "Hack-A-League (HAL)",
    description:
      "Participated in Hack-A-League, a 24-hour National Level Offline Hackathon organized by the Department of Computer Science and Engineering, Global Academy of Technology. Collaborated in a fast-paced environment to design and develop innovative technology solutions.",
    images: ["https://media.licdn.com/dms/image/v2/D5622AQGgObvhSw7dmw/feedshare-shrink_480/B56ZTpO6eHHQAY-/0/1739079793821?e=1782345600&v=beta&t=2BjJY_cnigpLviE1poDik16S8AuQuQyE5DdxTQDEcbQ","https://media.licdn.com/dms/image/v2/D5622AQFEZz0EIGuoWw/feedshare-shrink_480/B56ZTpO6eVGoAY-/0/1739079795122?e=1782345600&v=beta&t=idl5KVnHnpFy0cEr4rfxG5wbIbJwI4hjojt3CAgSJLc"],
    link: "",
  },

  {
    id: "ev-9",
    title: "BNMIT Open Day 2024",
    description:
      "Presented projects and research work to industry professionals, faculty members, students and visitors during BNMIT Open Day 2026, demonstrating technical solutions and innovation-driven development.",
    images: ["https://media.licdn.com/dms/image/v2/D5622AQEY7kAldErtUg/feedshare-shrink_480/feedshare-shrink_480/0/1716731691213?e=1782345600&v=beta&t=0hVtwVkCkPuy2RsJEe8y1-kjR-6BUUXeD8V1VbWkG4k","https://media.licdn.com/dms/image/v2/D5622AQGjelOxOa_Qog/feedshare-shrink_480/feedshare-shrink_480/0/1716731690340?e=1782345600&v=beta&t=964h5GEXH8i9IoHvk6jp5zw7kN8O_ZWbNh-AMSy9Sxo"],
    link: "",
  },
  {
    id: "ev-10",
    title: "Samsung PRISM Program",
    description:
      "Selected for Samsung PRISM and completed advanced training in Python programming, data structures, algorithms and data analytics while working on industry-oriented problem statements.",
    images: [
      "https://media.licdn.com/dms/image/v2/D5622AQEoVDCb0NVhNA/feedshare-shrink_480/feedshare-shrink_480/0/1727534202187?e=1782345600&v=beta&t=XCvUCeErsx24uwwH5A0fYl0IzdW11E4ZKua6qSyiFZY"
    ],
    link: "",
  },

  {
    id: "ev-11",
    title: "NSS Volunteer",
    description:
      "Actively participated in community service initiatives, awareness campaigns and social impact programs aimed at creating positive change through volunteer work.",
    images: [
      "https://www.image2url.com/r2/default/images/1780726984273-892b7c8d-1c22-427a-8c20-a83ec5fe7806.jpeg"
    ],
    link: "",
  },

  {
    id: "ev-12",
    title: "Surabhi Foundation Volunteer",
    description:
      "Contributed to educational and social welfare initiatives through volunteering activities focused on government schools development and outreach.",
    images: [
      "https://www.image2url.com/r2/default/images/1780727046032-51539fa9-fa3d-47d2-8f57-2c0c346b42c1.jpeg"
    ],
    link: "",
  },
],
  certifications: [
  {
    id: "cert-1",
    name: "Samsung PRISM Program",
    provider: "Samsung Innovation Campus",
    year: "2024",
    image: "https://media.licdn.com/dms/image/v2/D5622AQGK1de8SmDejA/feedshare-shrink_1280/feedshare-shrink_1280/0/1727534196916?e=1782345600&v=beta&t=qIwa0g9rMhwTfv_hQ_oqY1NEn8muB4p44Nk4d12qo10",
    skills: [
      "Python",
      "Data Structures",
      "Algorithms",
      "Problem Solving",
      "Data Analytics"
    ],
  },

  {
    id: "cert-2",
    name: "IBM Getting Started with Artificial Intelligence",
    provider: "IBM",
    year: "2024",
    image: "https://www.image2url.com/r2/default/images/1780729734805-0efb8320-d677-465a-a5da-1765ee6c1132.jpeg",
    skills: [
      "Artificial Intelligence",
      "Machine Learning",
      "AI Fundamentals",
      "Data Analysis"
    ],
  },

  {
    id: "cert-3",
    name: "Python for Data Science",
    provider: "NPTEL",
    year: "2024",
    image: "https://www.image2url.com/r2/default/images/1780729950638-63b52486-b2f6-47ea-967e-306530d13275.jpeg",
    skills: [
      "Python",
      "Data Science",
      "Data Analysis",
      "Pandas",
      "NumPy"
    ],
  },

  {
    id: "cert-4",
    name: "Introduction to Soft Computing",
    provider: "NPTEL",
    year: "2024",
    image: "https://www.image2url.com/r2/default/images/1780838492832-7513981a-708b-4e14-a22a-b99656c633f0.jpeg",
    skills: [
      "Soft Computing",
      "Neural Networks",
      "Fuzzy Logic",
      "Machine Learning"
    ],
  },

  {
    id: "cert-5",
    name: "Artificial Intelligence Internship Program",
    provider: "Corizo",
    year: "2024",
    image: "https://www.image2url.com/r2/default/images/1780838615288-e7b76419-f733-459a-b562-e54e78b8b0f7.jpeg",
    skills: [
      "Artificial Intelligence",
      "Machine Learning",
      "Model Development",
      "Data Analytics"
    ],
  },

  {
    id: "cert-6",
    name: "DevOps Internship Program",
    provider: "Elevate Labs",
    year: "2024",
    image: "https://www.image2url.com/r2/default/images/1780838732152-ceb78449-f00a-4bd3-bbc1-49e9aa744538.jpeg",
    skills: [
      "DevOps",
      "Git",
      "Docker",
      "CI/CD",
      "Deployment"
    ],
  },
  ],
  skills: {
  languagesFrameworks: [
    "Python",
    "Java",
    "JavaScript",
    "SQL",
    "React.js",
    "Node.js",
    "FastAPI",
    "Flask",
    "Selenium",
    "Manifest V3"
  ],

  tools: [
    "Git",
    "GitHub",
    "AWS",
    "Power BI",
    "Postman",
    "Figma",
    "UiPath",
    "VS Code",
    "Docker"
  ],

  technologies: [
    "Machine Learning",
    "Deep Learning",
    "Artificial Intelligence",
    "LLM Integration",
    "Computer Vision",
    "Chrome Extensions",
    "REST APIs",
    "Automation Testing",
    "Data Visualization",
    "Feature Engineering",
    "Multimodal Emotion Recognition",
    "MongoDB"
  ],

  soft: [
    "Leadership",
    "Mentoring",
    "Communication",
    "Public Speaking",
    "Team Collaboration",
    "Problem Solving",
    "Project Management",
    "Event Management",
    "Community Building"
  ],
},

personalNote: {
  headline: "Building, Learning, Growing",

  body:
    "I am a Software Engineer passionate about building impactful products at the intersection of software development, design, artificial intelligence and automation.\n\nThroughout my academic journey, I have always been curious and enthusiastic about gaining exposure beyond the classroom. Whether through internships, hackathons, technical clubs, exhibitions, research presentations, or hosting events, I have consistently looked for opportunities to learn, contribute, and grow. These experiences helped me strengthen not only my technical skills, but also teamwork, communication, adaptability, and problem-solving abilities.\n\nAs I ascend into my professional career, I look forward to work on meaningful products, collaborate with talented teams, and create technology that makes a positive impact while growing both professionally and personally.",
},
};

export const ADMIN_DEFAULT_PASSWORD = "farzeen2025";
