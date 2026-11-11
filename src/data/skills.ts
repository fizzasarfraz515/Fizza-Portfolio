import { Boxes, Braces, Brain, Layers, Wrench, type LucideIcon } from "lucide-react";

export interface SkillCategory {
  id: string;
  label: string;
  blurb: string;
  icon: LucideIcon;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    label: "Programming",
    blurb: "The languages I write code in.",
    icon: Braces,
    skills: ["Python", "SQL", "JavaScript", "TypeScript"],
  },
  {
    id: "ai-ml",
    label: "AI & Machine Learning",
    blurb: "The areas I study and build in.",
    icon: Brain,
    skills: [
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Computer Vision",
      "Generative AI",
      "Explainable AI",
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks & Libraries",
    blurb: "Libraries for models, vision and data.",
    icon: Boxes,
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "OpenCV", "YOLO", "Pandas", "NumPy"],
  },
  {
    id: "development",
    label: "Development",
    blurb: "Back ends, front ends and databases around the models.",
    icon: Layers,
    skills: ["FastAPI", "Flask", "React", "Node.js", "REST APIs", "MongoDB", "PostgreSQL"],
  },
  {
    id: "tools",
    label: "Tools",
    blurb: "What I use day to day for experiments and version control.",
    icon: Wrench,
    skills: ["Git", "GitHub", "Google Colab", "Jupyter Notebook", "VS Code"],
  },
];

export const totalSkills = skillCategories.reduce((sum, c) => sum + c.skills.length, 0);
