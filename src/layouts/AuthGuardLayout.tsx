import { createSignal, onCleanup } from 'solid-js';
import { authService } from '~/services/authService';
import LoginComponent from '~/components/loginComponent';

interface AuthGuardLayoutProps {
  children: any;
}

export default function AuthGuardLayout(props: AuthGuardLayoutProps) {
  const [user, setUser] = createSignal(null);

  onCleanup(() => 
    clearInterval(setInterval(async () => {
    setUser(await authService.getUser());
    console.log('User:', user());
  }, 200))); 

  return user() ? <>{props.children}</> : <LoginComponent />;
}
