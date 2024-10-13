import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  async function onLogout() {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error: any) {
      // eslint-disable-line
      console.error('Logout error:', error.message);
    }
  }

  return (
    <p className="cursor-pointer" onClick={onLogout}>
      Logout
    </p>
  );
}
