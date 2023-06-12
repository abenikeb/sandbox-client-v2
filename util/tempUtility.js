export const config = (name,credentials) => {
	let cofigData = "";

	if (name === "JS") {
		cofigData = `module.exports = {
  baseUrl: "https://196.188.120.3:38443/apiaccess/payment/gateway",
  fabricAppId: ${credentials.fabric_app_id},
  appSecret: ${credentials.app_secret},
  merchantAppId: ${credentials.merchant_id},
  merchantCode: ${credentials.short_code},
  privateKey: \`
-----BEGIN PRIVATE KEY-----
${credentials.private_key}
-----END PRIVATE KEY-----\`,
}`
	} else if (name === "Python") {
		cofigData = `ENV_VARIABLES = {
    "baseUrl": "https://196.188.120.3:38443/apiaccess/payment/gateway",
    "fabricAppId": ${credentials.fabric_app_id},
    "appSecret": ${credentials.app_secret},
    "merchantAppId":  ${credentials.merchant_id},
    "merchantCode":${credentials.short_code},
    "private_key":${credentials.private_key}
}`
	} else if (name === "C#") {
		cofigData = `ENV_VARIABLES = {
    "baseUrl": "https://196.188.120.3:38443/apiaccess/payment/gateway",
    "fabricAppId": ${credentials.fabric_app_id},
    "appSecret": ${credentials.app_secret},
    "merchantAppId":  ${credentials.merchant_id},
    "merchantCode":${credentials.short_code},
    "private_key":${credentials.private_key}
}`
	}else {
		cofigData = `ENV_VARIABLES = {
    "baseUrl": "https://196.188.120.3:38443/apiaccess/payment/gateway",
    "fabricAppId": ${credentials.fabric_app_id},
    "appSecret": ${credentials.app_secret},
    "merchantAppId":  ${credentials.merchant_id},
    "merchantCode":${credentials.short_code},
    "private_key":${credentials.private_key}
}`
	}
	return cofigData;
};

export const fabricToken = (name, credentials) => {
	let Data = "";

	if (name === "JS") {
		Data = `const https = require("http");
const config = require("../config/config");
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
`
  } else if (name === "Python") {
    Data = `import requests
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
        return authToken.json()
`
  } else if (name === "C#") {

  } else {
    
  }
	return Data;
};

export const createOrder = (name, credentials) => {
	let Data = "";

	if (name === "JS") {
		Data = `const applyFabricToken = require("./applyFabricTokenService");
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
`
	} else if (name === "Python") {
    Data=`import requests
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
        return rawRequest`
  } else if (name === "C#") {

  } else {
    
  }

	return Data;
};

export const utility = (name, credentials) => {
	let Data = "";

	if (name === "JS") {
		Data = `const crypto = require("crypto");
const config = require("../config/config");
const pmlib = require("./sign-util-lib");

// Fields not participating in signature
const excludeFields = [
  "sign",
  "sign_type",
  "header",
  "refund_info",
  "openType",
  "raw_request",
  "biz_content",
];

function signRequestObject(requestObject) {
  let fields = [];
  let fieldMap = {};
  for (let key in requestObject) {
    if (excludeFields.indexOf(key) >= 0) {
      continue;
    }
    fields.push(key);
    fieldMap[key] = requestObject[key];
  }
  // the fields in "biz_content" must Participating signature
  if (requestObject.biz_content) {
    let biz = requestObject.biz_content;
    for (let key in biz) {
      if (excludeFields.indexOf(key) >= 0) {
        continue;
      }
      fields.push(key);
      fieldMap[key] = biz[key];
    }
  }
  // sort by ascii
  fields.sort();

  let signStrList = [];
  for (let i = 0; i < fields.length; i++) {
    let key = fields[i];
    signStrList.push(key + "=" + fieldMap[key]);
  }
  let signOriginStr = signStrList.join("&");
  console.log("signOriginStr", signOriginStr);
  return signString(signOriginStr, config.privateKey);
}

let signString = (text, privateKey) => {
  const sha256withrsa = new pmlib.rs.KJUR.crypto.Signature({
    alg: "SHA256withRSAandMGF1",
  });
  sha256withrsa.init(privateKey);
  sha256withrsa.updateString(text);
  const sign = pmlib.rs.hextob64(sha256withrsa.sign());
  return sign;
};

function createTimeStamp() {
  return Math.round(new Date() / 1000) + "";
}

// create a 32 length random string
function createNonceStr() {
  let chars = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  let str = "";
  for (let i = 0; i < 32; i++) {
    let index = parseInt(Math.random() * 35);
    str += chars[index];
  }
  return str;
}

module.exports = {
  signString: signString,
  signRequestObject: signRequestObject,
  createTimeStamp: createTimeStamp,
  createNonceStr: createNonceStr,
};
`
	} else if (name === "Python") {
    Data=`import uuid
import time
from Crypto.PublicKey import RSA
from Crypto.Hash import SHA256
from Crypto.Signature import pss
from base64 import b64decode, b64encode
from config import env

def sign(request):
    privateKey = env.ENV_VARIABLES["private_key"]
    exclude_fields = ["sign", "sign_type", "header", "refund_info", "openType", "raw_request"]
    join=[]
    for key in request:
        if key in exclude_fields:
            continue
        if key == "biz_content":
            biz_content = request["biz_content"]
            for k in biz_content:
                join.append(k+"="+biz_content[k])
        else:
            join.append(key+"="+request[key])
    join.sort()
    separator = '&'
    inputString = str(separator.join(join))
    return SignWithRSA(inputString,privateKey,"SHA256withRSA")
# """ Generate signature
#       :param data: the key=value&key2=value2 format signature source string
#       :param key: Sign key
#       :param sign_type: sign type SHA256withRSA or HmacSHA256
#       :return: sign string
# """
def SignWithRSA(data,key, sign_type="SHA256withRSA"):
    if sign_type == "SHA256withRSA":
        key_bytes = b64decode(key.encode("utf-8"))
        key = RSA.importKey(key_bytes)
        digest = SHA256.new()
        digest.update(data.encode("utf-8"))
        signer = pss.new(key)
        signature = signer.sign(digest)
        return b64encode(signature).decode("utf-8")
    else:
        return "Only allowed to the type SHA256withRSA hash"

#  * @Purpose: Creating a new merchantOrderId
#  *
#  * @Param: no parameters
#  * @Return: returns a string format of time (UTC)
def createMerchantOrderId():
    return str(int(time.time()))

def createTimeStamp():
    return str(int(time.time()))

def createNonceStr():
    return str(uuid.uuid1())`
  } else if (name === "C#") {

  } else {
    
  }
	return Data;
};

