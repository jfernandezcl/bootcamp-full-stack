export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);

  if (bmi < 18.5) return 'Underweight';
  if (bmi >= 18.5 && bmi <= 24.9) return 'Normal (healthy weight)';
  if (bmi >= 25 && bmi <= 29.9) return 'Overweight';
  return 'Obese';
}

try {
  const args = process.argv.slice(2);
  if (args.length !== 2) throw new Error("Please provide height and weight as two arguments.");

  const height = Number(args[0]);
  const weight = Number(args[1]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Both height and weight must be numbers.");
  }

  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Error:", error.message);
  } else {
    console.error("Unknown error occurred.");
  }
}
