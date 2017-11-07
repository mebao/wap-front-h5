app.service('userinfoService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;

	function userinfoDto(res){
		return res;
	}

	function userfeedbackDto(res){
		return res;
	}

	function searchuserDto(res){
		return res;
	}

	function searchtranDto(res){
		return res;
	}

	var service={
		userinfo: function(params){
			var requestObj={
				url: apiUrl+'/mebapi/userprofile',
				data: params
			}
			return BaseHttpRequest.post(requestObj, userinfoDto);
		},
		userfeedback: function(params){
			var requestObj={
				url: apiUrl+'/mebapi/userfeedback',
				data: params
			}
			return BaseHttpRequest.post(requestObj, userfeedbackDto);
		},
		searchuser: function(urlOptions){
			var requestObj = {
				url: apiUrl + '/mebapi/searchuser?username=' + urlOptions.username + '&token=' + urlOptions.token,
			}
			return BaseHttpRequest.get(requestObj, searchuserDto);
		},
		searchtran: function(urlOptions){
			var requestObj = {
				url: apiUrl + '/mebapi/searchtran?username=' + urlOptions.username + '&token=' + urlOptions.token,
			}
			return BaseHttpRequest.get(requestObj, searchtranDto);
		}
	}
	return service;
}]);
