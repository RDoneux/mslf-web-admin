import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

export default function IsAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return isAuthenticated ? <Outlet /> : null;
}
