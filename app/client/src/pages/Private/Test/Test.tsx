import { FallBackComponent } from '@/components/FallBackComponent'
import { TestComponent } from '@/components/Test'
import { ErrorBoundary } from '@/utilities'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

function Test() {

  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    setTimeout(() => {
      setName('Error disappear')
    }
      , 2000)

  }, [])




  return (
    <ErrorBoundary fallbackComponent={<FallBackComponent />}
      resetCondition={name}>
      <Box>
        <Typography variant='h2'>Test Page</Typography>
        <TestComponent name={name} />
      </Box>
    </ErrorBoundary>
  )
}
export default Test
