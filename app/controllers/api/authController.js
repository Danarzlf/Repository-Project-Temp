const authService = require('../../services/authService');

module.exports = {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userToken = req.headers.authorization;

      authService.login(email, password, userToken)
        .then(result => {
          result.status == "success" ? res.status(200).send(result) : res.status(400).json(result);
        });
    } catch (err) {
      next(err);
    };
  },

  async authSuperadmin(req, res, next) {
    const authToken = req.headers.authorization;

    authService.getUser(authToken)
      .then(result => {
        result.status == 'success' ? next() : res.status(401).json(result);
      });
  },

  async createUser(req, res) {
    try {
      const { fullName, email, password } = req.body;
      const role = req.url.split('/')[3];

      authService.register(fullName, email, password, role)
        .then(result => {
          result.status == 'failed' ? res.status(400).json(result) : res.status(200).json(result);
        });
    } catch (err) {
      console.log('ini')
      next(err);
    }
  },

  async getCurrentUser(req, res) {
    try {
      const token = req.headers.authorization;
      authService.getCurrentUser(token).then(result => {
        result.status == 'failed' ? res.status(401).json(result) : res.status(200).json(result);
      });
    } catch (error) {
      next(err);
    }
  },

  async authentication(req, res, next) {
    const authToken = req.headers.authorization;
    authService.getAdminOrSuperAdmin(authToken)
      .then(result => {
        req.fullName = result.fullName;
        result.status == 'failed' ? res.status(401).json(result) : next();
      });
  },
};