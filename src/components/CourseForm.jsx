import { Link, Navigate, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useDbUpdate } from "../utilities/firebase";

var course_obj;
var courseObj_key;


const setCourse = (course, course_key) => {course_obj = course; courseObj_key = course_key}

export const CourseFormButton = ({course, course_key}) => {
    const navigate = useNavigate();

    return (
        <button className="btn btn-dark" onClick={evt => {navigate("/editCourse"), setCourse(course, course_key)}}>
        Edit Course
        </button>
    );
};

/*
const OnSubmit = () => {};

export const CourseForm = () => {
    const course_meets = course_obj.meets.trim().split(/\s+/);
    const navigate = useNavigate();

    return (
        <Form className="p-3" onSubmit={OnSubmit()}>
          <h3>Edit a Course</h3>

        <Form.Group className="mb-3" controlId="courseTitle">
            <Form.Label>Course Title</Form.Label>
            <Form.Control type="text" defaultValue = {course_obj.title}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="courseDays">
            <Form.Label>Course Meeting Days</Form.Label>
            <Form.Control type="text" defaultValue = {course_meets[0]}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="courseTimes">
            <Form.Label>Course Meeting Times</Form.Label>
            <Form.Control type="text" defaultValue = {course_meets[1]}/>
        </Form.Group>

        <Button variant="secondary" onClick={() => navigate("/")}>
            Cancel
        </Button>{" "}

        <Button variant="primary" type="submit">
            Submit
        </Button>

        </Form>
      );
};
*/

const useFormData = (validator = null, values = {}) => {
    const [state, setState] = useState(() => ({ values }));
  
    const change = (evt) => {
      const { id, value } = evt.target;
      const error = validator ? validator(id, value) : '';
      evt.target.setCustomValidity(error);
      
      const values = {...state.values, [id]: value};
      const errors = {...state.errors, [id]: error};
      const hasError = Object.values(errors).some(x => x !== '');
      setState(hasError ? { values, errors } : { values });
    };
  
    return [state, change];
  };

const validateCourseData = (key, val) => {
    switch (key) {
      case 'courseTitle':
        return /(^\w\w)/.test(val) ? '' : 'must be least two characters';
      case 'courseDays':
        return /(M)|(W)|(F)|(Tu)|(Th)/.test(val) ? '' : 'must be valid day format';
      case 'courseTimes':
        return /((\d\d)|(\d)):(\d\d)-((\d\d)|(\d)):(\d\d)/.test(val) ? '' : 'must be valid time format';
      default: return '';
    }
  };
  
  const InputField = ({name, text, defaultValue, state, change}) => (
    //state.values?.[name]
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{text}</label>
      <input className="form-control" id={name} name={name} 
        defaultValue={defaultValue} onChange={change}/>
      <div className="invalid-feedback">{state.errors?.[name]}</div>
    </div>
  );
  
  const ButtonBar = ({message, disabled}) => {
    const navigate = useNavigate();

    
    return (
      <div className="d-flex">
        <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate("/")}>Cancel</button>
        <button type="submit" className="btn btn-primary me-auto" disabled={disabled}>Submit</button>
        <span className="p-2">{message}</span>
      </div>
    );
  };
  
  export const CourseForm = () => {
    console.log(courseObj_key);
    const [update, result] = useDbUpdate(`/course/${course_obj.id}`);
    const [state, change] = useFormData(validateCourseData, course_obj);
    const course_meets = course_obj.meets.trim().split(/\s+/);
    const OnSubmit = (evt) => {
      evt.preventDefault();
      if (!state.errors) {
        update(state.values);
      }
    };
    
    return (
      <form onSubmit={OnSubmit} noValidate className={state.errors ? 'was-validated' : null}>
        <InputField name="courseTitle" defaultValue={course_obj.title} text = "Course Title" state={state} change={change} />
        <InputField name="courseDays" defaultValue={course_meets[0]}  text = "Course Meeting Days" state={state} change={change} />
        <InputField name="courseTimes" defaultValue={course_meets[1]} text = "Course Meeting Times" state={state} change={change} />
        <ButtonBar message={result?.message} />
      </form>
    )
  };