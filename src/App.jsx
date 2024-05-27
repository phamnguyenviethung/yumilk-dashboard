import MainLayout from '@/components/Layout/MainLayout';
import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from './pages/NotFound';
import SimpleLayout from './components/Layout/SimpleLayout';
function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route element={<SimpleLayout />}>
        <Route path='login' element={<Login />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
