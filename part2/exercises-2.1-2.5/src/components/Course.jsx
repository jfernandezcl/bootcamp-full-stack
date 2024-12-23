import Header from './Header'
import Content from './Content'

const Course = ({ course }) => {

  const totalExercises = course.parts.reduce((sum, part) => {
    console.log("Current sum:", sum, "Current part:", part)
    return sum + part.exercises;
  }, 0)

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <p><strong>Total of {totalExercises} exercises</strong></p>
    </div>
  )
}

export default Course