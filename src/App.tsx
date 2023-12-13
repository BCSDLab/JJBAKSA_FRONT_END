import Toast from 'components/toast';
import DefaultLayout from 'layout/DefaultLayout';
import Complete from 'pages/Auth/Signup/CompletePage';
import SignUp from 'pages/Auth/Signup/SignupPage/index';
import TermsOfService from 'pages/Auth/Signup/TermsOfServicePage';
import Login from 'pages/Auth/Login';
import Post from 'pages/Post';
import Search from 'pages/Search';
import VerifyField from 'pages/Auth/FindIdPassword/mobile/VerifyField';
import { Routes, Route } from 'react-router-dom';
import ChangePassword from 'pages/Auth/FindIdPassword/mobile/ChangePassword';
import { Suspense } from 'react';
import FollowPage from 'pages/Follow';
import Setting from 'pages/Setting';
import IdChange from 'pages/Setting/Mobile/IdChange';
import AuthRoute from 'components/common/AuthRoute';
import Withdrawal from 'pages/Setting/Withdrawal';
import Inquiry from 'pages/Inquiry/Inquiry';
import Inquire from 'pages/Inquiry/Inquire';
import Notice from 'pages/Notice';
import KakaoLogin from 'pages/Auth/OAuth/KakaoLogin';
import NaverLogin from 'pages/Auth/OAuth/NaverLogin';
import GoogleLogin from 'pages/Auth/OAuth/GoogleLogin';
import MyPage from 'pages/MyPage';
import NotFoundPage from 'pages/Search/components/NotFoundPage';
import FollowProfile from 'pages/Follow/components/FollowProfile';
import FindIDPassword from 'pages/Auth/FindIdPassword';
import ChangePasswordPC from 'pages/Auth/FindIdPassword/PC/ChangePassword';
import ShopDetail from 'pages/ShopDetail';

export default function App(): JSX.Element {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/search" element={<Search />} />
          <Route path="/search/not-found" element={<NotFoundPage />} />
          <Route path="/inquiry/:type" element={<Inquiry />} />
          <Route path="/inquiry/search/:keyword" element={<Inquiry />} />
          <Route path="/inquiry/inquire" element={<Inquire />} />
          <Route path="/notice" element={<Notice />} />
        </Route>
        <Route element={<AuthRoute needAuth redirectRoute="/login" />}>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/friend-list" element={<FollowPage />} />
            <Route path="/friend-list/:id" element={<FollowProfile />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/setting/id-change" element={<IdChange />} />
          </Route>
          <Route path="/shop/:placeId" element={<ShopDetail />} />
          <Route path="/withdrawal" element={<Withdrawal />} />
          <Route path="/profile" element={<MyPage />} />
          <Route path="/post/:name" element={<Post />} />
        </Route>
        <Route element={<AuthRoute needAuth={false} redirectRoute="/" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/complete" element={<Complete />} />
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/find-id" element={<FindIDPassword type="id" />} />
            <Route path="/find-password" element={<FindIDPassword type="password" />} />
            <Route path="/find-password/change-pc" element={<ChangePasswordPC />} />
          </Route>
          <Route path="/find/verify/:type" element={<VerifyField />} />
          <Route path="/find-password/change-mobile" element={<ChangePassword />} />
          <Route path="/login/oauth2/code/kakao" element={<KakaoLogin />} />
          <Route path="/login/oauth2/code/naver" element={<NaverLogin />} />
          <Route path="/login/oauth2/code/google" element={<GoogleLogin />} />
        </Route>
      </Routes>
      <Toast />
    </Suspense>
  );
}
