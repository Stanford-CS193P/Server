/**
 * InClassQuestionResponse
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    identifierForVendor: {
      type: "STRING",
      required: true
    },

    questionID: {
      type: "STRING",
      required: true
    },

    questionText: {
      type: "STRING",
      required: true
    },

    response: {
      type: "STRING",
      required: true
    }

  }

};
