import DefaultLayout from 'layout/DefaultLayout';
import SignUpForm from 'pages/Auth/SignUpPage/SignUpForm';
import TermsOfService from 'pages/Auth/SignUpPage/TermsOfService';
import Home from 'pages/Home';
import { Routes, Route } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
      <Route path="/TermsOfService" element={<TermsOfService />} />
      <Route path="/SignUp" element={<SignUpForm />} />
    </Routes>
  );
}

export default App;
