import Toast from 'components/toast';
import DefaultLayout from 'layout/DefaultLayout';
import Complete from 'pages/Auth/Signup/CompletePage';
import SignUp from 'pages/Auth/Signup/SignupPage/index';
import TermsOfService from 'pages/Auth/Signup/TermsOfServicePage';
import Login from 'pages/Auth/Login';
import Post from 'pages/Post';
import Search from 'pages/Search';
import FindIdPassword from 'pages/Auth/FindIDPassword';
import VerifyField from 'pages/Auth/FindIDPassword/VerifyField';
import { Routes, Route } from 'react-router-dom';
import ChangePassword from 'pages/Auth/FindIDPassword/ChangePassword';
import { Suspense } from 'react';
import SearchDetails from 'pages/SearchDetails';
import Setting from 'pages/Setting';
import IdChange from 'pages/Setting/components/IdChange';
import AuthRoute from 'components/common/AuthRoute';
import Inquiry from 'pages/Inquiry';
import Myinquiry from 'pages/Inquiry/Myinquiry';

export default function App(): JSX.Element {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/post" element={<Post />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:keyword" element={<SearchDetails />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/myinquiry" element={<Myinquiry />} />
        </Route>
        <Route element={<AuthRoute needAuth redirectRoute="/login" />}>
          <Route path="/setting" element={<Setting />} />
          <Route path="/setting/id-change" element={<IdChange />} />
        </Route>
        <Route element={<AuthRoute needAuth={false} redirectRoute="/" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/complete" element={<Complete />} />
          <Route path="/find-id" element={<FindIdPassword type="id" />} />
          <Route path="/find-password" element={<FindIdPassword type="password" />} />
          <Route path="/find/verify/:type" element={<VerifyField />} />
          <Route path="/find-password/change" element={<ChangePassword />} />
        </Route>
      </Routes>
      <Toast />
    </Suspense>
  );
}
