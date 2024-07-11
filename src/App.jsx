import { Route, Routes, useNavigate } from 'react-router-dom';
import routes from './configs/routes';
import { useSelector } from 'react-redux';
import { Fragment, useEffect } from 'react';
import PermissionCheck from './components/NoPermission/PermissionCheck';
import NotFound from './components/NotFound';
import '@/assets/default.css';
import '@/assets/table.css';

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
              const PermissionComponent = item.needLogin
                ? PermissionCheck
                : Fragment;

              return (
                <Route
                  key={item.path}
                  path={item.path}
                  element={
                    <PermissionComponent>
                      <Component />
                    </PermissionComponent>
                  }
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
