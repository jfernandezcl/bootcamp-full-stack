interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export function calculateExercises(hours: number[], target: number): ExerciseResult {
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

// Manejo de argumentos de línea de comandos
try {
  const args = process.argv.slice(2);
  if (args.length < 2) throw new Error("Please provide the target and daily hours as arguments.");

  const target = Number(args[0]);
  const hours = args.slice(1).map((hour) => Number(hour));

  if (isNaN(target) || hours.some((hour) => isNaN(hour))) {
    throw new Error("All arguments must be numbers.");
  }

  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Error:", error.message);
  } else {
    console.error("Unknown error occurred.");
  }
}
