import * as React from 'react';
import { Box, Button, FormControl, IconButton, Input, InputLabel, MenuItem, Modal, Select, styled, TextField } from '@mui/material';
import { ArrowRightAlt, Close } from '@mui/icons-material';
import { db } from '../../libs/firebase';
import { useFirebaseAuthContext } from '../../contexts/FirebaseAuthContext';
import { doc, DocumentData, QueryDocumentSnapshot, updateDoc } from 'firebase/firestore';

type Props = {
  isDetail: boolean;
  setIsDetail: React.Dispatch<React.SetStateAction<string | null>>;
  task: QueryDocumentSnapshot;
};

const DetailTaskModal = ({ isDetail, setIsDetail, task }: Props) => {
  const [editTask, setEditTask] = React.useState<DocumentData>(task.data());
  const { user } = useFirebaseAuthContext();

  const handleClose = () => {
    setIsDetail(null);
  };

  const onClickTaskSave = () => {
    if (user) {
      const docRef = doc(db, 'users', user.uid, 'tasks', task.id);
      updateDoc(docRef, {
        title: editTask.title,
        category: editTask.category,
        status: editTask.status,
        start_date: editTask.start_date,
        end_date: editTask.end_date,
        text: editTask.text,
      });
      handleClose();
    };
  };

  return (
    <Box>
      <Modal open={isDetail} onClose={handleClose}>
        <ModalBox>
          <Box display="flex" justifyContent="space-between">
            <FormControl sx={{ width: '75%' }}>
              <Input
                sx={{
                  p: 1,
                  fontWeight: 'bold',
                  fontSize: '24px',
                  ':focus-within': {
                    border: '1px solid #00000033',
                    borderRadius: 2,
                  },
                }}
                disableUnderline
                fullWidth
                value={editTask.title}
                onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
              />
            </FormControl>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          <Box>
            <FormControlCategory>
              <InputLabel>カテゴリー</InputLabel>
              <Select
                label="カテゴリー"
                fullWidth
                value={editTask.category}
                onChange={(e) => setEditTask({ ...editTask, category: e.target.value })}
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
                value={editTask.status}
                onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
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
                value={editTask.start_date}
                onChange={(e) => setEditTask({ ...editTask, start_date: e.target.value })}
              />
            </FormControlStartDate>

            <FormControlEndDate>
              <InputLabel shrink>終了日</InputLabel>
              <Input
                type="date"
                value={editTask.end_date}
                onChange={(e) => setEditTask({ ...editTask, end_date: e.target.value })}
              />
            </FormControlEndDate>

            <FormControl sx={{ display: 'block', mt: 5 }} fullWidth>
              <TextField
                label="詳細"
                variant="outlined"
                multiline
                rows={5}
                fullWidth
                value={editTask.text}
                onChange={(e) => setEditTask({ ...editTask, text: e.target.value })}
              />
            </FormControl>
            <Button
              sx={{ display: 'block', mt: 5, ml: 'auto' }}
              variant="contained"
              onClick={onClickTaskSave}
            >
              保存
            </Button>
          </Box>
        </ModalBox>
      </Modal>
    </Box>
  );
};

export default DetailTaskModal;

const ModalBox = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflow: 'scroll',
  height: 600,
  width: 600,
  backgroundColor: '#fff',
  borderRadius: '10px',
  padding: '36px',
  '@media screen and (max-width:768px)': {
    height: 500,
    width: 400,
    padding: '24px'
  },
  '@media screen and (max-width:425px)': {
    width: 300,
    padding: '16px'
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