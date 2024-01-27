import { Blog } from "@/models"
import { getPost } from "@/services"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Post() {
  const [post, setPost] = useState([])

  useEffect(() => {
    getPost().then((res) => {
      setPost(res.data)
    })
  }, [])

  return (
    <section >
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 flex gap-3 flex-col">

        {
          post.map((item: Blog) => (
            <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
              key={item.id}
            >
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <Link to={`/post/${item.id}`}>{item.name}</Link>
              </h2>
              <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{item.text}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                  <span className="font-medium dark:text-white">
                    {item.userEmail}
                  </span>
                </div>
                <Link to={`/private/post/${item.id}`} className="inline-flex items-center font-medium text-gray-400 hover:underline">
                  Read more
                  <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </Link>
              </div>
            </article>
          ))
        }

      </div>
    </section>
  )
}

export default Post