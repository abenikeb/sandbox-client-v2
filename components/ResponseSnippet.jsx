import React from "react";
import { CopyBlock, dracula, a11yLight } from "react-code-blocks";

export default function ResponseSnippet({responseCode}) {
  // console.log("responseCode",responseCode)
  let codeText = responseCode
  // // let i = codeText.indexOf("{");

  // console.log("responseCode",responseCode.split('{').join(""));
   console.log("responseCode",responseCode.replaceAll(',', '\n'));

  // String.prototype.replaceAt = function(index, replacement) {
	// 		return this.substring(0, index) + replacement + this.substring(index + replacement.length);
  // }
  
  codeText =responseCode.replaceAll(',', '\n')
  
  return (
    <div className="bg-white w-full max-w-6xl min-h-max rounded-lg shadow-sm text-gray-200 mt-8 overflow-y-auto p-4" id="div1">   
      <h4 className="text-lg font-semibold text-black">Response</h4>
      <hr />
      <CopyBlock text={codeText} language="json" wrapLines theme={a11yLight} />
    </div>
  );
}

