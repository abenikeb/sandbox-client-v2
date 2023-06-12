/** @format */

import '@styles/global.css';

export const metadata = {
	title: 'Super App Sandbox',
	description: 'Super App Sandbox',
};

const GuestLayout = ({ children }) => {
	return (
		<>
			<section className="flex-center">{children}
			</section>
		</>
	);
};

export default GuestLayout;
