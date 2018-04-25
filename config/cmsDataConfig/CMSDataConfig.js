app.factory('CMSDataConfig', ['StorageConfig', '$state', function (StorageConfig, $state) {
    var data = {};
    data.appMenus = [
        {
            text: '预约',
            class: 'icon-booking',
            route: 'booking-booking',
            url: '/booking/booking'
        },
        {
            text: '我的',
            class: 'icon-user',
            route: 'orderlist',
            url: '/orderlist'
        }
    ];
    return data;
}]);
