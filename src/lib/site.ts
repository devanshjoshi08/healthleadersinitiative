/**
 * ============================================================================
 *  HLI - SITE CONTENT (edit everything here)
 * ============================================================================
 *  This is the single source of truth for the site's editable content.
 *  Update names, links, dates, and copy below - no need to touch any page code.
 *  Anything marked `TODO` is a placeholder to replace with real info.
 * ============================================================================
 */

export const site = {
  name: "Health Leaders Initiative",
  shortName: "HLI",
  school: "Cypress Woods High School",
  tagline: "Empowering the next generation of healthcare leaders.",
  motto: "Empowering leaders. Improving health. Shaping change.",
  description:
    "Health Leaders Initiative (HLI) is a student-led club at Cypress Woods High School that prepares future medical professionals with the mentorship, resources, and hands-on experiences to lead in healthcare.",
  url: "https://health-leaders-initiative.vercel.app",

  // --- How members join / meeting details -----------------------------------
  join: {
    remindClassCode: "@cwhli",
    remindText: {
      to: "81010",
      message: "@cwhli",
    },
    meeting: {
      time: "2:40 to 3:30 PM",
      room: "Room 1264 (Mr. Dewey's Room)",
      cadence: "Meetings and callouts announced on Remind and Instagram",
    },
  },

  // --- Social + contact ------------------------------------------------------
  socials: {
    instagram: {
      handle: "@cwhli",
      url: "https://instagram.com/cwhli",
    },
  },

  contact: {
    // TODO: replace with the club's real contact email
    email: "cwoodshli@gmail.com",
    sponsor: "Mr. Dewey", // TODO: confirm sponsor name/title
    sponsorRoom: "Room 1264",
  },
};

// --- Navigation --------------------------------------------------------------
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/mission", label: "Our Mission" },
  { href: "/officers", label: "Officer Team" },
  { href: "/events", label: "Projects & Events" },
  { href: "/forms", label: "Forms" },
  { href: "/contact", label: "Contact" },
] as const;

// --- Homepage impact stats (placeholders - update with real numbers) ---------
export const stats = [
  { value: "150+", label: "Future healthcare leaders" },
  { value: "1,000+", label: "Volunteer hours pledged" },
  { value: "12+", label: "Projects & events a year" },
  { value: "8", label: "Medical specialties explored" },
];

// --- What we offer (value pillars) -------------------------------------------
export const pillars = [
  {
    icon: "Stethoscope",
    title: "Clinical Exposure",
    body: "Guest physicians, hands-on skill workshops, and simulations that bring real medicine into the classroom.",
  },
  {
    icon: "GraduationCap",
    title: "Academic Guidance",
    body: "Pre-med roadmaps, course planning, research pointers, and college & scholarship support built for high schoolers.",
  },
  {
    icon: "HeartHandshake",
    title: "Service & Volunteering",
    body: "Meaningful community health projects that build the volunteer hours and impact that define strong applicants.",
  },
  {
    icon: "Users",
    title: "Leadership Development",
    body: "Officer roles, committees, and project ownership that turn members into confident, resume-ready leaders.",
  },
];

// --- Officer team (placeholders - replace names/photos) ----------------------
// `image` can be a path in /public (e.g. "/officers/jane.jpg"); leave "" to
// show an elegant initials avatar automatically.
export type Officer = {
  name: string;
  role: string;
  grade?: string;
  bio?: string;
  image?: string;
};

export const officers: Officer[] = [
  {
    name: "Aashee Joshi",
    role: "Founder & President",
    grade: "Class of 2029",
    bio: "Started HLI to give students at Cy Woods a real head start in medicine. Sets our vision, runs our meetings, and leads the officer team.",
    image: "",
  },
  {
    name: "Vedashree Khutale",
    role: "Vice President",
    grade: "Class of 2029",
    bio: "Second in command. Drives our projects forward and leads community outreach and partnerships.",
    image: "",
  },
  {
    name: "Ruzin Chettri",
    role: "Secretary",
    grade: "Class of 2029",
    bio: "Keeps HLI organized. Manages records, attendance, member communication, and the planning behind our events.",
    image: "",
  },
  {
    name: "Neha Reddy",
    role: "Treasurer",
    grade: "Class of 2029",
    bio: "Manages our budget, dues, and fundraising so every meeting, project, and event can actually happen.",
    image: "",
  },
  {
    name: "Nitya Pandey",
    role: "Co-Social Media Director",
    grade: "Class of 2029",
    bio: "Runs @cwhli alongside Janaki and keeps members in the loop on everything HLI.",
    image: "",
  },
  {
    name: "Janaki Sreekanth Nair",
    role: "Co-Social Media Director",
    grade: "Class of 2029",
    bio: "Runs @cwhli alongside Nitya and shares our story with the Cy Woods community.",
    image: "",
  },
  {
    name: "Mr. Dewey",
    role: "Faculty Sponsor",
    grade: "Cypress Woods HS",
    bio: "Our faculty advisor and the host of HLI meetings in Room 1264.",
    image: "",
  },
];

