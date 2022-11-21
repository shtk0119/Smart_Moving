import * as React from 'react'
import { 
  Avatar, 
  Box, 
  Button, 
  Divider, 
  TextField, 
  Typography 
} from '@mui/material';

const AccountMain = () => {
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
                />
                <Button sx={{ ml: 3 }}>
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
                />
                <Button sx={{ ml: 3 }}>
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
                  type='password'
                  size='small'
                  variant='outlined'
                  label='Password'
                  autoComplete='off'
                  sx={{ width: '70%' }}
                />
                <Button sx={{ ml: 3 }}>
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
  )
}

export default AccountMain;