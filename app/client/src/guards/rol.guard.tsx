import useDecoded from '@/hooks/useDecoded'
import { PrivateRoutes, Roles } from '@/models'
import { Navigate, Outlet } from 'react-router-dom'


interface Props {
  role: Roles
}



function RoleGuard({ role }: Props) {
  const { role: userRole, } = useDecoded()

  return role === userRole ? <Outlet /> : <Navigate to={PrivateRoutes.HOME} />

}
export default RoleGuard
