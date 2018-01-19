app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/orderlist');
        $urlRouterProvider.when('/', '/orderlist');
        $locationProvider.html5Mode(true).hashPrefix('!');
        $stateProvider
                .state('layout.test', {
                    url: '/test',
                    templateUrl: 'app/modules/m_test/view/index.html'
                })
                .state('layout', {
                    url: '/layout',
                    templateUrl: 'app/modules/m_layout/view/index.html'
                })
                .state('layout.home', {
                    url: '/home?footer',
                    templateUrl: 'app/modules/m_home/view/index.html'
                })
                .state('layout.home-addGrowth', {
                    url: '/home/addGrowth?id&source',
                    templateUrl: 'app/modules/m_home/view/addGrowth.html'
                })
                .state('layout.home-growthdatas',{
                    url: '/home/growthdatas?id',
                    templateUrl: 'app/modules/m_home/view/growthdatas.html'
                })
                .state('layout.home-updateGrowth', {
                    url: '/home/updateGrowth?id',
                    templateUrl: 'app/modules/m_home/view/updateGrowth.html'
                })
                .state('login', {
                    url: '/login?from',
                    templateUrl: 'app/modules/m_login/view/index.html'
                })
                .state('layout.register', {
                    url: '/register',
                    templateUrl: 'app/modules/m_login/view/register.html'
                })
                .state('layout.forgetpwd', {
                    url: '/forgetpwd',
                    templateUrl: 'app/modules/m_login/view/forgetpwd.html'
                })
                .state('layout.booking-clinic', {
                    url: '/booking/clinic?id&cityId',
                    templateUrl: 'app/modules/m_booking/view/clinic.html'
                })
                .state('layout.booking-booking', {
                    url: '/booking/booking?type&clinicId&serviceId&time&date&doctorId',
                    templateUrl: 'app/modules/m_booking/view/booking.html'
                })
                .state('layout.booking-map',{
                    url: '/booking/map?lat&lng',
                    templateUrl: 'app/modules/m_booking/view/map.html'
                })
                .state('orderlist',{
                    url: '/orderlist',
                    templateUrl: 'app/modules/m_order/view/index.html'
                })
                .state('order-detail', {
                    url: '/order/detail',
                    templateUrl: 'app/modules/m_order/view/orderDetail.html'
                })
                .state('order-check-list', {
                    url: '/order/checkList?childId',
                    templateUrl: 'app/modules/m_order/view/checkList.html'
                })
                .state('order-checkInfo',{
                    url: '/order/checkInfo',
                    templateUrl: 'app/modules/m_order/view/checkInfo.html'
                })
                .state('layout.booking-selectClinic',{
                    url: '/booking/selectClinic',
                    templateUrl: 'app/modules/m_booking/view/selectClinic.html'
                })
                .state('layout.booking-selectDoctor',{
                    url: '/booking/selectDoctor?type&clinicId&serviceId',
                    templateUrl: 'app/modules/m_booking/view/selectDoctor.html'
                })
                .state('layout.user',{
                    url: '/user',
                    templateUrl: 'app/modules/m_user/view/index.html'
                })
                .state('layout.user-childlist',{
                    url: '/user/childlist',
                    templateUrl: 'app/modules/m_user/view/childlist.html'
                })
                .state('layout.user-createChild',{
                    url: '/user/createChild',
                    templateUrl: 'app/modules/m_user/view/createChild.html'
                })
                .state('layout.user-updateChild',{
                    url: '/user/updateChild?id',
                    templateUrl: 'app/modules/m_user/view/updateChild.html'
                })
                .state('layout.user-info',{
                    url: '/user/info',
                    templateUrl: 'app/modules/m_user/view/userinfo.html'
                })
                .state('layout.user-feedback', {
                    url: '/user/feedback',
                    templateUrl: 'app/modules/m_user/view/feedback.html'
                })
                .state('user-payList', {
                    url: '/user/payList',
                    templateUrl: 'app/modules/m_user/view/payList.html'
                })
                .state('user-payDetail', {
                    url: '/user/payDetail?type&id',
                    templateUrl: 'app/modules/m_user/view/payDetail.html'
                })
                .state('layout.doctor', {
                    url: '/doctor',
                    templateUrl: 'app/modules/m_doctor/view/list.html'
                })
                .state('layout.doctor-dutydate', {
                    url: '/doctor/dutydate?id',
                    templateUrl: 'app/modules/m_doctor/view/dutydate.html'
                })
                .state('layout.booking-info', {
                    url: '/booking/info',
                    templateUrl: 'app/modules/m_booking/view/info.html'
                })
                .state('layout.booking-order', {
                    url: '/booking/order',
                    templateUrl: 'app/modules/m_booking/view/order.html'
                })
                .state('layout.booking-update', {
                    url: '/booking/update?id',
                    templateUrl: 'app/modules/m_booking/view/update.html'
                })
                .state('layout.baoquan-create', {
                    url: '/baoquan/create?id',
                    templateUrl: 'app/modules/m_baoquan/view/create.html'
                })
                .state('layout.baoquan', {
                    url: '/baoquan',
                    templateUrl: 'app/modules/m_baoquan/view/index.html'
                })
                .state('order-paySuccess', {
                    url: '/order/paySuccess?id&username&token',
                    templateUrl: 'app/modules/m_order/view/paySuccess.html'
                })
                .state('order-info', {
                    url: '/order/info?id',
                    templateUrl: 'app/modules/m_order/view/orderInfo.html'
                })
    }]);
