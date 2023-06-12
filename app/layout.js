/** @format */

import '@styles/global.css';
import '@styles/guest.css';
import '@styles/user.css';

import Provider from '@components/Provider';

export const metadata = {
	title: 'Super App Sandbox',
	description: 'Super App Sandbox',
};

const RootLayout = ({ children }) => (
	<html lang="en">
		<body>
			<Provider>
				<div className="main">
					<div className="gradient" />
				</div>

				<main className="app">{children}</main>
			</Provider>
		</body>
	</html>
);

export default RootLayout;
