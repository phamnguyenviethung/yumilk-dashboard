import MainLayout from '@/components/Layout/MainLayout';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import SimpleLayout from './components/Layout/SimpleLayout';
import CustomerList from './pages/Users/CustomerList';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='/manage/customers' element={<CustomerList />} />
      </Route>
      <Route element={<SimpleLayout />}>
        <Route path='login' element={<Login />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
