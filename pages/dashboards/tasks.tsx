import * as React from 'react';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../../src/libs/firebase';

const Tasks = () => {
  const router = useRouter();

  const onClickLogout = () => {
    signOut(auth);
    router.push('/login')
  }

  return (
    <>
      <button type="button" onClick={onClickLogout}>logout</button>
    </>
  )
}

export default Tasks;