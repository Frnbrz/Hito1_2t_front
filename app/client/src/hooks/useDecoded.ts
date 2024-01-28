import { AppStore } from "@/redux/store"
import { jwtDecode } from "jwt-decode"
import { useSelector } from "react-redux"

const useDecoded = () => {



  const userState = useSelector((store: AppStore) => store.user)
  const token = userState.token
  if (!token) return { role: '', email: '' }
  const { role, email } = jwtDecode(token)

  return {
    role,
    email
  }
}

export default useDecoded
