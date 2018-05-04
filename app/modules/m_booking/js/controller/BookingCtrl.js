app.controller('BookingCtrl',['$scope','$rootScope','$stateParams','ClinicBookingService','dialog','StorageConfig','$state','CommonService',function($scope,$rootScope,$stateParams,ClinicBookingService,dialog,StorageConfig,$state,CommonService){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = true;

	window.headerConfig={
		enableBack: false,
		title: '预约',
		enableRefresh: false
	};

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	$scope.booking_error = '';
	var urlOptions={
        username: StorageConfig.TOKEN_STORAGE.getItem('username'),
        token: StorageConfig.TOKEN_STORAGE.getItem('token'),
		clinic_id: localStorage.getItem('wap_clinic'),
    };
	var spinner = dialog.showSpinner();
	ClinicBookingService.searchtuina(urlOptions).then(function(data){
		dialog.closeSpinner(spinner.id);
		if(data.results.doctors.length == 0){
			$scope.booking_error = '暂无小儿推拿科室医生排班';
		}else{
			for(var i = 0; i < data.results.doctors.length; i++){
				if(data.results.doctors[i].doctorDutys.length > 0){
					for(var j = 0; j < data.results.doctors[i].doctorDutys.length; j++){
						var dutyDate = data.results.doctors[i].doctorDutys[j].dutyDate;
						var dutyDateText = dutyDate.replace('-', '年');
						dutyDateText = dutyDateText.replace('-', '月');
						dutyDateText += '日 ' + getWeekTitle(new Date(dutyDate).getDay());
						data.results.doctors[i].doctorDutys[j].dutyDateText = dutyDateText;
					}
				}
				data.results.doctors[i].str = JSON.stringify(data.results.doctors[i]);
			}
			$scope.doctorList = data.results.doctors;
		}
		$scope.childList = data.results.childs;
		if($scope.childList.length > 0){
			$scope.selectedChild = $scope.childList[0];
		}
	}, function(res){
		$scope.booking_error = '诊所尚未开设小儿推拿科室';
		dialog.closeSpinner(spinner.id);
		dialog.alert(res.errorMsg);
	});

	$scope.timeList = [];
	$scope.changeDuty = function() {
		$scope.timeList = [];
		if($scope.selectedDate.timeList.length > 0){
			for(var i = 0; i < $scope.selectedDate.timeList.length; i++){
				var time = {
					value: $scope.selectedDate.timeList[i],
					use: true,
				}
				// 排班时间，不再已预约时间中
				if($scope.selectedDate.selectedList.length > 0 && ($scope.selectedDate.selectedList.indexOf($scope.selectedDate.timeList[i]) != -1)){
					time.use = false;
				}
				$scope.timeList.push(time);
			}
		}
	}

	$scope.submitForm = function(){
		var spinner2 = dialog.showSpinner();
		var _paramsObj = {
			username: StorageConfig.TOKEN_STORAGE.getItem('username'),
			token: StorageConfig.TOKEN_STORAGE.getItem('token'),
			user_doctor_id: $scope.selectedDoctor.doctorId,
			type: 'ZJ',
			clinic_id: localStorage.getItem('wap_clinic'),
			child_id: $scope.selectedChild.childId,
			child_name: $scope.selectedChild.childName,
			age: String($scope.selectedChild.age),
			time: $scope.selectedTime,
			booking_date: $scope.selectedDate.dutyDate,
			service_id: $scope.selectedDoctor.serviceId,
			service_name: $scope.selectedDoctor.serviceName,
			mobile: StorageConfig.TOKEN_STORAGE.getItem('username'),
			booking_fee: '0',
		}
		ClinicBookingService.createbooking(_paramsObj).then(function(res){
			dialog.closeSpinner(spinner2.id);
			if(res.status=='ok'){
				$state.go('user');
			}
		},function(res){
			dialog.closeSpinner(spinner2.id);
			dialog.alert(res.errorMsg);
		});
	}

	function getWeekTitle(value) {
		var title = '';
		switch(value){
			case 1:
				title = '星期一';
				break;
			case 2:
				title = '星期二';
				break;
			case 3:
				title = '星期三';
				break;
			case 4:
				title = '星期四';
				break;
			case 5:
				title = '星期五';
				break;
			case 6:
				title = '星期六';
				break;
			case 0:
				title = '星期天';
				break;
		}
		return title;
	}
}]);
