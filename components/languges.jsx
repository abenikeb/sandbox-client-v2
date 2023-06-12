/** @format */

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

const LangNav = [
  { id: 1, lable: "Python", name: "Python", icon: "/assets/icons/python.svg" },
  { id: 2, lable: "Java Script", name: "JS", icon: "/assets/icons/javascript.svg" },
  { id: 3, lable: "C#", name: "C#", icon: "/assets/icons/c_sharp.svg" },
  { id:4,  lable: "JSON", name:"JSON", icon:"/assets/icons/json.svg"}
]

const Languages = ({ onClickLanguage }) => {
  
  const [btnToggle, setBtnToggle] = useState(1)
  return (
    <div className="flex justify-start items-center gap-x-8 md:gap-x-32 my-4">
      {LangNav.map(({ id, lable, name, icon }) => (
        <div className={`flex flex-col items-center cursor-pointer ${btnToggle === id && 'border-b-2 border-lime-500'} `} onClick={() =>
        {
          onClickLanguage(name)
          setBtnToggle(id)
         }}>
            <Image
              src={icon}
              alt="logo"
              width={30}
              height={30}
              className="object-contain"
            />
            <h3 className="max-sm:hidden font-satoshi font-semibold">{lable}</h3>
          </div>
      ))}
      
      {/* <div className={`specific-lang laguage-setup ${btnToggle === 1 ? 'laguage-setup-active' : "" }`} onClick={() => onClickLanguage("Python")} id="1">
        <Image
          src="/assets/icons/python.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <h3>Python</h3>
      </div>

      <div className={`specific-lang laguage-setup ${btnToggle === 2} ? laguage-setup-active : "" `} onClick={() => onClickLanguage("JS")} id="2" >
        <Image
          src="/assets/icons/javascript.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <h3>JavaScript</h3>
      </div>

      <div className={`specific-lang laguage-setup ${btnToggle === 3} ? laguage-setup-active : "" `} onClick={() => onClickLanguage("C#")} id="3">
        <Image
          src="/assets/icons/c_sharp.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <h3>C#</h3>
      </div>

      <div className={`specific-lang laguage-setup ${btnToggle === 4} ? laguage-setup-active : "" `} onClick={() => onClickLanguage("JSON")}>
        <Image
          src="/assets/icons/json.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <h3>JSON</h3>
      </div> */}
    </div>
  );
};

export default Languages;
