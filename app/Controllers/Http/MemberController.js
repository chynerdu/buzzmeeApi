'use strict'
const User = use('App/Models/User')
const Database = use('Database')

class MemberController {

  async allMembers({response}) {
    // get members
    const members = await User.query().fetch()
    // const members = await Database.select('id', 'username', 'first_name', 'last_name', 'phone_number', 'is_online').from('users')
    const serializedUser = members.toJSON()
    response.status(200).json({
      message: 'Fetching all users',
      data: serializedUser
    })
  }

  async onlineMembers({response}) {
    // get members
    // const members = await User.query()
    //                 .where('is_online', 1)
    //                 .fetch()

    const members = await Database.select('id', 'username', 'first_name', 'last_name', 'phone_number', 'is_online').from('users').where("is_online", 1)

    response.status(200).json({
      message: 'Fetching all online members',
      data: members
    })
  }
}

module.exports = MemberController
