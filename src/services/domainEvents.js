// Domain events data

const webfoundations = "/images/web_foundation.png";
const stacklab = "/images/stack_lab.png";
const mllab = "/images/ML_Labs.png";
const insidellms = "/images/Inside_llm.png";
const opencircuit = "/images/open_circuits.png";
const designtodev = "/images/design_to_dev.png";
const git_real = "/images/git_real.png";
const IEnClogo = "/images/IEnC_club.png";
const MOSSlogo = "/images/moss_github_transp.png";
const ISTElogo = "/images/ISTE_club.png";
const ACMlogo = "/images/acm_old.webp";
const ACMWlogo = "/images/acmw_old.webp";

// Clubs mapping - define all available clubs here
export const CLUBS_MAP = {
  MOSS: {
    id: "club-opensource",
    name: "MOSS",
    image: MOSSlogo,
    bio: "MOSS",
  },
  ACM: {
    id: "club-acm",
    name: "ACM",
    image: ACMlogo,
    bio: "ACM",
  },
  ACMW: {
    id: "club-acmw",
    name: "ACMW",
    image: ACMWlogo,
    bio: "ACMW",
  },
  "IE-EnC": {
    id: "club-ienc",
    name: "IE-EnC",
    image: IEnClogo,
    bio: "IE-EnC",
  },
  ISTE: {
    id: "club-iste",
    name: "ISTE",
    image: ISTElogo,
    bio: "ISTE",
  },
};

// Helper function to get club objects from club names
export function getClubsByNames(clubNames = []) {
  return clubNames.map(
    (name) => CLUBS_MAP[name] || { id: name, name, image: "" },
  );
}

