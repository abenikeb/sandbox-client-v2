const codes = [
	// H5 INTEGRATION START
    {
		id: 1,
		name: "H5 integration",
		value: [
			{
				id: 1,
				name: "ApplyFabricToken",
				value: [
					{
						id: 1,
						name: "Python",
						value: ``,
					},

					{
						id: 2,
						name: "JS",
						value: ``,
					},

					{
						id: 3,
						name: "C#",
						value: ``,
                    },
                    
                    {
						id: 4,
						name: "JSON",
						value: ``,
					},
				],
			},
			{
				id: 2,
				name: "CreateOrder",
				value: [
					{
						id: 1,
						name: "Python",
						value: ``,
					},
					{
						id: 2,
						name: "JS",
						value: ``,
					},
					{
						id: 3,
						name: "C#",
						value: ``,
                    },
                    {
						id: 4,
						name: "JSON",
						value: ``,
					},
				],
            },
            {
				id: 3,
				name: "Checkout",
				value: [
					{
						id: 1,
						name: "Python",
						value: ``,
					},
					{
						id: 2,
						name: "JS",
						value: ``,
					},
					{
						id: 3,
						name: "C#",
						value: ``,
                    },
                    {
						id: 4,
						name: "JSON",
						value: ``,
					},
				],
			},
		],
    },
    // H5 INTEGRATION END
    
	// MINI APP INTEGRATION START

    {
		id: 2,
		name: "Mini App integration",
		value: [
			{
				id: 1,
				name: "ApplyFabricToken",
				value: [
					{
						id: 1,
						name: "Python",
						value: ``,
					},

					{
						id: 2,
						name: "JS",
						value: ``,
					},

					{
						id: 3,
						name: "C#",
						value: ``,
                    },
                    
                    {
						id: 4,
						name: "JSON",
						value: ``,
					},
				],
			},
			{
				id: 2,
				name: "CreateOrder",
				value: [
					{
						id: 1,
						name: "Python",
						value: ``,
					},

					{
						id: 2,
						name: "JS",
						value: ``,
					},

					{
						id: 3,
						name: "C#",
						value: ``,
                    },
                    
                    {
						id: 4,
						name: "JSON",
						value: ``,
					},
				],
            },
            {
				id: 3,
				name: "Checkout",
				value: [
					{
						id: 1,
						name: "Python",
						value: ``,
					},

					{
						id: 2,
						name: "JS",
						value: ``,
					},

					{
						id: 3,
						name: "C#",
						value: ``,
                    },
                    
                    {
						id: 4,
						name: "JSON",
						value: ``,
					},
				],
			},
		],
    },

    // MINI APP INTEGRATION END
    
    // C2B CHECKOUT START
     {
		id: 3,
		name: "C2B WebCheckout",
		value: [
			{
				id: 1,
				name: "ApplyFabricToken",
				value: [
					{
						id: 1,
						name: "Python",
						value: ``,
					},

					{
						id: 2,
						name: "JS",
						value: ``,
					},

					{
						id: 3,
						name: "C#",
						value: ``,
                    },
                    
                    {
						id: 4,
						name: "JSON",
						value: ``,
					},
				],
			},
			{
				id: 2,
				name: "CreateOrder",
				value: [
					{
						id: 1,
						name: "Python",
						value: ``,
					},

					{
						id: 2,
						name: "JS",
						value: ``,
					},

					{
						id: 3,
						name: "C#",
						value: ``,
                    },
                    
                    {
						id: 4,
						name: "JSON",
						value: ``,
					},
				],
            },
            {
				id: 3,
				name: "Checkout",
				value: [
					{
						id: 1,
						name: "Python",
						value: ``,
					},

					{
						id: 2,
						name: "JS",
						value: ``,
					},

					{
						id: 3,
						name: "C#",
						value: ``,
                    },
                    
                    {
						id: 4,
						name: "JSON",
						value: ``,
					},
				],
			},
		],
	},
    // C2B CHECKOUT END
];

/** @format */

"use client";
import React from "react";
import Sidebar from "@components/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserData } from "../../api-services/authService";
import { getCredential } from "@app/api-services/configService";
import {
	getCodeSnippet,
	saveCodeResponse,
} from "@app/api-services/codeSnippetsService";
import withErrorHandler from "@hoc/withErrorHandler/withErrorHandler";
import CodeSnippet from "@components/CodeSnippet";
import ResponseSnippet from "@components/ResponseSnippet";
import Languages from "@components/languges";
import serviceUtility from "@util/serviceUtility";
import Mockup from "./Mockup";
import Button from "@components/UI/Button/Button";

