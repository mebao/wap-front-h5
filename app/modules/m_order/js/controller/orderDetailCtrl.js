app.controller('orderDetailCtrl',['$scope','$rootScope','StorageConfig', 'OrderService', 'dialog', '$state', function($scope,$rootScope,StorageConfig, OrderService, dialog, $state){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = false;

	window.headerConfig={
		title: '预约'
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	var selectedTab = StorageConfig.ORDER_STORAGE.getItem('selectedTab');
	if(selectedTab){
		$scope.selectedTab = selectedTab;
	}else{
		$scope.selectedTab = 0;
	}

	$scope.checkTab = function(_value){
		$scope.selectedTab = _value;
	}

	// 详情
	$scope.order = StorageConfig.ORDER_STORAGE.getItem('detail');
	$scope.use = new Date().getTime() < new Date($scope.order.bookingDate);
	// var refNo = $scope.order.refNo.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
	// $scope.order.refNo=refNo;

	// 病例
	var spinner = dialog.showSpinner();
	var urlOptions = {
		username: StorageConfig.TOKEN_STORAGE.getItem('username'),
		token: StorageConfig.TOKEN_STORAGE.getItem('token'),
		booking_id: $scope.order.id,
	}
	OrderService.searchcasehistory(urlOptions).then(function(data){
		dialog.closeSpinner(spinner.id);
		if(data.results.list.length > 0){
			$scope.hasCasehistory = true;
			$scope.casehistory = data.results.list[0];
		}else{
			$scope.hasCasehistory = false;
		}
	}, function(data){
		dialog.closeSpinner(spinner.id);
		dialog.alert(data.errorMsg);
	});

	// 药方
	OrderService.searchprescript(urlOptions).then(function(data){
		$scope.prescript = [];
		if(data.results.list.length > 0){
			for(var i = 0; i < data.results.list.length; i++){
				data.results.list[i].infoLength = data.results.list[i].info.length;
			}
			var prescript = data.results.list[0];
			if(prescript.info.length > 0){
				for(var i = 0; i < prescript.info.length; i++){
					prescript.info[i].oneNum = parseFloat(prescript.info[i].oneNum);
				}
				$scope.prescript = prescript.info;
			}
		}
	}, function(data){
		dialog.alert(data.errorMsg);
	});

	// 实验室检查
	OrderService.usercheckprojects(urlOptions).then(function(data){
		var check = '';
		var checkList = [];
		if(data.results.list.length > 0){
			for(var i = 0; i < data.results.list.length; i++){
				// 判断该检查是否填写检查结果
				if(data.results.list[i].checkDoctorId){
					checkList.push(data.results.list[i]);
					check += data.results.list[i].checkName + '、';
				}
			}
		}
		if(check.length > 0){
			check = check.slice(0, check.length - 1);
		}
		$scope.check = check;
		$scope.checkList = checkList;
	}, function(data){
		dialog.alert(data.errorMsg);
	});

	// 治疗
	OrderService.bookingassist(urlOptions).then(function(data){
		var assist = '';
		if(data.results.list.length > 0){
			for(var i = 0; i < data.results.list.length; i++){
				assist += data.results.list[i].name + '、';
			}
		}
		if(assist.length > 0){
			assist = assist.slice(0, assist.length - 1);
		}
		$scope.assist = assist;
	}, function(data){
		dialog.alert(data.errorMsg);
	});

	$scope.showCheckInfo = function(){
		StorageConfig.ORDER_STORAGE.putItem('selectedTab', 2);
		StorageConfig.ORDER_STORAGE.putItem('checkList', $scope.checkList);
		$state.go('order-checkInfo');
	}

	$scope.healthItem = [
		{name: '头围', key: 'headCircum', unit: 'cm'},
		{name: '胸围', key: 'breastCircum', unit: 'cm'},
		{name: '体温', key: 'bodyTemperature', unit: '°C'},
		{name: '脉搏', key: 'pulse', unit: '次/分钟'},
		{name: '呼吸', key: 'breathe', unit: '次/分钟'},
		{name: '血压', key: 'bloodPressure', unit: 'mmHg'},
		{name: '精神及神志', key: 'spirit', unit: ''},
		{name: '营养状态', key: 'nutritionalStatus', unit: ''},
		{name: '皮肤', key: 'skin', unit: ''},
		{name: '口腔黏膜', key: 'oralMucosa', unit: ''},
		{name: '毛发', key: 'hair', unit: ''},
		{name: '浅表淋巴结', key: 'lymphNode', unit: ''},
		{name: '头颅', key: 'head', unit: ''},
		{name: '前囟', key: 'bregmatic', unit: ''},
		{name: '耳', key: 'ear', unit: ''},
		{name: '鼻', key: 'nose', unit: ''},
		{name: '咽喉', key: 'throat', unit: ''},
		{name: '扁桃体', key: 'tonsil', unit: ''},
		{name: '双眼', key: 'eyes', unit: ''},
		{name: '视力筛查', key: 'vision', unit: ''},
		{name: '牙龈', key: 'gums', unit: ''},
		{name: '舌系带', key: 'tongue_tie', unit: ''},
		{name: '牙窝沟', key: 'teeth_pit', unit: ''},
		{name: '牙菌斑', key: 'plaque', unit: ''},
		{name: '出牙数', key: 'teeth_num', unit: '颗'},
		{name: '龋齿', key: 'dental_caries', unit: ''},
		{name: '胸廓', key: 'thoracic', unit: ''},
		{name: '心脏', key: 'heart', unit: ''},
		{name: '双肺', key: 'lung', unit: ''},
		{name: '双肾', key: 'kidney', unit: ''},
		{name: '腹部', key: 'abdomen', unit: ''},
		{name: '脊柱及四肢', key: 'limb', unit: ''},
		{name: '肋骨', key: 'ribs', unit: ''},
		{name: '髋关节', key: 'hip_joint', unit: ''},
		{name: '斜颈', key: 'torticollis', unit: ''},
		{name: '外生殖器', key: 'genitalia', unit: ''},
		{name: '肛门', key: 'anus', unit: ''},
		{name: '神经发育', key: 'neurodevelopment', unit: ''},
		{name: '血常规', key: 'bloodRoutineExamination', unit: ''},
		{name: '尿常规', key: 'routineUrine', unit: ''},
		{name: '大便常规', key: 'stoolRoutineExamination', unit: ''},
		{name: '骨密度', key: 'boneDensity', unit: ''},
		{name: '骨碱性磷酸酶', key: 'BALP', unit: ''},
		{name: '微量元素', key: 'traceElement', unit: ''},
		{name: '铅、镉、锰', key: 'heavyMetal', unit: ''},
		{name: 'ABO血型鉴定', key: 'bloodType', unit: ''},
		{name: '喂养指导', key: 'feeding', unit: ''},
		{name: '生活指导', key: 'life', unit: ''},
		{name: '免疫接种指导', key: 'immunization', unit: ''},
		{name: '疾病预防', key: 'diseasePrevention', unit: ''},
		{name: '答疑解惑', key: 'answeringQuestions', unit: ''},
		{name: '诊疗记录', key: 'record', unit: ''},
		{name: '复查日期', key: 'reviewDate', unit: ''},
	]

	// 儿保
	OrderService.searchhealthrecord(urlOptions).then(function(data){
		$scope.healthrecordList = data.results.list;
	}, function(data){
		dialog.alert(data.errorMsg);
	});
}]);
