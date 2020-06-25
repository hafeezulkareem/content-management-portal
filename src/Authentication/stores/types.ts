export interface SignInRequestObject {
   username: string
   password: string
}

export interface SignInResponse {
   user_id: number
   access_token: string
   refresh_token: string
   expires_in: string
}
