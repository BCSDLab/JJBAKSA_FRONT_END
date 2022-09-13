import DefaultLayout from 'layout/DefaultLayout';
import Home from 'pages/Home';
import TextEditor from 'pages/textEditor';
import { Routes, Route } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
      <Route path="/te" element={<TextEditor />} />
    </Routes>
  );
}

export default App;
