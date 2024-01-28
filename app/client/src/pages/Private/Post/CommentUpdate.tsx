import { AltButton, DefaultButton } from "@/components/atoms/button"
import { PostModalItemProps } from "@/models"
import { fetchBlogById } from "@/redux/states/blog"
import { getPostById } from "@/services"
import { deleteComment } from "@/services/comment.service"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"


function CommentUpdate({ onClose, id }: PostModalItemProps) {
  const dispatch = useDispatch()
  const { id: idBlog } = useParams()

  function handleClose(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault()
    onClose()
  }

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(id)

    if (!id) return

    await deleteComment(id)



    await getPostById(Number(idBlog)).then((res) => {
      dispatch(fetchBlogById(res.data))
      onClose()
    }
    )

  }


  return (
    <form className="max-w-sm mx-auto" onSubmit={(event) => handleUpdate(event)}>
      <div className="mb-5">

        <p>
          ¿Estás seguro que deseas eliminar este comentario?
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
export default CommentUpdate