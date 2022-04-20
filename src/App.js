import { BrowserRouter, Routes, Route, } from "react-router-dom";
import LoginPage from './Pages/Login/Login';
import SignupPage from './Pages/Signup/Signup';
import HomePage from './Pages/Home/Home';
import ActivitiesPage from './Pages/Activities/Activities';
import ProfilePage from './Pages/Profile/Profile';

function App() {
  return (
      <BrowserRouter basename="/*">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="activities" element={<ActivitiesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;