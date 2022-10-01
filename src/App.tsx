import DefaultLayout from 'layout/DefaultLayout';
import DistinctionNumber from 'pages/Components/Section/DistinctionNumber';
import { Routes, Route } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout><DistinctionNumber /></DefaultLayout>} />
    </Routes>
  );
}

export default App;
