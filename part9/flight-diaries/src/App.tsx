import React, { useEffect, useState } from "react";
import { getAllDiaries } from "./services/diaryService";
import { DiaryEntry } from "./types";

const App: React.FC = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const data = await getAllDiaries();
        setDiaries(data);
      } catch (error) {
        console.error("Failed to fetch diaries:", error);
      }
    };

    fetchDiaries();
  }, []);

  return (
    <div>
      <h1>Flight Diaries</h1>
      {diaries.length === 0 ? (
        <p>No diaries available</p>
      ) : (
        <ul>
          {diaries.map((diary) => (
            <li key={diary.id}>
              <p><strong>Date:</strong> {diary.date}</p>
              <p><strong>Weather:</strong> {diary.weather}</p>
              <p><strong>Visibility:</strong> {diary.visibility}</p>
              {diary.comment && <p><strong>Comment:</strong> {diary.comment}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
