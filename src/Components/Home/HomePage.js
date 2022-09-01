import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

import { getAllUsers, deleteUser} from "../../redux/apiRequest"
import "./home.css";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/authSlice";
 
const HomePage = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const user = useSelector( (state) => state.auth.login?.currentUser)
  const userList = useSelector( (state) => state.user.users?.allUsers)
  const msg = useSelector( (state) => state.user.msg)
  
  const axiosJWT = createAxios(user, dispatch, loginSuccess)
  const handleDelete = (id) => {
    deleteUser(user?.accessToken, dispatch, id, axiosJWT)
  }

  useEffect(() => {
    if (!user) {
      navigate("/login")
    } else if(user?.accessToken) {
      getAllUsers (user?.accessToken, dispatch, axiosJWT)
    }
  }, [])

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        {`Your role: ${user?.isAdmin? " Admin" : " User"}`}
      </div>
      <div className="home-userlist">
        {userList?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.username}</div>
              <div className="delete-user" onClick={() => handleDelete(user?._id)}> Delete </div>
            </div>
          );
        })}
      </div>
      <p className="user__delete--msg">{msg}</p>
    </main>
  );
};

export default HomePage;
