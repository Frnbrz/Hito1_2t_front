import { fetchNotes } from '@/redux/states/notes'
import { AppStore } from '@/redux/store'
import { getNotes } from '@/services'
import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Dashboard() {
  const dispatch = useDispatch()
  const notesState = useSelector((store: AppStore) => store.notes)

  const getNotesFromApi = async () => {
    try {
      const result = await getNotes()
      dispatch(fetchNotes(result))
    } catch (error) { }
  }
  useEffect(() => {
    getNotesFromApi()
  }, [])


  return (
    <Box>
      <Typography variant='h2'>Dashboard</Typography>
      {/* {notesState.notes.map((note: Note) => {
        return <Typography variant='h3'>{note.content}</Typography>;
      })} */}
    </Box>
  )
}
export default Dashboard
