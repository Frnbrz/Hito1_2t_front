import { Button, Container, createTheme, Grid, Link, Paper, TextField, ThemeProvider, Typography } from '@mui/material'
import Box from '@mui/material/Box'

function Register() {
  const theme = createTheme()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password')
    })
  }
  return (
    <ThemeProvider theme={theme}>
      <Box display={'flex'} justifyContent={'center'} flexDirection="column" margin={2} gap={1}>
        <Box display={'flex'} alignItems="center" justifyContent={'center'} flexDirection="column">
          <Typography component="h1" variant="h5">
            Inicia Sesión
          </Typography>
        </Box>
        <Container component={Paper} maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: 1
            }}
          >
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirm_password"
                label="Confirm Password"
                type="password"
                id="confirm_password"
                autoComplete="current-password"
              />
              <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Inicia Sesión
              </Button>
            </Box>
          </Box>
        </Container>
        <Container>
          <Grid item>
            <Link href="login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
export default Register
