'use strict'

class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
    console.log('user joined buzz chat 2')
    this.socket.broadcastToAll('message', 'New user joined  buzz chat 2')
  }

  onMessage (message) {
    console.log('Onmessage chat ', message)
    this.socket.broadcastToAll('message', 'new connection')
  }

  OnMessage(sendMessage) {
    console.log('send message', sendMessage) 
    this.socket.broadcastToAll('receiveMessage', 'new connection')
  }
  // onClose() {
  //   console.log('Closing subscription for room topic')
  //   console.log("closed")
  // }
}

module.exports = ChatController
