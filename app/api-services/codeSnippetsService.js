/** @format */

import _ from "lodash";
import http from "./httpService";

const urlEndpoints = process.env.apiEndpoint
const apiEndpoint = `${urlEndpoints}/api`

const codes = [
	// H5 INTEGRATION START
    {
		id: 1,
		name: "Web Payment (H5) integration",
		value: [
			{
				id: 1,
				name: "ApplyFabricToken",
				description:`The fabric token is the first phase in the payment process, which you will provide in order to obtain a token from our server and submit an application to create an order.`,
				value: [
					{
						id: 1,
						name: "Python",
						value: `import requests
import json
import urllib3

urllib3.disable_warnings()
class ApplyFabricTokenService:
    BASE_URL = None;
    fabricAppId = None
    appSecret = None
    merchantAppId = None
    def __init__(self,BASE_URL,fabricAppId,appSecret,merchantAppId) :
        self.BASE_URL = BASE_URL
        self.fabricAppId = fabricAppId
        self.appSecret = appSecret
        self.merchantAppId = merchantAppId
    
    def applyFabricToken(self):
        headers = {
        "Content-Type": "application/json",
        "X-APP-Key": self.fabricAppId
        }
        payload = {
              "appSecret": self.appSecret
        }
        data=json.dumps(payload)
        authToken = requests.post(url=self.BASE_URL+"/payment/v1/token",headers=headers,data=data,verify=False)
        print(authToken.json())
        return authToken.json()`,
					},

					{
						id: 2,
						name: "JS",
						value: `const config = require("../config/config");
var request = require("request");

function applyFabricToken() {
  return new Promise((resolve, reject) => {
    var options = {
      method: "POST",
      url: config.baseUrl + "/payment/v1/token",
      headers: {
        "Content-Type": "application/json",
        "X-APP-Key": config.fabricAppId,
      },
      rejectUnauthorized: false, //add when working with https sites
      requestCert: false, //add when working with https sites
      agent: false, //add when working with https sites
      body: JSON.stringify({
        appSecret: config.appSecret,
      }),
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      let result = JSON.parse(response.body);
      resolve(result);
    });
  });
}

module.exports = applyFabricToken;`,
					},

					{
						id: 3,
						name: "C#",
						value: `H5 -> ApplyFabricToken -> C# Goes Here!`,
          },
                    
          {
						id: 4,
						name: "JSON",
						value: `H5 -> ApplyFabricToken -> JSON Goes Here!`,
					},
				],
      },
      
			{
				id: 2,
        name: "CreateOrder",
        description:`CreateOrder is the second process on payment integration, it create a transaction and ready for payment process`,
				value: [
					{
						id: 1,
						name: "Python",
						value: `import requests
from service import applyFabricTokenService
import json
from utils import tools 
from config import env
from utils import tools
class CreateOrderService:
    req = None;
    BASE_URL = None
    fabricAppId = None
    appSecret = None
    merchantAppId = None
    merchantCode = None
    notify_path = None
    
    def __init__(self,req,BASE_URL,fabricAppId,appSecret,merchantAppId,merchantCode):
        self.req=req
        self.BASE_URL=BASE_URL
        self.fabricAppId=fabricAppId
        self.appSecret=appSecret
        self.merchantAppId=merchantAppId
        self.merchantCode=merchantCode
        self.notify_path = "http://www.google.com"
    # @Purpose: Creating Order
    #  *
    #  * @Param: no parameters it takes from the constructor
    #  * @Return: rawRequest|String
    def createOrder(self):
        title = self.req["title"];
        amount = self.req["amount"];
        applyFabricTokenResult = applyFabricTokenService.ApplyFabricTokenService(self.BASE_URL,self.fabricAppId,self.appSecret,self.merchantAppId)
        result=applyFabricTokenResult.applyFabricToken()
        fabricToken = result["token"]
        createOrderResult = self.requestCreateOrder(fabricToken,title,amount)
        prepayId = createOrderResult["biz_content"]["prepay_id"]
        rawRequest = self.createRawRequest(prepayId)
        print(rawRequest)
        return rawRequest
    #  * @Purpose: Requests CreateOrder
    #  *
    #  * @Param: fabricToken|String title|string amount|string
    #  * @Return: String | Boolean
    def requestCreateOrder(self,fabricToken,title,amount):
        headers = {
            "Content-Type":"application/json",
            "X-APP-Key":self.fabricAppId,
            "Authorization":fabricToken
        }
        # Body parameters
        payload = self.createRequestObject(title,amount)
        server_output = requests.post(url=self.BASE_URL+"/payment/v1/merchant/preOrder",headers=headers,data=payload,verify=False)
        return server_output.json()
    #  * @Purpose: Creating Request Object
    #  *
    #  * @Param: title|String and amount|String
    #  * @Return: Json encoded string
    def createRequestObject(self,title,amount):
        req = {
            "nonce_str":tools.createNonceStr(),
            "method":"payment.preorder",
            "timestamp":tools.createTimeStamp(),
            "version":"1.0",
            "biz_content":{},   
        }
        biz={
            "notify_url":self.notify_path,
            "business_type":"BuyGoods",
            "trade_type":"InApp",
            "appid":self.merchantAppId,
            "merch_code":self.merchantCode,
            "merch_order_id":tools.createMerchantOrderId(),
            "title":title,
            "total_amount":amount,
            "trans_currency":"ETB",
            "timeout_express":"120m",
            "payee_identifier":"220311",
            "payee_identifier_type":"04",
            "payee_type":"5000"
        }
        req["biz_content"] = biz
        req["sign_type"] = "SHA256withRSA"
        sign = tools.sign(req)
        req["sign"] = sign
        print(json.dumps(req))
        return json.dumps(req)
    #  * @Purpose: Create a rawRequest string for H5 page to start pay
    #  *
    #  * @Param: prepayId returned from the createRequestObject
    #  * @Return: rawRequest|string
    def createRawRequest(self,prepayId):
        maps={
            "appid":self.merchantAppId,
            "merch_code":self.merchantCode,
            "nonce_str":tools.createNonceStr(),
            "prepay_id":prepayId,
            "timestamp":tools.createTimeStamp(),
            "sign_type":"SHA256WithRSA" 
        }
        rawRequest=""
        for key in maps:
            value = maps[key]
            rawRequest = rawRequest + key + "=" + value + "&"
        sign = tools.sign(maps)
        rawRequest = rawRequest+"sign="+sign
        return rawRequest`,
					},
					{
						id: 2,
						name: "JS",
						value: `const applyFabricToken = require("./applyFabricTokenService");
const tools = require("../utils/tools");
const config = require("../config/config");
var request = require("request");

exports.createOrder = async (req, res) => {
  let title = req.body.title;
  let amount = req.body.amount;
  let applyFabricTokenResult = await applyFabricToken();
  let fabricToken = applyFabricTokenResult.token;
  let createOrderResult = await exports.requestCreateOrder(
    fabricToken,
    title,
    amount
  );
  let prepayId = createOrderResult.biz_content.prepay_id;
  let rawRequest = createRawRequest(prepayId);
  res.send(rawRequest);
};

exports.requestCreateOrder = async (fabricToken, title, amount) => {
  return new Promise((resolve) => {
    let reqObject = createRequestObject(title, amount);
    var options = {
      method: "POST",
      url: config.baseUrl + "/payment/v1/merchant/preOrder",
      headers: {
        "Content-Type": "application/json",
        "X-APP-Key": config.fabricAppId,
        Authorization: fabricToken,
      },
      rejectUnauthorized: false, //add when working with https sites
      requestCert: false, //add when working with https sites
      agent: false, //add when working with https sites
      body: JSON.stringify(reqObject),
    };

    request(options, (error, response) => {
      if (error) throw new Error(error);
      let result = JSON.parse(response.body);
      resolve(result);
    });
  });
};

function createRequestObject(title, amount) {
  let req = {
    timestamp: tools.createTimeStamp(),
    nonce_str: tools.createNonceStr(),
    method: "payment.preorder",
    version: "1.0",
  };
  let biz = {
    notify_url: "https://www.google.com",
    trade_type: "InApp",
    appid: config.merchantAppId,
    merch_code: config.merchantCode,
    merch_order_id: createMerchantOrderId(),
    title: title,
    total_amount: amount,
    trans_currency: "ETB",
    timeout_express: "120m",
    business_type: "BuyGoods",
    payee_identifier: config.merchantCode,
    payee_identifier_type: "04",
    payee_type: "5000",
  };
  req.biz_content = biz;
  req.sign = tools.signRequestObject(req);
  req.sign_type = "SHA256WithRSA";
  return req;
}

function createMerchantOrderId() {
  return new Date().getTime() + "";
}

function createRawRequest(prepayId) {
  let map = {
    appid: config.merchantAppId,
    merch_code: config.merchantCode,
    nonce_str: tools.createNonceStr(),
    prepay_id: prepayId,
    timestamp: tools.createTimeStamp(),
  };
  let sign = tools.signRequestObject(map);
  // order by ascii in array
  let rawRequest = [
    "appid=" + map.appid,
    "merch_code=" + map.merch_code,
    "nonce_str=" + map.nonce_str,
    "prepay_id=" + map.prepay_id,
    "timestamp=" + map.timestamp,
    "sign=" + sign,
    "sign_type=SHA256WithRSA",
  ].join("&");
  return rawRequest;
}
`,
					},
					{
						id: 3,
						name: "C#",
						value: `H5 -> CreateOrder -> C# Goes Here!`,
          },
                    
          {
						id: 4,
						name: "JSON",
						value: `H5 -> CreateOrder -> JSON Goes Here!`,
					},
				],
      },

      {
				id: 3,
        name: "Checkout",
        description:`Checkout is the third process on payment integration, after create a transaction and ready for payment process`,
				value: [
					{
						id: 1,
						name: "Python",
						value: `import requests
from service import applyFabricTokenService
import json
from utils import tools 
from config import env
from utils import tools
class CreateOrderService:
    req = None;
    BASE_URL = None
    fabricAppId = None
    appSecret = None
    merchantAppId = None
    merchantCode = None
    notify_path = None
    
    def __init__(self,req,BASE_URL,fabricAppId,appSecret,merchantAppId,merchantCode):
        self.req=req
        self.BASE_URL=BASE_URL
        self.fabricAppId=fabricAppId
        self.appSecret=appSecret
        self.merchantAppId=merchantAppId
        self.merchantCode=merchantCode
        self.notify_path = "http://www.google.com"
    # @Purpose: Creating Order
    #  *
    #  * @Param: no parameters it takes from the constructor
    #  * @Return: rawRequest|String
    def createOrder(self):
        title = self.req["title"];
        amount = self.req["amount"];
        applyFabricTokenResult = applyFabricTokenService.ApplyFabricTokenService(self.BASE_URL,self.fabricAppId,self.appSecret,self.merchantAppId)
        result=applyFabricTokenResult.applyFabricToken()
        fabricToken = result["token"]
        createOrderResult = self.requestCreateOrder(fabricToken,title,amount)
        prepayId = createOrderResult["biz_content"]["prepay_id"]
        rawRequest = self.createRawRequest(prepayId)
        print(rawRequest)
        return rawRequest
    #  * @Purpose: Requests CreateOrder
    #  *
    #  * @Param: fabricToken|String title|string amount|string
    #  * @Return: String | Boolean
    def requestCreateOrder(self,fabricToken,title,amount):
        headers = {
            "Content-Type":"application/json",
            "X-APP-Key":self.fabricAppId,
            "Authorization":fabricToken
        }
        # Body parameters
        payload = self.createRequestObject(title,amount)
        server_output = requests.post(url=self.BASE_URL+"/payment/v1/merchant/preOrder",headers=headers,data=payload,verify=False)
        return server_output.json()
    #  * @Purpose: Creating Request Object
    #  *
    #  * @Param: title|String and amount|String
    #  * @Return: Json encoded string
    def createRequestObject(self,title,amount):
        req = {
            "nonce_str":tools.createNonceStr(),
            "method":"payment.preorder",
            "timestamp":tools.createTimeStamp(),
            "version":"1.0",
            "biz_content":{},   
        }
        biz={
            "notify_url":self.notify_path,
            "business_type":"BuyGoods",
            "trade_type":"InApp",
            "appid":self.merchantAppId,
            "merch_code":self.merchantCode,
            "merch_order_id":tools.createMerchantOrderId(),
            "title":title,
            "total_amount":amount,
            "trans_currency":"ETB",
            "timeout_express":"120m",
            "payee_identifier":"220311",
            "payee_identifier_type":"04",
            "payee_type":"5000"
        }
        req["biz_content"] = biz
        req["sign_type"] = "SHA256withRSA"
        sign = tools.sign(req)
        req["sign"] = sign
        print(json.dumps(req))
        return json.dumps(req)
    #  * @Purpose: Create a rawRequest string for H5 page to start pay
    #  *
    #  * @Param: prepayId returned from the createRequestObject
    #  * @Return: rawRequest|string
    def createRawRequest(self,prepayId):
        maps={
            "appid":self.merchantAppId,
            "merch_code":self.merchantCode,
            "nonce_str":tools.createNonceStr(),
            "prepay_id":prepayId,
            "timestamp":tools.createTimeStamp(),
            "sign_type":"SHA256WithRSA" 
        }
        rawRequest=""
        for key in maps:
            value = maps[key]
            rawRequest = rawRequest + key + "=" + value + "&"
        sign = tools.sign(maps)
        rawRequest = rawRequest+"sign="+sign
        return rawRequest`,
					},
					{
						id: 2,
						name: "JS",
						value: `const applyFabricToken = require("./applyFabricTokenService");
const tools = require("../utils/tools");
const config = require("../config/config");
var request = require("request");

exports.createOrder = async (req, res) => {
  let title = req.body.title;
  let amount = req.body.amount;
  let applyFabricTokenResult = await applyFabricToken();
  let fabricToken = applyFabricTokenResult.token;
  let createOrderResult = await exports.requestCreateOrder(
    fabricToken,
    title,
    amount
  );
  let prepayId = createOrderResult.biz_content.prepay_id;
  let rawRequest = createRawRequest(prepayId);
  res.send(rawRequest);
};

exports.requestCreateOrder = async (fabricToken, title, amount) => {
  return new Promise((resolve) => {
    let reqObject = createRequestObject(title, amount);
    var options = {
      method: "POST",
      url: config.baseUrl + "/payment/v1/merchant/preOrder",
      headers: {
        "Content-Type": "application/json",
        "X-APP-Key": config.fabricAppId,
        Authorization: fabricToken,
      },
      rejectUnauthorized: false, //add when working with https sites
      requestCert: false, //add when working with https sites
      agent: false, //add when working with https sites
      body: JSON.stringify(reqObject),
    };

    request(options, (error, response) => {
      if (error) throw new Error(error);
      let result = JSON.parse(response.body);
      resolve(result);
    });
  });
};

function createRequestObject(title, amount) {
  let req = {
    timestamp: tools.createTimeStamp(),
    nonce_str: tools.createNonceStr(),
    method: "payment.preorder",
    version: "1.0",
  };
  let biz = {
    notify_url: "https://www.google.com",
    trade_type: "InApp",
    appid: config.merchantAppId,
    merch_code: config.merchantCode,
    merch_order_id: createMerchantOrderId(),
    title: title,
    total_amount: amount,
    trans_currency: "ETB",
    timeout_express: "120m",
    business_type: "BuyGoods",
    payee_identifier: config.merchantCode,
    payee_identifier_type: "04",
    payee_type: "5000",
  };
  req.biz_content = biz;
  req.sign = tools.signRequestObject(req);
  req.sign_type = "SHA256WithRSA";
  return req;
}

function createMerchantOrderId() {
  return new Date().getTime() + "";
}

function createRawRequest(prepayId) {
  let map = {
    appid: config.merchantAppId,
    merch_code: config.merchantCode,
    nonce_str: tools.createNonceStr(),
    prepay_id: prepayId,
    timestamp: tools.createTimeStamp(),
  };
  let sign = tools.signRequestObject(map);
  // order by ascii in array
  let rawRequest = [
    "appid=" + map.appid,
    "merch_code=" + map.merch_code,
    "nonce_str=" + map.nonce_str,
    "prepay_id=" + map.prepay_id,
    "timestamp=" + map.timestamp,
    "sign=" + sign,
    "sign_type=SHA256WithRSA",
  ].join("&");
  return rawRequest;
}
`,
					},
					{
						id: 3,
						name: "C#",
						value: `H5 -> CreateOrder -> C# Goes Here!`,
          },
                    
          {
						id: 4,
						name: "JSON",
						value: `H5 -> CreateOrder -> JSON Goes Here!`,
					},
				],
      },

      {
				id: 4,
        name: "QueryOrder",
        description:`QueryOrder is the forth process on payment integration, after create a transaction if you are not redeived notification, you can request callback with this interface`,
				value: [
					{
						id: 1,
						name: "Python",
						value: `H5 -> QueryOrder -> Python Goes Here!`,
					},
					{
						id: 2,
						name: "JS",
						value: `H5 -> QueryOrder -> JS Goes Here!`,
					},
					{
						id: 3,
						name: "C#",
						value: `H5 -> QueryOrder -> C# Goes Here!`,
          },
                    
          {
						id: 4,
						name: "JSON",
						value: `H5 -> QueryOrder -> JSON Goes Here!`,
					},
				],
      },
		],
    },
    // H5 INTEGRATION END
    
	// MINI APP INTEGRATION START

    {
		id: 2,
		name: "Native (Mini App) integration",
		value: [
			{
				id: 1,
        name: "ApplyFabricToken",
        description:`ApplyFabricToken is the first process on payment integration, you should take a token and append for create order request`,
				value: [
					{
						id: 1,
						name: "Python",
						value: `import requests
import json
import urllib3

urllib3.disable_warnings()
class ApplyFabricTokenService:
    BASE_URL = None;
    fabricAppId = None
    appSecret = None
    merchantAppId = None
    def __init__(self,BASE_URL,fabricAppId,appSecret,merchantAppId) :
        self.BASE_URL = BASE_URL
        self.fabricAppId = fabricAppId
        self.appSecret = appSecret
        self.merchantAppId = merchantAppId
    
    def applyFabricToken(self):
        headers = {
        "Content-Type": "application/json",
        "X-APP-Key": self.fabricAppId
        }
        payload = {
              "appSecret": self.appSecret
        }
        data=json.dumps(payload)
        authToken = requests.post(url=self.BASE_URL+"/payment/v1/token",headers=headers,data=data,verify=False)
        print(authToken.json())
        return authToken.json()`,
					},

					{
						id: 2,
						name: "JS",
						value: `const config = require("../config/config");
var request = require("request");

function applyFabricToken() {
  return new Promise((resolve, reject) => {
    var options = {
      method: "POST",
      url: config.baseUrl + "/payment/v1/token",
      headers: {
        "Content-Type": "application/json",
        "X-APP-Key": config.fabricAppId,
      },
      rejectUnauthorized: false, //add when working with https sites
      requestCert: false, //add when working with https sites
      agent: false, //add when working with https sites
      body: JSON.stringify({
        appSecret: config.appSecret,
      }),
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      let result = JSON.parse(response.body);
      resolve(result);
    });
  });
}

module.exports = applyFabricToken;
`,
					},

					{
						id: 3,
						name: "C#",
						value: `Macle -> ApplyFabricToken -> C# Goes Here!`,
          },
                    
          {
						id: 4,
						name: "JSON",
						value: `Macle -> ApplyFabricToken -> JSON Goes Here!`,
					},
				],
			},
			{
				id: 2,
        name: "CreateOrder",
        description:`CreateOrder is the second process on payment integration, it create a transaction and ready for payment process`,
				value: [
					{
						id: 1,
						name: "Python",
						value: `import requests
from service import applyFabricTokenService
import json
from utils import tools 
from config import env
from utils import tools
class CreateOrderService:
    req = None;
    BASE_URL = None
    fabricAppId = None
    appSecret = None
    merchantAppId = None
    merchantCode = None
    notify_path = None
    
    def __init__(self,req,BASE_URL,fabricAppId,appSecret,merchantAppId,merchantCode):
        self.req=req
        self.BASE_URL=BASE_URL
        self.fabricAppId=fabricAppId
        self.appSecret=appSecret
        self.merchantAppId=merchantAppId
        self.merchantCode=merchantCode
        self.notify_path = "http://www.google.com"
    # @Purpose: Creating Order
    #  *
    #  * @Param: no parameters it takes from the constructor
    #  * @Return: rawRequest|String
    def createOrder(self):
        title = self.req["title"];
        amount = self.req["amount"];
        applyFabricTokenResult = applyFabricTokenService.ApplyFabricTokenService(self.BASE_URL,self.fabricAppId,self.appSecret,self.merchantAppId)
        result=applyFabricTokenResult.applyFabricToken()
        fabricToken = result["token"]
        createOrderResult = self.requestCreateOrder(fabricToken,title,amount)
        prepayId = createOrderResult["biz_content"]["prepay_id"]
        rawRequest = self.createRawRequest(prepayId)
        print(rawRequest)
        return rawRequest
    #  * @Purpose: Requests CreateOrder
    #  *
    #  * @Param: fabricToken|String title|string amount|string
    #  * @Return: String | Boolean
    def requestCreateOrder(self,fabricToken,title,amount):
        headers = {
            "Content-Type":"application/json",
            "X-APP-Key":self.fabricAppId,
            "Authorization":fabricToken
        }
        # Body parameters
        payload = self.createRequestObject(title,amount)
        server_output = requests.post(url=self.BASE_URL+"/payment/v1/merchant/preOrder",headers=headers,data=payload,verify=False)
        return server_output.json()
    #  * @Purpose: Creating Request Object
    #  *
    #  * @Param: title|String and amount|String
    #  * @Return: Json encoded string
    def createRequestObject(self,title,amount):
        req = {
            "nonce_str":tools.createNonceStr(),
            "method":"payment.preorder",
            "timestamp":tools.createTimeStamp(),
            "version":"1.0",
            "biz_content":{},   
        }
        biz={
            "notify_url":self.notify_path,
            "business_type":"BuyGoods",
            "trade_type":"InApp",
            "appid":self.merchantAppId,
            "merch_code":self.merchantCode,
            "merch_order_id":tools.createMerchantOrderId(),
            "title":title,
            "total_amount":amount,
            "trans_currency":"ETB",
            "timeout_express":"120m",
            "payee_identifier":"220311",
            "payee_identifier_type":"04",
            "payee_type":"5000"
        }
        req["biz_content"] = biz
        req["sign_type"] = "SHA256withRSA"
        sign = tools.sign(req)
        req["sign"] = sign
        print(json.dumps(req))
        return json.dumps(req)
    #  * @Purpose: Create a rawRequest string for H5 page to start pay
    #  *
    #  * @Param: prepayId returned from the createRequestObject
    #  * @Return: rawRequest|string
    def createRawRequest(self,prepayId):
        maps={
            "appid":self.merchantAppId,
            "merch_code":self.merchantCode,
            "nonce_str":tools.createNonceStr(),
            "prepay_id":prepayId,
            "timestamp":tools.createTimeStamp(),
            "sign_type":"SHA256WithRSA" 
        }
        rawRequest=""
        for key in maps:
            value = maps[key]
            rawRequest = rawRequest + key + "=" + value + "&"
        sign = tools.sign(maps)
        rawRequest = rawRequest+"sign="+sign
        return rawRequest`,
					},

					{
						id: 2,
						name: "JS",
						value: `const applyFabricToken = require("./applyFabricTokenService");
const tools = require("../utils/tools");
const config = require("../config/config");
var request = require("request");

exports.createOrder = async (req, res) => {
  let title = req.body.title;
  let amount = req.body.amount;
  let applyFabricTokenResult = await applyFabricToken();
  let fabricToken = applyFabricTokenResult.token;
  let createOrderResult = await exports.requestCreateOrder(
    fabricToken,
    title,
    amount
  );
  let prepayId = createOrderResult.biz_content.prepay_id;
  let rawRequest = createRawRequest(prepayId);
  res.send(rawRequest);
};

exports.requestCreateOrder = async (fabricToken, title, amount) => {
  return new Promise((resolve) => {
    let reqObject = createRequestObject(title, amount);
    var options = {
      method: "POST",
      url: config.baseUrl + "/payment/v1/merchant/preOrder",
      headers: {
        "Content-Type": "application/json",
        "X-APP-Key": config.fabricAppId,
        Authorization: fabricToken,
      },
      rejectUnauthorized: false, //add when working with https sites
      requestCert: false, //add when working with https sites
      agent: false, //add when working with https sites
      body: JSON.stringify(reqObject),
    };

    request(options, (error, response) => {
      if (error) throw new Error(error);
      let result = JSON.parse(response.body);
      resolve(result);
    });
  });
};

function createRequestObject(title, amount) {
  let req = {
    timestamp: tools.createTimeStamp(),
    nonce_str: tools.createNonceStr(),
    method: "payment.preorder",
    version: "1.0",
  };
  let biz = {
    notify_url: "https://www.google.com",
    trade_type: "InApp",
    appid: config.merchantAppId,
    merch_code: config.merchantCode,
    merch_order_id: createMerchantOrderId(),
    title: title,
    total_amount: amount,
    trans_currency: "ETB",
    timeout_express: "120m",
    business_type: "BuyGoods",
    payee_identifier: config.merchantCode,
    payee_identifier_type: "04",
    payee_type: "5000",
  };
  req.biz_content = biz;
  req.sign = tools.signRequestObject(req);
  req.sign_type = "SHA256WithRSA";
  return req;
}

function createMerchantOrderId() {
  return new Date().getTime() + "";
}

function createRawRequest(prepayId) {
  let map = {
    appid: config.merchantAppId,
    merch_code: config.merchantCode,
    nonce_str: tools.createNonceStr(),
    prepay_id: prepayId,
    timestamp: tools.createTimeStamp(),
  };
  let sign = tools.signRequestObject(map);
  // order by ascii in array
  let rawRequest = [
    "appid=" + map.appid,
    "merch_code=" + map.merch_code,
    "nonce_str=" + map.nonce_str,
    "prepay_id=" + map.prepay_id,
    "timestamp=" + map.timestamp,
    "sign=" + sign,
    "sign_type=SHA256WithRSA",
  ].join("&");
  return rawRequest;
}
`,
					},

					{
						id: 3,
						name: "C#",
						value: `Macle -> CreateOrder -> C#`,
          },
                    
          {
						id: 4,
						name: "JSON",
						value: `Macle -> CreateOrder -> JSON`,
					},
				],
      },
      {
				id: 3,
        name: "Checkout",
        description:`Checkout is the third process on payment integration, after create a transaction and ready for payment process`,
				value: [
					{
						id: 1,
						name: "Python",
						value: `Macle -> Checkout -> Python Goes Here!`,
					},

					{
						id: 2,
						name: "JS",
						value: `Macle -> Checkout -> JS Goes Here!`,
					},

					{
						id: 3,
						name: "C#",
						value: `Macle -> Checkout -> C# Goes Here!`,
          },
                    
          {
						id: 4,
						name: "JSON",
						value: `Macle -> Checkout -> JSON Goes Here!`,
					},
				],
      },
      
      {
				id: 4,
        name: "QueryOrder",
        description:`QueryOrder is the forth process on payment integration, after create a transaction if you are not redeived notification, you can request callback with this interface`,
				value: [
					{
						id: 1,
						name: "Python",
						value: `Macle -> QueryOrder -> Python Goes Here!`,
					},

					{
						id: 2,
						name: "JS",
						value: `Macle -> QueryOrder -> JS Goes Here!`,
					},

					{
						id: 3,
						name: "C#",
						value: `Macle -> QueryOrder -> C# Goes Here!`,
          },
                    
          {
						id: 4,
						name: "JSON",
						value: `Macle -> QueryOrder -> JSON Goes Here!`,
					},
				],
			},
		],
    },

    // MINI APP INTEGRATION END
    
    // C2B CHECKOUT START
     {
		id: 3,
		name: "Cusetomer to Business WebCheckout",
		value: [
			{
				id: 1,
        name: "ApplyFabricToken",
        description:`ApplyFabricToken is the first process on payment integration, you should take a token and append for create order request`,
				value: [
					{
						id: 1,
						name: "Python",
						value: `C2B -> ApplyFabricToken -> Python`,
					},

					{
						id: 2,
						name: "JS",
						value: `C2B -> ApplyFabricToken -> JS`,
					},

					{
						id: 3,
						name: "C#",
						value: `C2B -> ApplyFabricToken -> C#`,
          },
                    
          {
						id: 4,
						name: "JSON",
						value: `C2B -> ApplyFabricToken -> JSON`,
					},
				],
			},
			{
				id: 2,
        name: "CreateOrder",
        description:`CreateOrder is the second process on payment integration, it create a transaction and ready for payment process`,
				value: [
					{
						id: 1,
						name: "Python",
						value: `C2B -> CreateOrder -> Python`,
					},

					{
						id: 2,
						name: "JS",
						value: `C2B -> CreateOrder -> JS`,
					},

					{
						id: 3,
						name: "C#",
						value: `C2B -> CreateOrder -> C#`,
          },
                    
          {
						id: 4,
						name: "JSON",
						value: `C2B -> CreateOrder -> JSON`,
					},
				],
        },
        {
				id: 3,
        name: "Checkout",
        description:`Checkout is the third process on payment integration, after create a transaction and ready for payment process`,
				value: [
					{
						id: 1,
						name: "Python",
						value: `C2B -> Checkout -> Python`,
					},

					{
						id: 2,
						name: "JS",
						value: `C2B -> Checkout -> JS`,
					},

					{
						id: 3,
						name: "C#",
						value: `C2B -> Checkout -> C#`,
                    },
                    
                    {
						id: 4,
						name: "JSON",
						value: `C2B -> Checkout -> JSON`,
					},
				],
      },
        
        {
				id: 4,
        name: "QueryOrder",
        description:`QueryOrder is the forth process on payment integration, after create a transaction if you are not redeived notification, you can request callback with this interface`,
				value: [
					{
						id: 1,
						name: "Python",
						value: `C2B -> QueryOrder -> Python`,
					},

					{
						id: 2,
						name: "JS",
						value: `C2B -> QueryOrder -> JS`,
					},

					{
						id: 3,
						name: "C#",
						value: `C2B -> QueryOrder -> C#`,
                    },
                    
                    {
						id: 4,
						name: "JSON",
						value: `C2B -> QueryOrder -> JSON`,
					},
				],
			},
		],
	},
    // C2B CHECKOUT END
];

