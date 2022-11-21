import * as React from 'react';
import { useFirebaseAuthContext } from '../../src/contexts/FirebaseAuthContext';
import TaskPage from '../../src/components/templates/TaskPage';

const Tasks = () => {
  const { user } = useFirebaseAuthContext();

  React.useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <TaskPage />
  )
}

export default Tasks;