import { PrivateRoutes, Roles } from '@/models'
import { AppStore } from '@/redux/store'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

interface Props {
  rol: Roles
}

function RoleGuard({ rol }: Props) {
  console.log(rol)
  const userState = useSelector((store: AppStore) => store.user)
  return userState.role === rol ? <Outlet /> : <Navigate replace to={PrivateRoutes.HOME} />
}
export default RoleGuard
