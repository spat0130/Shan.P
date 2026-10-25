// All site copy lives here so content can be swapped in later (Phase 4).
const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
const LOREM_SHORT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

export const profile = {
  name: 'Shanmuka Patchigolla',
  firstName: 'Shanmuka',
  lastName: 'Patchigolla',
  shortName: 'Shan',
  location: 'Melbourne, VIC',
  role: 'Builder · Business Analyst · Problem Solver',
  tagline: 'Builder. Problem solver. Always learning.',
  intro: LOREM,
  bio: [LOREM + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.', LOREM_SHORT],
}

// The scroll narrative, one entry per storyboard frame.
export const scenes = [
  { id: 'arrival', number: '01', title: 'The Arrival', caption: 'The journey begins...', image: '/scenes/01-arrival.webp' },
  { id: 'ready', number: '02', title: 'Ready to Move', caption: 'Focus. Control. Next stop.', image: '/scenes/02-ready.webp' },
  { id: 'dismount', number: '03', title: 'Dismount', caption: 'Time to step off...', image: '/scenes/03-dismount.webp' },
  { id: 'walk', number: '04', title: 'Walk Into My World', caption: 'Same streets. New perspective.', image: '/scenes/04-walk.webp' },
  { id: 'builder', number: '05', title: 'Meet the Builder', caption: 'Builder. Problem solver. Always learning.', image: '/scenes/05-builder.webp' },
  { id: 'projects', number: '06', title: 'Projects in Motion', caption: 'Ideas → Code → Real Impact.', image: '/scenes/06-projects.webp' },
  { id: 'connect', number: '07', title: "Let's Connect", caption: 'Open to opportunities, collaborations and new ideas.', image: '/scenes/07-connect.webp' },
]

// Scene 02: what drives the work.
export const principles = [
  { label: 'Focus', text: LOREM_SHORT },
  { label: 'Control', text: LOREM_SHORT },
  { label: 'Next stop', text: LOREM_SHORT },
]

// Scene 03: quick numbers.
export const stats = [
  { value: '00+', label: 'Lorem ipsum' },
  { value: '00', label: 'Dolor sit' },
  { value: '00+', label: 'Amet elit' },
]

// Scene 04: the journey so far.
export const timeline = Array.from({ length: 4 }, (_, i) => ({
  id: `milestone-${i + 1}`,
  period: '20XX – 20XX',
  title: `Milestone ${String(i + 1).padStart(2, '0')}`,
  place: 'Lorem ipsum',
  text: LOREM_SHORT,
}))

// Scene 05: toolkit.
export const skills = ['Lorem', 'Ipsum', 'Dolor', 'Sit amet', 'Consectetur', 'Adipiscing', 'Elit', 'Tempor', 'Incididunt', 'Labore']

// Scene 06: focus areas from the storyboard, used as project categories.
export const focusAreas = [
  'AI & Responsible AI',
  'Business Analytics & Data',
  'Accessibility & Inclusion',
  'Computer Vision & ML',
  'Navigation & Real World Impact',
]

// Placeholder project slots. Fill in real projects later.
export const projects = Array.from({ length: 6 }, (_, i) => ({
  id: `project-${i + 1}`,
  title: `Project ${String(i + 1).padStart(2, '0')}`,
  category: focusAreas[i % focusAreas.length],
  summary: LOREM,
  tags: ['Lorem', 'Ipsum', 'Dolor'],
  link: '#',
}))

export const contact = {
  heading: "Let's Connect",
  text: 'Open to opportunities, collaborations and new ideas.',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shan-pat', icon: 'linkedin' },
    { label: 'GitHub', href: '#', icon: 'github' },
    { label: 'Email', href: 'mailto:shan.everything@gmail.com', icon: 'email' },
    { label: 'Resume', href: '#', icon: 'resume' },
  ],
}
