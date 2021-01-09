$(function () {
  // 点击去注册账号的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide();
    $('.reg-box').show();
  })

  // 点击去登录的链接
  $('#link_login').on('click', function () {
    $('.login-box').show();
    $('.reg-box').hide();
  })

  // 从layUi中获取form对象
  var form = layui.form;
  // 通过form.verify()函数来自定义规则
  form.verify({
    // 自定义一个pwd的校验规则
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] 
  })
})