/**
 * InClassStudentUser
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    sunetid: {
      type: "STRING",
      required: true
    },

    identifierForVendor: {
      type: "STRING",
      required: true
    }

  }

};
