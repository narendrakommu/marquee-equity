import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import NavigateToLogin from './components/NavigateToLogin';
import { AuthProvider } from './contexts/AuthContext';
import { TodoProvider } from './contexts/TodoContext';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TodoProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute />} />
            <Route path="/" element={<NavigateToLogin />} />
          </Routes>
        </TodoProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
