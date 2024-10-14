import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Logout() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setIsAuthenticated(user != null);
    });
    return () => unsubscribe();
  }, []);

  // prettier-ignore
  async function onLogout() {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error: any) { // eslint-disable-line
      console.error('Logout error:', error.message);
    }
  }

  return isAuthenticated ? (
    <p className="cursor-pointer" onClick={onLogout}>
      Logout
    </p>
  ) : null;
}
