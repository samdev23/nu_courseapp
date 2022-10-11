import 'bootstrap/dist/css/bootstrap.min.css';

export const CourseList = ({course}) => (

    <div className="card m-1 p-2">
            <div className="card-body">
                <h5 className="card-title">{course.term} CS{course.number}</h5>
                <p className="card-text">{course.title}</p>
                <p className='card-footer bg-transparent border-success'>{course.meets}</p>
        </div>
    </div>
    
    
);

/*"display: grid; grid-template-columns: repeat(auto-fill, 14rem);" */