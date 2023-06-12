/** @format */

import '@styles/global.css';

import Nav from '@components/Nav';

export const metadata = {
	title: 'Super App Sandbox',
	description: 'Super App Sandbox',
};

const AuthLayout = ({ children }) => {
	return (
		<main className='mt-28'>
			<Nav />
			{children}
		</main>
	);
};

export default AuthLayout;