// --- Upcoming projects & events (placeholders) -------------------------------
export type EventItem = {
  title: string;
  date: string;
  time?: string;
  location?: string;
  type: "Meeting" | "Workshop" | "Volunteering" | "Guest Speaker" | "Fundraiser" | "Social";
  description: string;
  status: "upcoming" | "recurring" | "planning";
};

export const events: EventItem[] = [
  {
    title: "Interest Meeting & Club Kickoff",
    date: "First meeting of the year",
    time: site.join.meeting.time,
    location: site.join.meeting.room,
    type: "Meeting",
    description:
      "An intro to HLI, fun medical-themed games, and a look at everything we have planned for the year. Free food, free entry, and bring a friend.",
    status: "upcoming",
  },
  {
    title: "Physician Guest Speaker Series",
    date: "TODO: date",
    location: site.join.meeting.room,
    type: "Guest Speaker",
    description:
      "Local doctors and healthcare professionals share their journeys, specialties, and advice for aspiring med students.",
    status: "planning",
  },
  {
    title: "Hands-On Clinical Skills Workshop",
    date: "TODO: date",
    location: site.join.meeting.room,
    type: "Workshop",
    description:
      "Practice real skills like taking vitals, CPR basics, and suturing demos, all guided by trained volunteers.",
    status: "planning",
  },
  {
    title: "Community Health Volunteering Day",
    date: "TODO: date",
    type: "Volunteering",
    description:
      "A club-wide service project supporting a local health cause. Earn volunteer hours while making an impact.",
    status: "planning",
  },
  {
    title: "Pre-Med Pathways Panel",
    date: "TODO: date",
    location: site.join.meeting.room,
    type: "Guest Speaker",
    description:
      "College students and mentors break down BS/MD programs, majors, MCAT, and building a standout application.",
    status: "planning",
  },
  {
    title: "Weekly Club Meetings",
    date: "Recurring",
    time: site.join.meeting.time,
    location: site.join.meeting.room,
    type: "Meeting",
    description:
      "Our regular meetings: activities, planning, guest sessions, and member time. Check Remind and Instagram for each week's agenda.",
    status: "recurring",
  },
];

// --- Forms (replace hrefs with real Google Form links) -----------------------
// Set `href` to your Google Form URL. While it's "#", the button shows a
// "coming soon" style so nothing looks broken before links are ready.
export type FormLink = {
  title: string;
  description: string;
  href: string;
  icon: string;
  cta: string;
};

export const forms: FormLink[] = [
  {
    title: "Meeting Sign-In",
    description:
      "New or returning? Sign in at each meeting so we can track attendance and keep you on the roster for updates and volunteer hours.",
    href: "#", // TODO: paste Google Form URL
    icon: "ClipboardCheck",
    cta: "Open Sign-In Form",
  },
  {
    title: "Membership Registration",
    description:
      "Officially join HLI. Tell us your name, grade, and interests so we can tailor the year to our members.",
    href: "#", // TODO: paste Google Form URL
    icon: "UserPlus",
    cta: "Register as a Member",
  },
  {
    title: "Volunteering Sign-Up",
    description:
      "Claim a spot at an upcoming service project or event and start logging real volunteer hours.",
    href: "#", // TODO: paste Google Form URL
    icon: "HeartHandshake",
    cta: "Sign Up to Volunteer",
  },
  {
    title: "Volunteer Hours Log",
    description:
      "Completed a project? Submit your hours here so we can verify and record them for you.",
    href: "#", // TODO: paste Google Form URL
    icon: "Clock",
    cta: "Log My Hours",
  },
];

