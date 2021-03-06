getUserInfo();
function getUserInfo() {
    $.ajax({
        method: "get",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status === 0) {
                renderImg(res.data);
            }
            console.log(res);
        }
    })
}
function renderImg(data) {
    if (data.user_pic !== null) {
        $('.usImg').attr('src', data.user_pic);
        $('.fontImg').hide();
    } else {
        $('.usImg').hide();
        $('.fontImg').show()
    }
    let name = data.nickname || data.username;
    $('.welcome span').html('欢迎 ' + name);
    $('.fontImg').html(name[0])
}