export const DOMAIN_EVENTS = {
  eid_zhuque: [
    {
      id: "eid_web-foundations-1",
      title: "Web Foundations: Build Your First Site",
      shortDescription:
        "Start your web dev journey by building and deploying your first website.\nLearn HTML, CSS, and JavaScript in a simple, hands-on way.",
      description:
        "Every digital product starts with the web. This beginner-friendly workshop introduces participants to the fundamentals of web development through a fully hands-on approach.\n\nParticipants will build a simple website using HTML, CSS, and basic JavaScript, learning how structure, styling, and interactivity come together to create functional web pages. The session focuses on clarity and simplicity, making it accessible even to those with no prior experience.\n\nThe workshop concludes with deployment, allowing participants to host their website and turn it into a shareable project — providing an immediate starting point for portfolios and further development.",
      date: "2026-04-6",
      time: "5:00 PM",
      location: "To Be Decided",
      instructor: ["Anish", "Vishal Kumar"],
      speakers: [
        {
          id: "speaker-1",
          name: "Anish",
          role: "Workshop Instructor",
          image: "https://github.com/anishhreddy.png",
          githubUrl: "https://github.com/anishhreddy",
        },
        {
          id: "speaker-2",
          name: "Vishal Kumar",
          role: "Workshop Instructor",
          image: "https://github.com/Vishy-MK.png",
          githubUrl: "https://github.com/Vishy-MK",
        },
      ],
      capacity: 60,
      registered: 0,
      tags: ["HTML", "CSS", "JavaScript"],
      clubs: ["ACM", "MOSS"],
      image: webfoundations,
    },
    {
      id: "eid_stack-lab-1",
      title: "Stack Lab: Build a Full-Stack App",
      shortDescription:
        "Build a complete app from frontend to backend.\nUnderstand APIs, servers, and how real-world systems come together.",
      description:
        "Real-world applications require seamless interaction between frontend interfaces, backend systems, and data storage. This workshop provides a practical introduction to full-stack development by guiding participants through building a complete application.\n\nParticipants will set up a backend server, create API endpoints, and connect them to a frontend interface. The session demonstrates how data flows through an application and how different components interact in real-world systems.\n\nBy the end of the workshop, participants will have built and run a functional full-stack application, gaining a clear understanding of system architecture and development workflows used in industry and open-source projects.",
      date: "2026-04-7",
      time: "5:00 PM",
      location: "To Be Decided",
      instructor: ["Viraj Rahul Gupta", "Pratyush Misra"],
      speakers: [
        {
          id: "speaker-1",
          name: "Viraj Rahul Gupta",
          role: "Workshop Instructor",
          image: "https://github.com/sparrow7559.png",
          githubUrl: "https://github.com/sparrow7559",
        },
        {
          id: "speaker-2",
          name: "Pratyush Misra",
          role: "Workshop Instructor",
          image: "https://github.com/PrayatshuMisra.png",
          githubUrl: "https://github.com/PrayatshuMisra",
        },
      ],
      capacity: 60,
      registered: 0,
      tags: ["React", "Node.js", "MongoDB"],
      clubs: ["ISTE"],
      image: stacklab,
    },
  ],
  eid_qinglong: [
    {
      id: "eid_ml-lab-1",
      title: "ML Lab: Build Your First End-to-End Model",
      shortDescription:
        "Go beyond theory and build a complete ML project from scratch.\nFrom data to deployment — understand the full machine learning workflow.",
      description:
        "Machine learning is often taught in fragments, but real-world applications require understanding the entire pipeline. This workshop provides a structured, hands-on introduction to building a complete ML project from scratch.\n\nParticipants will define a problem, work with datasets, perform exploratory analysis, and train baseline models. The session emphasizes understanding model performance, handling overfitting, and improving results through simple optimization techniques.\n\nThe workshop concludes with an introduction to deployment, showing how models can be saved and presented through basic interfaces. By the end, participants will have built a functional ML project and gained clarity on how machine learning systems work end-to-end.",
      date: "2026-04-5",
      time: "10:00 AM",
      location: "To Be Decided",
      instructor: ["Dhruv Prakash", "Sarah", "Nihal B M"],
      speakers: [
        {
          id: "speaker-1",
          name: "Dhruv Prakash",
          role: "Workshop Instructor",
          image: "https://github.com/Dhruxp.png",
          githubUrl: "https://github.com/Dhruxp",
        },
        {
          id: "speaker-2",
          name: "Sarah",
          role: "Workshop Instructor",
          image: "https://github.com/sarahk2706.png",
          githubUrl: "https://github.com/sarahk2706",
        },
        {
          id: "speaker-3",
          name: "Nihal B M",
          role: "Workshop Instructor",
          image: "https://github.com/nihal-bm06.png",
          githubUrl: "https://github.com/nihal-bm06",
        },
      ],
      capacity: 60,
      registered: 0,
      tags: ["Python", "Scikit-learn", "TensorFlow"],
      clubs: ["MOSS"],
      image: mllab,
    },
    {
      id: "eid_ml-lab-2",
      title: "Inside LLMs: Attention, Transformers & Scaling",
      shortDescription:
        "Understand how modern AI actually works.\nExplore transformers, attention, and the ideas behind large language models.",
      description:
        "Modern AI systems are powered by large language models, but understanding how they work requires going beyond surface-level usage. This session provides a conceptual deep dive into the architecture and principles behind these systems.\n\nParticipants will explore transformer models, attention mechanisms, tokenization, and embeddings, gaining insight into how models process and generate language. The session also introduces scaling laws and training paradigms that define the performance of modern AI systems.\n\nDesigned for those looking to move beyond basic usage, this workshop connects theory with real-world AI systems and provides a foundation for exploring advanced topics and research directions.",
      date: "2026-04-5",
      time: "2:00 PM",
      location: "To Be Decided",
      instructor: ["Mrinal Dhami", "Shreyan"],
      speakers: [
        {
          id: "speaker-1",
          name: "Mrinal Dhami",
          role: "Workshop Instructor",
          image: "https://github.com/SolomonAureus.png",
          githubUrl: "https://github.com/SolomonAureus",
        },
        {
          id: "speaker-2",
          name: "Shreyan",
          role: "Workshop Instructor",
          image: "https://github.com/PrayatshuMisra.png",
          githubUrl: "https://github.com/PrayatshuMisra",
        },
      ],
      capacity: 60,
      registered: 0,
      tags: ["Python", "Scikit-learn", "TensorFlow"],
      clubs: ["ACM"],
      image: insidellms,
    },
  ],
  eid_baihu: [
    {
      id: "eid_circuits-1",
      title: "Open Circuits: Exploring Open-Source Hardware",
      shortDescription:
        "Step into electronics through hands-on circuit design and simulation.\nUnderstand how hardware works and how open-source powers real-world devices.",
      description:
        "Open source extends beyond software into the world of hardware, powering everything from IoT devices to embedded systems. This session introduces participants to the fundamentals of electronics through a hands-on, simulation-based approach.\n\nParticipants will learn how basic components like resistors, LEDs, and power sources interact within a circuit, and how these designs are created, tested, and shared using open-source tools. Using platforms like EasyEDA or similar environments, they will design and simulate simple circuits without requiring physical components.\n\nThe workshop also explores how hardware projects are documented and contributed to in open-source ecosystems, opening pathways into interdisciplinary domains like IoT and embedded systems.",
      date: "2026-04-3",
      time: "2:00 PM",
      location: "To Be Decided",
      instructor: ["Mahi Gupta", "Shreyan", "Pratham", "Sanvi Verma"],
      speakers: [
        {
          id: "speaker-1",
          name: "Mahi Gupta",
          role: "Workshop Instructor",
          image: "https://github.com/sparrow7559.png",
          githubUrl: "https://github.com/sparrow7559",
        },
        {
          id: "speaker-2",
          name: "Shreyan",
          role: "Workshop Instructor",
          image: "https://github.com/PrayatshuMisra.png",
          githubUrl: "https://github.com/PrayatshuMisra",
        },
        {
          id: "speaker-3",
          name: "Pratham",
          role: "Workshop Instructor",
          image: "https://github.com/Pratham-G-R.png",
          githubUrl: "https://github.com/Pratham-G-R",
        },
        {
          id: "speaker-4",
          name: "Saanvi Verma",
          role: "Workshop Instructor",
          image: "https://github.com/saanviverma29.png",
          githubUrl: "https://github.com/saanviverma29",
        },
      ],
      capacity: 60,
      registered: 0,
      tags: ["Electronics", "Arduino", "Circuit Design"],
      clubs: ["IE-EnC"],
      image: opencircuit,
    },
  ],
  eid_xuanwu: [
    {
      id: "eid_design-dev-1",
      title: "Design to Dev: UI/UX for Real Projects",
      shortDescription:
        "Design interfaces that actually work.\nLearn UI/UX fundamentals and turn your designs into real, functional frontend code.",
      description:
        "Good software isn't just functional — it's usable. This workshop focuses on the principles of UI/UX design and how they translate into real, working interfaces.\n\nParticipants will learn how to structure layouts, apply visual hierarchy, and think from a user's perspective while designing interfaces. The session goes beyond theory by demonstrating how these designs are implemented using frontend technologies.\n\nThrough guided exercises, participants will take a simple design concept and convert it into a functional interface, understanding how usability, accessibility, and responsiveness play a role in real-world applications. The workshop also highlights how UI/UX improvements are a valuable and accessible entry point into open-source contributions.",
      date: "2026-04-4",
      time: "5:00 PM",
      location: "To Be Decided",
      instructor: ["Vishal Kumar", "Nikita Bhonsale"],
      speakers: [
        {
          id: "speaker-1",
          name: "Vishal Kumar",
          role: "Workshop Instructor",
          image: "https://github.com/Vishy-MK.png",
          githubUrl: "https://github.com/Vishy-MK",
        },
        {
          id: "speaker-2",
          name: "Nikita Bhonsale",
          role: "Workshop Instructor",
          image: "https://github.com/nikitabhonsale.png",
          githubUrl: "https://github.com/nikitabhonsale",
        },
      ],
      capacity: 60,
      registered: 0,
      tags: ["UI/UX", "Figma", "Prototyping"],
      clubs: ["ACM"],
      image: designtodev,
    },
    {
      id: "eid_git-real-1",
      title: "Git Real: Version Control in Practice",
      shortDescription:
        "Learn how developers actually collaborate using Git and GitHub.\nTrack changes, work with branches, and contribute to real projects with confidence.",
      description:
        "Modern software is never built alone — it's built collaboratively, and version control is at the center of it. This hands-on session introduces participants to real-world Git and GitHub workflows used across industry and open-source projects.\n\nParticipants will learn how to track changes, manage code history, work with branches, and collaborate effectively using pull requests. Instead of just learning commands, the session focuses on understanding how developers actually work in teams, resolve conflicts, and maintain clean project histories.\n\nBy the end of the session, participants will be comfortable navigating repositories, contributing to shared codebases, and using Git as a practical tool rather than just a concept.",
      date: "2026-04-3",
      time: "10:00 AM",
      location: "To Be Decided",
      instructor: ["Siddhart U", "Bhuvi Sanga", "Aadya Singh"],
      speakers: [
        {
          id: "speaker-1",
          name: "Siddhart U",
          role: "Workshop Instructor",
          image: "https://github.com/mooofin.png",
          githubUrl: "https://github.com/mooofin",
        },
        {
          id: "speaker-2",
          name: "Bhuvi Sanga",
          role: "Workshop Instructor",
          image: "https://github.com/bhuvisanga.png",
          githubUrl: "https://github.com/bhuvisanga",
        },
        {
          id: "speaker-3",
          name: "Aadya Singh",
          role: "Workshop Instructor",
          image: "https://github.com/AadyaSingh123.png",
          githubUrl: "https://github.com/AadyaSingh123",
        },
      ],
      capacity: 60,
      registered: 0,
      tags: ["Git", "GitHub", "Version Control"],
      clubs: ["ACMW", "ISTE"],
      image: git_real,
    },
  ],
};

// Function to get events for a specific domain
export function getDomainEvents(domainId) {
  return DOMAIN_EVENTS[domainId] || [];
}

// Function to get all events
export function getAllEvents() {
  return Object.values(DOMAIN_EVENTS).flat();
}
