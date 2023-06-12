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
			// { id: 4, uniqueKey:4, name: "QueryOrder" },
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
			// { id: 4, uniqueKey:8, name: "QueryOrder" },
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
			// { id: 4, uniqueKey:12, name: "QueryOrder" },
		],
	},
];

const Dashboard = ({ post }) => {
	const router = useRouter();
	const [credentials, setCredentials] = useState(null);    //RSA private and Public Keys
	const [envVariables, setEnvVariables] = useState(null);  // bareer token
	const [prepayID, setPrepayID] = useState(null);  // bareer token
	const [activeNavBar, setActiveNavBar] = useState(null)
	const [isUserLogin, setIsUserLogin] = useState(false);
	const [user, setUser] = useState(null);
	const [isPKeyClicked, setIsPKeyClicked] = useState(false);
	const [isMockStarted, setMocStarted] = useState(null)
	const [copied, setCopied] = useState(true);

	const [codeSnippets, setCodeSnippets] = useState(null);
	const [plValue, setPlValue] = useState("Python");
	const [paymentMethod, setPaymentMethod] = useState(null);
	const [mainTopicId, setMainTopicID] = useState(1);
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
	}, []);

	useEffect(() => {
		document.getElementById("section2").scrollIntoView({behavior: 'smooth' })
	}, [codeSnippets]);	

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
		setCodeSnippets(codeSnippets); // set the code snipets with out filtering the languages
		setPaymentMethod(filteredPaymentMethod.name);
		setHttpResponse({})
		setMainTopicID(filteredPaymentMethod.id)
	};

	const handleCodeReponse = async () => {
		if (codeSnippets?.name === "Checkout") {

			if (prepayID === null) {
				const rawRequestResult = {
					rawRequest : `appid=${credentials.merchant_id}&merch_code=${credentials.short_code}&nonce_str=12345678901234567890123456789011&prepay_id=${prepayID}&sign=ujhjh&sign_type=SHA256WithRSA&timestamp=1234323432`
				}
				setHttpResponse(rawRequestResult);
				document.getElementById("section1").scrollIntoView({ behavior: 'smooth' }) // scroll to response page
				setTimeout(() => setMocStarted(3), 4000) // after 4 sec initate the mocup page
				return
			}

			const rawRequestResult = {
				rawRequest : `appid=${credentials.merchant_id}&merch_code=${credentials.short_code}&nonce_str=12345678901234567890123456789011&prepay_id=${prepayID}&sign=ujhjh&sign_type=SHA256WithRSA&timestamp=1234323432`
			}
			setHttpResponse(rawRequestResult);
			document.getElementById("section1").scrollIntoView({ behavior: 'smooth' }) // scroll to response page
			setTimeout(() => setMocStarted(2), 4000) // after 4 sec initate the mocup page
			return
		}

		const resService = serviceUtility(
			codeSnippets?.name,
			paymentMethod,
			credentials,
			envVariables
		); //make a request template


		const res = await saveCodeResponse(resService);
		if (res.token) setEnvVariables(res?.token);
		if (res?.biz_content?.prepay_id) setPrepayID(res?.biz_content.prepay_id);

		
		console.log("res", res)

		setHttpResponse(res);

		document.getElementById("section1").scrollIntoView({behavior: 'smooth' })
	};

	const handleClickedLanguage = (PlValue) => {
		// const filterdPL = codeSnippets?.value.find(
		// 	(code) => code?.name === PlValue
		// );
		// setFilteredCodeSnippets(filterdPL);
		setPlValue(PlValue)
	};

	const handleNextTopicBtn = (idx1, idx2) => {
		handleClickTopic(idx1, idx2)
        setActiveNavBar(3)
	}

	return (
		<div className="dashboard">
			{/* SIDE BAR SECTION START */}
			<div id="section2" class="scrollToMe" />
			<Sidebar topics={topics} onClickTopic={handleClickTopic} activeNavBar={activeNavBar} />
			{/* SIDE BAR SECTION END */}
			
			<div className="dash-body ml-6 md:ml-64 w-11/12 md:w-5/6">
				{/* API KEYS SECTION START */}			
				<div className="md:flex gap-3 w-full">
					<div className="w-full bg-white rounded-md border border-gray-300 p-2">
						<div className="flex">
							<div className="key-value flex flex-col gap-y-8 md:gap-y-5 text-sm text-black font-normal pr-3">
								<h3>Merchant AppId : </h3>
								<h3>Fabric App ID : </h3>
								<h3>ShortCode : </h3>
								<h3>App Secret : </h3>
							</div>
							<div className={`key-value key-value flex flex-col gap-y-3 ${credentials ? '' : 'animate-pulse'}`}>
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
								<p>
									{credentials
										? credentials.app_secret
										: "#####-#####-#####-#####"}
								</p>
							</div>
						</div>
					</div>

					<div className="w-full bg-white rounded-md border border-gray-300 p-2">
						<div className="flex flex-row ">
							<div className="key-value flex flex-col gap-y-3 md:gap-y-6 mt-4 ml-2 text-sm text-black font-normal pr-3">
								<h3>Public Key: </h3>
								<h3>PrivateKey: </h3>
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
					<div className="code-header w-full">
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
							<button id="myButton" className="card__button" onClick={
								handleCodeReponse
							}>
							Run
							</button>
							
							{/* <button id="myButton" onClick={() =>document.getElementById("section1").scrollIntoView({ behavior: 'smooth' })}>Click me</button> */}
						</div>
						
					</div>
					{/* CODE HEADER END */}

					{/* CODE BODY START */}
					{isMockStarted === 2 && <Mockup id="2" />}
					{isMockStarted === 3 && <Mockup id="3" />}
					<div className="code-body mt-8 flex flex-col max-w-6xl">			
						<div className="flex flex-row justify-start items-center gap-3">
							<button className="text-gray-700 text-lg border-b-4 border-lime-500 mr-3">Codes</button>
							<Mockup id="1" /> 
							
							<Link href="http://localhost:3000/docs/Getting%20Started" target="_blank" className="text-gray-700 text-lg">Docuementation</Link>
						</div>

						{/* INFORMATION SECTION START */}
						<div className="w-full rounded-lg shadow-md py-2 pl-10 bg-gray-50 relative broder-2 border-gray-400 my-2">
							{codeSnippets?.id === 1 &&
								<>
								    <span className="absolute left-0 bg-lime-500 font-bold w-8 h-14 rounded-l-lg text-white flex justify-center items-center">!</span>
									<small>In this code block, we've incorporated the entire code repository. We have all the necessary files and lines of code. A fabric token that included the "fabric App Id" in the header and "app seceret" in the body was used to send a request to use the fabric interface and receive a token in response.
									</small>
								</>
							}
							{codeSnippets?.id === 2 &&
								<>
								    <span className="absolute left-0 bg-lime-500 font-bold w-8 h-8 rounded-l-lg text-white flex justify-center items-center">!</span>
									<small>The create order interface has a create Order Service module that sends a complete product payload, including product information, the owner short code, and the merchant app id. It then returns an order id or prepaid id in response.
									</small>			
								</>
							}
							{codeSnippets?.id === 3 &&
								<>
								<span className="absolute left-0 bg-lime-500 font-bold w-8 h-8 rounded-l-lg text-white flex justify-center items-center">!</span>
								<small>This interface need to construc a raw request</small>
								</>
								}
						</div>
						{/* INFORMATION SECTION END */}

						<CodeSnippet codeSnippets={codeSnippets} plValue={plValue} credentials={credentials} />
						<div id="section1" class="scrollToMe"></div>
						<ResponseSnippet responseCode={JSON.stringify(httpResponse)} />

						{/* INFORMATION SECTION START */}
						<div className="w-full rounded-lg shadow-md p-2 bg-gray-50 relative broder-2 border-gray-400 my-2 pl-12">
							<span className="absolute left-0 bg-lime-500 font-bold w-8 h-8 rounded-l-lg text-white flex justify-center items-center">!</span>
							{codeSnippets?.id === 1 &&
								<>
								{httpResponse?.token ? <small className="text-lime-500">You now have a token, which you can use to access the create order interface and submit a create order.
								</small> : <small className="text-red-500">Waiting for valid token!</small>}
								</>	
								}
								
						    {codeSnippets?.id === 2 &&
								<>
								{httpResponse?.msg === "success" ? <small className="text-lime-500">Now that a transaction has been created and an order ID has been allocated, you are ready to move forward with the payment. Go to the online checkout page and finish the transaction.
								</small> : <small className="text-red-500">Waiting for valid Prepay Id!</small>}
								</>	
								}
							{codeSnippets?.id === 3 &&
								<>
								{prepayID !== null ?
								<small className="text-black">Success! Your raw request is legitimate, so we'll show you our checkout so you can complete the transaction.</small> :
								<small className="text-red-500">Fail! A checkout response with an empity order ID has been created by you. So Return to step 1 and carefully complete each step..</small>}
								</>
							} 
						</div>

						{/* INFORMATION SECTION END */}

						<div className="my-5 self-end">								
							<button onClick={() => handleNextTopicBtn(mainTopicId, codeSnippets?.id === 1 ? 2 : 3)} className="bg-gray-700 rounded-md text-white flex flex-row justify-between items-center gap-x-2 px-4 py-1.5">
								<div className="flex flex-col items-end">
									<p className="text-base-200 text-sm font-bold opacity-75">Next</p>	 
									<p className="">{codeSnippets?.id === 1 ? "Create Order" : "Check out" }</p>
								</div>
								<div className="text-2xl font-bold">{`>`}</div>
							</button>	
						</div>

						<div className="flex flex-row gap-x-3 my-5 self-end">
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

export default withErrorHandler(Dashboard) ;
