"use client"
import InputField from "@components/input";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUserData } from "../../api-services/authService";

const Profile = () => {
  const [isUserLogin, setIsUserLogin] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const user = getUserData(); //{email: 'ebsa16teklu@gmail.com', iat: 1685207877, exp: 1685213877}
		setUser(user);
		user !== null ? setIsUserLogin(false) : setIsUserLogin(true);
  }, []);
  
  return (
    <div className="flex place-items-start">
      <div className="grid grid-cols-1 gap-4 justify-center content-center">
        <div className="rounded-full border-2 border-lime-500 w-48 h-48 flex justify-center">
          <Image
            src="/assets/icons/user.svg"
            alt="logo"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
        <center>
          <h2 className="font-bold text-2xl">{`${user?.firstName}`}</h2>
        </center>
        <button className="border-2 border-lime-500 rounded py-2 text-lg hover:bg-lime-500 hover:text-white">
          Upload
        </button>
      </div>
      <div className="w-max mx-20">
        <div className="grid grid-cols-2 gap-4 bg-white px-10 py-5 drop-shadow-md w-max mb-5">
          <h2 className="font-bold text-lg">PERSONAL INFORMATION</h2>
          <h1></h1>
          <InputField title="First name" />
          <InputField title="Last name" />
          <InputField title="email" type="email" />
          <InputField title="Phone number" type="Number" />
          <button className="border-2 border-lime-500 bg-lime-500 text-white rounded w-4/5 py-px text-xl hover:bg-white hover:text-lime-500">
            Save
          </button>
        </div>
        <div className="grid grid-cols-1 gap-1 bg-white pl-10 pr-50 py-5 drop-shadow-md mb-10">
          <h2 className="font-bold text-lg">CHANGE PASSWORD</h2>
          <h1></h1>
          <InputField title="Current password" type="password" />
          <InputField title="New password" type="password" />
          <InputField title="Confirm password" type="password" />
          <button className="btn-long">Change Password</button>
        </div>
      </div>
    </div>
  );
};
export default Profile;
