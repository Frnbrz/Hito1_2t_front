import { DefaultButton } from '@/components/atoms/button'
import Logos from '@/components/atoms/logos'
import useDecoded from '@/hooks/useDecoded'
import { Comment } from '@/models'
import { fetchBlogById } from '@/redux/states/blogById'
import { AppStore } from '@/redux/store'
import { getPostById } from '@/services'
import { postComment } from '@/services/comment.service'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from '../Profile/Modal'
import CommentDelete from './CommentDelete'
import CommentUpdate from './CommentUpdate'

function PostItem() {
  const { id } = useParams()
  const [showModal, setShowModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const [deleteCommentId, setDeleteCommentId] = useState(null as null | number)
  const blogByIdState = useSelector((store: AppStore) => store.blogById)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { email } = useDecoded()


  useEffect(() => {
    getPostById(Number(id)).then((res) => {
      dispatch(fetchBlogById(res.data))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const text = data.get('comment')?.toString() || ''

    await postComment({
      text,
      blogId: Number(id)
    })

    await getPostById(Number(id)).then((res) => {
      dispatch(fetchBlogById(res.data))
    }
    )
  }

  function handleDelete(id: number) {
    setDeleteModal(true)
    setShowModal(!showModal)
    setDeleteCommentId(id)
  }

  function handleUpdate(id: number) {
    setUpdateModal(true)
    setShowModal(!showModal)
    setDeleteCommentId(id)
  }

  function handleClose() {
    setShowModal(false)
    setDeleteModal(false)
    setUpdateModal(false)
  }


  return (
    <section>
      {
        showModal &&
        <Modal
          isOpen={showModal}
          closeModal={handleClose}
        >
          {deleteModal ? <CommentDelete onClose={handleClose} id={deleteCommentId} /> : null}
          {updateModal ? <CommentUpdate onClose={handleClose} id={deleteCommentId} /> : null}

        </Modal>
      }

      <div className="container mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm  transition-colors duration-200 border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-400 bg-gray-200   border-gray-700 text-black">
          <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          <span>Volver</span>
        </button>

        <article className="p-6  rounded-lg border shadow-md bg-gray-800 border-gray-700 lg:w-3/5 m-auto"
        >
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">
            {blogByIdState.name}
          </h2>
          <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{blogByIdState.text}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
              <span className="font-medium text-white">
                {blogByIdState.userEmail}
              </span>
            </div>

          </div>
        </article>
        <section className=" py-8 lg:py-16 antialiased" >
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-white">Discussion (20)</h2>
            </div>
            <form className="mb-6" onSubmit={handleSubmit}>
              <div className="py-2 px-4 mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">Your comment</label>
                <textarea id="comment"
                  name='comment'
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Write a comment..." required></textarea>
              </div>
              <DefaultButton>
                Post comment
              </DefaultButton>
            </form>
            <div className="flex  gap-3 flex-col">
              {blogByIdState?.comments ? blogByIdState.comments.map((item: Comment) =>
                <article className="p-6 text-base  rounded-lg bg-gray-800 border-gray-700 border shadow-md" key={item.id}>
                  <footer className="flex justify-between items-center mb-2 gap-3 ">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-white font-semibold"><img
                        className="mr-2 w-6 h-6 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        alt="Michael Gough" />{item.userEmail}</p>
                      <p className="text-sm text-gray-400"><time
                        title="February 8th, 2022">Feb. 8, 2022</time></p>
                    </div>
                    {email === item.userEmail ?
                      <div className='flex gap-3'>
                        <button className="mb-2 text-2xl font-bold tracking-tight text-white border-gray" onClick={() => handleDelete(item.id!)}>
                          <Logos.Delete className="w-6 h-6" />
                        </button>
                        <button className="mb-2 text-2xl font-bold tracking-tight text-white" onClick={() => handleUpdate(item.id!)}>
                          <Logos.Edit className="w-6 h-6" />
                        </button>
                      </div> : null
                    }
                  </footer>
                  <p className="text-gray-500 dark:text-gray-400">{item.text}</p>
                </article>
              )
                : null}

            </div>
          </div>



        </section>
      </div>

    </section >





  )
}

export default PostItem
