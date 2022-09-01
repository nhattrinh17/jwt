import axios from "axios"
import jwt_decode from "jwt-decode"

const refeshToken = async () => {
    try {
      const res = await axios.post("/auth/refresh", {
        withCredentials: true,
      })
      return res.data
    } catch (error) {
        console.log(error)
    }
}
  
export const createAxios = (user, dispatch, stateSuccess) => {
    
    let newInstance = axios.create()
    
    newInstance.interceptors.request.use(
        async (config) => {
          let date = new Date()
          const decodeToken = jwt_decode(user?.accessToken)
          if (decodeToken.exp < date.getTime() / 1000) {
            const data = await refeshToken()
            const refeshUser = {
              ...user,
              accessToken: data.accessToken
            }
            dispatch(stateSuccess(refeshUser))
            config.headers["token"] = `Bearer ${data.accessToken}`
          }
          return config
        }, 
        (error) => Promise.reject(error) 
    )

    return newInstance
}
