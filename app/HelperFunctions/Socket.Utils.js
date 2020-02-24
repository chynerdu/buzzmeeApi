const Ws = use('Ws')

function sendBroadcast(body) {
  const channel = Ws.getChannel('room:chat')
  console.log('channel ', channel)
  if (!channel) return

  const topic = channel.topic(`room:chat`)
  console.log('topic ', topic)
  if (!topic) {
    console.error('Has no topic')
    return
  }

  // emit, broadcast, broadcastToAll
  topic.broadcastToAll(`message`,
  `notification: ${body}`);
}

module.exports = {
  sendBroadcast
}
