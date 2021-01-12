$(function () {
    let layer = layui.layer;
    let form = layui.form;
    getUserInfo(token);
    function getUserInfo() {
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
    console.log(data);
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
        getUserInfo(token);
    })
    $('.seedData').on('click', function (e) {
        e.preventDefault();
        seedData();
    })
    function seedData() {}
})