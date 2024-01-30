import { PrivateRoutes, PublicRoutes } from '@/models'
import { UserKey, createUser, resetUser } from '@/redux/states/user'
import { loginService } from '@/services'
import { clearLocalStorage } from '@/utilities'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from "framer-motion"
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'


const FormSchema = z.object({
  email: z.string({
    description: 'El email debe ser válido'
  }).email(
    {
      message: 'El email debe ser válido'
    }
  ),
  password: z.string({
    errorMap: () => ({ message: 'La contraseña debe tener entre 2 y 20 caracteres' }),
  }).min(2).max(20),
  root: z.string().optional()
})

type FormSchemaType = z.infer<typeof FormSchema>

function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  })



  useEffect(() => {
    clearLocalStorage(UserKey)
    dispatch(resetUser())
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    console.log(data)
    try {
      const result = await loginService({
        email: data.email || '',
        password: data.password || ''
      })

      dispatch(createUser({ ...result.data }))
      navigate(`/${PrivateRoutes.HOME}`, { replace: true })

    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Credenciales incorrectas'
      })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          {errors.root && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              <div className="bg-red-50 p-2.5 rounded-lg">
                <p className="text-sm text-red-600">{errors.root.message}</p>
              </div>
            </motion.div>
          )}
          <h1 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white text-center">
            Login
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required
                {...register("email")}
                disabled={isSubmitting}
              />
              {errors.email && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                >
                  <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                </motion.div>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required
                {...register("password")}
                disabled={isSubmitting}
              />

              {errors.password && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                >
                  <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                </motion.div>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 flex items-center justify-center uppercase text-white font-semibold bg-blue-600 rounded-lg disabled:bg-gray-100 disabled:text-gray-400"
              disabled={isSubmitting}
            >
              Acceder
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Crear una cuenta <a href="register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrarte</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}


export default SignIn