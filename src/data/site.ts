/**
 * Central place for personal details. Edit the values marked EDIT.
 */
export const site = {
  name: "Fizza Sarfraz",
  brand: "FIZZA SARFRAZ.",
  title: "AI Developer & Machine Learning Engineer",

  // EDIT: replace with your real contact details.
  email: "fizzasarfraz515@gmail.com",
  linkedin: "https://www.linkedin.com/in/fizza-sarfraz-45aa052a2/",
  fiverr: "https://www.fiverr.com/sellers/fizzasarfraz1",

  github: "https://github.com/fizzasarfraz515",

  // EDIT: shown in the About section. Change or remove if you prefer.
  location: "Islamabad, Pakistan",

  // EDIT: put your photo in /public (for example public/profile.jpg) and set "/profile.jpg".
  // While this is empty, a clean placeholder is shown.
  profileImage: "",

  availability: {
    // Set to false to switch the hero badge to a neutral message.
    open: true,
    openLabel: "Available for freelance projects and collaborations",
    closedLabel: "Not taking new projects right now",
  },
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const roles = [
  "AI Developer",
  "Machine Learning Engineer",
  "Python Developer",
  "Computer Vision Developer",
  "Aspiring AI Researcher",
];

/** "https://www.linkedin.com/in/x/" -> "linkedin.com/in/x" */
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}
