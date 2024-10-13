import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/home/Home';
import NotFound from './routes/not-found/NotFound';
import UpdateInformation from './routes/update-information/UpdateInformation';
import { Toaster } from 'react-hot-toast';
import Poems from './routes/poems/Poems';
import CreatePoem from './routes/create-poem/CreatePoem';

function App() {
  document.documentElement.classList.add('dark');
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/update-information" element={<UpdateInformation />} />
        <Route path="/poems" element={<Poems />} />
        <Route path="/create-poem" element={<CreatePoem />} />
        <Route path="/create-poem/:id" element={<CreatePoem />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
