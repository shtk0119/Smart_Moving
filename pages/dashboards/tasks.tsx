import * as React from 'react';
import { useRouter } from 'next/router';
import { useFirebaseAuthContext } from '../../src/contexts/FirebaseAuthContext';

const Tasks = () => {
  const router = useRouter();
  const { user } = useFirebaseAuthContext();
  const { logout } = useFirebaseAuthContext();

  const onClickLogout = () => {
    logout;
    router.push('/login');
  };

  return (
    <>
      <button type="button" onClick={onClickLogout}>logout</button>
    </>
  )
}

export default Tasks;