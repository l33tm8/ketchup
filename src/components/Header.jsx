import {React, useState, useEffect} from "react";

import classes from "./Header.module.css";
import Tinder from "./tinder/Tinder";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StartPage from "./Index";
import Footer from "./Footer";
import Profile from "./profile/Profile";
import Favourites from "./Favourites/FavouritePage";
import LoginPage from "./LoginPages/LoginPage";
import RegisterPage from "./LoginPages/RegisterPage";
import Orders from "./Orders";

const Main = () =>
{
	let [loggedInLink, setLoggedInLink] = useState("/login");
	let [username, setUsername] = useState("Войти");
	let [currentUserInfo, setCurrentUserInfo] = useState();
	
	useEffect(() => 
	{
		(async () =>
		{
			
			await fetch("http://127.0.0.1:8000/getCurrentUser", 
			{
				method: "GET",
				credentials: "include",
			}).catch(e => console.log("not logged in")).then(async (res) =>
			{
				if ( res === undefined || res.status > 400)
				{
					setLoggedInLink("/login");
					setUsername("Войти");
				}
				else
				{
					setLoggedInLink("/profile");
					let resJson = await res.json();
					setUsername(resJson.first_name);
					setCurrentUserInfo(resJson);
				}
			})

		})();
	}, []);
	
    return (
		<div>
			<div class={classes["nav-header"]}>
			<nav class={classes["navbar"]}>
				<a href="/" class={classes["navbar-brand"]}>
					КЕТЧУП<sup>Ⓒ</sup>
				</a>
				
				<ul class={classes["navbar-menu"]}>
					<li><a href="/orders">Заказы</a></li>
					<li><a href="/favourites">Избранное</a></li>
					<li><a href="/tinder">Лента</a></li>
					<li><a href={loggedInLink}>{username}</a></li>
				</ul>
			</nav>
			
			</div>

			<Router>
				<Routes>
					<Route exact path="/" element={<StartPage />} />
					<Route exact path="/tinder" element={<Tinder />} />
					<Route exact path="/profile" element={<Profile userStats={currentUserInfo}/>} />
					<Route exact path="/favourites" element={<Favourites />} />
					<Route exact path="/login" element={<LoginPage />} />
					<Route exact path="/registration" element={<RegisterPage />} />
					<Route exact path="/orders" element={<Orders />} />
				</Routes>
			</Router>
			<Footer />
		</div>
    )
}

export default Main;