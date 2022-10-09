export const CourseList = ({course}) => (
    <div className ="card-list">
        <div>
            <p>{course.term} CS{course.number}</p>
            <p>{course.title}</p>
        </div>
    </div>
);
