$(document).ready(function(){
    // 1. 与服务器端建立连接
const socket = io.connect("http://localhost:8080", {
    path: '/chat'
});

const renderMsg = (msg,id) => {
    if(!id) {
        return `<p>我话：${msg}</p>`
    }else{
        return `<p>${id}话：${msg}</p>`
    } 
}

// 2. 监听send按钮点击的事件
$("#send").click(function(){
    // 获取输入的信息
    let message = $("#message").val().trim();
    $("#msglist").append(renderMsg(message)) 
    // 向服务器端发送信息
    socket.emit("sentToServer", message);
});

// 3. 获取服务端发送过来的信息
socket.on("sendToClient", (item) => { 
    $("#msglist").append(renderMsg(item.message, item.userid)) 
});
/**
 * 发布订阅(广播), 一端发布, 可以让多端触发
 */
  });
