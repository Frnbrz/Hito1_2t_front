import { DefaultButton } from "@/components/atoms/button"
import { createBlog, fetchBlog } from "@/redux/states/blog"
import { getPost, postService } from "@/services"
import { useDispatch } from "react-redux"

function PostForm() {

  const dispatch = useDispatch()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)


    const name = data.get('name')?.toString() || ''
    const text = data.get('text')?.toString() || ''

    await postService({
      name,
      text
    })

    dispatch(createBlog({ name, text }))
    getPost().then((res) => {
      dispatch(fetchBlog(res.data))
    })
  }

  return (
    <form className="mb-6" onSubmit={handleSubmit} >
      <h2 className="text-lg lg:text-2xl font-bold  text-white">Añade Post</h2>
      <div className="py-2 px-4 mb-4  rounded-lg rounded-t-lg border  bg-gray-800 border-gray-700">
        <label htmlFor="name" className="sr-only border  bg-gray-800 border-gray-700">Titulo</label>
        <input id="name"
          type="text"
          name="name"
          className="px-0 w-full text-sm  border-0 focus:ring-0 focus:outline-none text-white placeholder-gray-400 bg-gray-800"
          placeholder="Titulo" required
        ></input>
      </div>
      <div className="py-2 px-4 mb-4  rounded-lg rounded-t-lg border  bg-gray-800 border-gray-700">
        <label htmlFor="comment" className="sr-only">Your comment</label>
        <textarea id="comment"
          name="text"
          className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none text-white placeholder-gray-400 bg-gray-800"
          placeholder="Escribe Post" required></textarea>
      </div>


      <DefaultButton>
        Post comment
      </DefaultButton>
    </form>
  )
}
export default PostForm