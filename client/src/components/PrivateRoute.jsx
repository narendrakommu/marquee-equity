import Dashboard from './Dashboard';
import NavigateToLogin from './NavigateToLogin';

const PrivateRoute = () => {
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
        return <NavigateToLogin />;
    }

    return <Dashboard />;
};

export default PrivateRoute;