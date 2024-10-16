import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/home/Home';
import NotFound from './routes/not-found/NotFound';
import UpdateInformation from './routes/update-information/UpdateInformation';
import { Toaster } from 'react-hot-toast';
import Poems from './routes/poems/Poems';
import CreatePoem from './routes/create-poem/CreatePoem';
import IsAuthenticated from './authentication/IsAuthenticated';
import Login from './authentication/Login';
import Footer from './components/footer/Footer';
import styles from './App.module.css';

function App() {
  document.documentElement.classList.add('dark');
  return (
    <BrowserRouter>
      <div className={styles['content']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<IsAuthenticated />}>
            <Route index element={<Home />} />
            <Route path="/update-information" element={<UpdateInformation />} />
            <Route path="/poems" element={<Poems />} />
            <Route path="/create-poem" element={<CreatePoem />} />
            <Route path="/create-poem/:id" element={<CreatePoem />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Toaster />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
