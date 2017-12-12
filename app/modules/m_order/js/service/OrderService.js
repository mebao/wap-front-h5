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

	function bookingassistDto(res){
		return res;
	}

	function finishpayDto(res){
		return res;
	}

	var service={
		getOrderList: function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/mybookings?username='+urlOptions.username+'&token='+urlOptions.token+'&child_id='+urlOptions.childId
			};
			return BaseHttpRequest.get(requestObj,getOrderListDto);
		},
		cancelOrderById: function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/bookingcancelled/'+urlOptions.id+'?username='+urlOptions.username+'&token='+urlOptions.token+'&remark='+urlOptions.remark
			}
			return BaseHttpRequest.get(requestObj,getOrderListDto);
		},
		searchcasehistory: function(urlOptions){
			var requestObj = {
				url: apiUrl + '/mebapi/searchcasehistory?username=' + urlOptions.username + '&token=' + urlOptions.token + (urlOptions.booking_id ? '&booking_id=' + urlOptions.booking_id : '') + (urlOptions.child_id ? '&child_id=' + urlOptions.child_id : ''),
			}
			return BaseHttpRequest.get(requestObj, searchcasehistoryDto);
		},
		searchprescript: function(urlOptions){
			var requestObj = {
				url: apiUrl + '/mebapi/searchprescript?username=' + urlOptions.username + '&token=' + urlOptions.token + '&booking_id=' + urlOptions.booking_id + '&isout=1&today=1',
			}
			return BaseHttpRequest.get(requestObj, searchprescriptDto);
		},
		usercheckprojects: function(urlOptions){
			var requestObj = {
				url: apiUrl + '/mebapi/usercheckprojects?username=' + urlOptions.username + '&token=' + urlOptions.token + (urlOptions.booking_id ? '&booking_id=' + urlOptions.booking_id : '') + (urlOptions.child_id ? '&child_id=' + urlOptions.child_id : '') + '&today=1&ischeck=1',
			}
			return BaseHttpRequest.get(requestObj, usercheckprojectsDto);
		},
		bookingassist: function(urlOptions){
			var requestObj = {
				url: apiUrl + '/mebapi/bookingassist?username=' + urlOptions.username + '&token=' + urlOptions.token + '&booking_id=' + urlOptions.booking_id,
			}
			return BaseHttpRequest.get(requestObj, bookingassistDto);
		},
		finishpay: function(urlOptions){
			var requestObj = {
				url: apiUrl + '/mebcrm/finishpay/' + urlOptions.booking_id + '?username=' + urlOptions.username + '&token=' + urlOptions.token,
			}
			return BaseHttpRequest.get(requestObj, bookingassistDto);
		}
	};
	return service;
}]);
