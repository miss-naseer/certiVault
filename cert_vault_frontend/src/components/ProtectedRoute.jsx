import { Navigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';

const ProtectedRoute = ({ children }) => {
    const { account } = useWallet();
    
    if (!account) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;