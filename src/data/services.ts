import {
  AppWindow,
  BarChart3,
  BrainCircuit,
  Code2,
  ScanEye,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: "Machine Learning Solutions",
    description:
      "Predictive models built around your data: cleaning, training, evaluation, and a clear explanation of what the model does and where it falls short.",
    icon: BrainCircuit,
  },
  {
    title: "AI Application Development",
    description:
      "Web apps with AI at the core, from the React interface to the FastAPI service behind it.",
    icon: AppWindow,
  },
  {
    title: "Computer Vision Solutions",
    description:
      "Image and video features such as object detection with OpenCV and YOLO, delivered as a simple app or API.",
    icon: ScanEye,
  },
  {
    title: "Python Development",
    description:
      "Clean scripts, tools and Flask or FastAPI back ends that automate a task or power your product.",
    icon: Code2,
  },
  {
    title: "Data Analysis & Visualization",
    description:
      "Turn spreadsheets and databases into clear findings and charts you can share with your team.",
    icon: BarChart3,
  },
  {
    title: "AI Integration & Automation",
    description:
      "Connect AI features to the tools you already use and automate repetitive steps through reliable APIs.",
    icon: Workflow,
  },
];
