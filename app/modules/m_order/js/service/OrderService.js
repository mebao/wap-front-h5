app.service('OrderService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl = window.envs.api_url;

	function getOrderListDto(res){
		return res;
	}

	function cancelOrderByIdDto(res){
		return res;
	}

	function searchcasehistoryDto(res){
		return res;
	}

	function searchprescriptDto(res){
		return res;
	}

	function usercheckprojectsDto(res){
		return res;
	}

	function usercheckprojectinfoDto(res){
		return res;
	}

	function bookingassistDto(res){
		return res;
	}

	function finishpayDto(res){
		return res;
	}

	function searchhealthrecordDto(res){
		return res;
	}

	function bookinginfoDto(res) {
		return res;
	}

	function searchtcmprescriptDto(res) {
		return res;
	}

	var service={
		getOrderList: function(urlOptions){
			var requestObj={
				url: window.envs.api_url+'/mebapi/mybookings?username='+urlOptions.username+'&token='+urlOptions.token+'&child_id='+urlOptions.childId
			};
			return BaseHttpRequest.get(requestObj,getOrderListDto);
		},
		cancelOrderById: function(urlOptions){
			var requestObj={
				url: window.envs.api_url+'/mebapi/bookingcancelled/'+urlOptions.id+'?username='+urlOptions.username+'&token='+urlOptions.token+'&remark='+urlOptions.remark
			}
			return BaseHttpRequest.get(requestObj,getOrderListDto);
		},
		searchcasehistory: function(urlOptions){
			var requestObj = {
				url: window.envs.api_url + '/mebapi/searchcasehistory?username=' + urlOptions.username + '&token=' + urlOptions.token + (urlOptions.booking_id ? '&booking_id=' + urlOptions.booking_id : '') + (urlOptions.child_id ? '&child_id=' + urlOptions.child_id : ''),
			}
			return BaseHttpRequest.get(requestObj, searchcasehistoryDto);
		},
		searchprescript: function(urlOptions){
			var requestObj = {
				url: window.envs.api_url + '/mebapi/searchprescript?username=' + urlOptions.username + '&token=' + urlOptions.token + '&booking_id=' + urlOptions.booking_id + '&isout=1',
			}
			return BaseHttpRequest.get(requestObj, searchprescriptDto);
		},
		usercheckprojects: function(urlOptions){
			var requestObj = {
				url: window.envs.api_url + '/mebapi/usercheckprojects?username=' + urlOptions.username + '&token=' + urlOptions.token + (urlOptions.booking_id ? '&booking_id=' + urlOptions.booking_id : '') + (urlOptions.child_id ? '&child_id=' + urlOptions.child_id : '') + '&today=1&ischeck=1',
			}
			return BaseHttpRequest.get(requestObj, usercheckprojectsDto);
		},
		usercheckprojectinfo: function(urlOptions){
			var requestObj = {
				url: window.envs.api_url + '/mebapi/usercheckprojectinfo?username=' + urlOptions.username + '&token=' + urlOptions.token + (urlOptions.booking_id ? '&booking_id=' + urlOptions.booking_id : '') + (urlOptions.id ? '&id=' + urlOptions.id : '') + '&today=1&ischeck=1',
			}
			return BaseHttpRequest.get(requestObj, usercheckprojectinfoDto);
		},
		bookingassist: function(urlOptions){
			var requestObj = {
				url: window.envs.api_url + '/mebapi/bookingassist?username=' + urlOptions.username + '&token=' + urlOptions.token + '&booking_id=' + urlOptions.booking_id,
			}
			return BaseHttpRequest.get(requestObj, bookingassistDto);
		},
		finishpay: function(urlOptions){
			var requestObj = {
				url: window.envs.api_url + '/mebcrm/finishpay/' + urlOptions.booking_id + '?username=' + urlOptions.username + '&token=' + urlOptions.token,
			}
			return BaseHttpRequest.get(requestObj, bookingassistDto);
		},
		searchhealthrecord: function(urlOptions){
			var requestObj = {
				url: window.envs.api_url + '/mebapi/searchhealthrecord?username=' + urlOptions.username + '&token=' + urlOptions.token + '&booking_id=' + urlOptions.booking_id,
			}
			return BaseHttpRequest.get(requestObj, searchhealthrecordDto);
		},
		bookinginfo: function(urlOptions) {
			var requestObj = {
				url: window.envs.api_url + '/mebapi/bookinginfo/' + urlOptions.id
			}
			return BaseHttpRequest.get(requestObj, bookinginfoDto);
		},
		searchtcmprescript: function(urlOptions) {
			var requestObj = {
				url: window.envs.api_url + '/mebapi/searchtcmprescript?username=' + urlOptions.username + '&token=' + urlOptions.token + '&booking_id=' + urlOptions.booking_id + '&isout=1',
			}
			return BaseHttpRequest.get(requestObj, bookinginfoDto);
		}
	};
	return service;
}]);
