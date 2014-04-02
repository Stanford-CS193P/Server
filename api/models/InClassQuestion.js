/**
 * InClassQuestion
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

// TODO: potentially make this a base class with question-type subclasses.
// Chose this method for speed of development.
module.exports = {

  attributes: {

    text: {
      type: "STRING",
      required: true
    },

    type: {
      type: "STRING",
      required: true,
      in: ["TRUE_FALSE", "MULTIPLE_CHOICE", "FREE_RESPONSE"]
    },

    choices: {
      type: "ARRAY"
    }

  }

};
