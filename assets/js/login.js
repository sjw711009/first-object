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
      , '密码必须6到12位，且不能出现空格'
    ],
    // 检验两次密码是否一致
    repwd: function (value) {
      // 通过形参拿到的是确认密码框的内容，需要获取密码框的内容，进行等于判断，
      // 错误return一个错误消息
      // 通过属性选择器选择
      var pwd = $('.reg-box [name=password]').val();
      if (pwd !== value) {
        return '两次密码不一致';
      }
    }
  })

  // 监听注册表单的提交事件
  var layer = layui.layer;
  $('#form_reg').on('submit', function (e) {
    e.preventDefault();
    $.post('http://api-breakingnews-web.itheima.net/api/reguser',
      { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() },
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        console.log('注册成功');
        layer.msg('注册成功');
        // 模拟点击
        $('#link_login').click();
      })
  })

  // 监听登录表单的提交事件
  $('#form_login').on('submit', function (e) {
    e.preventDefault();
    var data = $('#form_login .layui-form').serialize();
    // console.log(data);
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg('登录成功');
        // 本地存储登录凭据（token）
        localStorage.setItem('token', res.token);
        // 跳转到主页 index.html
        location.href = '/index.html'
      }
    })
  })
})