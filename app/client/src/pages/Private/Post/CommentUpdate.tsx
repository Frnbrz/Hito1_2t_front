import { AltButton, DefaultButton } from "@/components/atoms/button"
import { PostModalItemProps } from "@/models"
import { fetchBlogById } from "@/redux/states/blog"
import { getPostById } from "@/services"
import { updateComment } from "@/services/comment.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { z } from "zod"


function CommentUpdate({ onClose, id }: PostModalItemProps) {
  const dispatch = useDispatch()
  const { id: idBlog } = useParams()
  const FormSchema = z.object({
    text: z.string().min(2).max(100),
    root: z.string().optional()
  })

  type FormSchemaType = z.infer<typeof FormSchema>


  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  })





  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    console.log(data)
    try {
      await updateComment({
        id: Number(id) || 0,
        text: data.text || '',
      })
      await getPostById(Number(idBlog)).then((res) => {
        dispatch(fetchBlogById(res.data))
        onClose()
      }
      )

    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Error al actualizar el comentario'
      })
    }


  }

  function handleClose(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault()
    onClose()
  }



  return (
    <form className="space-y-4 md:space-y-6 m-5" onSubmit={handleSubmit(onSubmit)}>
      {
        errors.root && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <p className="text-sm text-red-600 mt-1">{errors.root.message}</p>
          </motion.div>
        )
      }
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white ">Email</label>
        <input
          type="text"
          className=" border  text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400   focus:ring-blue-500 focus:border-blue-500" placeholder="coment" required
          {...register("text")}
          disabled={isSubmitting}
        />
        {errors.text && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <p className="text-sm text-red-600 mt-1">{errors.text.message}</p>
          </motion.div>
        )}
      </div>


      <div className="flex justify-between">

        <AltButton
          onClick={handleClose}
        >Cancelar</AltButton>

        <DefaultButton>Actualizar</DefaultButton>
      </div>
    </form>

  )
}
export default CommentUpdate