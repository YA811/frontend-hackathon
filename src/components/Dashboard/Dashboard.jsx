import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import './Dashboard.css';

const Dashboard = ({}) => {
  const user = useContext(AuthedUserContext);
  return (
  <main className="welcome-container">
    <h1 className="welcome-title">Welcome to Eco Nest, {user.username}</h1>
    <p className="welcome-message">Style That Doesn't Cost the Earth</p>
  </main>

  );
};

export default Dashboard;
