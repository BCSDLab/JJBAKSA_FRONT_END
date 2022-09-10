import DefaultLayout from 'layout/DefaultLayout';
import Home from 'pages/Home';
import Search from 'pages/Search';
import { Routes, Route } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default App;
