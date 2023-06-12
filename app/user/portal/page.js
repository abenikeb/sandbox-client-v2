"use client";
/** @format */
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUserData } from "../../api-services/authService";
import { useRouter } from "next/navigation";
import Button from "@components/UI/Button/Button";

const LandingPage = () => {
	const router = useRouter();
	const [isUserLogin, setIsUserLogin] = useState(false);

	useEffect(() => {
		const user = getUserData();
		console.log("USER", user)
		user !== null ? setIsUserLogin(true) : setIsUserLogin(false);

		// if (!isUserLogin) {
		// 	router.push("/user/home");
		// }
	}, []);

	return (
		<section>
			<div className="portal-container" />

            <div className="get-started">
				<h3 className="head_text_line text-center w-3/4 md:w-full">
					Build, test, and play in
					<br className="max-md:hidden" />
					<span className="head_text_line text-center">
						{" "}
						 a safe environment
					</span>
				</h3>
				<Link href="/guest/login" className="outline_btn_GET_STARTED">
					GET STARTED
				</Link>
				<div className="materials" />
			</div> 

			{/* <div className="landing-page-ellipse" /> */}

			<div className="landing-shapy" />
			
			<div className="third-dev-section">
				<Link hidden href="/guest/login" className="text-xl md:text-4xl font-normal text-white bg-lime-500">
				  GET STARTED
				</Link>
			</div>  

			<div className="entire-container" />
			{/* <div className="footer"/> */}
		</section>
	);
};

export default LandingPage;
