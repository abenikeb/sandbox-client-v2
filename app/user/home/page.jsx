/** @format */

"use client";

import "@styles/user.css";
import { useEffect, useState } from "react";
import { getUserData } from "../../api-services/authService";
import Link from "next/link";

const Home = () => {
	const [isUserLogin, setIsUserLogin] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const user = getUserData(); //{email: 'ebsa16teklu@gmail.com', iat: 1685207877, exp: 1685213877}
		setUser(user);
		user !== null ? setIsUserLogin(false) : setIsUserLogin(true);
	}, []);

	return (
		<center>
			<div className="border-2 border-b-gray-100 shadow-md rounded-lg flex flex-col justify-center items-center bg-white w-11/12 md:w-3/4 h-60 mt-20">
				<h3 className="font-satoshi font-extrabold text-3xl md:text-5xl text-black tracking-wide my-3"> Welcome {user?.firstName}</h3>
				<h4 className="font-satoshi font-bold text-lg md:text-3xl text-black tracking-wide">Welcome to telebirr developers portal</h4>

				<div className="w-3/4 md:w-1/4 mt-7">
					<Link href="/user/dashboard" className="btn-filled">GET API CREDENTIALS</Link>
				</div>
			</div>
		</center>
	);
};

export default Home;
