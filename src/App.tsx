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
import VerifyField from 'pages/Auth/FindIDPassword/page/VerifyField';
import SearchQueryItemList from 'pages/Search/components/SearchQueryItemList';
import { Routes, Route } from 'react-router-dom';
import ChangePassword from 'pages/Auth/FindIDPassword/page/ChangePassword';
import { useAuthInit } from 'store/auth';
import ProtectedRoute from 'components/common/ProtectedRoute';

function App(): JSX.Element {
  const auth = useAuthInit();

  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
        <Route element={<ProtectedRoute auth={auth} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/complete" element={<Complete />} />
          <Route path="/find-id" element={<FindIdPassword find="id" />} />
          <Route path="/find-password" element={<FindIdPassword find="password" />} />
          <Route path="/find/verify/:id" element={<VerifyField />} />
          <Route path="/find-password/change" element={<ChangePassword />} />
        </Route>
        <Route path="/post" element={<Post />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:searchQuery" element={<SearchQueryItemList />} />
      </Routes>
      <Toast />
    </>
  );
}

export default App;
