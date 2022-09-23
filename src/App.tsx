import DefaultLayout from 'layout/DefaultLayout';
import LoginPage from 'pages/Auth/LoginPage';
import Home from 'pages/Home';
import { Routes, Route } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
