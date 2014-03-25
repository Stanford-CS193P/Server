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
      rating: req.param("rating"),
    identifierForVendor: req.param("identifierForVendor")
    }, function(err, response) {
      if (err) return res.json({success:false});

      console.log(response);
      // sails.sockets.broadcast(
      //   "teacher", "NewStudentResponse", {response: response});
      InClassStudentResponse.publishCreate({ id: response.id });
      res.json({success:true});
    });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to InClassStudentResponseController)
   */
  _config: {}


};
