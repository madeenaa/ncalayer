let webSocket = null;
var socketUrl = 'wss://127.0.0.1:13579/';
var callback = null;

function blockScreen() {
    $.blockUI({
        message: '<img src="js/loading.gif" /><br/>Подождите, выполняется операция в NCALayer...',
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }
    });
}

function openDialog() {
    if (confirm("Ошибка при подключении к NCALayer. Запустите NCALayer и нажмите ОК") === true) {
        location.reload();
    }
}

function unblockScreen() {
    $.unblockUI();
}

webSocket.onopen = function (event) {
    console.log("Connection opened");
};

webSocket.onclose = function (event) {
    if (event.wasClean) {
        console.log('connection has been closed');
    } else {
        console.log('Connection error');
        openDialog();
    }
    console.log('Code: ' + event.code + ' Reason: ' + event.reason);
};

webSocket.onmessage = function (event) {
    var result = JSON.parse(event.data);

	if (result != null) {
		var rw = {
			code: result['code'],
			message: result['message'],
			responseObject: result['responseObject'],
			getResult: function () {
				return this.result;
			},
			getMessage: function () {
				return this.message;
			},
			getResponseObject: function () {
				return this.responseObject;
			},
			getCode: function () {
				return this.code;
			}
        };
        if (callback != null) {
            window[callback](rw);
        }
	}
	// console.log(event);
};

function getActiveTokens(callBack) {
    var getActiveTokens = {
		"module": "kz.gov.pki.knca.commonUtils",
        "method": "getActiveTokens"
    };
    callback = callBack;
    webSocket.send(JSON.stringify(getActiveTokens));
}

function getKeyInfo(storageName, callBack) {
    var getKeyInfo = {
		"module": "kz.gov.pki.knca.commonUtils",
        "method": "getKeyInfo",
        "args": [storageName]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(getKeyInfo));
}

function signXml(storageName, keyType, xmlToSign, callBack) {
    var signXml = {
		"module": "kz.gov.pki.knca.commonUtils",
        "method": "signXml",
        "args": [storageName, keyType, xmlToSign, "", ""]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(signXml));
}

function signXmls(storageName, keyType, xmlsToSign, callBack) {
    var signXmls = {
		"module": "kz.gov.pki.knca.commonUtils",
        "method": "signXmls",
        "args": [storageName, keyType, xmlsToSign, "", ""]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(signXmls));
}

function createCAdESFromFile(storageName, keyType, filePath, flag, callBack) {
    var createCAdESFromFile = {
		"module": "kz.gov.pki.knca.commonUtils",
        "method": "createCAdESFromFile",
        "args": [storageName, keyType, filePath, flag]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(createCAdESFromFile));
}

function createCAdESFromBase64(storageName, keyType, base64ToSign, flag, callBack) {
    var createCAdESFromBase64 = {
		"module": "kz.gov.pki.knca.commonUtils",
        "method": "createCAdESFromBase64",
        "args": [storageName, keyType, base64ToSign, flag]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(createCAdESFromBase64));
}

function createCAdESFromBase64Hash(storageName, keyType, base64ToSign, callBack) {
    var createCAdESFromBase64Hash = {
		"module": "kz.gov.pki.knca.commonUtils",
        "method": "createCAdESFromBase64Hash",
        "args": [storageName, keyType, base64ToSign]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(createCAdESFromBase64Hash));
}

function applyCAdEST(storageName, keyType, cmsForTS, callBack) {
    var applyCAdEST = {
		"module": "kz.gov.pki.knca.commonUtils",
        "method": "applyCAdEST",
        "args": [storageName, keyType, cmsForTS]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(applyCAdEST));
}

function showFileChooser(fileExtension, currentDirectory, callBack) {
    var showFileChooser = {
		"module": "kz.gov.pki.knca.commonUtils",
        "method": "showFileChooser",
        "args": [fileExtension, currentDirectory]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(showFileChooser));
}

function changeLocale(language) {
    var changeLocale = {
		"module": "kz.gov.pki.knca.commonUtils",
        "method": "changeLocale",
        "args": [language]
    };
    callback = null;
    webSocket.send(JSON.stringify(changeLocale));
}

function createCMSSignatureFromFile(storageName, keyType, filePath, flag, callBack) {
    var createCMSSignatureFromFile = {
		"module": "kz.gov.pki.knca.commonUtils",
        "method": "createCMSSignatureFromFile",
        "args": [storageName, keyType, filePath, flag]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(createCMSSignatureFromFile));
}

function createCMSSignatureFromBase64(storageName, keyType, base64ToSign, flag, callBack) {
    var createCMSSignatureFromBase64 = {
		"module": "kz.gov.pki.knca.commonUtils",
        "method": "createCMSSignatureFromBase64",
        "args": [storageName, keyType, base64ToSign, flag]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(createCMSSignatureFromBase64));
}