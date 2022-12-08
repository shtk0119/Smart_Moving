import * as React from 'react'
import { useRouter } from 'next/router';
import { Avatar, Box, Button, Divider, IconButton, InputAdornment, styled, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFirebaseAuthContext } from '../../contexts/FirebaseAuthContext';
import { db } from '../../libs/firebase';
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
    <MainBox component='main'>
      <Box>
        <Title variant='h4'>
          Account
        </Title>
        <Divider />
        <AccountBox>
          <BasicInfomationBox>
            <SubTitle variant='h6'>
              基本情報
            </SubTitle>

            <ParentBox>
              <Box display="flex" marginTop='16px'>
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
                <SaveButton onClick={onClickUpdateNickname}>
                  保存
                </SaveButton>
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
                <SaveButton onClick={onClickUpdateEmail}>
                  保存
                </SaveButton>
              </Box>
            </ParentBox>
          </BasicInfomationBox>

          <PasswordBox>
            <SubTitle variant='h6'>
              パスワード変更
            </SubTitle>
            <ParentBox>
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
                <SaveButton onClick={onClickUpdatePassword}>
                  保存
                </SaveButton>
              </Box>
            </ParentBox>
          </PasswordBox>
          
          <AccountDeleteBox>
            <SubTitle variant='h6'>
              アカウント削除
            </SubTitle>
            <ParentBox>
              <Box textAlign='center'>
                <Description textAlign='left'>
                  アカウントとアカウントに関係するすべてのデータを削除します。
                </Description>
                <DeleteButton variant='outlined' color='error' onClick={onClickAccountDelete}>
                  アカウント削除
                </DeleteButton>
              </Box>
            </ParentBox>
          </AccountDeleteBox>
        </AccountBox>
      </Box>
    </MainBox>
  );
};

export default AccountMain;

const MainBox = styled(Box)(() => ({
  width: '768px',
  padding: '0 36px',
  margin: '100px auto 24px',
  '@media screen and (max-width:768px)': {
    width: '425px'
  }
}));

const Title = styled(Typography)(() => ({
  fontWeight: 'bold'
}));

const SubTitle = styled(Typography)(() => ({
  fontWeight: 'bold',
}));

const AccountBox = styled(Box)(() => ({
  marginTop: '36px'
}));

const BasicInfomationBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#f1f1f1',
  boxShadow: '0 0 16px rgba(0,0,0,0.2)',
  borderRadius: '10px',
  padding: '16px',
  '@media screen and (max-width:768px)': {
    display: 'block',
  }
}));

const PasswordBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#f1f1f1',
  boxShadow: '0 0 16px rgba(0,0,0,0.2)',
  borderRadius: '10px',
  padding: '16px',
  marginTop: '36px',
  '@media screen and (max-width:768px)': {
    display: 'block',
  }
}));

const AccountDeleteBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#f1f1f1',
  boxShadow: '0 0 16px rgba(0,0,0,0.2)',
  borderRadius: '10px',
  padding: '16px',
  marginTop: '36px',
  '@media screen and (max-width:768px)': {
    display: 'block',
  }
}));

const ParentBox = styled(Box)(() => ({
  width: '70%',
  '@media screen and (max-width:768px)': {
    width: '100%'
  }
}));

const Description = styled(Typography)(() => ({
  fontWeight: 'bold',
  '@media screen and (max-width:768px)': {
    fontSize: '12px',
    marginTop: '16px'
  }
}));

const SaveButton = styled(Button)(() => ({
  marginLeft: '16px'
}));

const DeleteButton = styled(Button)(() => ({
  fontWeight: 'bold',
  marginTop: '16px',
  '@media screen and (max-width:768px)': {
    marginTop: '8px'
  }
}));