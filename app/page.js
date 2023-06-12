/** @format */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserData } from './api-services/authService';
import withErrorHandler from '@hoc/withErrorHandler/withErrorHandler';

const Home = () => {
	const router = useRouter();
	const [isUserLogin, setIsUserLogin] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const user = getUserData();
		setUser(user);

		user !== null ? setIsUserLogin(true) : setIsUserLogin(false);

		if (isUserLogin) {
			router.push('/user/home');
		} else {
			router.push('/user/portal');
		}
	}, []);
};

export default withErrorHandler(Home);
