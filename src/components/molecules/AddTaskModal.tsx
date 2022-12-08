import * as React from 'react';
import { Box, Button, FormControl, FormLabel, IconButton, Input, InputLabel, MenuItem, Modal, Select, styled, TextField, Typography } from '@mui/material';
import { ArrowRightAlt, Close } from '@mui/icons-material';
import { Task } from '../../types/task';
import { db } from '../../libs/firebase';
import { useFirebaseAuthContext } from '../../contexts/FirebaseAuthContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

type Props = {
  isAdd: boolean;
  setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
};

const Today = new Date();

const defaultTask: Task = {
  title: '',
  category: 'なし',
  status: '開始前',
  start_date: `${Today.getFullYear()}-${Today.getMonth() + 1}-${Today.getDate()}`,
  end_date: `${Today.getFullYear()}-${Today.getMonth() + 1}-${Today.getDate()}`,
  text: '',
};

const AddTaskModal = ({ isAdd, setIsAdd }: Props) => {
  const [task, setTask] = React.useState<Task>(defaultTask);
  const { user } = useFirebaseAuthContext();

  const handleClose = () => {
    setIsAdd(!isAdd);
  };

  const onClickTaskSave = () => {
    if (user) {
      addDoc(collection(db, 'users', user.uid, 'tasks'), {
        title: task.title,
        category: task.category,
        status: task.status,
        start_date: task.start_date,
        end_date: task.end_date,
        text: task.text,
        timestamp: serverTimestamp(),
      });
      setTask(defaultTask);
      handleClose();
    }
  };

  return (
    <Box>
      <Modal open={isAdd} onClose={handleClose}>
        <ModalBox>
          <Box display="flex" justifyContent="space-between" alignItems='center'>
            <Typography variant="h5" fontWeight="bold">
              タスク作成
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>

          <Box>
            <FormControlTitle>
              <FormLabel sx={{ fontSize: '12px' }}>
                タイトル
              </FormLabel>
              <Input onChange={(e) => setTask({ ...task, title: e.target.value })} />
            </FormControlTitle>

            <FormControlCategory>
              <InputLabel>カテゴリー</InputLabel>
              <Select
                label="カテゴリー"
                fullWidth
                defaultValue={'なし'}
                onChange={(e) => setTask({ ...task, category: e.target.value })}
              >
                <MenuItem value={'なし'}>なし</MenuItem>
                <MenuItem value={'書類関係'}>書類関係</MenuItem>
                <MenuItem value={'荷物'}>荷物</MenuItem>
              </Select>
            </FormControlCategory>

            <FormControlStatus>
              <InputLabel>ステータス</InputLabel>
              <Select
                label="ステータス"
                fullWidth
                defaultValue={'開始前'}
                onChange={(e) => setTask({ ...task, status: e.target.value })}
              >
                <MenuItem value={'開始前'}>開始前</MenuItem>
                <MenuItem value={'作業中'}>作業中</MenuItem>
                <MenuItem value={'終了'}>終了</MenuItem>
              </Select>
            </FormControlStatus>

            <FormControlStartDate>
              <InputLabel shrink>開始日</InputLabel>
              <Input
                type="date"
                fullWidth
                onChange={(e) =>
                  setTask({ ...task, start_date: e.target.value })
                }
              />
            </FormControlStartDate>

            <FormControlEndDate>
              <InputLabel shrink>終了日</InputLabel>
              <Input
                type="date"
                fullWidth
                onChange={(e) =>
                  setTask({ ...task, end_date: e.target.value })
                }
              />
            </FormControlEndDate>

            <FormControlDetail>
              <TextField
                label="詳細"
                multiline
                fullWidth
                onChange={(e) => setTask({ ...task, text: e.target.value })}
              />
            </FormControlDetail>
            
            <SaveButton variant='contained' onClick={onClickTaskSave}>
              保存
            </SaveButton>
          </Box>
        </ModalBox>
      </Modal>
    </Box>
  );
};

export default AddTaskModal;

const ModalBox = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  backgroundColor: '#fff',
  borderRadius: '10px',
  padding: '36px',
  '@media screen and (max-width:768px)': {
    width: 400,
    padding: '24px'
  },
  '@media screen and (max-width:425px)': {
    width: 300,
    padding: '16px'
  }
}));

const FormControlTitle = styled(FormControl)(() => ({
  width: '75%',
  marginTop: '36px',
  '@media screen and (max-width:768px)': {
    width: '100%',
    marginTop: '24px'
  }
}));

const FormControlCategory = styled(FormControl)(() => ({
  display: 'block',
  width: '50%',
  marginTop: '36px',
  '@media screen and (max-width:768px)': {
    width: '100%'
  }
}));

const FormControlStatus = styled(FormControl)(() => ({
  display: 'block',
  width: '50%',
  marginTop: '36px',
  '@media screen and (max-width:768px)': {
    width: '100%'
  }
}));

const FormControlStartDate = styled(FormControl)(() => ({
  display: 'block',
  marginTop: '36px'
}));

const FormControlEndDate = styled(FormControl)(() => ({
  display: 'block',
  marginTop: '36px'
}));

const FormControlDetail = styled(FormControl)(() => ({
  display: 'block',
  marginTop: '36px'
}));

const SaveButton = styled(Button)(() => ({
  display: 'block',
  marginTop: '36px',
  marginLeft: 'auto',
  '@media screen and (max-width:768px)': {
    marginTop: '24px',
  }
}));