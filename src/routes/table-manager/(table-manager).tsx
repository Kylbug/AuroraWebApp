import { useNavigate } from '@solidjs/router';
import { onMount } from 'solid-js';

export default function TableManager() {
  const navigate = useNavigate();

  onMount(() => {
    navigate('/table-manager/person', { replace: true });
  });

  return (
    <>
      Table Manager
    </>
  );
}
