
import MainLayout from "@/components/Layout/MainLayout"
import { Route, Routes } from 'react-router-dom';
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import NotFound from "./pages/NotFound";
function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='*' element={<NotFound />} />

      </Route>
    </Routes>
  )
}

export default App
