import 'bootstrap/dist/css/bootstrap.min.css';
import { Banner } from './components/Banner.jsx';
import { CourseList } from './components/CourseList.jsx';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch.js';

const queryClient = new QueryClient();

const Main = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  return (
    <div className='container'>
      <Banner title = {data.title}/>
        <div className="row">
          <div className="col-sm-6">
          { Object.entries(data.courses).map(([id, course]) => <CourseList key={id} course={course} />) }
          </div>
        </div>
    </div>
  )
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='container'>
          <Main/>
      </div>
    </QueryClientProvider>
  )   
};


export default App;