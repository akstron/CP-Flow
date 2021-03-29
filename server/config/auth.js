module.exports = {
    ensureAuthenticated: (req, res, next) => {

      if (req.isAuthenticated()) {
        return next();
      }

      res.json({
        "status": false,
        "msg": "Not authorized!"
      })
    }
  };