export function getCodeSnippets() {
	return codes;
}

export function getCodeSnippet(topic_id, supTopicId) {
	const filteredPaymentMethod = _.find(codes, (code) => {
		return code.id === topic_id;
	});

	const codeSnippets = _.find(filteredPaymentMethod.value, (f) => {
		return f.id === supTopicId;
  });
  
  return {
    filteredPaymentMethod,
    codeSnippets
  }
}

export async function saveCodeResponse({ data, name, headers, url }) {
  console.log({ data, name, headers, url });
  if (name === "Checkout") {
    // return {
    // "rawRequest": `appid={{merchant_id}}&merch_code={{short_Code}}&nonce_str=12345678901234567890123456789011&prepay_id={{prepay_id}}&sign=ujhjh&sign_type=SHA256WithRSA&timestamp=1234323432`
    // }
  }
	const response = await fetch(url, {
		method: "POST", // or 'PUT'
		headers: headers,
		body: JSON.stringify(data),
	});

	return await response.json();
}



// const codes = [
// 	// INDEX 1
// 	{
// 		id: 1,
// 		name: "H5 integration",
// 		value: [
// 			{
// 				id: 1,
// 				name: "ApplyFabricToken",
// 				value: [
// 					{
// 						id: 1,
// 						name: "Python",
// 						value: `const https = require('http')
// const config = require('../config/config')

