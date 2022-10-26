import 'bootstrap/dist/css/bootstrap.min.css';
import { Banner } from './components/Banner.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch.js';
import { TermPage } from './components/TermPage.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CourseForm } from './components/CourseForm.jsx';
import { useDbData, useProfile } from './utilities/firebase.js';
import Navigation from './components/Navigation.jsx';

const queryClient = new QueryClient();

const Main = ({profile}) => {
  //const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  const [data, error] = useDbData('/');

  //<QueryClientProvider client={queryClient}><div className='Container'><Main/></div></QueryClientProvider>

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  //if (isLoading) return <h1>Loading user data...</h1>;
  if (data === undefined) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  /*
  Bugs:
    Clicking multiple courses will deselected some that have time conflicts

    Clicking edit button counts as a course selection without keeping track of course

    General reformat buttons to fit better on screen.
  */

  return (
    <div className='container'>
      <Navigation/>
      <Banner title = {data.title}/>
      <TermPage profile = {profile} data = {data}/>
    </div>
  )
}

const App = () => {
  const [profile, profileLoading, profileError] = useProfile();
  
  if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
  if (profileLoading) return <h1>Loading user profile</h1>;
  if (!profile) return <h1>No profile data</h1>;

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
                  <Main profile = {profile}/>
              </div>
            }
          ></Route>
          </Routes>
        </BrowserRouter>
  )   
};


export default App;