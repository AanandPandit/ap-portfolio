export const resumeData = {
    personal: {
        name: "Aanand Pandit",
        email: "aanandpandit0001@gmail.com",
        phone: "9515525335",
        location: "Tirupati, India",
        links: {
            portfolio: "https://aanandpandit.github.io/aanandpandit-portfolio/",
            github: "https://github.com/AanandPandit",
            linkedin: "https://www.linkedin.com/in/aanand-pandit/"
        }
    },
    education: [
        {
            institution: "Sree Vidyanikethan Engineering College",
            degree: "B.Tech in Computer Science & Engineering, Artificial Intelligence & Machine Learning",
            year: "2021 - 2025",
            location: "Tirupati, India"
        },
        {
            institution: "Koshi Saint James Residential Secondary School",
            degree: "Intermediate, +2 in Computer Science & Mathematics",
            year: "2019 - 2021",
            location: "Itahari, Nepal"
        }
    ],
    skills: {
        "Languages": ["Python", "C/C++", "SQL"],
        "Frameworks": ["PyTorch", "TensorFlow", "Hugging Face Transformers", "LangChain", "Flask", "PyQt", "Generative AI Frameworks"],
        "Libraries": ["NumPy", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn", "OpenCV", "YOLOv8", "NLTK"],
        // "Embedded & IoT": ["Arduino", "ESP32/ESP8266", "Raspberry Pi", "NVIDIA Jetson Nano", "Sensor Integration"], // Commented out in Latex for AI role, but useful to keep? I will keep them but maybe separate if user wants strict adherence. User provided the commented block too. I will include Embedded since he has a drone project.
        "Developer Tools": ["Git", "Docker", "MS-Word", "Excel", "PowerBI"],
        "Other Skills": ["Feature Engineering", "Model Training & Optimization", "Real-time Inference Systems", "RAG", "LLMs", "VAEs"]
    },
    projects: [
        {
            title: "Vision-Based Drone for Search & Rescue",
            tech: "PyQt5, YOLOv8, OpenCV, Raspberry Pi",
            date: "Oct 2024 – Apr 2025",
            description: [
                "Major B.Tech project enhancing search operations in disaster zones using an AI-powered drone.",
                "Built on-board real-time inference pipeline on Arduino/ESP32CAM/Raspberry Pi with 92% detection accuracy.",
                "Developed PyQt5 dashboard with live video, detection overlay, and telemetry."
            ],
            links: {
                github: "https://github.com/AanandPandit/UAV-Project",
                demo: "https://drive.google.com/file/d/1__-E-9WDHbxRwCOKgVC41UfTVZO_mznv/view"
            },
            images: [
                "/assets/UAV project images/uav.jpg"
            ]
        },
        {
            title: "NurseAI: Digital Health Companion",
            tech: "Flask, PostgreSQL, TailwindCSS, JavaScript, GenAI",
            date: "Nov 2025",
            description: [
                "Emotionally adaptive health app featuring a 10-emotion AI nurse with real-time behavior responses.",
                "Built analytics dashboard with 7-day insights, co-care score, streaks, and live routine monitoring.",
                "Integrated reminders, browser notifications, medical history manager, and AI first-aid support with Perplexity AI."
            ],
            links: {
                github: "https://github.com/AanandPandit/NurseAI_Exo-p01",
                demo: "https://youtu.be/GhPHHCBxHcg"
            },
            images: []
        },
        {
            title: "GreenHouse: Agri-Farming Monitoring System",
            tech: "PyQt5, Fluvio, Flask, Sensor Simulation",
            date: "Apr 2025",
            achievement: "🏆 2nd Prize Winner - HackHazards 2025",
            description: [
                "Built real-time greenhouse dashboard with live sensor charts for temperature, humidity, and soil moisture.",
                "Implemented Fluvio-based data streaming pipeline with simulated IoT sensors and device controls.",
                "Designed responsive web UI using Flask and Chart.js for monitoring and manual actuator control."
            ],
            links: {
                github: "https://github.com/AanandPandit/hackhazards25_green-house-agri-farming",
                demo: "https://youtu.be/ubT7Vlt_fJ4"
            },
            images: []
        },
        {
            title: "HackerOS: High-Performance Productivity Suite",
            tech: "C++, PyQt5, GenAI",
            date: "Mar 2024 – Jul 2024",
            description: [
                "Personal project that boosted task, habit, and goal management efficiency in one unified interface.",
                "Achieved fast real-time analytics and smooth UI performance.",
                "Enabled intelligent in-app automation and rapid research browser through seamless integration of the Perplexity AI assistant."
            ],
            links: {
                github: "https://github.com/AanandPandit/out-of-box-habits",
                demo: ""
            },
            images: [
                "/assets/hackeros/hackeros_dashboard.png",
                "/assets/hackeros/habits_manager.png",
                "/assets/hackeros/web_browser.png"
            ]
        }
    ],
    certifications: [
        { title: "Oracle AI Vector Search Certified Professional", issuer: "Oracle University" },
        { title: "Google Cybersecurity Professional Certificate", issuer: "Coursera" },
        { title: "Machine Learning", issuer: "Internshala" },
        { title: "Diploma in Computer Application", issuer: "N.S. College of Software & Hardware Engineering" },
        { title: "Workshop on Electronics & Robotics", issuer: "Robotics Association of Nepal" },
        { title: "Workshop on IoT & Robotics", issuer: "Mohan Babu University" }
    ],
    languages: [
        { language: "English, Nepali, Hindi", proficiency: "Advance" },
        { language: "Telugu", proficiency: "Intermediate" }
    ]
};
