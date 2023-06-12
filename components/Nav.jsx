/** @format */
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import Button from "./UI/Button/Button";
import ProfileSidenav from "./UI/ProfileSidenav/ProfileSidenav";

import { getUserData, logout } from "../app/api-services/authService";

const navLink = [
	{ title:"HOME",  path:"/user/home", icon:"/assets/icons/mobile-home.svg", isProtectedRoute: true},
	{ title: "APIS", path: "/user/apis", icon:"/assets/icons/mobile-api.svg", isProtectedRoute: true },
	{ title: "DOCS", path: "http://196.189.126.129:8080/docs/Getting%20Started", icon:"/assets/icons/mobile-docs.svg", isProtectedRoute:false, isPathNew:true },
	{ title: "FAQS", path: "/user/faqs", icon:"/assets/icons/mobile-faq.svg", isProtectedRoute: false },
	{ title:"FORUM", path:"/user/forum", icon:"/assets/icons/mobile-forum.svg", isProtectedRoute: false},
	{ title: "SUPPORT", path: "/user/support", icon:"/assets/icons/mobile-user.svg", isProtectedRoute: false },
]

const Nav = () => {
	const router = useRouter();
	const pathname = usePathname();

	const [isUserLogin, setIsUserLogin] = useState(false);
	const [user, setUser] = useState(null);
	const [mobileDropdown, setMobileDropdown] = useState(false)
	const [dropdownToggle, setDropdownToggle] = useState(false)
	const [settingsDropdownToggle, setSettingsDropdowntoggle] = useState(false)
	const [notificationDropdownToggle, setNotificationDropdownToggle] = useState(false)
	const [viewModal, setViewModal] = useState(false);

	useEffect(() => {
		const user = getUserData(); //{username: 'ebsaTeklu', sub: 'ebsa16teklu@gmail.com', iat: 1685207877, exp: 1685213877}
		setUser(user);

		user !== null ? setIsUserLogin(true) : setIsUserLogin(false);
	}, []);

	const handleSignOut = () => {
		logout();
		router.replace("/");
	};

	const handleModalClose = () => {
      setViewModal(false)
	}

	const handleModalOpen = () => {
      setViewModal(true)
	}
	
	const ProfileSideNav = (
      <div className="font-bold">
        {isUserLogin ? (
			<div className="flex gap-2 text-gray-600 mb-2">
				<Image
					src="/assets/icons/profile-user-circle.svg"
					width={20}
					height={20}
					alt="user"
					className=""								
				/>
				{user?.firstName}
			</div>
			
			): (
				<Link
					href='/profile'
					className='dropdown_link'
					onClick={() => setMobileDropdown(false)}
					>
					
				</Link>
			) }
			<hr />
			<br />
			<ul className="flex flex-col justify-start items-start text-black">
				{navLink.map((link) => (
					<li key={link.title}>
						<Link
							href={(link.isProtectedRoute && !isUserLogin) ? '/guest/login' : link.path}
							target={link.isPathNew && "_blank"}
							className={`font-normal flex gap-x-2 mb-3 hover:text-amber-300 ${pathname === link.path && 'text-amber-400 font-sans contrast-125'}`}
							prefetch={false}>
							<Image
								src={link.icon}
								width={25}
								height={25}
								alt="user"
								className=""								
							/>
							{link.title}
						</Link>
					</li>		
				))}
			</ul>	

			{!isUserLogin ? (
				<div className="flex flex-0 gap-3 md:gap-5">
					<Link href="/guest/login">
						<Button btn_class="btn-outline" label="Login"/>
					</Link>
				</div>
			) : (
				<button
					type='button'
					onClick={() => {
						setMobileDropdown(false);
						handleSignOut
					}}
					className='mt-5 w-full black_btn'
				>
				  <Image
					src="/assets/icons/mobile-logout.svg"
					width={25}
					height={25}
					alt="user"
					className="mr-2"								
				/>
				    Sign Out
				</button>
			)}	
      </div>
    )

	// flex gap-40 flex-row fixed top-0 left-0 right-0 bg-lime-500 justify-between items-center h-28 text-white shadow-slate-600

	return (
		<>
			<nav className="flex fixed top-0 left-0 right-0 bg-gray-100 md:bg-lime-500 text-white shadow-slate-600 glassmorphism md:glassmorphism-lime justify-between items-center h-20 z-50">
				{/* LOGO Section */}
				<section className="flex justify-between items-center pl-3 md:pl-0 h-full">
					<div className="w-28 md:w-64 bg-transparent md:bg-white flex justify-center items-center rounded-tr-3xl h-full">
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

					<div className="sm:hidden w-28 bg-transparent h-full flex justify-center items-center">
						<Link href="/">
							<Image
								src="/assets/images/telebirr-logo-color.svg"
								alt="logo"
								width={160}
								height={150}
								className="object-contain"
							/>
						</Link>
					</div>
				</section>

				{/* Desktop Navigation */}
				<div className="sm:flex hidden w-full justify-between items-center">

					<section className="flex mx-auto gap-x-5">
						{/* Link Section */}
						<ul className="flex justify-center items-center gap-10">
							{navLink.map((link) => (
								<li key={link.title}>
									<Link href={(link.isProtectedRoute && !isUserLogin) ? '/guest/login' : link.path  } target={link.isPathNew && "_blank"} className={`font-bold mb-9 hover:text-amber-300 ${pathname === link.path && 'text-amber-400 font-sans contrast-125'}`} prefetch={false}>
										{link.title}
									</Link>
								</li>		
							))}
						</ul>

						{/* Profile Section */}
						
						{!isUserLogin ? (
							<div className="flex flex-0 gap-3 md:gap-5 pl-10">
								<Link href="/guest/login">
									<Button btn_class="btn-outline" label="Login"/>
								</Link>
							</div>
							) : (
								<div className="flex gap-4 items-center justify-between pl-10">
									<div className="dropdown-wrap-user">
										<Image
											src="/assets/icons/profile-user.svg"
											width={15}
											height={15}
											alt="user"
											className="text-white cursor-pointer"
											onClick={() => setDropdownToggle(!dropdownToggle)}
										/>
										{dropdownToggle &&
											<ul className="fixed top-20 right-1/3 p-2 shadow bg-base-100 rounded-md w-52 text-black gap-y-2">
													<li onClick={() => setDropdownToggle(false)}>
														<Link href="/user/profile" className="text-sm font-bold text-gray-700 flex flex-row gap-x-2 mb-2">
															<Image
																src="/assets/icons/profile-user-circle.svg"
																width={20}
																height={20}
																alt="user"
																className=""								
															/>
															{user?.firstName + " " + user?.lastName}
														</Link>
													</li>
													<hr />
												<li className="mt-2 pl-5 font-semibold" onClick={() => setDropdownToggle(false)}><Link href="/user/profile">Profile</Link></li>			
											</ul>
										}
										
									</div>

									<div className="dropdown-wrap-settings">								
										<Image
											src="/assets/icons/profile-setting.svg"
											width={20}
											height={20}
											alt="user"
											className="text-white cursor-pointer"
											onClick={() => setSettingsDropdowntoggle(!settingsDropdownToggle)}
										/>
										{
											settingsDropdownToggle &&
											<ul tabIndex={0} className="fixed top-20 right-1/3 p-2 shadow bg-base-100 rounded-md w-52 text-black gap-y-2">
													<li onClick={() => setSettingsDropdowntoggle(false)}>
														<Link href="/user/profile" className="text-sm font-bold text-gray-700 flex flex-row gap-x-2 mb-2">
															
														</Link>
													</li>
													<hr />
													<li className="mt-2 pl-5 font-semibold" onClick={() => setSettingsDropdowntoggle(false)}><Link href="/user/profile">Setting</Link></li>
											</ul>
										}
										
									</div>

									<div className="dropdown-wrap-notification">
										<Image
											src="/assets/icons/profile-notification.svg"
											width={20}
											height={20}
											alt="user"
											className="text-white cursor-pointer"
											onClick={() => setNotificationDropdownToggle(!notificationDropdownToggle)}
										/>
										
										{
											notificationDropdownToggle &&
											<ul tabIndex={0} className="fixed top-20 right-1/3 p-2 shadow bg-base-100 rounded-md w-52 text-black gap-y-2">
													<li onClick={() => setNotificationDropdownToggle(false)}>
														<Link href="/user/profile" className="text-sm font-bold text-gray-700 flex flex-row gap-x-2 mb-2">
															Notification Section
														</Link>
													</li>
													<hr />
													<li className="mt-2 pl-5 font-semibold text-sm text-gray-300" onClick={() => setNotificationDropdownToggle(!notificationDropdownToggle)}><Link href="/user/profile">
														Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
													</Link>
													</li>
											</ul>
										}
										
									</div>
						
									<div className="w-28">
										<Button onBtnAction={handleSignOut} btn_class="btn-outline" label="Sign Out"></Button>
									</div>
								</div>
							)}
					</section>

					<section className="bg-white rounded-tl-3xl flex justify-center items-center h-fit w-60 self-end">
						<Link href="/">
							<Image
								src="/assets/images/telebirr-logo-color.svg"
								alt="logo"
								width={160}
								height={160}
								className="object-contain"
							/>
						</Link>
					</section>		
				</div>

				{/* Mobile Navigation */}
				<div className="sm:hidden flex relative">
					<div className='flex'>
						<Image
							src="/assets/icons/menu.png"
							width={37}
							height={37}
							className='rounded-full'
							alt='profile'
							// onClick={() => setMobileDropdown(!mobileDropdown)}
							onClick={() => setViewModal(true)}
						/>
					</div>
				</div>
			</nav>
			<ProfileSidenav show={viewModal} closeModal={handleModalClose}>
				{ProfileSideNav}
			</ProfileSidenav> 	
		</>
	);
};

export default Nav;
