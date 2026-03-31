import { supabase } from '../lib/supabase';

// Mock data to be used until Supabase backend is fully populated
const MOCK_DOMAINS = [
  {
    id: 'zhuque',
    name: 'Web Development',
    symbol: 'Vermilion Bird (Zhuque)',
    color: 'zhuque',
    bgLight: 'from-zhuque-dark/40 to-zhuque/10',
    border: 'border-zhuque/30',
    text: 'text-zhuque-light',
    image: '/bird_tiger.jpg',
    imagePosition: 'left center', // Crop left side internally
  },
  {
    id: 'qinglong',
    name: 'AI/ML',
    symbol: 'Azure Dragon (Qinglong)',
    color: 'qinglong',
    bgLight: 'from-qinglong-dark/40 to-qinglong/10',
    border: 'border-qinglong/30',
    text: 'text-qinglong-light',
    image: '/dragon.jpg',
    imagePosition: 'center',
  },
  {
    id: 'baihu',
    name: 'Systems & Electronics',
    symbol: 'White Tiger (Baihu)',
    color: 'baihu',
    bgLight: 'from-baihu-dark/40 to-baihu/10',
    border: 'border-baihu/30',
    text: 'text-baihu-light',
    image: '/bird_tiger.jpg',
    imagePosition: 'right center', // Crop right side internally
  },
  {
    id: 'xuanwu',
    name: 'Coding & Design',
    symbol: 'Black Tortoise (Xuanwu)',
    color: 'xuanwu',
    bgLight: 'from-xuanwu-dark/60 to-xuanwu/20',
    border: 'border-xuanwu/50',
    text: 'text-gray-300',
    image: '/tortoise.jpg',
    imagePosition: 'center',
  },
  {
    id: 'cross',
    name: 'Cross-Domain Sessions',
    symbol: 'The World Tree',
    color: 'primary',
    bgLight: 'from-primary/30 to-secondary/10',
    border: 'border-primary/30',
    text: 'text-indigo-300',
  }
];

const MOCK_WORKSHOPS = [
  { id: 'w1', domain_id: 'zhuque', title: 'Git Real: Version Control in Practice', desc: 'Learn Git & GitHub workflows (commits, branching, collaboration)' },
  { id: 'w2', domain_id: 'zhuque', title: 'Web Foundations: Build Your First Site', desc: 'Build and deploy a basic website using HTML, CSS, JavaScript' },
  { id: 'w3', domain_id: 'zhuque', title: 'Stack Lab: Build a Full-Stack App', desc: 'Develop a complete application with frontend, backend, and APIs' },
  { id: 'm1', domain_id: 'qinglong', title: 'ML Lab: Build Your First End-to-End Model', desc: 'Cover data processing, model building, evaluation, and deployment' },
  { id: 'm2', domain_id: 'qinglong', title: 'Inside LLMs: Attention, Transformers & Scaling', desc: 'Deep dive into modern AI systems and architectures' },
  { id: 's1', domain_id: 'baihu', title: 'Open Circuits: Exploring Open-Source Hardware', desc: 'Introduction to electronics through simulation and circuit design' },
  { id: 'c1', domain_id: 'xuanwu', title: 'Design to Dev: UI/UX for Real Projects', desc: 'Learn UI/UX fundamentals and convert designs into real interfaces' },
  { id: 'x1', domain_id: 'cross', title: 'First PR: From Zero to Open Source', desc: 'Guided session to make the first real open-source contribution' },
  { id: 'x2', domain_id: 'cross', title: 'Build to Stand Out', desc: 'Career-focused session on resumes, portfolios, and networking' },
];

/**
 * Fetch domain options from Supabase (or mock on initial dev)
 */
export async function getDomains() {
  try {
    // If your backend team creates a "domains" table, uncomment:
    /*
    const { data, error } = await supabase.from('domains').select('*');
    if (error) throw error;
    return data;
    */
    
    // Fallback to mock data for now
    return MOCK_DOMAINS;
  } catch (error) {
    console.error("Error fetching domains:", error);
    return [];
  }
}

/**
 * Fetch workshops and group them by domain, suitable for display
 */
export async function getDomainsWithWorkshops() {
  try {
    // Real Supabase implementation logic for the backend team:
    /*
    const { data: domains, error: domainError } = await supabase.from('domains').select('*');
    const { data: workshops, error: workshopError } = await supabase.from('workshops').select('*');
    if (domainError) throw domainError;
    if (workshopError) throw workshopError;
    */

    const domains = MOCK_DOMAINS;
    const workshops = MOCK_WORKSHOPS;

    // Join data for frontend
    return domains.map(domain => ({
      ...domain,
      workshops: workshops.filter(w => w.domain_id === domain.id)
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}
