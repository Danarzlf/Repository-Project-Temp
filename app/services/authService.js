const userRepository = require('../repositories/userRepository');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function nullToken() {
  return result = {
    status: 'failed',
    message: 'This request needs a valid token.'
  };
}

function nullPrefix() {
  return result = {
    status: 'failed',
    message: 'token must have a prefix'
  };
}

module.exports = {
  async login(email, inputPass, token) {
    try {
      const user = await userRepository.findUser(email);
      const password = await bcrypt.compare(inputPass, user.password);

      if (!password) {
        return result = {
          status: 'failed',
          message: 'oops, wrong password! Please input the correct one.'
        };
      }

      if (password == true) {
        return result = {
          status: 'success',
          message: `Successfully logged in as ${user.fullName}!`,
          email: user.email,
          token: user.token
        };
      }
    } catch (err) {
      return result = {
        status: 'failed',
        message: err.message
      };
    }
  },

  async getUser(inputedToken) {
    if (!inputedToken) {
      return nullToken();
    }

    const checkPrefix = inputedToken.includes(' ');
    if (!checkPrefix) {
      return nullPrefix();
    }

    const bearerToken = inputedToken.split(" ")[1];
    const getPrefix = inputedToken.split(bearerToken)[0];
    const prefix = getPrefix.replace(/\s/g, '');
    const user = await userRepository.findUserByToken(bearerToken);
    if (prefix == 'superadmin' && user) {
      jwt.verify(user.token, process.env.JWT_SIGNATURE_KEY || prefix);
      return result = {
        status: 'success'
      };
    } else {
      return result = {
        status: 'failed',
        message: 'Invalid token. Restricted for superadmin only.'
      };
    }
  },

  async register(name, email, pwd, key) {
    try {
      userData = await userRepository.findUser(email);
      if (userData) {
        if (userData.email == email) {
          return {
            status: 'failed',
            message: 'user email already exists'
          };
        }
      }

      encryptedPassword = await bcrypt.hash(pwd, 10);

      const token = jwt.sign({
        email,
        password: encryptedPassword,
        fullName: name
      }, `${key}`);

      await userRepository.createUser(name, email, encryptedPassword, token);

      return {
        message: 'new user registered successfully!',
        user: {
          email,
          token,
          name
        }
      };
    } catch (err) {
      return {
        status: 'failed',
        message: err.message
      };
    }
  },

  async getCurrentUser(token) {
    try {
      if (!token) {
        return nullToken();
      }

      const checkPrefix = token.includes(' ');
      if (!checkPrefix) {
        return nullPrefix();
      }

      const bearerToken = token.split(" ")[1];
      const getPrefix = token.split(bearerToken)[0];
      const prefix = getPrefix.replace(/\s/g, '');
      const user = await userRepository.findUserByToken(bearerToken);

      if (user) {
        jwt.verify(user.token, process.env.JWT_SIGNATURE_KEY || prefix);
        return {
          user: `Current user is ${user.fullName}`,
          email: user.email,
          token: user.token
        };
      } else {
        return result = {
          status: 'failed',
          message: 'Invalid token.'
        };
      }
    } catch (err) {
      return {
        status: 'failed',
        message: err.message
      };
    }
  },

  async getAdminOrSuperAdmin(inputedToken) {
    try {
      if (!inputedToken) {
        return nullToken();
      }

      const checkPrefix = inputedToken.includes(' ');
      if (!checkPrefix) {
        return nullPrefix();
      }

      const bearerToken = inputedToken.split(" ")[1];
      const getPrefix = inputedToken.split(bearerToken)[0];
      const prefix = getPrefix.replace(/\s/g, '');
      const user = await userRepository.findUserByToken(bearerToken);
      if (prefix == 'superadmin' || prefix == 'admin' && user) {
        jwt.verify(user.token, process.env.JWT_SIGNATURE_KEY || prefix);
        return user;
      } else {
        return result = {
          status: 'failed',
          message: 'Invalid token. You are not permitted to access it.'
        };
      }
    } catch (err) {
      return {
        status: 'failed',
        message: err.message
      };
    }
  },
};