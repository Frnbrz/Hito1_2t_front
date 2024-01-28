import Logos from '@/components/atoms/logos'
import { Comment } from '@/models'
import { fetchBlogById } from '@/redux/states/blogById'
import { AppStore } from '@/redux/store'
import { getPostById } from '@/services'
import { postComment } from '@/services/comment.service'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Modal from '../Profile/Modal'
import CommentDelete from './CommentDelete'
import CommentUpdate from './CommentUpdate'

function PostItem() {
  const { id } = useParams()
  const [showModal, setShowModal] = useState(false)
  const [deleteCommentId, setDeleteCommentId] = useState(null as null | number)
  const blogByIdState = useSelector((store: AppStore) => store.blogById)

  const dispatch = useDispatch()

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
    console.log(id)
    setShowModal(!showModal)
    setDeleteCommentId(id)
  }

  function handleUpdate(id: number) {
    console.log(id)
    setShowModal(!showModal)
    setDeleteCommentId(id)
  }


  return (
    <main>
      {
        showModal &&
        <Modal
          isOpen={showModal}
          closeModal={() => setShowModal(false)}
        >
          <CommentDelete onClose={() => setShowModal(false)} id={deleteCommentId} />
          <CommentUpdate onClose={() => setShowModal(false)} id={deleteCommentId} />

        </Modal>
      }

      <Link to={'-1'}>Volver</Link>

      <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 lg:w-3/5 m-auto"
      >
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {blogByIdState.name}
        </h2>
        <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{blogByIdState.text}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
            <span className="font-medium dark:text-white">
              {blogByIdState.userEmail}
            </span>
          </div>

        </div>
      </article>
      <section className=" py-8 lg:py-16 antialiased" >
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion (20)</h2>
          </div>
          <form className="mb-6" onSubmit={handleSubmit}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">Your comment</label>
              <textarea id="comment"
                name='comment'
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..." required></textarea>
            </div>
            <button type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
              Post comment
            </button>
          </form>
          {blogByIdState?.comments ? blogByIdState.comments.map((item: Comment) =>
            <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900" key={item.id}>
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                    className="mr-2 w-6 h-6 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Michael Gough" />{item.userEmail}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400"><time
                    title="February 8th, 2022">Feb. 8, 2022</time></p>
                </div>
                <div className='flex gap-3'>
                  <button className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" onClick={() => handleDelete(item.id!)}>
                    <Logos.Delete className="w-6 h-6" />
                  </button>
                  <button className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" onClick={() => handleUpdate(item.id!)}>
                    <Logos.Edit className="w-6 h-6" />
                  </button>
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">{item.text}</p>
            </article>
          )
            : null}



        </div>

      </section>

    </main>





  )
}

export default PostItem
