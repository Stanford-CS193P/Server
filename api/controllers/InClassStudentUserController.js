/**
 * InClassStudentUserController
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
    // So that random people can't access this endpoint
    // It is assumed that
    // https://www.stanford.edu/class/cs193p/cgi-bin/app_auth/index.php
    // is the only client that knows this password.
    if (req.param("password") !== "cs193pisawesome") {
      return res.send("Request must originate from valid endpoint", 500);
    }

    var identifierForVendor = req.param("identifierForVendor");
    var sunetid = req.param("sunetid");

    InClassStudentUser
      .find()
      .where({ sunetid: sunetid })
      .done(function(err, models) {
        if (err) return res.send(err, 500);

        for (var i = 0; i < models.length; i++) {
          if (models[i].identifierForVendor === identifierForVendor) {
            return res.json(models[i]);
          }
          models[i].destroy(function(err) { console.log(err); });
        }

        InClassStudentUser.create({
          identifierForVendor: identifierForVendor,
          sunetid: sunetid
        }, function(err, model) {
          if (err) return res.send(err, 500);
          res.json(model);
        });

      });
  },

  isAssociated: function(req, res) {
    InClassStudentUser
      .find()
      .where({ identifierForVendor: req.param("identifierForVendor") })
      .limit(1)
      .done(function(err, model) {
        if (model.length == 0) return res.json({ isAssociated: false });
        model = model[0];
        res.json({ isAssociated: true, user: model });
      });
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to InClassStudentUserController)
   */
  _config: {}


};
