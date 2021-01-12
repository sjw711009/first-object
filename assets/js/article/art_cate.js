$(function () {
  let layer = layui.layer;
  getTypeList();
  // 从服务器获取数据
  function getTypeList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        let htmlStr = template('table_data', res);
        $('#td').html(htmlStr);
        console.log(res);
      }
    })
  }

  // 渲染弹出层的表格
  // console.log($('#form_add').html());
  let openHtml = null;
  $('.addType').on('click', function () {
    openHtml = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#form_add').html()
    })
    // console.log($('.postData'));
  })
  // 给弹出层的按钮通过事件委托的方式绑定事件
  $('body').on('submit', '#form_add_form', function (e) {
    e.preventDefault();
    data = $('#form_add_form').serialize();
    // console.log(data);
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('添加失败');
        }
        getTypeList();
        layer.close(openHtml);
      }
    })
  })

  // 重置
  $('.form_reset').on('click', function () {
    $('#form_add_form')[0].reset();
  })

  // 编辑
  let openEdit = null;
  $('body').on('click', '.table_edit', function (e) {
    openEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#form_edit').html()
    })
    // console.log(e.target);
    let id = e.target.dataset['id'];
    // console.log(id);
    getItem(id)
  })

  // 通过id查询当前的列表项
  function getItem(id) {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取不到信息')
        }
        $('#form_edit_id').val(res.data.Id);
        $('#form_edit_name').val(res.data.name);
        $('#form_edit_alias').val(res.data.alias);
      }
    })
  }

  $('body').on('submit', '#form_edit_form', function (e) {
    e.preventDefault();
    data = $('#form_edit_form').serialize();
    // console.log(data);
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('修改失败');
        }
        getTypeList();
        layer.close(openEdit);
      }
    })
  })

  // 删除
  $('body').on('click', '.table_delete', function (e) {
    let id = e.target.dataset['id'];
    // console.log(id);
    $.ajax({
      method: 'GET',
      url: '/my/article/deletecate/' + id,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('删除失败');
        }
        getTypeList();
      }
    })
  })
})