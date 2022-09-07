import Home from 'pages/Home';
import TextEditor from 'pages/textEditor/textEditor';
import { Routes, Route } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/te" element={<TextEditor />} />
    </Routes>
  );
}

export default App;
