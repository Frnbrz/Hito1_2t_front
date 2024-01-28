
export interface UserInfo {
  email: string
  token: string
}

export interface DecodedToken {
  role: string
  email: string
  iat: number
  exp: number
}

export interface UserLogin {
  email: string
  password: string
}

export interface UserRegister {
  email: string
  name: string
  password: string
}

export interface UserState {
  email: string
  token: string
}


