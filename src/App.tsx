import DefaultLayout from 'layout/DefaultLayout';
import SearchID from 'pages/Components/Section/SearchID';
import { Routes, Route } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout><SearchID /></DefaultLayout>} />
    </Routes>
  );
}

export default App;