// --- Mission values ----------------------------------------------------------
export const missionValues = [
  {
    icon: "Compass",
    title: "Guidance",
    body: "We make the path to medicine clear, from high school courses to college and beyond, so no student has to figure it out alone.",
  },
  {
    icon: "Sparkles",
    title: "Opportunity",
    body: "We open doors to experiences, mentors, and service that are hard to find on your own before college.",
  },
  {
    icon: "ShieldPlus",
    title: "Impact",
    body: "We channel our members' energy into real community health work that matters beyond the résumé.",
  },
  {
    icon: "TrendingUp",
    title: "Growth",
    body: "We help every member grow as a scholar, a leader, and a future professional, one project at a time.",
  },
];

// --- About: what makes us different -----------------------------------------
export const highlights = [
  {
    icon: "BookOpen",
    title: "Built for high schoolers",
    body: "Everything is designed for where you are right now. No prior experience needed, just curiosity about medicine and health.",
  },
  {
    icon: "Users",
    title: "A real community",
    body: "Meet peers who share your goals, learn from officers a few steps ahead, and grow together toward a common calling.",
  },
  {
    icon: "Microscope",
    title: "Hands-on, not just talk",
    body: "Workshops, simulations, guest professionals, and service projects turn interest into genuine experience.",
  },
];

// --- Mission: goals ----------------------------------------------------------
export const goals = [
  "Introduce students to the realities and rewards of careers in medicine.",
  "Provide mentorship and clear roadmaps for the pre-med and pre-health path.",
  "Create hands-on learning through workshops, guest speakers, and simulations.",
  "Open the door to meaningful volunteering and community health impact.",
  "Build leadership, teamwork, and communication skills that last beyond high school.",
  "Foster a supportive community where no student navigates their journey alone.",
];

/**
 * ALL editable page copy (headings, hero, subtitles, CTAs), grouped by page.
 * These are the fallback defaults; the Sanity "Page Text" document overrides
 * any field you fill in.
 */
