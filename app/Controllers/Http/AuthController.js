'use strict'

const User = use("App/Models/User")
const Hash = use('Hash')

class AuthController {

  async register({request, response, auth}) {
    // get request
    const {username, first_name, last_name, phone_number, password} = request.post()

    // create user
    await User.create({username, first_name, last_name, phone_number, password})
    // login user
    const user = await User.query()
                .where('phone_number', phone_number)
                .first()
    if (user) {
      const serializedUser = user.toJSON()
      const isVerified = await Hash.verify(password, user.password)
      if (isVerified) {
        const token = await auth.generate(user)
        response.status(201).json({
          message: 'Login sucessful',
          data: serializedUser,
          token: token
        })
      } else {
        return response.status(401).json({
          message: 'Password is incorrect',
        })
      }
    } else {
      return response.status(401).json({
        message: 'User does not exist',
      })
    }
  }

  async login({request, response, auth}) {
    // get user input
    const {phone_number, password} = request.post()
  

    // find user by email and verify hash
    const user = await User.query()
                .where('phone_number', phone_number)
                .first()
    if (user) {
      const serializedUser = user.toJSON()
      const isVerified = await Hash.verify(password, user.password)
      if (isVerified) {
        const token = await auth.generate(user)
        response.status(201).json({
          message: 'Login sucessful',
          data: serializedUser,
          token: token
        })
      } else {
        return response.status(401).json({
          message: 'Password is incorrect',
        })
      }
    } else {
      return response.status(401).json({
        message: 'User does not exist',
      })
    }
    // if verified login else throw error
  }
}

module.exports = AuthController
