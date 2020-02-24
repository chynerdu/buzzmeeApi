'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Authentication {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, auth}, next) {
    try {
      await auth.check()
      await next()
    } catch (error) {
      console.log('token error ', error)
      return response.status(401).json({
        message: 'Missing or invalid jwt token'
      })
    }
    // call next to advance the request
  }
}

module.exports = Authentication
