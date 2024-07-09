import { useSelector } from 'react-redux';
import NoPermission from '.';

const PermissionCheck = ({ children }) => {
  const authState = useSelector(state => state.auth);
  if (authState.userData.role === 'Admin') return children;

  return <NoPermission />;
};

export default PermissionCheck;
