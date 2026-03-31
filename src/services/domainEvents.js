// Domain events data
export const DOMAIN_EVENTS = {
  zhuque: [
    {
      id: "git-real-1",
      title: "Git Real: Version Control in Practice",
      description:
        "Learn Git & GitHub workflows (commits, branching, collaboration). Master the fundamentals of version control and collaborative development.",
      date: "2024-04-15",
      time: "10:00 AM - 12:00 PM",
      location: "Virtual",
      instructor: "Sarah Chen",
      capacity: 50,
      registered: 32,
      difficulty: "Beginner",
      tags: ["Git", "GitHub", "Version Control"],
      image: "/git-workshop.jpg",
    },
    {
      id: "web-foundations-1",
      title: "Web Foundations: Build Your First Site",
      description:
        "Build and deploy a basic website using HTML, CSS, JavaScript. Learn the core technologies that power the web.",
      date: "2024-04-16",
      time: "2:00 PM - 5:00 PM",
      location: "Room 101",
      instructor: "Mike Johnson",
      capacity: 40,
      registered: 28,
      difficulty: "Beginner",
      tags: ["HTML", "CSS", "JavaScript"],
      image: "/web-dev.jpg",
    },
    {
      id: "stack-lab-1",
      title: "Stack Lab: Build a Full-Stack App",
      description:
        "Develop a complete application with frontend, backend, and APIs. Experience the full development lifecycle.",
      date: "2024-04-18",
      time: "9:00 AM - 4:00 PM",
      location: "Lab 203",
      instructor: "Alex Rivera",
      capacity: 30,
      registered: 25,
      difficulty: "Intermediate",
      tags: ["React", "Node.js", "MongoDB"],
      image: "/fullstack.jpg",
    },
  ],
  qinglong: [
    {
      id: "ml-lab-1",
      title: "ML Lab: Build Your First End-to-End Model",
      description:
        "Cover data processing, model building, evaluation, and deployment. Hands-on machine learning from start to finish.",
      date: "2024-04-20",
      time: "10:00 AM - 3:00 PM",
      location: "AI Lab",
      instructor: "Dr. Emily Zhang",
      capacity: 25,
      registered: 22,
      difficulty: "Intermediate",
      tags: ["Python", "Scikit-learn", "TensorFlow"],
      image: "/ml-workshop.jpg",
    },
  ],
  baihu: [
    {
      id: "circuits-1",
      title: "Open Circuits: Exploring Open-Source Hardware",
      description:
        "Introduction to electronics through simulation and circuit design. Build your first electronic projects.",
      date: "2024-04-22",
      time: "1:00 PM - 4:00 PM",
      location: "Electronics Lab",
      instructor: "Prof. David Kim",
      capacity: 20,
      registered: 18,
      difficulty: "Beginner",
      tags: ["Electronics", "Arduino", "Circuit Design"],
      image: "/electronics.jpg",
    },
  ],
  xuanwu: [
    {
      id: "design-dev-1",
      title: "Design to Dev: UI/UX for Real Projects",
      description:
        "Learn UI/UX fundamentals and convert designs into real interfaces. Bridge the gap between design and development.",
      date: "2024-04-25",
      time: "11:00 AM - 2:00 PM",
      location: "Design Studio",
      instructor: "Lisa Park",
      capacity: 35,
      registered: 30,
      difficulty: "Beginner",
      tags: ["UI/UX", "Figma", "Prototyping"],
      image: "/design-workshop.jpg",
    },
  ],
  cross: [
    {
      id: "first-pr-1",
      title: "First PR: From Zero to Open Source",
      description:
        "Guided session to make the first real open-source contribution. Learn the open-source workflow.",
      date: "2024-04-28",
      time: "3:00 PM - 5:00 PM",
      location: "Virtual",
      instructor: "Tom Wilson",
      capacity: 60,
      registered: 45,
      difficulty: "Beginner",
      tags: ["Open Source", "GitHub", "Contributing"],
      image: "/opensource.jpg",
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
