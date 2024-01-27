import { Link } from "react-router-dom"

const FallBackComponent = () => {
  return (
    <section>

      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Ruta no encontrada</h2>

        <Link to={'/'} className="text-blue-500 hover:underline">Volver al Inicio</Link>
      </div>
    </section>
  )
}

export default FallBackComponent