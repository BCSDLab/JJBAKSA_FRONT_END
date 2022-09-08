import LoginPage from 'pages/Auth/LoginPage';
import SocialPage from 'pages/Auth/SocialPage';
import Home from 'pages/Home';
import { Routes, Route } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/social" element={<SocialPage />} />
    </Routes>
  );
}

export default App;
