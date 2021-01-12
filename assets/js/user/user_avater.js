let layer = layui.layer;
// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

$('.selectImg').on('click', function () {
    $('#img').click();
})
$('#img').on('change', function () {
    let file = $('#img')[0].files[0];
    // console.log($('#img')[0].files[0]);
    if (file === null) {
        layer.msg('请选择要上传的图片');
    } else {
        let imgURL = window.URL.createObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', imgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    }
})

$('.layui-btn-danger').on('click', function () {
    var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('更新头像失败！');
            }
            window.parent.getUserInfo();
        }
    });
})