export const app = (name, credentials) => {
	let Data = "";

	if (name === "JS") {
		Data = `const express = require("express");
const bodyParser = require("body-parser");
var app = express();
const { signString } = require("./utils/tools");
const authToken = require("./service/authTokenService");
const createOrder = require("./service/createOrderService");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// allow cross-origin
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PATCH, PUT, DELETE"
  );
  res.header("Allow", "GET, POST, PATCH, OPTIONS, PUT, DELETE");
  next();
});

app.post("/auth/token", function (req, res) {
  authToken(req, res);
});

app.post("/create/order", function (req, res) {
  createOrder.createOrder(req, res);
});

// start server
let serverPort = 8081;
var app = app.listen(serverPort, function () {
  console.log("server started, port:" + serverPort);
});
`
	} else if (name === "Python") {
    Data=`from http.server import HTTPServer, BaseHTTPRequestHandler
from io import BytesIO
import json
from config import env
from service import createOrderService
from service import applyFabricTokenService
enviroment = env.ENV_VARIABLES
token = applyFabricTokenService.ApplyFabricTokenService(enviroment["baseUrl"],enviroment["fabricAppId"],enviroment["appSecret"],enviroment["merchantAppId"])
class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/":
            self.send_response(200)
            self.send_header("Content-type", "application/json"),
            self.send_header("Access-Control-Allow-Origin"," *"),
            self.send_header("Access-Control-Allow-Methods", "*"),
            self.send_header("Access-Control-Allow-Methods", "PUT, GET,DELETE, POST,OPTIONS"),
            self.send_header("Access-Control-Allow-Headers"," Origin, X-Requested-With, Content-Type, Accept")
            self.end_headers()
            self.wfile.write(b'WELCOME TO API SERVER!')
        else:
            self.send_error(404)
    def do_POST(self):
        if self.path == "/create/order":
            self
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            requestParam= json.loads(body.decode('utf-8'))
            self.send_response(200)
            self.send_header("Content-type", "application/json"),
            self.send_header("Access-Control-Allow-Origin"," *"),
            self.send_header("Access-Control-Allow-Methods", "*"),
            self.send_header("Access-Control-Allow-Methods", "PUT, GET,DELETE, POST,OPTIONS"),
            self.send_header("Access-Control-Allow-Headers"," Origin, X-Requested-With, Content-Type, Accept")
            self.end_headers()
            response = BytesIO()
            module = createOrderService.CreateOrderService(requestParam,enviroment["baseUrl"],enviroment["fabricAppId"],enviroment["appSecret"],enviroment["merchantAppId"],enviroment["merchantCode"])
            order = module.createOrder()
            response.write(bytes(order,'utf-8'))
            self.wfile.write(response.getvalue())
            return order
        elif self.path == "/auth/token":
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            self.send_response(200)
            self.send_header("Content-type", "application/json"),
            self.send_header("Access-Control-Allow-Origin"," *"),
            self.send_header("Access-Control-Allow-Methods", "*"),
            self.send_header("Access-Control-Allow-Methods", "PUT, GET,DELETE, POST,OPTIONS"),
            self.send_header("Access-Control-Allow-Headers"," Origin, X-Requested-With, Content-Type, Accept")
            self.end_headers()
            token.applyFabricToken()
            response = BytesIO()
            response.write(b'AUTH TOKEN SERVICE')
            response.write(body)
            self.wfile.write(response.getvalue())
        else:
            self.send_error(404)


print("Server started http://localhost:8080")
httpd = HTTPServer(('localhost', 8080), SimpleHTTPRequestHandler)
httpd.serve_forever()`
  } else if (name === "C#") {

  } else {
    
  }
	return Data;
};

export default {
  config,
  fabricToken,
  // authToken,
  createOrder,
  utility,
  app
};