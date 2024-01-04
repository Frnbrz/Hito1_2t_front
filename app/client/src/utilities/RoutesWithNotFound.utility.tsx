import { Box, Typography } from '@mui/material'
import { Link, Route, Routes } from 'react-router-dom'

interface Props {
  children: JSX.Element[] | JSX.Element
}
function RoutesWithNotFound({ children }: Props) {
  return (
    <Routes>
      {children}
      <Route
        path="*"
        element={
          <Box>
            <Typography variant="h2">Not Found</Typography>

            <Link to={'/'}>Go to home</Link>
          </Box>
        }
      />
    </Routes>
  )
}
export default RoutesWithNotFound
