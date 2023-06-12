/** @format */

import Image from 'next/image';

const ApiCard = (props) => {
	return (
		<div className="card">
			<div className="card__body">
				<Image
					src={props.logo}
					// src="/assets/images/create-order.svg"
					alt="logo"
					width={150}
					height={150}
					className="card__img"
				/>
				<h2 className="card__title">{props.title}</h2>
				<p className="card__description">{props.description}</p>
				{/* <a href="/user/dashboard" className='card_button'>Run</a> */}
				<button className="card__button"><a href="/user/dashboard" className='card_button'>Run</a></button>
			</div>
		</div>
	);
};

export default ApiCard;
