import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import MyCalendar from "./myCalendar";
import { Link, useNavigate } from "react-router-dom";
 
export const Profile = () => {
  const [user, setUser] = useState({});
  const { store, actions } = useContext(Context);
  const navigate = useNavigate(); 

  const getUser = async () => {
	// console.log(store.token, "get user!!")
    let response = await fetch(process.env.BACKEND_URL + "/user", {
      headers: {
        "Authorization": "Bearer " + store.token,
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    setUser(data);
  };

  const handleLogout = () => {
	actions.logout()
	navigate("/login")
  };

  useEffect(() => {
    getUser();
  }, []);

	return (
		<div className="text-center mt-5">
			<Link to="/favAnime">
				<button className="btn btn-primary text-dark m-1">Favorite Anime</button>
			</Link>
			<Link to="/favManga">
				<button className="btn btn-primary text-dark m-1">Favorite Manga</button>
			</Link>
			{
				store.token ?  
				<div className="m-5 profile-Container">
					<h1>Welcome Back</h1>
					<h1 className="navbar-title">Anime Calendar</h1>
          			<MyCalendar />
					  <button className="btn btn-danger mt-1" onClick={handleLogout}>Log Out</button>
				</div>
				:
				<div>
					<h1>YOU MUST LOGIN</h1>
					<Link to="/login">Login</Link>
				</div>
			}
		</div>
	);
};
