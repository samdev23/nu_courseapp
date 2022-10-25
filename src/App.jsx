import 'bootstrap/dist/css/bootstrap.min.css';
import { Banner } from './components/Banner.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch.js';
import { TermPage } from './components/TermPage.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CourseForm } from './components/CourseForm.jsx';
import { useDbData } from './utilities/firebase.js';

const queryClient = new QueryClient();

const Main = () => {
  //const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  const [data, error] = useDbData('/');

  //<QueryClientProvider client={queryClient}><div className='Container'><Main/></div></QueryClientProvider>

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  //if (isLoading) return <h1>Loading user data...</h1>;
  if (data === undefined) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  return (
    <div className='container'>
      <Banner title = {data.title}/>
      <TermPage data = {data}/>
    </div>
  )
}

const App = () => {
  return (

      <BrowserRouter>
        <Routes>
          <Route
            path="/editCourse"
            element={
              <div><CourseForm/></div>
            }
          ></Route>

          <Route
            path="/"
            element={
              <div className='container'>
                  <Main/>
              </div>
            }
          ></Route>
          </Routes>
        </BrowserRouter>
  )   
};


export default App;