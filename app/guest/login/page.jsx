/** @format */

"use client";

import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../api-services/authService";
import withErrorHandler from "@hoc/withErrorHandler/withErrorHandler";
import ToastyModal from "@components/UI/ToastyModal/ToastModal"
import Form from "@components/Form";
import Image from "next/image";

const Login = () => {
	const router = useRouter();
	const [submitting, setIsSubmitting] = useState(false);
	const [userData, setUserData] = useState({ email: "", password: "" });
	const [error, setError] = useState(null);
	const [viewModal, setViewModal] = useState(false);

	const createData = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const { response } = await login(userData.email, userData.password);
			console.log("RES", response.status)
			if (response === "OK") {
				setViewModal(true)
				setTimeout(() => {
				  router.push("/user/home");
				},2000)
				
			} else if (response.status === 400) {
				setError(response.data);
			}
		} catch (err) {
			console.log("E", err)
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleModalClose = () => {
      setViewModal(false)
	}
	
	const LoginSuccessMsg = (
      <div className="font-bold flex justify-center items-center">
        Successfully Login
      </div>
    )

	return (
		<>
	    <nav className="flex fixed top-0 left-0 right-0 bg-transparent md:bg-lime-500 text-white justify-between items-center h-20 border-b-2 border-lime-500">
			{/* Logo section */}
			<div className="w-64 sm:h-full bg-white rounded-tr-3xl flex justify-center items-center">
				<Link href="/">
					<Image
						src="/assets/images/et-logo-2.svg"
						alt="logo"
						width={160}
						height={150}
						className="object-contain"
					/>
				</Link>
			</div>

			{/* Desktop Navigation */}
			<div />

			<div className="w-64 h-full bg-white rounded-tl-3xl flex justify-center items-center">
				<Link href="/" className="flex gap-2 ">
					<Image
						src="/assets/images/telebirr-logo-color.svg"
						alt="logo"
						width={160}
						height={160}
						className="object-contain"
					/>
				</Link>
			</div>
		</nav>

		<div className="downpointer">
			<Image
				src="/assets/images/downpointer.svg"
				alt="logo"
				width={100}
				height={100}
				className="object-contain"
			/>
		</div>

		<div className="uppointer">
			<Image
				src="/assets/images/uppointer.svg"
				alt="logo"
				width={100}
				height={100}
				className="object-contain"
			/>
		</div>

		<Form
			type="Login"
			data={userData}
			setData={setUserData}
			submitting={submitting}
			handleSubmit={createData}
			error={error}
		/>

		<ToastyModal status="success" show={viewModal} closeModal={handleModalClose}>
			{LoginSuccessMsg}
		</ToastyModal> 
			
		</>
	);
};

export default withErrorHandler(Login);
