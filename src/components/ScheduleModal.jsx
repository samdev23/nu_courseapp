import { useState } from 'react';
import 'C:/Users/samj9/Desktop/samj_courseapp/src/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

const ScheduleDialog = ({children, open, close}) => (
        <div
          className={`modal ${open ? 'modal-show' : ''}`}
          tabIndex="-1"
          role="dialog"
          onClick={(evt) => { if (evt.target === evt.currentTarget) close(); }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="btn-close" aria-label="Close"
                  onClick={close}
                />
              </div>
              <div className="modal-body">
                {children}
              </div>
            </div>
          </div>
        </div>
);

const CourseCart = ({selectedCourses}) => (
    <div className = 'Cart'>
      <h5>Your Course Schedule</h5>
      {
        selectedCourses.length === 0
        ? <h5>No courses have been selected. Please select a course card to see your selections here.</h5>
        : selectedCourses.map(course => (
            <div key={course.id}>
              CS {course.number}: {course.title}, {course.meets}
            </div>
          ))
      }
    </div>
  );

export const ScheduleModal = ({selectedCourses}) => {
    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);
  
    return (
        <div>
        <button className="btn btn-outline-dark me-auto" onClick={openModal}><i className="bi bi-book"></i></button>
        <ScheduleDialog open={open} close={closeModal}>
            <CourseCart selectedCourses={selectedCourses} />
        </ScheduleDialog>
        </div>
  );
};