'use strict'
const Message = use('App/Models/Message')
const User = use('App/Models/user')
const { sendBroadcast } = use("App/HelperFunctions/Socket.Utils")
const Database = use('Database')

class MessageController {
  async sendMessage({request, response}) {
    // send broadcast message
    // get request data
    const {body, sender_id} = request.post()
    // get sender from database
    const user = await User.query()
    .where('id', sender_id)
    .first()
    if (user) {
      // if user exist save conversation table
      const message = await Message.create({body, sender_id})
      let messageData = {
        senderId: sender_id,
        body: body
      }
      // sendBroadcast(messageData)
    response.status(201).json({
      message: 'Message sent',
      data: {
        message: message,
        user: user.username
      }
    })

    } else {
      response.status(404).json({
        message: 'User does not exist',
        data: {}
      })
    }

  }

  async getMessages({request, response, query}) {
    // get all messages
    const {page} = request.get()
    console.log('get all request ', page)
    // const messages = await Message.query().with('sender').fetch()
     const messages = await Database.from('messages')
     .select('messages.id', 'messages.body', 'messages.sender_id', 'users.username')
     .innerJoin('users','messages.sender_id', 'users.id')
     .forPage(page, 20).orderBy('messages.id', 'desc')
    response.status(200).json({
      message: 'Fetching all messages',
      data: messages
    })
  }
}

module.exports = MessageController
