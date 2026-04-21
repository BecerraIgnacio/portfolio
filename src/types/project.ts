export type Status = "live" | "build" | "shipped" | "paused";
export type TapeColor = "green" | "blue" | "purple" | "orange" | "amber";
export type LineName = "deployed" | "assembly" | "lab";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  name: string;
  description: string;
  stack: string;
  status: Status;
  tape: TapeColor;
  line: LineName;
  href?: string;
  links: ProjectLink[];
}

export interface ProductionLineConfig {
  id: LineName;
  label: string;
  anchor: string;
  speed: number;
  beltDuration: number;
  rollerDuration: number;
}
