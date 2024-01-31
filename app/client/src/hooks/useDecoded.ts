import { DecodedToken, UserInfo } from "@/models"
import { AppStore } from "@/redux/store"
import { jwtDecode } from "jwt-decode"
import { useSelector } from "react-redux"

const useDecoded = () => {
  let userState: UserInfo = { token: '', email: '' }
  let token: string | null = null
  try {

    userState = useSelector((state: AppStore) => state.user)

    token = userState.token
  } catch (e) {
    console.log(e)
  }
  if (!token) return { role: '', email: '' }
  const { role, email }: DecodedToken = jwtDecode(token)

  return {
    role,
    email
  }
}

export default useDecoded
