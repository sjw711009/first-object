// 注意：每次调用 $.ajax 等ajax函数时，会先调用这个函数，
// 在这个函数中可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (option) {
    // 在发起真正的Ajax请求之前，统一拼接请求的根路径
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url;
    console.log(option.url);
})