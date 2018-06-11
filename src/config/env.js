var allEnvs = {
    product: {
        env:'product',
        api_url: 'http://wapapi.meb168.com/mebapi',
    },
    product_zunyi: {
        env:'product_zunyi',
        api_url: 'http://wapapi.meb168.com/mebapi',
    },
    product_kunming: {
        env:'product_kunming',
        api_url: 'http://km01.yunapi.meb168.com/mebapi',
    },
    product_test: {
        env:'product_test',
        api_url: 'http://mebtestapi.meb168.com/mebapi',
    },
    localhost: {
        env:'localhost',
        api_url: 'http://172.16.252.101/mebnew/mebapi',
    }
};

var envs = allEnvs.localhost;//默认连接dev开发环境

if(process.env.NODE_ENV === 'development'){
    window.envs = allEnvs.localhost;
}else if(process.env.NODE_ENV === 'production'){
    switch (localStorage.getItem('wap_clinic')) {
        case '1':
        {
            window.envs = allEnvs.product_zunyi;
            break;
        }
        case '4':
        {
            window.envs = allEnvs.product_zunyi;
            break;
        }
        case '2':
        {
            window.envs = allEnvs.product_kunming;
            break;
        }
        case '99':
        {
            window.envs = allEnvs.product_kunming;
            break;
        }
        case '10':
        {
            window.envs = allEnvs.product_test;
            break;
        }
        default:
            window.envs = allEnvs.product_zunyi;
            break;
    }
}

var baseLoginUrl = '';
var baseUrl = '';

if(process.env.NODE_ENV === 'development'){
    baseLoginUrl = 'http://172.16.252.101/mebao/mebapi';
}else if(process.env.NODE_ENV === 'production'){
    baseLoginUrl = 'http://mebapi.meb168.com/mebapi';
}

export {
    envs,
    baseLoginUrl,
    baseUrl,
}