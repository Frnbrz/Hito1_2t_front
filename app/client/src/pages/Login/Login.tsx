import { PrivateRoutes, PublicRoutes, Roles } from '@/models'
import { createUser, resetUser, UserKey } from '@/redux/states/user'
import { getMorty } from '@/services'
import { clearLocalStorage } from '@/utilities'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
  createTheme,
  ThemeProvider,
  TextField,
  Typography,
  Link,
  Grid,
  CssBaseline,
  Container,
  Button,
  Box,
  Avatar,
  Paper
} from '@mui/material'
import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFields } from '@/hooks'

const theme = createTheme()

export default function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    clearLocalStorage(UserKey)
    dispatch(resetUser())
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true })
  }, [])

  const login = async () => {
    try {
      const result = await getMorty()
      dispatch(createUser({ ...result, rol: Roles.USER }))
      navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true })
    } catch (error) {}
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password')
    })
  }

  const username = useFields({ type: 'text', name: 'username', label: 'Username' })
  console.log(username.value)

  const password = useFields({ type: 'password', name: 'password', label: 'Password' })

  return (
    <ThemeProvider theme={theme}>
      <Box display={'flex'} justifyContent={'center'} flexDirection="column" margin={2} gap={1}>
        <Box display={'flex'} alignItems="center" justifyContent={'center'} flexDirection="column">
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inicia Sesión
          </Typography>
        </Box>
        <Container component={Paper} maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: 1
            }}
          >
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth {...username} autoFocus />
              <TextField margin="normal" {...password} required fullWidth autoComplete="current-password" />
              <Button onClick={login} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Inicia Sesión
              </Button>
            </Box>
          </Box>
        </Container>
        <Container>
          <Grid item>
            <Link href="register" variant="body2">
              Create an account
            </Link>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
