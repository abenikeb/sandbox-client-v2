/** @format */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../../api-services/userService";
import { loginWithJwt } from "../../api-services/authService";
import ToastyModal from "@components/UI/ToastyModal/ToastModal"
import withErrorHandler from "@hoc/withErrorHandler/withErrorHandler";
import Image from "next/image";
import Link from "next/link";

import SignUp from "@components/SignUp";

const Sign_Up = () => {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    tel: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [viewModal, setViewModal] = useState(false);

  const createPrompt = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const { firstName, lastName, tel, email, password } = userData;

      const response = await register(
        firstName,
        lastName,
        tel,
        email,
        password
      );

      if (response.status === 201) {
        loginWithJwt(response.headers["x-auth-token"]);
        router.push("/user/home");
      }
    } catch (ex) {
      if (ex.response.status === 400) {
        setError(ex.response.data);
      } else {
        console.log("eror");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  	const handleModalClose = () => {
      setViewModal(false)
	}

  const LoginSuccessMsg = (
      <div className="font-bold flex justify-center items-center">
        Successfully Registered
      </div>
    )

  return (
    <>
     <nav className="sm:hidden flex fixed top-0 left-0 right-0 bg-transparent md:bg-lime-500 text-white justify-between items-center h-20 border-b-2 border-lime-500">
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
    <section className="md:flex w-full">
      
      <div className="hidden sm:flex w-full md:w-1/2 bg-lime-500 flex-center">
        <Image
          src="/assets/images/signup-cover.jpg"
          width={500}
          height={500}
          alt="Image"
        />
      </div>

      <div className="shrink-0 w-full md:w-1/2 h-full bg-white">
        <SignUp
          type="SignUp"
          data={userData}
          setData={setUserData}
          submitting={submitting}
          handleSubmit={createPrompt}
          error={error}
        />
      </div>

      <ToastyModal status="success" show={viewModal} closeModal={handleModalClose}>
		  	{LoginSuccessMsg}
      </ToastyModal> 
      
    </section>
    </>
  );
};

export default withErrorHandler(Sign_Up);
