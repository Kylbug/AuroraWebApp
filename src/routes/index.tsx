import { useNavigate } from '@solidjs/router';
import { authService } from '../services/authService';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
  };

  return (
    <div>
      <h1>Willkommen im Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
