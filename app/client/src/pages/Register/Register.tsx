import { registerService } from '@/services'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const user = {
      email,
      password,
      name
    }
    const result = registerService(user)

  }



  return (
    <section>

      <div className="flex justify-center items-center flex-col ">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-2xl font-bold text-white">Inicia Sesión</h1>
        </div>
        <div className="max-w-xs">
          <form onSubmit={handleSubmit} noValidate>
            <input
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-6"
            >
              Inicia Sesión
            </button>
          </form>
        </div>
        <div>
          <Link to="/login" className="text-blue-500">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Register
