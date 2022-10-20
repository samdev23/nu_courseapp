import 'bootstrap/dist/css/bootstrap.min.css';
import { Banner } from './components/Banner.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch.js';
import { TermPage } from './components/TermPage.jsx';

const queryClient = new QueryClient();

const Main = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
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
    <QueryClientProvider client={queryClient}>
      <div className='container'>
          <Main/>
      </div>
    </QueryClientProvider>
  )   
};


export default App;