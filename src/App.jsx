import { Banner } from './components/Banner.jsx';
import { CourseList } from './components/CourseList.jsx';
import { useState } from 'react';
import './App.css';

const schedule = {
  "title": "CS Courses for 2018-2019",
  "courses": {
    "F101" : {
      "term": "Fall",
      "number": "101",
      "meets" : "MWF 11:00-11:50",
      "title" : "Computer Science: Concepts, Philosophy, and Connections"
    },
    "F110" : {
      "term": "Fall",
      "number": "110",
      "meets" : "MWF 10:00-10:50",
      "title" : "Intro Programming for non-majors"
    },
    "S313" : {
      "term": "Spring",
      "number": "313",
      "meets" : "TuTh 15:30-16:50",
      "title" : "Tangible Interaction Design and Learning"
    },
    "S314" : {
      "term": "Spring",
      "number": "314",
      "meets" : "TuTh 9:30-10:50",
      "title" : "Tech & Human Interaction"
    }
  }
};


const App = () => {

  return (
    
    <div className='container'>
      <Banner title = {schedule.title}/>

      { Object.entries(schedule.courses).map(([id, course]) => <CourseList key={id} course={course} />) }
    </div>

  )   
};


export default App;

/*

import { useState } from 'react';
import logo from './logo.svg';
import './App.css';


return (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>Hello Vite + React!</p>
      <p>
        <button onClick={() => setCount(count => count + 1)}>
          count is: {count}
        </button>
      </p>
      <p>
        Edit <code>App.jsx</code> and save to test hot module replacement (HMR).
      </p>
      <p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {' | '}
        <a
          className="App-link"
          href="https://vitejs.dev/guide/features.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vite Docs
        </a>
      </p>
    </header>
  </div>
);
};
*/