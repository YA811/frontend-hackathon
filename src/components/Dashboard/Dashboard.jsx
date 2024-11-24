import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import './Dashboard.css';

const Dashboard = ({}) => {
  const user = useContext(AuthedUserContext);
  return (
  <main className="welcome-container">
    <h1 className="welcome-title">Welcome to EVENZO, {user.username}</h1>
    <p className="welcome-message">You’ve got this! Planning your dream event starts here.</p>
  </main>

  );
};

export default Dashboard;