// Topics Section
const topics = [
	{
		id: 1,
		name: "Web Payment (H5) integration",
		icon:"/assets/icons/web-payment.svg",
		subtopics: [
			{ id: 1, uniqueKey:1, name: "ApplyFabricToken" },
			{ id: 2, uniqueKey:2,  name: "CreateOrder" },
			{ id: 3, uniqueKey:3,  name: "Checkout" },
			{ id: 4, uniqueKey:4, name: "QueryOrder" },
		],
	},
	{
		id: 2,
		name: "Native (Mini App) integration",
		icon:"/assets/icons/mini-app-payment.svg",
		subtopics: [
			{ id: 1, uniqueKey:5,  name: "ApplyFabricToken" },
			{ id: 2, uniqueKey:6, name: "CreateOrder" },
			{ id: 3, uniqueKey:7, name: "Checkout" },
			{ id: 4, uniqueKey:8, name: "QueryOrder" },
		],
	},
	{
		id: 3,
		name: "Cusetomer to Business WebCheckout",
		icon:"/assets/icons/web-payment.svg",
		subtopics: [
			{ id: 1, uniqueKey:9, name: "ApplyFabricToken" },
			{ id: 2, uniqueKey:10, name: "CreateOrder" },
			{ id: 3, uniqueKey:11, name: "Checkout" },
			{ id: 4, uniqueKey:12, name: "QueryOrder" },
		],
	},
];

