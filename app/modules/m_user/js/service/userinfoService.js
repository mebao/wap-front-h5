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

	function bookingfeeDto(res){
		return res;
	}

	var service={
		userinfo: function(params){
			var requestObj={
				url: window.envs.api_url+'/mebapi/userprofile',
				data: params
			}
			return BaseHttpRequest.post(requestObj, userinfoDto);
		},
		userfeedback: function(params){
			var requestObj={
				url: window.envs.api_url+'/mebapi/userfeedback',
				data: params
			}
			return BaseHttpRequest.post(requestObj, userfeedbackDto);
		},
		searchuser: function(urlOptions){
			var requestObj = {
				url: window.envs.api_url + '/mebapi/searchuser?username=' + urlOptions.username + '&token=' + urlOptions.token,
			}
			return BaseHttpRequest.get(requestObj, searchuserDto);
		},
		searchtran: function(urlOptions){
			var requestObj = {
				url: window.envs.api_url + '/mebapi/searchtran?username=' + urlOptions.username + '&token=' + urlOptions.token,
			}
			return BaseHttpRequest.get(requestObj, searchtranDto);
		},
		bookingfee: function(urlOptions){
			var requestObj = {
				url: window.envs.api_url + '/mebapi/bookingfee/' + urlOptions.bookingId + '?username=' + urlOptions.username + '&token=' + urlOptions.token,
			}
			return BaseHttpRequest.get(requestObj, bookingfeeDto);
		},
		//保留两位小数
		toDecimal2: function(x) {
	        var f = parseFloat(x);
	        if (isNaN(f)) {
	            return '0.00';
	        }
	        var f = Math.round(x * 100) / 100;
	        var s = f.toString();
	        var rs = s.indexOf('.');
	        if (rs < 0) {
	            rs = s.length;
	            s += '.';
	        }
	    	//小数点不足两位
	    	if(s.length <= rs + 2){
		        while (s.length <= rs + 2) {
		            s += '0';
		        }
	    	}else{
	    		//小数点超过两位
	    		s = s.substring(0, rs + 3);
	    	}
	        return s;
	    }
	}
	return service;
}]);
