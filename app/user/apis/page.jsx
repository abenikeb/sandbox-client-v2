/** @format */

import React from 'react';
import Image from 'next/image';
import ApiCard from '@components/Card';

const APIs = () => {
	return (
		<>
			<div>
				<div className="api-card-container">
					<h1 className="Headline1">USSD Push Payment</h1>
					<div className="card-container">
						<ApiCard
							logo="/assets/images/create-order.svg"
							title="Create Order"
							description="Creates an Order."
						/>
						<ApiCard
							logo="/assets/images/notify.svg"
							title="Payment"
							description="Notify Payment"
						/>
						<ApiCard
							logo="/assets/images/query.svg"
							title="Query Order"
							description="Query Order"
						/>
					</div>
				</div>
				<div className="api-card-container">
					<h1 className="Headline1">Disbursment</h1>
					<div className="card-container">
						<ApiCard
							logo="/assets/images/create-order.svg"
							title="Disbursment"
							description="Creates an Order."
						/>
						<ApiCard
							logo="/assets/images/query.svg"
							title="Query Order"
							description="Query Order"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default APIs;