const Dashboard = ({ post }) => {
	const router = useRouter();
	const [credentials, setCredentials] = useState(null);    //RSA private and Public Keys
	const [envVariables, setEnvVariables] = useState(null);  // bareer token
	const [isUserLogin, setIsUserLogin] = useState(false);
	const [user, setUser] = useState(null);
	const [isPKeyClicked, setIsPKeyClicked] = useState(false);
	const [copied, setCopied] = useState(true);

	const [codeSnippets, setCodeSnippets] = useState(null);
	const [plValue, setPlValue] = useState("Python");
	const [paymentMethod, setPaymentMethod] = useState(null);
	// const [filteredCodeSnippets, setFilteredCodeSnippets] = useState(null);
	const [httpResponse, setHttpResponse] = useState({});

	useEffect(() => {
		async function res() {
			const user = getUserData();
			setUser(user);
			if (user !== null) {
				setIsUserLogin(true);
				const { data } = await getCredential(user?.id);
				setCredentials(data);
			} else {
				setIsUserLogin(false);
				router.push("/");
			}
		}
		res();	
	}, []);

	useEffect(() => {
		// When Start a server it sets some code snippets on the state
		const {codeSnippets } = getCodeSnippet(1, 1);
		setCodeSnippets(codeSnippets); // set the code snipets with out filtering the languages
		
		// const filterdPL = getSnippets?.value?.find((code) => code?.name === "Python");
		// setFilteredCodeSnippets(filterdPL);
	},[]);

	const toggelPkey = (prevState) => {
		let isPKeyClicked = !prevState.isPKeyClicked;
		setIsPKeyClicked({ isPKeyClicked });
	};

	const handleCopy = () => {
		setCopied(JSON.stringify(credentials));
		navigator.clipboard.writeText(JSON.stringify(credentials));
		setTimeout(() => setCopied(false), 3000);
	};

	const handleClickTopic = (topic_id, supTopicId) => {
		const { filteredPaymentMethod, codeSnippets } = getCodeSnippet(topic_id, supTopicId);
		console.log("filteredPaymentMethod",filteredPaymentMethod.name)
		// console.log({
		// 	filteredInterface:filteredInterface
		// })
		setCodeSnippets(codeSnippets); // set the code snipets with out filtering the languages
		setPaymentMethod(filteredPaymentMethod.name);
		// By Default set the request field as JS
		// const filterdPL = getSnippets?.value.find((code) => code?.name === "JS");
		// setFilteredCodeSnippets(filterdPL);
	};

	const handleCodeReponse = async () => {
	    // console.log({filteredPaymentMethod: paymentMethod.name,codeSnippets: codeSnippets?.name, credentials:credentials, envVariables:envVariables})
		const resService = serviceUtility(
			codeSnippets?.name,
			paymentMethod,
			credentials,
			envVariables
		); //make a request template

		const res = await saveCodeResponse(resService);
		if (res.token) {
			setEnvVariables(res?.token);
		}
		setHttpResponse(res);
	};

	const handleClickedLanguage = (PlValue) => {
		// const filterdPL = codeSnippets?.value.find(
		// 	(code) => code?.name === PlValue
		// );
		// setFilteredCodeSnippets(filterdPL);
		setPlValue(PlValue)
	};

	return (
		<div className="dashboard">
			{/* SIDE BAR SECTION START */}
			<Sidebar topics={topics} onClickTopic={handleClickTopic} />
			{/* SIDE BAR SECTION END */}

			<div className="dash-body ml-64">
				{/* API KEYS SECTION START */}
				<div className="keys">
					<div className="api-key">
						<div className="flex flex-row">
							<div className="key-value flex flex-col gap-y-6 mt-4 ml-2">
								<h1>Merchant AppId : </h1>
								<h1>Fabric App ID : </h1>
								<h1>ShortCode : </h1>
							</div>
							<div className="key-value flex flex-col gap-y-6 mt-4 ml-2">
								<p>
									{credentials
										? credentials.merchant_id
										: "#####-#####-#####-#####"}
								</p>
								<p>
									{credentials
										? credentials.fabric_app_id
										: "#####-#####-#####-#####"}
								</p>
								<p>
									{credentials
										? credentials.short_code
										: "#####-#####-#####-#####"}
								</p>
							</div>
						</div>
					</div>
					<div className="api-key">
						<div className="flex flex-row ">
							<div className="key-value flex flex-col gap-y-6 mt-4 ml-2">
								<h1>Public Key : </h1>
								<h1>PrivateKey : </h1>
							</div>
							<div className="key-value w-96 flex flex-col gap-y-6 mt-4 ml-2">
								<h6 className="text-sm font-bold font-bold text-sm truncate ">
									{credentials
										? credentials.public_key
										: "#####-#####-#####-#####"}
								</h6>
								<h6 className="text-sm font-bold font-bold text-sm truncate ">
									{isPKeyClicked
										? credentials.private_key
										: "*****************"}
								</h6>
							</div>
						</div>

						<div className="flex flex-row gap-3">
							<button className="card__button" onClick={toggelPkey}>
								See Private Key
							</button>
							<div className="copy_btn" onClick={handleCopy}>
								<Image
									src={
										copied === true
											? "/assets/icons/code.svg"
											: "/assets/icons/tick.svg"
									}
									alt={"tick_icon"}
									width={20}
									height={20}
								/>
							</div>
						</div>
					</div>
				</div>
				{/* API KEYS SECTION END */}

				<div className="code-snippet">
					<Languages onClickLanguage={handleClickedLanguage} />

					{/* CODE HEADER START */}
					<div className="code-header">
						<div className="flex flex-row justify-center items-center">
							<h3 className="text-xl font-semibold ">{`Step ${codeSnippets?.id}: ${codeSnippets?.name}`}</h3>
							<div className="tooltip" data-tip={`${codeSnippets?.description}`}>
								<button className="bg-lime-500 rounded-full w-5 h-5 text-sm text-black opacity-50">?</button>
							</div>
						</div>
						<div className="flex justify-center items-center">
							<div className="tooltip" data-tip="Run & See the Result!">
								<button className="bg-lime-500 rounded-full w-5 h-5 text-sm text-black opacity-60">?</button>
							</div>
							<button className="card__button" onClick={handleCodeReponse}>
								Run
							</button>
						</div>
					</div>
					{/* CODE HEADER END */}

					{/* CODE BODY START */}
					<div className="code-body mt-8 flex flex-col">
						<div className="flex flex-row justify-start items-center gap-3">
							<button className="text-gray-700 text-lg border-b-4 border-lime-500 mr-3">Codes</button>
							<Mockup />
							<Link href="http://localhost:3000/docs/Getting%20Started" target="_blank" className="text-gray-700 text-lg">Docuementation</Link>
						</div>
						<CodeSnippet codeSnippets={codeSnippets} plValue={plValue} credentials={credentials} />
						<ResponseSnippet responseCode={JSON.stringify(httpResponse)} />
						<div className="flex flex-row gap-x-3 mb-5 self-end">
							<Link href={`https://abenikeb.github.io/temp/${plValue}.zip`}>
							  <Button btn_class="btn-outline" label="Full Project" />
							</Link>
							<Button btn_class="btn-filled" label="Postman collection" />
						</div>
					</div>
					{/* CODE BODY END */}

				</div>
			</div>
		</div>
	);
};

export default withErrorHandler(Dashboard);







