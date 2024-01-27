import { getPostById } from '@/services'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function PostItem() {
  const { id } = useParams()
  const [post, setPost] = useState({})

  useEffect(() => {
    getPostById(+id).then((res) => {
      setPost(res.data)
    })
  }, [])


  return (
    <main>
      <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 lg:w-3/5 m-auto"
      >
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {post.name}
        </h2>
        <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{post.text}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
            <span className="font-medium dark:text-white">
              {post.userEmail}
            </span>
          </div>

        </div>
      </article>
      <section className=" py-8 lg:py-16 antialiased" >
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion (20)</h2>
          </div>
          <form className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">Your comment</label>
              <textarea id="comment"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..." required></textarea>
            </div>
            <button type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
              Post comment
            </button>
          </form>
          {post?.comments ? post.comments.map((item: any) =>
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
                  <button>Delete</button>
                  <button>Edit</button>
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
