app.controller('baoquanCreateCtrl', ['$scope', '$rootScope', 'StorageConfig', 'dialog', 'baoquanService', '$state', '$stateParams', function($scope, $rootScope, StorageConfig, dialog, baoquanService, $state, $stateParams){
	$scope.header = true;
	$scope.footer = true;

	window.headerConfig = {
		title: '发表动态'
	}
	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    var spinner = '';
	$scope.create = function(){
        if(!$scope.content || $scope.content == ''){
            dialog.toast('内容不可为空');
            return false;
        }
		spinner = dialog.showSpinner();
		var param = {
			username: StorageConfig.TOKEN_STORAGE.getItem('username'),
			token: StorageConfig.TOKEN_STORAGE.getItem('token'),
			child_id: $stateParams.id,
			content: $scope.content,
			address: $scope.address
		}
		baoquanService.createchildcircle(param).then(function(res){
            if(document.getElementById('uploadImgShow_uploadImgBox').getElementsByClassName('img-item').length > 0){
                $scope.circle_id = res.results.id;
                document.getElementById('upload').click();
            }else{
                dialog.closeSpinner(spinner.id);
                $state.go('layout.baoquan')
            }
		}, function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}

	var apiUrl=window.envs.api_url;
	var spinner=dialog.showSpinner();
    baoquanService.getToken().then(function(res){
        dialog.closeSpinner(spinner.id);
        readyUpload(res.uptoken);
    },function(res){
        dialog.closeSpinner(spinner.id);
        dialog.alert(res.errorMsg);
    });

    function readyUpload(_token){
        UploadImg.init({
            id: 'uploadImgBox',
            multiple: true, // enable the component can select multiple files in one time. In mobile, please use the false.
            maxCount: 9, // the max number picture could upload.
            // autoUpload: false,
            //required: false, //ctrl you must upload images files or not. if false, the UploadImg.isFinished() init is true.
            // imgListArray: [],
            fileNum: getFileNum,
            upload: {
                uploadUrl: 'http://upload.qiniu.com/',
                token: _token,
                tokenUrl: apiUrl+'/mebapi/childtoken',
                type: 'POST',
                async: true,
                nameSpace: '',
                submitBtnId: 'upload',
                beforeCall: beforeCall,
                afterCall: afterCall,
                params: {},
                btnHtml: '',
            }
        });

        function getFileNum(num){
            // console.log(num);
        }

        function beforeCall(doingCall){
            doingCall({});
        }

        function afterCall(upFileList){
        	// console.log(upFileList);
        	for(var i = 0; i < upFileList.length; i++){
	            var requestObj={
	                username: StorageConfig.TOKEN_STORAGE.getItem('username'),
	                token: StorageConfig.TOKEN_STORAGE.getItem('token'),
					circle_id: $scope.circle_id,
					file_ext: upFileList[i].obj.type.substring(upFileList[i].obj.type.indexOf('/') + 1),
					mime_type: upFileList[i].obj.type,
					file_size: upFileList[i].obj.size,
	                remote_domain: 'http://og03472zu.bkt.clouddn.com',
	                remote_file_key: upFileList[i].key
	            }
	            baoquanService.createcirclefile(requestObj).then(function(res){
	            },function(res){
	                dialog.closeSpinner(spinner.id);
	                dialog.alert(res.errorMsg);
	            });
        	}
            dialog.closeSpinner(spinner.id);
            $state.go('layout.baoquan');
        }
    }
}]);
