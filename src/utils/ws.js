import io from 'socket.io-client';

const ws = io('https://192.168.0.124', {
  path: '/ws',
  reconnectionAttempts: 3
});

ws.open();
// 连接成功
ws.on("connect", () => {
  console.log(ws.id, '监听客户端连接成功-connect');
})
// 断开连接
ws.on("disconnect", (reason) => {
  console.log("断开连接-disconnect", reason);
})
// 错误
ws.on("error", (err) => {
  console.log("错误-error", err);
})
// 连接错误
ws.on("connect_error", (err) => {
  console.log("连接错误-connect_error", err);
});
// 连接超时
ws.on("connect_timeout", (data) => {
  console.log("连接超时-connect_timeout", data);
});

export default ws;