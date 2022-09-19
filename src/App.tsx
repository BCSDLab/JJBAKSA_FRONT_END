import DefaultLayout from 'layout/DefaultLayout';
import Home from 'pages/Home';
import Search from 'pages/Search';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
function App(): JSX.Element {
  return (

    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
        <Route path="/search" element={<DefaultLayout><Search /></DefaultLayout>} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
