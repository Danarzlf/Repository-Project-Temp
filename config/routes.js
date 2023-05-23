const router = require('express').Router();

// import controller
const controller = require('../app/controllers');
const authController = require('../app/controllers/api/authController');
const carController = require('../app/controllers/api/carController');

// Swagger API Docs
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// route api
router.post('/api/auth/login', authController.login);
router.post('/api/auth/member/register', authController.createUser);
router.post('/api/auth/admin/register', authController.authSuperadmin, authController.createUser);
router.get('/api/auth/whoami', authController.getCurrentUser);

router.get('/api/cars', authController.authentication, carController.getCars);
router.get('/api/cars/:id', authController.authentication, carController.getCarById);
router.post('/api/cars', authController.authentication, carController.createCar);
router.put('/api/cars/:id', authController.authentication, carController.updateCar);
router.delete('/api/cars/:id', authController.authentication, carController.deleteCar);

router.get('/api/cars/history/:id', authController.authentication, carController.getCarHistory);

router.use(controller.api.main.onLost);
router.use(controller.api.main.onError);

module.exports = router;