import { Link, Route, Routes } from 'react-router-dom'

interface Props {
  children: JSX.Element[] | JSX.Element
}
function RoutesWithNotFound({ children }: Props) {
  return (
    <Routes>
      {children}
      <Route path="*" element={
        <section>
          <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold mb-4 text-white">Ruta no encontrada</h2>
            <Link to={'/'} className="text-blue-500 hover:underline">Volver al Inicio</Link>
          </div>
        </section>
      }
      /></Routes>
  )
}
export default RoutesWithNotFound
