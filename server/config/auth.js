module.exports = {
    ensureAuthenticated: (req, res, next) => {

      // console.log(req);
      console.log(req.isAuthenticated);

      if (req.isAuthenticated()) {
        return next();
      }

      res.json({
        "status": false,
        "msg": "Not authorized!"
      })
    }
  };