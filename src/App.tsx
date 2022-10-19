import Toast from 'components/toast';
import DefaultLayout from 'layout/DefaultLayout';
import Complete from 'pages/Auth/Signup/CompletePage';
import SignUp from 'pages/Auth/Signup/SignupPage/index';
import TermsOfService from 'pages/Auth/Signup/TermsOfServicePage';
import Login from 'pages/Auth/Login';
import Home from 'pages/Home';
import Post from 'pages/Post';
import Search from 'pages/Search';
import SearchPage from 'pages/SearchPage';
import DistinctionNumber from 'pages/SearchPage/section/DistinctionNumber';
import SearchQueryItemList from 'pages/Search/components/SearchQueryItemList';
import { Routes, Route } from 'react-router-dom';
import ChangePassword from 'pages/SearchPage/section/ChangePassword';

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/complete" element={<Complete />} />
        <Route path="/post" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search-id" element={<SearchPage search="id" />} />
        <Route path="/search-pw" element={<SearchPage search="password" />} />
        <Route path="/search-id/number" element={<DistinctionNumber />} />
        <Route path="/search-pw/change" element={<ChangePassword />} />
        <Route path="/search/:searchQuery" element={<SearchQueryItemList />} />
      </Routes>
      <Toast />
    </>
  );
}

export default App;
