/** @format */

'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import $ from 'jquery';

const Sidebar = ({ topics, onClickTopic, activeNavBar }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [activeSubTopic, setActiveSubTopic] = useState(1);
	const [activeTopic, setActiveTopic] = useState(1);
	const [mobileDropdown, setMobileDropdown] = useState(false)

	const filteredTopics = topics.filter((topic) =>
		topic.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);
	return (
		<div className='w-72 z-auto fixed left-0 top-12 md:top-20 pt-8 overflow-auto h-full'>
			{/* Desctop Nav */}
			<section className='sm:flex flex-col hidden bg-base-100 shadow-sm border-2 border-gray-100 '>
				<input
					type="text"
					placeholder="Search topics..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="mini-search"
				/>
				<ul className="menu w-full h-full rounded-sm">
					{filteredTopics.map((topic) => (
						<li key={topic.id}>
							{/* activeTopic === subtopic.id ? 'active' : '' */}
							<details open={activeTopic === topic.id}>
								<summary className='font-semibold'>
									<Image
										src={topic.icon}
										alt="icon"
										width={17}
										height={17}
										className="card_img"
									/>
									{topic.name}
								</summary>
								<ul>
									{topic.subtopics.map((subtopic) => (
										<li key={subtopic.uniqueKey}>
											<a className={activeSubTopic === subtopic.uniqueKey ? 'active' : ''} onClick={() => { onClickTopic(topic.id, subtopic.id), setActiveSubTopic(subtopic.uniqueKey) }}>{`${subtopic.id} ${subtopic.name}`}
											</a>
										</li>	
									))}
							</ul>
							</details>
						</li>
					))}
					
				</ul>
			</section>

			{/* Mobile Nav */}
			<section className='sm:hidden flex relative'>
                 <div className='flex'>
					<Image
						src="/assets/icons/menu.png"
						width={37}
						height={37}
						className='rounded-full'
						alt='profile'
						onClick={() => setMobileDropdown(!mobileDropdown)}
					/>
					{mobileDropdown && (
						<div className='absolute left-0 top-full mt-3 w-full p-5 rounded-lg bg-white min-w-[210px] flex flex-col gap-2'>
							<ul className="flex flex-col justify-start items-start text-black">
								{filteredTopics.map((topic) => (
									<li key={topic.id}>
										<details open={activeTopic === topic.id}>
											<summary className='font-semibold'>
												<Image
													src={topic.icon}
													alt="icon"
													width={17}
													height={17}
													className="card_img"
												/>
												{topic.name}
											</summary>
											<ul>
												{topic.subtopics.map((subtopic) => (
													<li key={subtopic.uniqueKey}>
														<a className={activeSubTopic === subtopic.uniqueKey ? 'active' : ''} onClick={() => { onClickTopic(topic.id, subtopic.id), setActiveSubTopic(subtopic.uniqueKey) }}>{`${subtopic.id} ${subtopic.name}`}
														</a>
													</li>	
												))}
										</ul>
									</details>
						           </li>
					            ))}
				           </ul>			
						</div>
					)}
				</div>
			</section>
		</div>
	)

	// return (
	// 	<div className="sidebar-container">
	// 		<input
	// 			type="text"
	// 			placeholder="Search topics..."
	// 			value={searchTerm}
	// 			onChange={(e) => setSearchTerm(e.target.value)}
	// 			className="mini-search"
	// 		/>
	// 		<ul className="topic-list">
	// 			{filteredTopics.map((topic) => (
	// 				<li key={topic.id}>
	// 					<button className="topic-button" onClick={() => toggleTopic(topic)}>
	// 						{activeTopic === topic ? '- ' : '+ '}
	// 						{topic.name}
	// 					</button>
	// 					{activeTopic === topic && (
	// 						<ul className="subtopic-list">
	// 							{topic.subtopics.map((subtopic) => (
	// 								<li key={subtopic.id} onClick={() => onClickTopic(topic.id, subtopic.id)}>{subtopic.name}</li>
	// 							))}
	// 						</ul>
	// 					)}
	// 				</li>
	// 			))}
	// 		</ul>
	// 	</div>
	// );
};

export default Sidebar;


