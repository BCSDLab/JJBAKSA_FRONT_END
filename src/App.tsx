import DefaultLayout from 'layout/DefaultLayout';
import Complete from 'pages/Auth/SignUpPage/completePage/Complete';
import SignUp from 'pages/Auth/SignUpPage/signUpPage';
import TermsOfService from 'pages/Auth/SignUpPage/termsOfServicePage/TermsOfService';
import Login from 'pages/Auth/LoginPage';
import Home from 'pages/Home';
import { Routes, Route } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
      <Route path="/termsofservice" element={<TermsOfService />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup/complete" element={<Complete />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
