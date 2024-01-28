import { AltButton, DefaultButton } from "@/components/atoms/button"
import { PostModalItemProps } from "@/models"
import { fetchBlog } from "@/redux/states/blog"
import { deletePost, getPost } from "@/services"
import { useDispatch } from "react-redux"


function PostDelete({ onClose, id }: PostModalItemProps) {
  const dispatch = useDispatch()

  function handleClose(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault()
    onClose()
  }

  async function handleDelete(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!id) return

    await deletePost(id)

    await getPost().then((res) => {
      dispatch(fetchBlog(res.data))
    })

    onClose()
  }


  return (
    <form className="max-w-sm mx-auto" onSubmit={handleDelete}>
      <div className="mb-5">

        <p>
          ¿Estás seguro que deseas eliminar este post?
        </p>

      </div>
      <div className="flex justify-between">

        <DefaultButton
          onClick={handleClose}
        >Cancelar</DefaultButton>

        <AltButton>Borrar</AltButton>
      </div>
    </form>

  )
}
export default PostDelete