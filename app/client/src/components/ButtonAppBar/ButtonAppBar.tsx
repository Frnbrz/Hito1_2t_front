import { PrivateRoutes, PublicRoutes } from '@/models'
import { UserKey, resetUser } from '@/redux/states/user'
import { AppStore } from '@/redux/store'
import { clearLocalStorage } from '@/utilities'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Logos from '../atoms/logos'

export default function ButtonAppBar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userState = useSelector((store: AppStore) => store.user)

  const logOut = () => {
    clearLocalStorage(UserKey)
    dispatch(resetUser())
    navigate(PublicRoutes.LOGIN, { replace: true })
  }
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex items-center">
        <Logos.Home className="w-12 h-12 mr-4" />
      </div>
      {userState.email ? (
        <>
          <nav>
            <Link to={`/private/${PrivateRoutes.HOME}`} className="text-white mr-4">
              {PrivateRoutes.HOME}
            </Link>
            <Link to={`/private/${PrivateRoutes.PROFILE}`} className="text-white mr-4">
              {PrivateRoutes.PROFILE}
            </Link>
            <Link to={`/private/${PrivateRoutes.POST}`} className="text-white mr-4">
              {PrivateRoutes.POST}
            </Link>
          </nav>
          <button
            className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded"
            onClick={logOut}
          >
            Logout
          </button>
        </>
      ) : null}
    </div>
  )
}