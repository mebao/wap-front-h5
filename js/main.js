var apiUrl = 'http://192.168.1.2/xinlouhua';

function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

var signIn = true;
var username = localStorage.getItem('username');
var token = localStorage.getItem('token');
var role = localStorage.getItem('role');
if(!(username && token && role)){
	$('#loginIntercept').modal({backdrop: 'static', keyboard: false});
	$('#login').click(function(){
		location.href = 'louhua_login.html';
	});
	signIn = false;
}

function sortPositiveByKey(array, key, type) {
	return array.sort(function(a, b) {
		if(type == 'num'){
 			var x = parseFloat(a[key]); var y = parseFloat(b[key]);
		}else{
 			var x = a[key]; var y = b[key];
		}
 		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
}

function sortNegativeByKey(array, key, type) {
	return array.sort(function(a, b) {
		if(type == 'num'){
 			var x = parseFloat(a[key]); var y = parseFloat(b[key]);
		}else{
 			var x = a[key]; var y = b[key];
		}
 		return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	});
}

//array copy
function arrayCopy(array){
	var newArray = new Array();
	for(var i = 0; i<array.length; i++){
		newArray.push(array[i]);
	}
	return newArray;
}

//构造分页
function structurePaging(dataNum, url, functionType){
    if(dataNum > 0){
        var page = Math.ceil(dataNum / $('#pagesize').val());
        var pageHtml = '';
        //当前页为1，上一页不可点击
        if($('.x_content').find('.pagination').attr('data-page') == 1){
            pageHtml += '<li class="disabled">';
        }else{
            pageHtml += '<li>';
        }
        pageHtml += '<a href="javascript:;" aria-label="Previous">\
                    <span aria-hidden="true">&laquo;</span>\
                </a>\
            </li>';
        for(var i = 0; i < page; i++){
            //当前页数
            if(i == ($('.x_content').find('.pagination').attr('data-page') - 1)){
                pageHtml += '<li class="checkLi active"><a href="javascript:;" class="checkPage">' + (i+1) + '</a></li>';
            }else{
                pageHtml += '<li class="checkLi"><a href="javascript:;" class="checkPage">' + (i+1) + '</a></li>';
            }
        }
        //当前页为最后一页，下一页不可点击
        if($('.x_content').find('.pagination').attr('data-page') == page){
            pageHtml += '<li class="disabled">';
        }else{
            pageHtml += '<li>';
        }
        
        pageHtml += '<a href="javascript:;" aria-label="Next">\
                    <span aria-hidden="false">&raquo;</span>\
                </a>\
            </li>';
        $('.x_content').find('.pagination').html(pageHtml);
        //分页事件
        $('.checkPage').click(function(){
            //切换页面
            $('.x_content').find('.checkLi').removeClass('active');
            $(this).parent('li').addClass('active');
            //记录当前页数
            $('.x_content').find('.pagination').attr('data-page', $(this).text());
            requestData(url + '&page=' + $(this).text());
        });
        //上一页
        $('a[aria-label="Previous"]').click(function(){
            if($('.x_content').find('.pagination').attr('data-page') != 1){
                var nowPage = parseInt($('.x_content').find('.pagination').attr('data-page')) - 1;
                $('.x_content').find('.checkLi').removeClass('active');
                $('.x_content').find('.checkLi').each(function(){
                    if($(this).text() == nowPage){
                        $(this).parent('li').addClass('active');
                    }
                });
                $('.x_content').find('.pagination').attr('data-page', nowPage);
                requestData(url + '&page=' + nowPage);
            }
        });
        //下一页
        $('a[aria-label="Next"]').click(function(){
            if($('.x_content').find('.pagination').attr('data-page') != page){
                var nowPage = parseInt($('.x_content').find('.pagination').attr('data-page')) + 1;
                $('.x_content').find('.checkLi').removeClass('active');
                $('.x_content').find('.checkLi').each(function(){
                    if($(this).text() == nowPage){
                        $(this).parent('li').addClass('active');
                    }
                });
                $('.x_content').find('.pagination').attr('data-page', nowPage);
                requestData(url + '&page=' + nowPage);
            }
        });
    }else{
        $('.x_content').find('.pagination').html('');
    }
}

//searchAgents分页
function structurePagingSearchAgents(dataNum, url){
    if(dataNum > 0){
        var page = Math.ceil(dataNum / $('.user-list').attr('data-pagesize'));
        var pageHtml = '';
        //当前页为1，上一页不可点击
        if($('#selectUser').find('.pagination').attr('data-page') == 1){
            pageHtml += '<li class="disabled">';
        }else{
            pageHtml += '<li>';
        }
        pageHtml += '<a href="javascript:;" aria-label="Previous">\
                    <span aria-hidden="true">&laquo;</span>\
                </a>\
            </li>';
        for(var i = 0; i < page; i++){
            //当前页数
            if(i == ($('#selectUser').find('.pagination').attr('data-page') - 1)){
                pageHtml += '<li class="checkLi active"><a href="javascript:;" class="checkPage">' + (i+1) + '</a></li>';
            }else{
                pageHtml += '<li class="checkLi"><a href="javascript:;" class="checkPage">' + (i+1) + '</a></li>';
            }
        }
        //当前页为最后一页，下一页不可点击
        if($('#selectUser').find('.pagination').attr('data-page') == page){
            pageHtml += '<li class="disabled">';
        }else{
            pageHtml += '<li>';
        }
        
        pageHtml += '<a href="javascript:;" aria-label="Next">\
                    <span aria-hidden="false">&raquo;</span>\
                </a>\
            </li>';
        $('#selectUser').find('.pagination').html(pageHtml);
        //分页事件
        $('#selectUser').find('.checkPage').click(function(){
            //切换页面
            $('#selectUser').find('.checkLi').removeClass('active');
            $(this).parent('li').addClass('active');
            //记录当前页数
            $('#selectUser').find('.pagination').attr('data-page', $(this).text());
            readyAgents(url + '&page=' + $(this).text());
        });
        //上一页
        $('a[aria-label="Previous"]').click(function(){
            if($('#selectUser').find('.pagination').attr('data-page') != 1){
                var nowPage = parseInt($('#selectUser').find('.pagination').attr('data-page')) - 1;
                $('#selectUser').find('.checkLi').removeClass('active');
                $('#selectUser').find('.checkLi').each(function(){
                    if($(this).text() == nowPage){
                        $(this).parent('li').addClass('active');
                    }
                });
                $('#selectUser').find('.pagination').attr('data-page', nowPage);
                readyAgents(url + '&page=' + nowPage);
            }
        });
        //下一页
        $('a[aria-label="Next"]').click(function(){
            if($('#selectUser').find('.pagination').attr('data-page') != page){
                var nowPage = parseInt($('#selectUser').find('.pagination').attr('data-page')) + 1;
                $('#selectUser').find('.checkLi').removeClass('active');
                $('#selectUser').find('.checkLi').each(function(){
                    if($(this).text() == nowPage){
                        $(this).parent('li').addClass('active');
                    }
                });
                $('#selectUser').find('.pagination').attr('data-page', nowPage);
                readyAgents(url + '&page=' + nowPage);
            }
        });
    }else{
        $('#selectUser').find('.pagination').html('');
    }
}

//left sider共用
// 通过角色
var menuHtml = '<ul class="nav side-menu">\
                  <li>\
                    <ul class="nav">\
                      <li><a href="crm.html">医生工作台</a></li>\
                      <li><a href="crm_index7.html">护士工作台</a></li>\
                      <li><a href="crm_index8.html">前台工作台</a></li>\
                      <li><a href="crm_index9.html">预约</a></li>\
                      <li><a href="crm_index3.html">登记</a></li>\
                      <li><a href="crm_index12.html">分诊</a></li>\
                      <li><a href="crm_index13.html">医生门诊</a></li>\
                      <li><a href="crm_index14.html">实验室检查</a></li>\
                      <li><a href="crm_index15.html">辅助检查</a></li>\
                      <li><a href="crm_index16.html">治疗</a></li>\
                      <li><a href="crm_index17.html">药房</a></li>\
                      <li><a href="crm_index19.html">收费</a></li>\
                      <li><a href="crm_index5.html">随访管理</a></li>\
                      <li><a href="crm_index4.html">物资管理</a></li>\
                      <li><a href="crm_index.html">病人库</a></li>\
                      <li><a href="crm_index18.html">诊室管理</a></li>\
                      <li><a href="crm_index10.html">排班</a></li>\
                      <li><a href="crm_index11.html">统计报表</a></li>\
                      <li><a href="setup.html">系统设置</a></li>\
                    </ul>\
                  </li>\
                </ul>';
$('#crm').find('.menu_section').html(menuHtml);

//left sider公用（设置页面）
var setupMenuHtml = '<ul class="nav side-menu">\
                  <li>\
                    <a><i class="fa fa-building"></i> 诊所设置 <span class="fa fa-chevron-down"></span></a>\
                    <ul class="nav child_menu">\
                        <li><a href="setup.html">诊所管理</a></li>\
                        <li><a href="setup_index.html">科室维护</a></li>\
                        <li><a href="setup_index2.html">员工管理</a></li>\
                        <li><a href="setup_index3.html">角色管理</a></li>\
                        <li><a href="setup_index4.html">科室组维护</a></li>\
                        <li><a href="setup_index5.html">诊室维护</a></li>\
                        <li><a href="setup_index6.html">排班维护</a></li>\
                        <li><a href="setup_index7.html">供应商维护</a></li>\
                        <li><a href="setup_index8.html">会员类型管理</a></li>\
                        <li><a href="setup_index9.html">患者来源</a></li>\
                        <li><a href="setup_index10.html">标签管理</a></li>\
                    </ul>\
                  </li>\
                  <li>\
                    <a><i class="fa fa-dollar"></i> 收费项目设置 <span class="fa fa-chevron-down"></span></a>\
                    <ul class="nav child_menu">\
                        <li><a href="setup_index11.html">检验医嘱</a></li>\
                        <li><a href="setup_index12.html">检验项目维护</a></li>\
                        <li><a href="setup_index13.html">检查医嘱</a></li>\
                        <li><a href="setup_index14.html">治疗医嘱</a></li>\
                        <li><a>处方医嘱<span class="fa fa-chevron-down"></span></a>\
                          <ul class="nav child_menu">\
                            <li class="sub_menu"><a href="setup_index15.html">西/成药处方</a>\
                            </li>\
                            <li><a href="setup_index16.html">中药处方</a>\
                            </li>\
                          </ul>\
                        </li>\
                        <li><a href="setup_index17.html">其他收费</a></li>\
                        <li><a href="setup_index18.html">诊疗费维护</a></li>\
                        <li><a href="setup_index19.html">物资收费</a></li>\
                    </ul>\
                  </li>\
                  <li>\
                    <a><i class="fa fa-stethoscope"></i> 体检套餐 <span class="fa fa-chevron-down"></span></a>\
                    <ul class="nav child_menu">\
                        <li><a href="setup_index20.html">体检套餐</a></li>\
                    </ul>\
                  </li>\
                  <li>\
                    <a><i class="fa fa-th-list"></i> 模板设置 <span class="fa fa-chevron-down"></span></a>\
                    <ul class="nav child_menu">\
                        <li><a href="setup_index21.html">检验模板</a></li>\
                        <li><a href="setup_index22.html">检查模板</a></li>\
                        <li><a href="setup_index23.html">治疗模板</a></li>\
                        <li><a href="setup_index24.html">西/成药处方模板</a></li>\
                        <li><a href="setup_index25.html">中药处方模板</a></li>\
                        <li><a href="setup_index26.html">中药处方模板分类</a></li>\
                        <li><a href="setup_index27.html">病历模板</a></li>\
                        <li><a href="setup_index28.html">随访内容模板</a></li>\
                        <li><a href="setup_index29.html">随访结论模板</a></li>\
                        <li><a href="setup_index30.html">检查报告模板</a></li>\
                    </ul>\
                  </li>\
                  <li>\
                    <a><i class="fa fa-cog"></i> 操作日志 <span class="fa fa-chevron-down"></span></a>\
                    <ul class="nav child_menu">\
                        <li><a href="setup_index31.html">操作日志</a></li>\
                    </ul>\
                  </li>\
                  </ul>';
$('#setUpCrm').find('.menu_section').html(setupMenuHtml);

var setupNavbarMenu = '<li class="">\
                  <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">\
                    <img src="images/img.jpg" alt="">John Doe\
                    <span class=" fa fa-angle-down"></span>\
                  </a>\
                  <ul class="dropdown-menu dropdown-usermenu pull-right">\
                    <li><a href="javascript:;"> Profile</a></li>\
                    <li>\
                      <a href="javascript:;">\
                        <span class="badge bg-red pull-right">50%</span>\
                        <span>Settings</span>\
                      </a>\
                    </li>\
                    <li><a href="javascript:;">Help</a></li>\
                    <li><a href="login.html"><i class="fa fa-sign-out pull-right"></i> Log Out</a></li>\
                  </ul>\
                </li>\
                <li><a href="crm.html" role="button"><i class="fa fa-home"></i> 返回诊所系统</a></li>';
$('#setUpCrm .navbar_menu').html(setupNavbarMenu);

//树形
$('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
$('.tree li.parent_li > span').on('click', function (e) {
    var children = $(this).parent('li.parent_li').find(' > ul > li');
    if (children.is(":visible")) {
        children.hide('fast');
        $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
    } else {
        children.show('fast');
        $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
    }
    e.stopPropagation();
});