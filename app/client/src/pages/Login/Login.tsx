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
    <section>

      <div className="flex justify-center items-center flex-col ">
        <div className="flex items-center justify-center flex-col">
          <img className="m-1 bg-secondary-main" />
          <h1 className="text-5xl text-white">Inicia Sesión</h1>
        </div>
        <div className="max-w-xs">

          <form onSubmit={handleSubmit} className="mt-1">
            <label className="text-white">Email</label>
            <input
              className="w-full mb-4 p-2 border border-gray-300 rounded text-black"
              {...email}
              required
              autoFocus
            />
            <label className="text-white">Password</label>
            <input
              className="w-full mb-4 p-2 border border-gray-300 rounded text-black"
              {...password}
              required
              autoComplete="current-password"
            />
            {error ? <footer>
              <p className="text-red-500">Error message goes here</p>
            </footer> : null}
            <button
              className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-6"
            >
              Inicia Sesión
            </button>
          </form>

        </div>
        <div>
          <a href="register" className="text-blue-500">
            Create an account
          </a>
        </div>
      </div>
    </section>
  )
}
