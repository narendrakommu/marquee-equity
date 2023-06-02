import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigateToLogin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/login');
    }, [navigate]);

    return null;
};

export default NavigateToLogin;