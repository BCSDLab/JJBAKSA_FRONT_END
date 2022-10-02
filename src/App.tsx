import DefaultLayout from 'layout/DefaultLayout';
import LoginPage from 'pages/Auth/LoginPage';
import Home from 'pages/Home';
import Post from 'pages/Post';
import { Routes, Route } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
      <Route path="/post" element={<Post />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
