app.service('CommonService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;

	function sendSMSCodeDto(res){
		return res;
	}

	function userloginDto(res){
		return res;
	}

	function topuserDto(res){
		return res;
	}

	function userregistDto(res){
		return res;
	}

	function pawloginDto(res){
		return res;
	}

	function forgetpwdDto(res){
		return res;
	}

	function topuserloginDto(res){
		return res;
	}

	var service={
		sendSMSCode: function(params){
			var requestObj={
				url: 'http://mebapi.meb168.com/mebapi/smsverifycode',
				// url: 'http://localhost/yrbk/mebapi/smsverifycode',
				// url: 'http://172.16.252.28/yrbk/mebapi/smsverifycode',
				data: params
			};
			return BaseHttpRequest.post(requestObj, sendSMSCodeDto);
		},
		userlogin: function(params){
			var requestObj={
				url: window.envs.api_url+'/mebapi/userlogin',
				data: params
			};
			return BaseHttpRequest.post(requestObj,userloginDto);
		},
		topuser: function(urlOptions){
			var requestObj={
				url: window.envs.api_url+'/mebapi/topuser/' + urlOptions,
			};
			return BaseHttpRequest.get(requestObj,userloginDto);
		},
		userregist: function(params){
			var requestObj={
				url: apiUrl+'/mebapi/userregist',
				data: params
			};
			return BaseHttpRequest.post(requestObj, userregistDto);
		},
		pawlogin: function(params){
			var requestObj={
				url: apiUrl+'/mebapi/pawlogin',
				data: params
			}
			return BaseHttpRequest.post(requestObj, pawloginDto);
		},
		forgetpwd: function(params){
			var requestObj={
				url: apiUrl+'/mebapi/forgetpwd',
				data: params
			}
			return BaseHttpRequest.post(requestObj, forgetpwdDto);
		},
		topuserlogin: function(params){
			var requestObj = {
				url: 'http://mebapi.meb168.com/mebapi/topuserlogin',
				// url: 'http://localhost/yrbk/mebapi/topuserlogin',
				// url: 'http://172.16.252.28/yrbk/mebapi/topuserlogin',
				data: params
			}
			return BaseHttpRequest.post(requestObj, topuserloginDto);
		},
	}
    return service;
}]);
