import DefaultLayout from 'layout/DefaultLayout';
import Complete from 'pages/Auth/Signup/CompletePage';
import SignUp from 'pages/Auth/Signup/SignupPage/index';
import TermsOfService from 'pages/Auth/Signup/TermsOfServicePage';
import Login from 'pages/Auth/Login';
import Home from 'pages/Home';
import Post from 'pages/Post';
import Search from 'pages/Search';
import { Routes, Route } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup/complete" element={<Complete />} />
      <Route path="/login" element={<Login />} />
      <Route path="/post" element={<Post />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default App;
