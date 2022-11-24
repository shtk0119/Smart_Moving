import * as React from 'react';
import { Box, Checkbox, Divider, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Add, Delete, FilterList } from '@mui/icons-material';
import { db } from '../../../libs/firebase';
import { useFirebaseAuthContext } from '../../../contexts/FirebaseAuthContext';
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, QueryDocumentSnapshot } from 'firebase/firestore';
import AddTaskModal from '../../molecules/AddTaskModal';

const TaskMain = () => {
  const [isAdd, setIsAdd] = React.useState<boolean>(false);
  const [isDetail, setIsDetail] = React.useState<string | null>(null);
  const [tasks, setTasks] = React.useState<QueryDocumentSnapshot[] | null>(null);
  const [deleteTaskIds, setDeleteTaskIds] = React.useState<string[]>([]);
  const { user } = useFirebaseAuthContext();

  const onClickAddTask = () => {
    setIsAdd(!isAdd);
  };

  const onClickDetailTask = (id: string) => {
    setIsDetail(id);
  };

  const isCheckedTasks = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked && !deleteTaskIds.includes(id)) {
      setDeleteTaskIds([...deleteTaskIds, id]);
    }

    if (!e.target.checked) {
      setDeleteTaskIds(
        deleteTaskIds.filter((deleteTaskId) => deleteTaskId !== id)
      );
    }
  };

  const isCheckedAllTasks = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (tasks && e.target.checked) {
      setDeleteTaskIds(tasks?.map((task) => task.id));
    }

    if (!e.target.checked) {
      setDeleteTaskIds([]);
    }
  };

  const onClickDeleteTask = () => {
    deleteTaskIds.map((deleteTaskId) => {
      deleteDoc(doc(db, 'tasks', deleteTaskId));
    });
    setDeleteTaskIds([]);
  };

  React.useEffect(() => {
    if (user) {
      const docRef = getDocs(collection(db, 'users', user.uid, 'tasks'));
      docRef.then((snapShot) => {
        setTasks(snapShot.docs);
      });
    }
  }, [user])

  return (
    <Box component='main' m='64px auto 32px'>
      <Box m={5} width='1024px'>
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <IconButton onClick={onClickAddTask}>
                <Add />
              </IconButton>
              <IconButton onClick={onClickDeleteTask}>
                <Delete />
              </IconButton>
            </Box>
            <Box>
              <IconButton>
                <FilterList />
              </IconButton>
            </Box>
          </Box>
          <Box>
            <List>
              <ListItem>
                <Checkbox
                  checked={tasks?.length === deleteTaskIds.length}
                  onChange={(e) => isCheckedAllTasks(e)}
                />
                <ListItemText
                  sx={{ ml: 1, minWidth: '250px', maxWidth: '300px' }}
                >
                  タイトル
                </ListItemText>
                <ListItemText sx={{ ml: 1, maxWidth: '280px' }}>
                  カテゴリー
                </ListItemText>
                <ListItemText sx={{ maxWidth: '280px' }}>
                  ステータス
                </ListItemText>
                <ListItemText sx={{ maxWidth: '280px' }}>開始日</ListItemText>
                <ListItemText sx={{ maxWidth: '280px' }}>終了日</ListItemText>
              </ListItem>
              <Divider />
              {tasks?.map((task: QueryDocumentSnapshot) => {
                return (
                  <Box key={task.id}>
                    <ListItem>
                      <Checkbox
                        checked={deleteTaskIds.includes(task.id)}
                        onChange={(e) => isCheckedTasks(e, task.id)}
                      />
                      <ListItemText
                        sx={{
                          ml: 1,
                          minWidth: '250px',
                          maxWidth: '300px',
                          '& .MuiTypography-body1': {
                            display: 'inline',
                            '&:hover': { cursor: 'pointer', opacity: '0.6' },
                          },
                        }}
                        onClick={() => onClickDetailTask(task.id)}
                      >
                        {task.data().title}
                      </ListItemText>
                      <ListItemText sx={{ ml: 1, maxWidth: '280px' }}>
                        {task.data().category}
                      </ListItemText>
                      <ListItemText sx={{ maxWidth: '280px' }}>
                        {task.data().status}
                      </ListItemText>
                      <ListItemText sx={{ maxWidth: '280px' }}>
                        {task.data().start_date}
                      </ListItemText>
                      <ListItemText sx={{ maxWidth: '280px' }}>
                        {task.data().end_date}
                      </ListItemText>
                    </ListItem>
                    <Divider />


                  </Box>
                );
              })}
            </List>
          </Box>
        </Box>
      </Box>
      <AddTaskModal isAdd={isAdd} setIsAdd={setIsAdd} />
    </Box>
  );
};

export default TaskMain;