// function applyFabricToken() {
//     return new Promise((resolve, reject) => {
//         let req = https.request(config.baseUrl + "/payment/v1/token", {
//             method: "post",
//             headers: {
//                 "Content-Type": "application/json",
//                 "X-APP-Key": config.fabricAppId
//             }
//         }, response => {
//             response.on("data", (d) => {
//                 console.log(d.toString());
//                 let result = JSON.parse(d.toString());
//                 resolve(result);
//             });
//         });
//         req.write(JSON.stringify({appSecret: config.appSecret}));
//         req.end();
//     });
// }


// module.exports = applyFabricToken;
// `,
// 					},

// 					{
// 						id: 2,
// 						name: "JS",
// 						value: `const https = require('http')
// const config = require('../config/config')

// function applyFabricToken() {
//     return new Promise((resolve, reject) => {
//         let req = https.request(config.baseUrl + "/payment/v1/token", {
//             method: "post",
//             headers: {
//                 "Content-Type": "application/json",
//                 "X-APP-Key": config.fabricAppId
//             }
//         }, response => {
//             response.on("data", (d) => {
//                 console.log(d.toString());
//                 let result = JSON.parse(d.toString());
//                 resolve(result);
//             });
//         });
//         req.write(JSON.stringify({appSecret: config.appSecret}));
//         req.end();
//     });
// }


