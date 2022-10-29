import 'bootstrap/dist/css/bootstrap.min.css';
import { Banner } from './components/Banner.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch.js';
import { TermPage } from './components/TermPage.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CourseForm } from './components/CourseForm.jsx';
import { useDbData, useProfile } from './utilities/firebase.js';

const queryClient = new QueryClient();

const Main = ({profile}) => {
  const [data, error] = useDbData('/');

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (data === undefined) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  /*
  Bugs:
    There is a disconnect between what firebase shows and what the localhost shows
                  No idea why this is happening 
                  
    General reformat buttons to fit better on screen (standardize card size, sign in/sign out button, schedule button, term buttons)

  */

  return (
    <div className='container'>
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