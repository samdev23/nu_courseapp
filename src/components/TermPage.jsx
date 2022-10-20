  import 'bootstrap/dist/css/bootstrap.min.css';
  import { useState } from 'react';
  import 'C:/Users/samj9/Desktop/samj_courseapp/src/App.css';
  import { ScheduleModal } from './ScheduleModal';
  import { createTimeConflictList } from '../utilities/time';
  import { CourseFormButton } from './CourseFormButton';
  
  const terms = ['Fall', 'Winter', 'Spring'];
  var timeConflicts = [];
  
  //CourseList Component
  export const CourseList = ({key, selection, course, toggleSelected, selected, timeConflicts}) => {
      console.log(timeConflicts);
      if (selection == 0) { selection = "Fall";}
      if (course.term == selection) {
      return (
        <div style = { timeConflicts.includes(course) ? {display: "none"}: {display:"block"}} className={`card m-1 p-2 ${selected.includes(course) ? 'bg-secondary' : ''}`} onClick={() => toggleSelected(course)}>
                <div className="card-body">
                    <h5 className="card-title">{course.term} CS{course.number}</h5>
                    <p className="card-text">{course.title}</p>
                    <p className='card-footer bg-transparent'>{course.meets}</p>
            </div>
            <CourseFormButton course = {course} />
        </div>
      )
      }
  };
  //TermSelector Component
  const TermButton = ({term, selection, setSelection}) => (
    <div>
      <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
        onChange={() => setSelection(term)}/>
      <label className="btn btn-success mb-1 p-2" htmlFor={term}>
      { term }
      </label>
    </div>
  );
  
  const TermSelector = ({selection, setSelection}) => (
    <div className="btn-group">
      { 
        terms.map(term => <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />)
      }
    </div>
  );
  
  //TermPage Component
  export const TermPage = ({data}) => {
    const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
    const [selected, setSelected] = useState([]);

    const toggleSelected = (course) => {setSelected (
        selected.includes(course)
        ? selected.filter(x => x !== course)
        : [...selected, course]
    )
    
    timeConflicts = createTimeConflictList(course, data.courses);
    console.log(timeConflicts);
    }
    
    //Make it so that schedule button is further to the right of the page
    return (
      <div>
          <TermSelector selection={selection} setSelection={setSelection} />
          <ScheduleModal selectedCourses = {selected} />
          <div className="course-list">
              { Object.entries(data.courses).map(([id, course]) => <CourseList selection = {selection} key={id} course={course} toggleSelected = {toggleSelected} selected = {selected} timeConflicts = {timeConflicts}/>) }
          </div>
      </div>
  )
  };