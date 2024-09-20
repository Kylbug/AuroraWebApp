import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { AuthService } from '~/services/authService';

export default function Login() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const navigate = useNavigate();
  const authService = new AuthService();

  const handleLogin = async () => {
    try {
      await authService.login(email(), password());
      navigate("/dashboard");
    } catch (error) {}
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
      <input type="email" placeholder="Email" value={email()} onInput={(e) => setEmail(e.currentTarget.value)} />
      <input type="password" placeholder="Password" value={password()} onInput={(e) => setPassword(e.currentTarget.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