export const copy = {
  home: {
    heroHeadlineLine1: "Empowering the next",
    heroHeadlineLine2: "generation of",
    heroHeadlineAccent: "healthcare leaders",
    heroSubtitle:
      "Health Leaders Initiative gives future medical students the mentorship, hands-on experiences, and community impact to stand out and to lead on the path to medicine.",
    whyEyebrow: "Why HLI",
    whyTitle: "More than a club. A launchpad into medicine.",
    whySubtitle:
      "Every meeting, project, and connection is built to give our members a real head start on a healthcare career.",
    missionEyebrow: "Our Mission",
    missionTitle: "Guiding students from curiosity to a calling in healthcare",
    missionSubtitle:
      "HLI is committed to empowering and preparing future medical students. We provide the guidance and resources to successfully support students on their pre-medical journey.",
    missionButton: "Read our full mission",
    officersEyebrow: "Officer Team",
    officersTitle: "Led by students, for students",
    officersSubtitle:
      "A dedicated team of student leaders drives everything HLI does. Meet the people behind the mission.",
    eventsEyebrow: "Projects & Events",
    eventsTitle: "What's coming up",
    eventsSubtitle:
      "From guest physicians to community service days, here is a taste of what members get to be part of.",
    ctaTitle: "Ready to start your journey in medicine?",
    ctaSubtitle:
      "Joining takes two minutes. Get on Remind, follow us on Instagram, and come to your first meeting. Free food and free entry, always.",
  },
  about: {
    heroEyebrow: "About HLI",
    heroTitle: "Where future doctors, nurses, and healthcare leaders begin.",
    heroSubtitle:
      "The Health Leaders Initiative (HLI) is a student-led organization at Cypress Woods High School committed to empowering and preparing the next generation of medical professionals.",
    whoEyebrow: "Who we are",
    whoTitle: "A club built for your pre-medical journey",
    whoParagraph1:
      "Health Leaders Initiative (HLI) is a student-founded club built to prepare the next generation of doctors, nurses, and healthcare leaders. Our goal is simple: give students who are serious about medicine the guidance, experiences, and community they actually need to get there.",
    whoParagraph2:
      "We meet at Cypress Woods High School to explore what medicine really looks like, from hands-on activities and medical games to guest speakers and meaningful volunteering. Whether you already know you want to be a physician or you are just curious about health careers, there is a place for you here.",
    whoParagraph3:
      "And it is genuinely fun. Our meetings are welcoming and low-pressure, with free food and free entry every single time.",
    whoButton: "Become a member",
    highlightsEyebrow: "What makes us different",
    highlightsTitle: "Real preparation, real people, real impact",
    experienceEyebrow: "Member experience",
    experienceTitle: "What you'll gain as a member",
    experienceSubtitle: "Four pillars shape every HLI meeting and project.",
  },
  mission: {
    heroEyebrow: "Our Mission",
    heroTitle: "Preparing and empowering the doctors of tomorrow.",
    heroSubtitle:
      "Everything we do is guided by one belief: with the right guidance and opportunities, any motivated student can thrive on the path to a healthcare career.",
    statementEyebrow: "Mission statement",
    statement:
      "The Health Leaders Initiative is committed to empowering and preparing future medical students. Our goal is to provide the guidance and resources to successfully support students in their pre-medical journey.",
    valuesEyebrow: "What we stand for",
    valuesTitle: "The values behind everything we do",
    goalsEyebrow: "Our goals",
    goalsTitle: "How we turn our mission into action",
    goalsSubtitle:
      "Concrete commitments that shape our meetings, projects, and community throughout the year.",
    goalsButton: "Join the mission",
  },
  officers: {
    heroEyebrow: "Officer Team",
    heroTitle: "The students leading the way.",
    heroSubtitle:
      "HLI is powered by a passionate team of student officers who plan every meeting, project, and event, guided by a dedicated faculty sponsor.",
    teamEyebrow: "Meet the team",
    teamTitle: "Your officer team",
    teamSubtitle:
      "The students who founded and now run HLI. Reach out any time to connect with a member of the team.",
    facultyEyebrow: "Faculty support",
    facultyTitle: "Our sponsor",
    recruitTitle: "Interested in a leadership role?",
    recruitBody:
      "HLI is always looking for motivated students to help lead. Come to a meeting or reach out to learn how you can join the officer team.",
  },
  events: {
    heroEyebrow: "Projects & Events",
    heroTitle: "Where members turn interest into experience.",
    heroSubtitle:
      "Meetings, workshops, guest physicians, and community service. Here is what is ahead this year. Dates are announced on Remind and Instagram.",
    calendarEyebrow: "On the calendar",
    calendarTitle: "Upcoming projects & events",
    calendarSubtitle:
      "A look at the signature experiences we're building for members this year.",
    ctaTitle: "Never miss an event",
  },
  forms: {
    heroEyebrow: "Forms",
    heroTitle: "Everything you need to get involved.",
    heroSubtitle:
      "Sign in at meetings, register as a member, and claim volunteering opportunities, all in one place.",
    formsEyebrow: "Member forms",
    formsTitle: "Sign in, sign up, and log your hours",
    formsSubtitle:
      "Tap a card to open its form. Bookmark this page, because you will come back to it all year.",
    quickEyebrow: "Prefer the quick way?",
    quickTitle: "Join HLI in under two minutes",
  },
  contact: {
    heroEyebrow: "Contact",
    heroTitle: "Let's connect.",
    heroSubtitle:
      "Questions about joining, volunteering, or partnering with HLI? Reach out. We would love to hear from you.",
    meetEyebrow: "Come say hi",
    meetTitle: "Where & when we meet",
    meetSubtitle: "No RSVP needed, just show up. Free food and free entry, always.",
    quickTitle: "Join in one step",
    quickSubtitle: "The fastest way to become part of HLI and never miss an update.",
  },
};

export type Copy = typeof copy;

// --- Flexible page-builder blocks (added from the /edit "Sections" tab) -------
export type Block = {
  id: string;
  type: "heading" | "text" | "image" | "gallery" | "button" | "video" | "quote" | "cards";
  heading?: string;
  body?: string;
  url?: string;
  caption?: string;
  label?: string;
  href?: string;
  author?: string;
  align?: "left" | "center";
  images?: string[];
  items?: { title: string; body: string }[];
};

export const blocks: Block[] = [];

// --- Site-wide announcement banner -------------------------------------------
export type Banner = { enabled: boolean; text: string; href?: string };
export const banner: Banner = { enabled: false, text: "", href: "" };
