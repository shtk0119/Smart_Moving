import * as React from 'react';
import { Box, Checkbox, IconButton, List, ListItem, styled, Typography } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { db } from '../../libs/firebase';
import { useFirebaseAuthContext } from '../../contexts/FirebaseAuthContext';
import { collection, deleteDoc, doc, getDocs, onSnapshot, QueryDocumentSnapshot } from 'firebase/firestore';
import DetailTaskModal from '../molecules/DetailTaskModal';
import AddTaskModal from '../molecules/AddTaskModal';

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
      <Box display='flex' justifyContent='right'>
        <IconButton onClick={onClickAddTask}>
          <Add />
        </IconButton>
        <IconButton onClick={onClickDeleteTask}>
          <Delete />
        </IconButton>
      </Box>

      <TasksBox>
        {/* 768px以上 */}
        <ListBox>
          <List sx={{ pb: 0 }}>
            <ListItem sx={{ borderBottom: '1px solid #00000020' }}>
              <Checkbox checked={tasks?.length === deleteTaskIds.length} onChange={(e) => isCheckedAllTasks(e)} />
              <ListItemTitle>タイトル</ListItemTitle>
              <ListItemCategory>カテゴリー</ListItemCategory>
              <ListItemStatus>ステータス</ListItemStatus>
              <ListItemStartDate>開始日</ListItemStartDate>
              <ListItemEndDate>終了日</ListItemEndDate>
            </ListItem>
            {tasks?.map((task: QueryDocumentSnapshot, index) => {
              return (
                <React.Fragment key={index}>
                  <ListItemBox onClick={() => onClickDetailTask(task.id)}>
                    <Checkbox checked={deleteTaskIds.includes(task.id)} onChange={(e) => isCheckedTasks(e, task.id)} onClick={(e) => e.stopPropagation()} />
                    <ListItemTitle>{task.data().title}</ListItemTitle>
                    <ListItemCategory>{task.data().category}</ListItemCategory>
                    <ListItemStatus>{task.data().status}</ListItemStatus>
                    <ListItemStartDate>{task.data().start_date}</ListItemStartDate>
                    <ListItemEndDate>{task.data().end_date}</ListItemEndDate>
                  </ListItemBox>
                  <DetailTaskModal isDetail={isDetail === task.id} setIsDetail={setIsDetail} task={task} />
                </React.Fragment>
              );
            })}
          </List>
        </ListBox>
        
        {/* 768px以下 */}
        {tasks?.map((task: QueryDocumentSnapshot, index) => {
          return (
            <React.Fragment key={index}>
              <TaskBox onClick={() => onClickDetailTask(task.id)}>
                <Typography>{task.data().status}</Typography>
                <Typography>{task.data().title}</Typography>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                  <Typography>{task.data().start_date + ' 〜 ' + task.data().end_date}</Typography>
                  <Checkbox onClick={(e) => e.stopPropagation()} />
                </Box>
              </TaskBox>
              <DetailTaskModal isDetail={isDetail === task.id} setIsDetail={setIsDetail} task={task} />
            </React.Fragment>
          );
        })}
      </TasksBox>

      <AddTaskModal isAdd={isAdd} setIsAdd={setIsAdd} />
    </MainBox>
  );
};

export default TaskMain;

const MainBox = styled(Box)(() => ({
  padding: '0 36px',
  marginTop: '100px'
}));

const TasksBox = styled(Box)(() => ({
  borderRadius: '10px 10px 0 0',
  boxShadow: '0 0 16px rgba(0,0,0,0.2)',
  marginTop: '16px',
  '@media screen and (max-width:768px)': {
    boxShadow: 'none'
  }
}));

const ListBox = styled(Box)(() => ({
  '@media screen and (max-width:768px)': {
    display: 'none'
  }
}));

const ListItemBox = styled(ListItem)(() => ({
  backgroundColor: '#fff',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#00000014'
  }
}));

const ListItemTitle = styled(Typography)(() => ({
  maxHeight: '36px',
  width: '25%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
}));

const ListItemCategory = styled(Typography)(() => ({
  width: '25%',
  padding: '0 16px'
}));

const ListItemStatus = styled(Typography)(() => ({
  width: '20%',
  padding: '0 16px',
}));

const ListItemStartDate = styled(Typography)(() => ({
  width: '15%',
  padding: '0 16px',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
}));

const ListItemEndDate = styled(Typography)(() => ({
  width: '15%',
  padding: '0 16px',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
}));

const TaskBox = styled(Box)(() => ({
  display: 'none',
  '@media screen and (max-width:768px)': {
    display: 'block',
    backgroundColor: '#fff',
    boxShadow: '0 0 16px rgba(0,0,0,0.2)',
    border: '1px solid #00000030',
    borderRadius: '10px',
    padding: '16px',
    marginTop: '24px',
    ':hover': {
      cursor: 'pointer',
      opacity: '0.6'
    },
  }
}));