// module.exports = applyFabricToken;`,
// 					},

// 					{
// 						id: 3,
// 						name: "Checkout",
// 						value: `const applyFabricToken = require("./applyFabricTokenService");
// const tools = require("../utils/tools");
// const config = require("../config/config");
// const https = require("http");

// async function createOrder(req, res) {
//   let title = req.body.title;
//   let amount = req.body.amount;

//   console.log(amount);
//   let applyFabricTokenResult = await applyFabricToken();
//   let fabricToken = applyFabricTokenResult.token;
//   console.log("fabricToken", fabricToken);
//   let createOrderResult = await requestCreateOrder(fabricToken, title, amount);
//   let prepayId = createOrderResult.biz_content.prepay_id;
//   let rawRequest = createRawRequest(prepayId);
//   res.send(rawRequest);
// }

// // create a rawRequest string for H5 page to start pay
// function createRawRequest(prepayId) {
//   let map = {
//     appid: config.merchantAppId,
//     merch_code: config.merchantCode,
//     nonce_str: tools.createNonceStr(),
//     prepay_id: prepayId,
//     timestamp: tools.createTimeStamp(),
//   };
//   let sign = tools.signRequestObject(map);
//   // order by ascii in array
//   let rawRequest = [
//     "appid=" + map.appid,
//     "merch_code=" + map.merch_code,
//     "nonce_str=" + map.nonce_str,
//     "prepay_id=" + map.prepay_id,
//     "timestamp=" + map.timestamp,
//     "sign=" + sign,
//     "sign_type=SHA256WithRSA",
//   ].join("&");
//   console.log("rawRequest = ", rawRequest);
//   return rawRequest;
// }

