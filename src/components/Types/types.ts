// types.ts
export interface Task {
  id: string;
  summary: string;
  details: string;
}

export interface Tasks {
  [key: number]: Task[];
}