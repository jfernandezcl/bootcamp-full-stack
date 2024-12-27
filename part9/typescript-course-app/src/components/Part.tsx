import { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises)
          <br />
          <i>{part.description}</i>
        </p>
      );
    case "group":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises)
          <br />
          Group projects: {part.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises)
          <br />
          <i>{part.description}</i>
          <br />
          Background material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
        </p>
      );
    case "special":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises)
          <br />
          <i>{part.description}</i>
          <br />
          Requirements: {part.requirements.join(", ")}
        </p>
      );
    default:
      return assertNever(part);
  }
};

// Helper para verificar exhaustividad
const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export default Part;
