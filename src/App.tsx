import DefaultLayout from 'layout/DefaultLayout';
import Complete from 'pages/Auth/SignUpPage/Complete';
import SignUp from 'pages/Auth/SignUpPage/SignUp';
import TermsOfService from 'pages/Auth/SignUpPage/TermsOfService';
import Home from 'pages/Home';
import { Routes, Route } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
      <Route path="/termsofservice" element={<TermsOfService />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup/complete" element={<Complete />} />
    </Routes>
  );
}

export default App;
