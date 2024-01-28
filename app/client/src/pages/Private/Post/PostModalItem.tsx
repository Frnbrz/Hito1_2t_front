import { AltButton, DefaultButton } from "@/components/atoms/button"
import { PostModalItemProps } from "@/models"


function PostModalItem({ onClose }: PostModalItemProps) {

  function handleClose(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault()
    onClose()
  }


  return (
    <form className="max-w-sm mx-auto">
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
export default PostModalItem