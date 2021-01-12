$(function () {
    let layer = layui.layer;
    let form = layui.form;
    getUserInfo2();
    function getUserInfo2() {
        $.ajax({
            method: "get",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status === 0) {
                    form.val('formUserInfo', res.data)
                }
                console.log(res);
            }
        })
    }
/*     function renderForm(data) {
        // let username = data.username;
        // let nickname = data.nickname || '';
        // let email = data.email || '';
        // let id = data.id;
        // $('#form_uname').html(username);
        // $('#form_nickname').html(nickname);
        // $('#form_email').html(email);
        // $('#form_id').html(id);
    } */
    $('.layui-btn-primary').on('click', function (e) {
        e.preventDefault();
        getUserInfo2();
    })
    $('.postData').on('click', function (e) {
        e.preventDefault();
        postData();
    })
    function postData() {
        let data = $('#user_edit_form').serialize();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新失败')
                }
                getUserInfo2();
                window.parent.getUserInfo();
            }
        })
    }
})