  import 'bootstrap/dist/css/bootstrap.min.css';
  import { useState } from 'react';
  
  const terms = ['Fall', 'Winter', 'Spring'];
  
  //CourseList Component
  //Make it so that courses appear in a grid pattern
  //"display: grid; grid-template-columns: repeat(auto-fill, 14rem);" 

  //Find another identifier besides course number
  
  export const CourseList = ({key, selection, course, toggleSelected, selected}) => {
      if (selection == 0) { selection = "Fall";}
      if (course.term == selection) {
      return (
      <div className={`card m-1 p-2 ${selected.includes(course.number) ? 'bg-secondary' : ''}`} onClick={() => toggleSelected(course.number)} >
              <div className="card-body">
                  <h5 className="card-title">{course.term} CS{course.number}</h5>
                  <p className="card-text">{course.title}</p>
                  <p className='card-footer bg-transparent border-success'>{course.meets}</p>
          </div>
      </div>
      )
      }
  };
  
  /*"display: grid; grid-template-columns: repeat(auto-fill, 14rem);" */
  
  //TermSelector Component
  
  const TermButton = ({term, selection, setSelection}) => (
    <div>
      <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
        onChange={() => setSelection(term)} />
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

    const toggleSelected = (course) => setSelected (
        selected.includes(course)
        ? selected.filter(x => x !== course)
        : [...selected, course]
    );
    
    return (
      <div>
          <TermSelector selection={selection} setSelection={setSelection} />
          <div className="row">
              <div className="col-sm-6">
              { Object.entries(data.courses).map(([id, course]) => <CourseList selection = {selection} key={id} course={course} toggleSelected = {toggleSelected} selected = {selected}/>) }
              </div>
          </div>
      </div>
  )
  };