import axios from 'axios'
import { loginFailed, loginStart, loginSuccess, 
        registerStart, registerSuccess, registerFailed, logOutStart, logOutSuccess, logOutFailed } from './authSlice'
import { deleteUserFailed, deleteUserStart, deleteUserSuccess, 
        getUsersFailed, getUsersStart, getUsersSuccess } from './userSlice'

const loginUser = async(user, dispath, navigate) => {
    dispath(loginStart())
    try {
        const res = await axios.post("/auth/login", user)
        dispath(loginSuccess(res.data))
        navigate("/")
    } catch (error) {
        dispath(loginFailed())
    }
}

const registerUser = async (user, dispath, navigate) => {
    dispath(registerStart())
    try {
        const res = await axios.post("/auth/register", user)
        dispath(registerSuccess(res.data))
        navigate("/login")
    } catch (error) {
        dispath(registerFailed)
    }
}

const getAllUsers = async (accessToken, dispath, axiosJWT) => {
    dispath(getUsersStart)
    try {
        const res = await axiosJWT.get("/user", {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })

        dispath(getUsersSuccess(res.data))
    } catch (error) {
        dispath(getUsersFailed())
    }
}

const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteUserStart());
    try {
      const res = await axiosJWT.delete("/user/delete/" + id, {
        headers: { token: `Bearer ${accessToken}` },
      });
      dispatch(deleteUserSuccess(res.data));
    } catch (err) {
      dispatch(deleteUserFailed(err.response.data));
    }
}

const logoutUser = async (dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logOutStart())
    try {
        await axiosJWT.post("/auth/logout",id, {
            headers: {token: `Bearer ${accessToken}`}
        })
        dispatch(logOutSuccess())
        navigate("/login")
    } catch (error) {
        dispatch(logOutFailed())
    }
}

export {loginUser, registerUser, getAllUsers, deleteUser, logoutUser} 