import { fetchNotes } from "@/redux/states/notes"
import { getNotesError } from "@/services"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const TestAsyncComponent = () => {


  const dispatch = useDispatch()

  const getNotesFromApi = async () => {
    try {
      const result = await getNotesError()
      dispatch(fetchNotes(result))
    } catch (error) {
      throw new Error(error as string)
    }
  }
  useEffect(() => {
    getNotesFromApi()
  }, [])


  return (
    <div>TestAsyncComponent</div>
  )
}

export default TestAsyncComponent