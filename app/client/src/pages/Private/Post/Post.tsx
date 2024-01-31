import Logos from "@/components/atoms/logos"
import useDecoded from "@/hooks/useDecoded"
import { Blog, Roles } from "@/models"
import { fetchBlog } from "@/redux/states/blog"
import { AppStore } from "@/redux/store"
import { getPost } from "@/services"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Modal from "../Profile/Modal"
import PostDelete from "./PostDelete"
import PostForm from "./PostForm"

function Post() {
  const [showModal, setShowModal] = useState(false)
  const [deletePostId, setDeletePostId] = useState(null as null | number)

  const dispatch = useDispatch()
  const blogState = useSelector((store: AppStore) => store.blog)
  const { role } = useDecoded()


  useEffect(() => {
    getPost().then((res) => {
      dispatch(fetchBlog(res.data))
    })
  }, [])

  const handleDelete = (id: number) => {
    setShowModal(true)
    setDeletePostId(id)
  }

  return (
    <section className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 flex gap-3 flex-col">
      {
        showModal &&
        <Modal
          isOpen={showModal}
          closeModal={() => setShowModal(false)}
        >
          <PostDelete onClose={() => setShowModal(false)} id={deletePostId} />
        </Modal>
      }

      {Array.isArray(blogState) && blogState.length > 0 ?
        blogState.map((blog: Blog) => (
          <article className="p-6  rounded-lg border  shadow-md bg-gray-800 border-gray-700"
            key={blog.id}
          >
            <header className="mt-2 mb-4 flex justify-between " key={blog.id}>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-100">
                <Link to={`/post/${blog.id}`}>{blog.name}</Link>
              </h2>
              {role === Roles.ADMIN ?
                <button className="mb-2 text-2xl font-bold tracking-tight text-white " onClick={() => handleDelete(blog.id || 0)}>
                  <Logos.Delete className="w-6 h-6" />
                </button>
                : null
              }
            </header>
            <p className="mb-5 font-light text-gray-400  truncate">{blog.text}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                <span className="font-medium text-white">
                  {blog.userEmail}
                </span>
              </div>
              <Link to={`/post/${blog.id}`} className="inline-flex items-center font-medium text-gray-400 hover:underline">
                Leer más
                <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </Link>
            </div>
          </article>
        ))
        :
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold">No hay posts</h1>
        </div>
      }

      {role === Roles.ADMIN ?
        <PostForm key="post-form" />
        : null
      }

    </section >
  )
}

export default Post
