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
import FollowPage from 'pages/Follow';
import Setting from 'pages/Setting';
import IdChange from 'pages/Setting/UserSetting/IdChange';
import AuthRoute from 'components/common/AuthRoute';
import Withdrawal from 'pages/Setting/Withdrawal';
import Inquiry from 'pages/Inquiry';
import Myinquiry from 'pages/Inquiry/Myinquiry';
import Notice from 'pages/Notice';
import KakaoLogin from 'pages/Auth/OAuth/KakaoLogin';
import NaverLogin from 'pages/Auth/OAuth/NaverLogin';
import GoogleLogin from 'pages/Auth/OAuth/GoogleLogin';
import FollowProfile from 'pages/Follow/components/FollowProfile';

export default function App(): JSX.Element {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/search" element={<Search />} />
          <Route path="/search/:keyword" element={<SearchDetails />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/myinquiry" element={<Myinquiry />} />
          <Route path="/notice" element={<Notice />} />
        </Route>
        <Route element={<AuthRoute needAuth redirectRoute="/login" />}>
          <Route path="/setting" element={<Setting />} />
          <Route path="/setting/id-change" element={<IdChange />} />
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/friend-list" element={<FollowPage />} />
            <Route path="/friend-list/:id" element={<FollowProfile />} />
          </Route>
          <Route path="/withdrawal" element={<Withdrawal />} />
          <Route path="/post/:name" element={<Post />} />
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
          <Route path="/login/oauth2/code/kakao" element={<KakaoLogin />} />
          <Route path="/login/oauth2/code/naver" element={<NaverLogin />} />
          <Route path="/login/oauth2/code/google" element={<GoogleLogin />} />
        </Route>
      </Routes>
      <Toast />
    </Suspense>
  );
}
