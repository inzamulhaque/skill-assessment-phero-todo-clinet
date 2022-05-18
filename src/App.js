import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import SignIn from './components/Forms/SignIn';
import SignUp from './components/Forms/SignUp';
import RequireAuth from './components/RequireAuth/RequireAuth';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RequireAuth>
          <Home />
        </RequireAuth>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
