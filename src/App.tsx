import Toast from 'components/toast';
import DefaultLayout from 'layout/DefaultLayout';
import LoginPage from 'pages/Auth';
import Home from 'pages/Home';
import Post from 'pages/Post';
import Search from 'pages/Search';
import { Routes, Route } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
        <Route path="/post" element={<Post />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Toast />
    </>
  );
}

export default App;
