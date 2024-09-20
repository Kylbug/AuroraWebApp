import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { authService } from '~/services/authService'; 

export default function LoginComponent() {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const navigate = useNavigate();

  const handleLogin = async (e: SubmitEvent) => {
    e.preventDefault();

    try {
        const authData = await authService.login(email(), password());
        console.log('Login erfolgreich:', authData);
    } catch (error) {
        console.error('Login fehlgeschlagen:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email()}
        onInput={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Passwort"
        value={password()}
        onInput={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
