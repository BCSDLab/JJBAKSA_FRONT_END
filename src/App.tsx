import DefaultLayout from 'layout/DefaultLayout';
import Home from 'pages/Home';
import Post from 'pages/Post';
import { Routes, Route } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
      <Route path="/post" element={<Post />} />
    </Routes>
  );
}

export default App;