// module.exports = createOrder;`,
// 					},
// 				],
// 			},
// 			{
// 				id: 2,
// 				name: "CreateOrder",
// 				value: [
// 					{
// 						id: 1,
// 						name: "Python",
// 						value: `function applyFabricTokenPython_crete() {
//                         return new Promise((resolve, reject) => {
//                             var options = {    
//                             body: JSON.stringify({
//                                 appSecret: config.appSecret,
//                             }),
//                             resolve(result);
//                             });
//                         });
//                      }`,
// 					},
// 					{
// 						id: 2,
// 						name: "JS",
// 						value: `const applyFabricToken = require("./applyFabricTokenService");
// const tools = require("../utils/tools");
// const config = require("../config/config");
// const https = require("http");

// async function createOrder(req, res) {
//   let title = req.body.title;
//   let amount = req.body.amount;

//   console.log(amount);
//   let applyFabricTokenResult = await applyFabricToken();
//   let fabricToken = applyFabricTokenResult.token;
//   console.log("fabricToken", fabricToken);
//   let createOrderResult = await requestCreateOrder(fabricToken, title, amount);
//   let prepayId = createOrderResult.biz_content.prepay_id;
//   let rawRequest = createRawRequest(prepayId);
//   res.send(rawRequest);
// }

// // create a rawRequest string for H5 page to start pay
// function createRawRequest(prepayId) {
//   let map = {
//     appid: config.merchantAppId,
//     merch_code: config.merchantCode,
//     nonce_str: tools.createNonceStr(),
//     prepay_id: prepayId,
//     timestamp: tools.createTimeStamp(),
//   };
//   let sign = tools.signRequestObject(map);
//   // order by ascii in array
//   let rawRequest = [
//     "appid=" + map.appid,
//     "merch_code=" + map.merch_code,
//     "nonce_str=" + map.nonce_str,
//     "prepay_id=" + map.prepay_id,
//     "timestamp=" + map.timestamp,
//     "sign=" + sign,
//     "sign_type=SHA256WithRSA",
//   ].join("&");
//   console.log("rawRequest = ", rawRequest);
//   return rawRequest;
// }

