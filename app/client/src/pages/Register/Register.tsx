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
    registerService(user)

  }



  return (
    <section>

      <div className="flex justify-center items-center flex-col ">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-2xl font-bold text-white">Registro</h1>
        </div>
        <div className="max-w-xs">
          <form onSubmit={handleSubmit} noValidate>
            <label className="text-white">Email</label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full mb-2 text-black"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="text-white">Nombre</label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full mb-2 text-black"
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label className="text-white">Contraseña</label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full mb-2 text-black"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-6"
            >
              Crear cuenta
            </button>
          </form>
        </div>
        <div>
          <Link to="/login" className="text-blue-500">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Register
