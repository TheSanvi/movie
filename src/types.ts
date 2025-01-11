export interface Show {
  id: number;
  name: string;
  summary: string;
  rating?: {
    average?: number;
  };
  genres?: string[];
  premiered?: string;
  status?: string;
  image?: {
    medium?: string;
    original?: string;
  };
}