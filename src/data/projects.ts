/**
 * Project data.
 *
 * Only information you provided is filled in. Everything else is an editable placeholder:
 *   - github: paste the repository URL ("" keeps the GitHub button disabled).
 *   - demo:   paste a live demo URL ("" hides the Live Demo button).
 *   - image:  optional screenshot, e.g. "/projects/story2audio.png" (file in /public/projects).
 *             Without it, the custom illustration for the project is shown.
 *   - detailsPending: set to false once you've added the real highlights and tech stack.
 */
export type ProjectCategory = "Application" | "Computer Vision" | "Machine Learning" | "Research";
export type VisualKind = "audio" | "network" | "chat" | "vision" | "interview" | "flight" | "forecast";
export type VisualTone = "ink" | "olive" | "taupe" | "cream";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  highlights: string[];
  tech: string[];
  visual: VisualKind;
  tone: VisualTone;
  image?: string;
  github: string;
  demo: string;
  detailsPending?: boolean;
}

export const projects: Project[] = [
  {
    id: "story2audio",
    title: "Story2Audio",
    category: "Application",
    summary:
      "A Python and Flask app that turns written stories into audio narration, using pyttsx3 for offline text-to-speech.",
    highlights: [
      "Converts written stories into spoken audio narration.",
      "Uses pyttsx3 for text-to-speech, so narration works offline.",
      "Built with Python and Flask.",
    ],
    tech: ["Python", "Flask", "pyttsx3"],
    visual: "audio",
    tone: "olive",
    github: "",
    demo: "",
  },
  {
    id: "network-intrusion-detection",
    title: "Explainable Ensemble Deep Learning Model for Network Intrusion Detection",
    category: "Research",
    summary:
      "Network intrusion detection on the UNSW-NB15 dataset with an ensemble of deep learning models, and SHAP to explain the results.",
    highlights: [
      "Detects network intrusions using the UNSW-NB15 dataset.",
      "Uses an ensemble deep learning approach.",
      "Applies SHAP-based explainability to show what drives the model's predictions.",
    ],
    tech: ["UNSW-NB15", "Ensemble Deep Learning", "SHAP"],
    visual: "network",
    tone: "ink",
    github: "",
    demo: "",
  },
  {
    id: "supportmate-ai",
    title: "SupportMate-AI",
    category: "Application",
    summary:
      "An AI-powered customer support application built with React, TypeScript and FastAPI, designed to support customer service workflows.",
    highlights: [
      "AI-powered customer support application.",
      "React and TypeScript front end with a FastAPI back end.",
      "Designed to support customer service workflows.",
    ],
    tech: ["React", "TypeScript", "FastAPI"],
    visual: "chat",
    tone: "cream",
    github: "",
    demo: "",
  },
  {
    id: "next-vision-studio",
    title: "Next Vision Studio",
    category: "Computer Vision",
    summary:
      "A computer vision application built with FastAPI, React, TypeScript, Vite, OpenCV and YOLO.",
    highlights: [
      "Computer vision application with a React, TypeScript and Vite front end.",
      "FastAPI back end.",
      "Uses OpenCV and YOLO for the vision work.",
    ],
    tech: ["FastAPI", "React", "TypeScript", "Vite", "OpenCV", "YOLO"],
    visual: "vision",
    tone: "taupe",
    github: "",
    demo: "",
  },
  {
    id: "prepifyai",
    title: "PrepifyAI",
    category: "Application",
    summary: "An AI-powered interview preparation project. More details coming soon.",
    highlights: ["AI-powered interview preparation project."],
    tech: [],
    visual: "interview",
    tone: "ink",
    github: "",
    demo: "",
    detailsPending: true,
  },
  {
    id: "flight-delay-prediction",
    title: "Flight Delay Prediction",
    category: "Machine Learning",
    summary:
      "A machine learning project that predicts flight delays, covering data preprocessing, model development and evaluation.",
    highlights: [
      "Predicts flight delays with machine learning.",
      "Covers data preprocessing, model development and evaluation.",
    ],
    tech: ["Machine Learning", "Data Preprocessing", "Model Evaluation"],
    visual: "flight",
    tone: "cream",
    github: "",
    demo: "",
  },
  {
    id: "retail-sales-forecasting",
    title: "Retail Sales Prediction & Demand Forecasting",
    category: "Machine Learning",
    summary:
      "Machine learning and predictive analytics for retail sales and demand forecasting, using Python, Pandas, Scikit-learn and XGBoost.",
    highlights: [
      "Predicts retail sales and forecasts demand.",
      "Machine learning and predictive analytics.",
      "Built with Python, Pandas, Scikit-learn and XGBoost.",
    ],
    tech: ["Python", "Pandas", "Scikit-learn", "XGBoost"],
    visual: "forecast",
    tone: "olive",
    github: "",
    demo: "",
  },
];

export const projectCategories: ProjectCategory[] = [
  "Application",
  "Computer Vision",
  "Machine Learning",
  "Research",
];
