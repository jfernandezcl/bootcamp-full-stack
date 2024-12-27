export interface DiaryEntry {
  id: number;
  date: string;
  weather: "sunny" | "rainy" | "cloudy" | "stormy";
  visibility: "great" | "good" | "ok" | "poor";
  comment?: string;
}
