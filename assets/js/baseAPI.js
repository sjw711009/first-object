// 注意：每次调用 $.ajax 等ajax函数时，会先调用这个函数，
// 在这个函数中可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (option) {
    // 在发起真正的Ajax请求之前，统一拼接请求的根路径
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url;
    // console.log(option.url);
    // 统一为有权限的接口，设置 headers 请求头
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局挂载 complete 回调函数
    option.complete = function (res) {
        if (res.status === 1 && res.responseJSON.message === '身份认证失败') {
            // 1、强制清空 token
            localStorage.removeItem('token');
            // 2、强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})