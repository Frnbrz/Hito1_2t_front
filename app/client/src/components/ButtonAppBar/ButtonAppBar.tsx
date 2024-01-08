import { PublicRoutes } from '@/models'
import { resetUser, UserKey } from '@/redux/states/user'
import { AppStore } from '@/redux/store'
import { clearLocalStorage } from '@/utilities'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function ButtonAppBar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userState = useSelector((store: AppStore) => store.user)

  const logOut = () => {
    clearLocalStorage(UserKey)
    dispatch(resetUser())
    navigate(PublicRoutes.LOGIN, { replace: true })
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            FBA
          </Typography>
          {userState.name ? (
            <Button color='inherit' onClick={logOut}>
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
