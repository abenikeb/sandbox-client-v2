/** @format */

// import React, { useState } from 'react';
'use client';
import SearchBar from '@components/Search';
import { Collapse } from 'antd';
const { Panel } = Collapse;
const text = (
	<p
		style={{
			paddingLeft: 24,
			color: '#8EC640',
		}}>
		Your FAQ section should be seen as a constantly expanding source of value
		provided to your audience. It is a place where their ever-changing and
		growing requirements are not only met but anticipated and exceeded
		frequently.
	</p>
);
const FAQ = () => (
	<>
		<center>
			<h1 className="Headline1">Search FAQ</h1>
			<SearchBar />
		</center>
		<div>
			<Collapse bordered={false} defaultActiveKey={['1']}>
				<Panel header="Why telebirr" key="1">
					{text}
				</Panel>
				<Panel
					header="What types of businesses are eligible to engage with telebirr?"
					key="2">
					{text}
				</Panel>
				<Panel header="What is the price to integrate with telebirr?" key="3">
					{text}
				</Panel>
				<Panel
					header="Does telebirr accept currencies other than Birr?"
					key="4">
					{text}
				</Panel>
				<Panel header="Does telebirr offer any sort of discounts?" key="5">
					{text}
				</Panel>
				<Panel header="How can i get a shortcode on telebirr?" key="6">
					{text}
				</Panel>
			</Collapse>
		</div>
	</>
);
export default FAQ;
