import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import MslfInput from '../components/MslfInput';
import { Button } from '@material-tailwind/react';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Check if the user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/'); // Redirect if logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // prettier-ignore
  async function onLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error: any) { // eslint-disable-line
      setError(error.message);
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <h1 className="text-5xl ">Login</h1>
      <form className="grid gap-5 w-full p-5 md:w-[400px] ">
        <MslfInput
          onChange={(e) => setEmail(e)}
          value={email}
          label="Email"
          type="email"
        />
        <MslfInput
          onChange={(e) => setPassword(e)}
          value={password}
          label="Password"
          type="password"
        />
        <Button
          className="rounded h-[35px]"
          color="orange"
          onClick={onLogin}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Submit
        </Button>
        {error ? <small className="text-red-300">{error}</small> : null}
      </form>
    </div>
  );
}
