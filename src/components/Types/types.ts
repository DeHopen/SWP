// types.ts
export interface Task {
  id: number;
  summary: string;
  details: string;
}

export interface Tasks {
  [key: number]: Task[];
}