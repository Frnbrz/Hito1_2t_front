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
        <Link to={`/private/${PrivateRoutes.HOME}`} className="text-white mr-4">

          <Logos.Home className="w-9 h-9 mr-4" />
        </Link>
      </div>
      {userState.email ? (
        <>
          <nav>
            <Link to={`/private/${PrivateRoutes.HOME}`} className="text-white mr-4">
              {PrivateRoutes.HOME}
            </Link>
            {
              userState.email === 'admin@dasdas.com' ?
                <Link to={`/private/${PrivateRoutes.DASHBOARD}`} className="text-white mr-4">
                  {PrivateRoutes.DASHBOARD}
                </Link>
                : null

            }
            <Link to={`/private/${PrivateRoutes.PROFILE}`} className="text-white mr-4">
              {PrivateRoutes.PROFILE}
            </Link>
            <Link to={`/private/${PrivateRoutes.POST}`} className="text-white mr-4">
              {PrivateRoutes.POST}
            </Link>
          </nav>
          <button
            className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            onClick={logOut}
          >
            Logout
          </button>
        </>
      ) : null}
    </div>
  )
}