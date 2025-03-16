
const Course = ({ course }) => {
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <h2>{course.name}</h2>
            <table>
                <tbody>
                    {course.parts.map((part) => 
                    <tr key={part.id}>
                        <td>{part.name}</td>
                        <td>{part.exercises}</td>
                    </tr>)}
                </tbody>
            </table>
            <h4>total of {total} exercises</h4>
        </div>
    )
}
export default Course;