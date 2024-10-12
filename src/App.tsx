import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/home/Home';
import NotFound from './routes/not-found/NotFound';
import UpdateInformation from './routes/update-information/UpdateInformation';
import EditPoem from './routes/edit-poem/EditPoem';
import { Toaster } from 'react-hot-toast';

function App() {
  document.documentElement.classList.add('dark');
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/update-information" element={<UpdateInformation />} />
        <Route path="/edit-poem" element={<EditPoem />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
