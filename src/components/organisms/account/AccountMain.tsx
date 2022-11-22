import * as React from 'react'
import { useRouter } from 'next/router';
import { 
  Avatar, 
  Box, 
  Button, 
  Divider, 
  IconButton, 
  InputAdornment, 
  TextField, 
  Typography 
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFirebaseAuthContext } from '../../../contexts/FirebaseAuthContext';
import { db } from '../../../libs/firebase';
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { deleteDoc, doc, DocumentData, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';

const AccountMain = () => {
  const router = useRouter();
  const { user } = useFirebaseAuthContext();
  const [userData, setUserData] = React.useState<DocumentData>();
  const [editUserData, setEditUserData] = React.useState<DocumentData | undefined>({ nickname: '', email: '',  password: '' });
  const [isShowPassword, setIsShowPassword] = React.useState<Boolean>(false);

  const onClickUpdateNickname = () => {
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      updateProfile(user, { displayName: editUserData?.nickname });
      updateDoc(docRef, {
        nickname: editUserData?.nickname,
      });
    };
  };

  const onClickUpdateEmail = () => {
    if (user) {
      const credential = EmailAuthProvider.credential(userData?.email, userData?.password);
      reauthenticateWithCredential(user, credential)
        .then(() => {
          updateEmail(user, editUserData?.email)
            .then(() => {
              const docRef = doc(db, 'users', user.uid);
              updateDoc(docRef, {
                email: editUserData?.email,
              });
              alert('メールアドレスを更新しました。');
            })
            .catch((error) => {
              alert(error.message);
            });
        })
        .catch((error) => {
          alert(error.message);
        });
    };
  };

  const onClickUpdatePassword = () => {
    if (user) {
      const credential = EmailAuthProvider.credential(userData?.email, userData?.password);
      reauthenticateWithCredential(user, credential)
        .then(() => {
          updatePassword(user, editUserData?.password)
            .then(() => {
              const docRef = doc(db, 'users', user.uid);
              updateDoc(docRef, {
                password: editUserData?.password,
              });
              alert('パスワードを更新しました。');
            })
            .catch((error) => {
              alert(error.message);
            });
        })
        .catch((error) => {
          alert(error.message);
        });
    };
  };

  const onClickAccountDelete = () => {
    let confirm = window.confirm('本当に削除しても、よろしいですか？');
    if (confirm && user) {
      const credential = EmailAuthProvider.credential(userData?.email, userData?.password);
      reauthenticateWithCredential(user, credential)
        .then(() => {
          deleteUser(user)
            .then(() => {
              const docRef = doc(db, 'users', user.uid);
              deleteDoc(docRef);
              alert('アカウントを削除しました。');
              router.push('/');
            })
            .catch((error) => {
              alert(error.message);
            });
        })
        .catch((error) => {
          alert(error.message);
        });
    };
  };

  React.useEffect(() => {
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = getDoc(docRef);
      docSnap.then((user) => {
        setUserData(user.data());
        setEditUserData(user.data());
      });

      onSnapshot(docRef, (snapShot) => {
        setUserData(snapShot.data());
      });
    };
  }, [user]);

  return (
    <Box component='main' m='64px auto 32px'>
      <Box width='1024px' mt={6}>
        <Typography variant='h4' fontWeight='bold' mb={2}>Account</Typography>
        <Divider />
        <Box mt={5}>
          <Box
            bgcolor="white"
            borderRadius={2}
            p={3}
            display="flex"
            justifyContent="space-between"
          >
            <Typography variant="h6" fontWeight="bold" width="30%">
              基本情報
            </Typography>
            <Box width="70%">
              <Box display="flex">
                <Avatar />
              </Box>

              <Box mt={5}>
                <TextField
                  type='text'
                  size='small'
                  variant='outlined'
                  label='Nickname'
                  autoComplete='off'
                  sx={{ width: '70%' }}
                  InputLabelProps={{ shrink: true }}
                  value={editUserData?.nickname}
                  onChange={(e) => setEditUserData({ ...editUserData, nickname: e.target.value })}
                />
                <Button 
                  sx={{ ml: 3 }}
                  onClick={onClickUpdateNickname}
                >
                  保存
                </Button>
              </Box>
              <Box mt={5}>
                <TextField
                  type='email'
                  size='small'
                  variant='outlined'
                  label='Email'
                  autoComplete='off'
                  sx={{ width: '70%' }}
                  InputLabelProps={{ shrink: true }}
                  value={editUserData?.email}
                  onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })}
                />
                <Button 
                  sx={{ ml: 3 }}
                  onClick={onClickUpdateEmail}
                >
                  保存
                </Button>
              </Box>
            </Box>
          </Box>
          <Box
            bgcolor="white"
            borderRadius={2}
            p={3}
            mt={5}
            display="flex"
            justifyContent="space-between"
          >
            <Typography variant="h6" fontWeight="bold" width="30%">
              パスワード変更
            </Typography>
            <Box width="70%">
              <Box mt={5}>
                <TextField
                  type={isShowPassword ? 'text' : 'password'}
                  size='small'
                  variant='outlined'
                  label='Password'
                  autoComplete='off'
                  sx={{ width: '70%' }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={() => setIsShowPassword(!isShowPassword)}>
                          {isShowPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={editUserData?.password}
                  onChange={(e) => setEditUserData({ ...editUserData, password: e.target.value })}
                />
                <Button 
                  sx={{ ml: 3 }}
                  onClick={onClickUpdatePassword}
                >
                  保存
                </Button>
              </Box>
            </Box>
          </Box>

          <Box mt={5}>
            <Box
              bgcolor="white"
              borderRadius={2}
              p={3}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="h6" fontWeight="bold" width="30%">
                アカウント削除
              </Typography>
              <Box width="70%">
                <Box>
                  <Typography fontWeight="bold">
                    アカウントとアカウントに関係するすべてのデータを削除します。
                  </Typography>
                  <Button
                    sx={{ mt: 3, fontWeight: 'bold' }}
                    variant="outlined"
                    color="error"
                    onClick={onClickAccountDelete}
                  >
                    アカウント削除
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountMain;