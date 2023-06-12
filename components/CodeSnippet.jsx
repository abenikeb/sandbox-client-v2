"use client"
import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CopyBlock, dracula } from "react-code-blocks";
import tempUtility from "@util/tempUtility";


export default function CodeSnippet({ codeSnippets, plValue, credentials }) {
  
  const [filteredCodeSnippets, setFilteredCodeSnippets] = useState(null); //individual Programming languages
  const [fileExtenetion, setFileExtention] =useState("js")

  useEffect(() => {
    const filterdPL = codeSnippets?.value.find(
			(code) => code?.name === plValue
    );
    setFilteredCodeSnippets(filterdPL?.value);

    // console.log("filteredCodeSnippets", codeSnippets)

    if (plValue === "Python") {
      setFileExtention("py")
    } else if (plValue === "JS") {
      setFileExtention("js")
    } else if (plValue === "C#") {
      setFileExtention("c")
    } else {
      setFileExtention("json")
    }
  },[codeSnippets,plValue,credentials])

  const handleCongigFile = () => {
    let newConfigFile = tempUtility.config(plValue, credentials)
    setFilteredCodeSnippets(newConfigFile)
  } 

  const handleAppFile = () => {
    let newConfigFile = tempUtility.app(plValue, credentials)
    setFilteredCodeSnippets(newConfigFile)
  } 

  const handleToolsFile = () => {
    let newConfigFile = tempUtility.utility(plValue, credentials)
    setFilteredCodeSnippets(newConfigFile)
  }

  const handleCreateOrderFile = () => {
    let newConfigFile = tempUtility.createOrder(plValue, credentials)
    setFilteredCodeSnippets(newConfigFile)
  }

  const handleFabricTokenFile = () => {
    let newConfigFile = tempUtility.fabricToken(plValue, credentials)
    setFilteredCodeSnippets(newConfigFile)
  }

  if (typeof filteredCodeSnippets !== "undefined") {
    let codeText = filteredCodeSnippets;
    return (
      <>
      <div className="bg-slate-800 w-full rounded-md shadow-sm text-gray-200 divide-y-2 divide-gray-600 mt-2 h-96 overflow-hidden" id="div1">
     
        {/* header */}
        <div className="flex flex-row justify-start items-center pl-5 py-2 gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
            service/{codeSnippets?.name === "Checkout" ? "CreateOrder": codeSnippets?.name}.{fileExtenetion}
         </div>

        {/* body */}
        <div className="flex flex-row gap-2">

          <div className="pt-6 mr-5 w-52 flex flex-col">
            <Link href="/user/dashboard" className="flex flex-row justify-center items-center text-black bg-gray-300 rounded-md w-36 gap-x-2 h-5 text-xs ml-5">
               <Image
                  src="/assets/icons/github.svg"
                  alt={"tick_icon"}
                  width={15}
                  height={15}
                />
              View Github Ripo
            </Link>
            <ul className="menu menu-xs max-w-xs w-full">
              <li>
                <details open>
                  <summary>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
                    config
                  </summary>
                  <ul>         
                    <li onClick={handleCongigFile}><a>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                      config.{fileExtenetion}
                    </a></li>
                  </ul>
                </details>
              </li>

              <li>
                <details open>
                  <summary>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
                    service
                    </summary>
                    <ul>
                    <li onClick={handleFabricTokenFile} className={codeSnippets?.name === "ApplyFabricToken" && "text-yellow-300"}><a>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                        applyFabricToken.{fileExtenetion}
                      </a></li>

                      <li onClick={handleCreateOrderFile} className={(codeSnippets?.name === "CreateOrder" || codeSnippets?.name === "Checkout") && "text-yellow-300"}><a>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                        createOrderService.{fileExtenetion}
                      </a></li>

                    </ul>
                </details>
              </li>

              <li>
                <details open>
                  <summary>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
                    utils
                  </summary>
                  <ul>         
                    <li onClick={handleToolsFile}><a>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                      tools.{fileExtenetion}
                    </a></li>
                  </ul>
                </details>
              </li>

              <li onClick={handleAppFile}><a>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                app.{fileExtenetion}
              </a></li>
                
                {plValue === "JS" &&
                  <li><a>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                    package.json
                  </a></li>
                }
                     
            </ul>
          </div>

            <div className="flex-1">

            <CopyBlock
              text={codeText}
              language="javascript"
              // highlight="1,6,7"
              wrapLines={true}
              theme={dracula}
            />
          </div>
        </div>       
      </div>
        {/* Collapse Button here! */}
         <button onClick={() => document.getElementById("div1").classList.remove('h-96')} className="p-2 bg-slate-700 text-gray-100 transition duration-300 ease-in-out hover:opacity-90 focus:outline-none" hidden={() => document.getElementsByClassName('.overflow-hidden')} >
          More
        </button>
       {/* element.classList.remove("mystyle") */}
      </>
    );
  } else {
     return (
       <div className="">
        <CopyBlock
          text="Please Run Here"
          language="javascript"
          wrapLines={true}
          theme={dracula}
        />
      </div>
    );
  }

}