// module.exports = createOrder;`,
// 					},
// 					{
// 						id: 3,
// 						name: "Checkout",
// 						value: `const applyFabricToken = require("./applyFabricTokenService");
// const tools = require("../utils/tools");
// const config = require("../config/config");
// const https = require("http");

// async function createOrder(req, res) {
//   let title = req.body.title;
//   let amount = req.body.amount;

//   console.log(amount);
//   let applyFabricTokenResult = await applyFabricToken();
//   let fabricToken = applyFabricTokenResult.token;
//   console.log("fabricToken", fabricToken);
//   let createOrderResult = await requestCreateOrder(fabricToken, title, amount);
//   let prepayId = createOrderResult.biz_content.prepay_id;
//   let rawRequest = createRawRequest(prepayId);
//   res.send(rawRequest);
// }

// // create a rawRequest string for H5 page to start pay
// function createRawRequest(prepayId) {
//   let map = {
//     appid: config.merchantAppId,
//     merch_code: config.merchantCode,
//     nonce_str: tools.createNonceStr(),
//     prepay_id: prepayId,
//     timestamp: tools.createTimeStamp(),
//   };
//   let sign = tools.signRequestObject(map);
//   // order by ascii in array
//   let rawRequest = [
//     "appid=" + map.appid,
//     "merch_code=" + map.merch_code,
//     "nonce_str=" + map.nonce_str,
//     "prepay_id=" + map.prepay_id,
//     "timestamp=" + map.timestamp,
//     "sign=" + sign,
//     "sign_type=SHA256WithRSA",
//   ].join("&");
//   console.log("rawRequest = ", rawRequest);
//   return rawRequest;
// }

