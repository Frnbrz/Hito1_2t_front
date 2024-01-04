import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const FallBackComponent = () => {
  return (
    <Box>
      <Typography variant='h2'>There was an error</Typography>
      <Link to={'-1'}>Go to home</Link>
    </Box>
  )
}

export default FallBackComponent