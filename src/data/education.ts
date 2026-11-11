export interface EducationEntry {
  degree: string;
  institution: string;
  detail: string;
  period: string;
  current: boolean;
}

export const education: EducationEntry[] = [
  {
    degree: "MS Artificial Intelligence",
    institution: "National University of Sciences and Technology (NUST)",
    detail: "College of E&ME, Islamabad",
    period: "In progress",
    current: true,
  },
  {
    degree: "BS Artificial Intelligence",
    institution: "FAST National University of Computer and Emerging Sciences",
    detail: "Islamabad Campus",
    period: "2022 to 2026",
    current: false,
  },
];
