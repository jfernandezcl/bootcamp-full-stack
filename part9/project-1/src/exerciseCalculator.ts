interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(hours: number[], target: number): ExerciseResult {
  const periodLength = hours.length;
  const trainingDays = hours.filter((hour) => hour > 0).length;
  const totalHours = hours.reduce((acc, hour) => acc + hour, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "Great job! You met your goal.";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "Not too bad but could be better.";
  } else {
    rating = 1;
    ratingDescription = "You need to push harder.";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))