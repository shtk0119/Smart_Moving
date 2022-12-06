import * as React from 'react';
import { Box, Checkbox, Divider, IconButton, List, ListItem, ListItemText, styled } from '@mui/material';
import { Add, Delete, FilterList } from '@mui/icons-material';
import { db } from '../../libs/firebase';
import { useFirebaseAuthContext } from '../../contexts/FirebaseAuthContext';
import { collection, deleteDoc, doc, getDocs, onSnapshot, QueryDocumentSnapshot } from 'firebase/firestore';
import AddTaskModal from '../molecules/AddTaskModal';
import DetailTaskModal from '../molecules/DetailTaskModal';

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
    if (user) {
      deleteTaskIds.map((deleteTaskId) => {
        deleteDoc(doc(db, 'users', user.uid, 'tasks', deleteTaskId));
      });
      setDeleteTaskIds([]);
    };
  };

  React.useEffect(() => {
    if (user) {
      const userRef = collection(db, 'users', user.uid, 'tasks');

      getDocs(userRef).then((snapShot) => {
        setTasks(snapShot.docs);
      });

      onSnapshot(userRef, (snapShot) => {
        setTasks(snapShot.docs);
      });
    };
  }, [user]);

  return (
    <MainBox component='main'>
      <Box m={5}>
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
                <ListItemText>
                  タイトル
                </ListItemText>
                <ListItemText sx={{ minWidth: '250px', maxWidth: '250px' }}>
                  カテゴリー
                </ListItemText>
                <ListItemText sx={{ minWidth: '120px', maxWidth: '120px' }}>
                  ステータス
                </ListItemText>
                <ListItemText sx={{ minWidth: '120px', maxWidth: '120px' }}>
                  開始日
                </ListItemText>
                <ListItemText sx={{ minWidth: '120px', maxWidth: '120px' }}>
                  終了日
                </ListItemText>
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
                          '& .MuiTypography-body1': {
                            display: 'inline',
                            '&:hover': { cursor: 'pointer', opacity: '0.6' },
                          },
                        }}
                        onClick={() => onClickDetailTask(task.id)}
                      >
                        {task.data().title}
                      </ListItemText>
                      <ListItemText sx={{ minWidth: '250px', maxWidth: '250px' }}>
                        {task.data().category}
                      </ListItemText>
                      <ListItemText sx={{ minWidth: '120px', maxWidth: '120px' }}>
                        {task.data().status}
                      </ListItemText>
                      <ListItemText sx={{ minWidth: '120px', maxWidth: '120px' }}>
                        {task.data().start_date}
                      </ListItemText>
                      <ListItemText sx={{ minWidth: '120px', maxWidth: '120px' }}>
                        {task.data().end_date}
                      </ListItemText>
                    </ListItem>
                    <Divider />
                    <DetailTaskModal isDetail={isDetail === task.id} setIsDetail={setIsDetail} task={task} />
                  </Box>
                );
              })}
            </List>
          </Box>
        </Box>
      </Box>
      <AddTaskModal isAdd={isAdd} setIsAdd={setIsAdd} />
    </MainBox>
  );
};

export default TaskMain;

const MainBox = styled(Box)(() => ({
  marginTop: '100px'
}));