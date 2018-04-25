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
		console.log($scope.timeList);
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
		console.log(_paramsObj);
		ClinicBookingService.createbooking(_paramsObj).then(function(res){
			dialog.closeSpinner(spinner2.id);
			if(res.status=='ok'){
				$state.go('orderlist');
			}
		},function(res){
			dialog.closeSpinner(spinner2.id);
			dialog.alert(res.errorMsg);
		});
	}
}]);
