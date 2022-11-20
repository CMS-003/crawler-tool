const ws = new WebSocket('ws://localhost:8097/ws/?EIO=3&transport=websocket&sid=' + Date.now())

ws.on('connect', (socket) => {
  console.log('connected');
  ws.emit('message', '2049')
});

ws.on('disconnect', () => {
  console.log('disconnected');
});

ws.on('open', () => {
  console.log('open');
})

module.exports = ws;