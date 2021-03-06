/**
 * InClassStudentResponseController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {


  create: function(req, res) {
    InClassStudentResponse.create({
      sunetid: req.param("sunetid"),
      identifierForVendor: req.param("identifierForVendor"),
      rating: req.param("rating"),
      conceptName: req.param("conceptName"),
      conceptID: req.param("conceptID")
    }, function(err, response) {
      if (err) return res.send(err, 500);

      InClassStudentResponse.publishCreate({
        id: response.id,
        identifierForVendor: response.identifierForVendor,
        rating: response.rating,
        createdAt: response.createdAt
      });

      res.json(response);
    });
  },

  readByIdentifierForVendor: function(req, res) {
    InClassStudentResponse.find()
      .where({ identifierForVendor: req.param("identifierForVendor") })
      .sort('createdAt')
      .exec(function(err, responses) {
        if (err) return res.send(err, 500);
        res.json(responses);
      });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to InClassStudentResponseController)
   */
  _config: {}


};
