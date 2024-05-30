import { Route, Routes, useNavigate } from 'react-router-dom';
import routes from './configs/routes';
import NotFound from './pages/NotFound';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
function App() {
  const authState = useSelector(state => state.auth);
  const nav = useNavigate();

  useEffect(() => {
    if (!authState.isAuthenticated) {
      nav('/login');
    }
  }, [nav, authState]);
  return (
    <Routes>
      {routes.map((route, i) => {
        const Layout = route.layout;

        return (
          <Route key={i} element={<Layout />}>
            {route.data.map(item => {
              const Component = item.component;

              return (
                <Route
                  key={item.path}
                  path={item.path}
                  element={<Component />}
                />
              );
            })}
          </Route>
        );
      })}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
