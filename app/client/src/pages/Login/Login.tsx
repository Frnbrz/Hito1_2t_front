import { DefaultButton } from '@/components/atoms/button'
import { useFields } from '@/hooks'
import { PrivateRoutes, PublicRoutes } from '@/models'
import { UserKey, createUser, resetUser } from '@/redux/states/user'
import { loginService } from '@/services'
import { clearLocalStorage } from '@/utilities'
import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [error, setError] = React.useState(false)

  useEffect(() => {
    clearLocalStorage(UserKey)
    dispatch(resetUser())
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(false)
    const data = new FormData(event.currentTarget)

    try {
      const result = await loginService({
        email: data.get('email')?.toString() || '',
        password: data.get('password')?.toString() || ''
      })

      dispatch(createUser({ ...result.data }))
      navigate(`/${PrivateRoutes.HOME}`, { replace: true })

    } catch (e) {
      setError(true)
    }


  }

  const email = useFields({ type: 'email', name: 'email', label: 'Email' })

  const password = useFields({ type: 'password', name: 'password', label: 'Password' })

  return (

    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input  {...email} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input {...password} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>

              {error ? <p className="text-sm font-medium text-red-600">Credenciales incorrectas</p> : null}

              <DefaultButton>Sign in</DefaultButton>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Crear una cuenta <a href="register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrarte</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