// module.exports = createOrder;`,
// 					},
// 				],
// 			},
// 		],
// 	},

// 	// INDEX 2

// 	{
// 		id: 2,
// 		name: "Mini App integration",
// 		value: [
// 			{
// 				id: 1,
// 				name: "ApplyFabricToken",
// 				value: [
// 					{
// 						id: 1,
// 						name: "Python",
// 						value: `function applyFabricTokenPython_macle_python() {
//                         return new Promise((resolve, reject) => {
//                             var options = {    
//                             body: JSON.stringify({
//                                 appSecret: config.appSecret,
//                             }),
//                             resolve(result);
//                             });
//                         });
//                      }`,
// 					},
// 					{
// 						id: 2,
// 						name: "JS",
// 						value: `function applyFabricTokenPython_js_macle() {
//                         return new Promise((resolve, reject) => {
//                             var options = {    
//                             body: JSON.stringify({
//                                 appSecret: config.appSecret,
//                             }),
//                             resolve(result);
//                             });
//                         });
//                      }`,
// 					},
// 				],
// 			},
// 			{
// 				id: 2,
// 				name: "CreateOrder",
// 				value: [
// 					{
// 						id: 1,
// 						name: "Python",
// 						value: `function applyFabricTokenPython_macle_create() {
//                         return new Promise((resolve, reject) => {
//                             var options = {    
//                             body: JSON.stringify({
//                                 appSecret: config.appSecret,
//                             }),
//                             resolve(result);
//                             });
//                         });
//                      }`,
// 					},
// 					{
// 						id: 2,
// 						name: "JS",
// 						value: `function applyFabricTokenPython_macle_js() {
//                         return new Promise((resolve, reject) => {
//                             var options = {    
//                             body: JSON.stringify({
//                                 appSecret: config.appSecret,
//                             }),
//                             resolve(result);
//                             });
//                         });
//                      }`,
// 					},
// 				],
// 			},
// 		],
// 	},
// ];
