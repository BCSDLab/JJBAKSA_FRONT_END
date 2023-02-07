import Toast from 'components/toast';
import DefaultLayout from 'layout/DefaultLayout';
import Complete from 'pages/Auth/Signup/CompletePage';
import SignUp from 'pages/Auth/Signup/SignupPage/index';
import TermsOfService from 'pages/Auth/Signup/TermsOfServicePage';
import Login from 'pages/Auth/Login';
import Home from 'pages/Home';
import Post from 'pages/Post';
import Search from 'pages/Search';
import FindIdPassword from 'pages/Auth/FindIDPassword';
import VerifyField from 'pages/Auth/FindIDPassword/VerifyField';
import { Routes, Route } from 'react-router-dom';
import ChangePassword from 'pages/Auth/FindIDPassword/ChangePassword';
import ProtectedRoute from 'components/common/ProtectedRoute';
import { Suspense } from 'react';
import SearchDetails from 'pages/SearchDetails';

export default function App(): JSX.Element {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/complete" element={<Complete />} />
          <Route path="/find-id" element={<FindIdPassword type="id" />} />
          <Route path="/find-password" element={<FindIdPassword type="password" />} />
          <Route path="/find/verify/:type" element={<VerifyField />} />
          <Route path="/find-password/change" element={<ChangePassword />} />
        </Route>
        <Route path="/post" element={<Post />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:keyword" element={<SearchDetails />} />
      </Routes>
      <Toast />
    </Suspense>
  );
}
