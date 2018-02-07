(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.envs = factory();
    }
}(this, function (b) {
    var allEnvs = {
        product: {
            env:'product',
            api_url: 'http://wapapi.meb168.com',
        },
        product_zunyi: {
            env:'product_zunyi',
            api_url: 'http://wapapi.meb168.com',
        },
        product_kunming: {
            env:'product_kunming',
            api_url: 'http://km01.yunapi.meb168.com',
        },
        localhost: {
            env:'localhost',
            api_url: 'http://192.168.31.200/jiabaokangle',
        }
    };
    var envs = allEnvs.localhost;//默认连接dev开发环境

    switch (localStorage.getItem('wap_clinic')) {
        case '1':
        {
            envs = allEnvs.product_zunyi;
            break;
        }
        case '4':
        {
            envs = allEnvs.product_zunyi;
            break;
        }
        case '2':
        {
            envs = allEnvs.product_kunming;
            break;
        }
        default:
            // envs = allEnvs.product_zunyi;
            envs = allEnvs.localhost;
            break;
    }
    return envs;
}));
