import { useSelector } from 'react-redux';
import NoPermission from '.';

const AdminComponent = ({ children }) => {
  const authState = useSelector(state => state.auth);

  if (authState.roleId == 1) return children;

  return <NoPermission />;
};

export default AdminComponent;
