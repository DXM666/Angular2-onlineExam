function doget() {
    // var data={task_id:1};
$.ajax({
  url: '/todo/api/tasks',
  type: 'get',
    // data:{task_id:1},
  // dataType:'jsonp',  // 处理Ajax跨域问题
  contentType: "application/json; charset=utf-8",
  // data:JSON.stringify(data),
  success:function (msg) {
    //调用成功
      obj_label = document.getElementById('test_input');
      obj_label.innerHTML = msg;
  },
    error:function(XMLHttpRequest, textStatus) {
       console.log(XMLHttpRequest.status);
       console.log(XMLHttpRequest.readyState);
       console.log(textStatus);
  }
});
}

