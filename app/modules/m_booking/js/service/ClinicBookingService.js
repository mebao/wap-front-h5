app.service('ClinicBookingService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;

	function getDoctorByClinicIdAndServiceIdDto(res){
		return res;
	}

	function bookingtimeDto(res){
		return res;
	}

	function searchtuinaDto(res){
		return res;
	}

	function createbookingDto(res){
		return res;
	}

	function allservicesDto(res){
		return res;
	}

	var service={
		getDoctorByClinicIdAndServiceId: function(urlOptions){
			var requestObj={
				url: apiUrl+'/mebapi/clinicservicedoctor?username='+urlOptions.username+'&token='+urlOptions.token+'&clinic_id='+urlOptions.clinic_id+'&service_id='+urlOptions.service_id
			};
			return BaseHttpRequest.get(requestObj, getDoctorByClinicIdAndServiceIdDto);
		},
		bookingtime: function(params){
			var requestObj={
				url: apiUrl+'/mebapi/bookingtime',
				data: params
			}
			return BaseHttpRequest.post(requestObj, bookingtimeDto);
		},
		// 查询推拿医生
		searchtuina: function(urlOptions){
			var requestObj = {
				url: window.envs.api_url + '/mebapi/searchtuina?username=' + urlOptions.username + '&token=' + urlOptions.token + '&clinic_id=' + urlOptions.clinic_id + '&service_id=' + urlOptions.service_id,
			}
			return BaseHttpRequest.get(requestObj, searchtuinaDto);
		},
		createbooking: function(params){
			var requestObj = {
				url: window.envs.api_url + '/mebapi/createbooking',
				data: params
			}
			return BaseHttpRequest.post(requestObj, createbookingDto);
		},
		allservices: function(urlOptions){
			var requestObj = {
				url: window.envs.api_url + '/mebapi/allservices?username=' + urlOptions.username + '&token=' + urlOptions.token + '&clinic_id=' + urlOptions.clinic_id,
			}
			return BaseHttpRequest.get(requestObj, allservicesDto);
		}
	}
	return service;
}]);
