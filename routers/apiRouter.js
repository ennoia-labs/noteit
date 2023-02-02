const router = require('express').Router();
const contributorsController = require('@controllers/contributorsController');
const {
  sendUsers,
  createContributor,
  makeContributor,
  approveContributor,
  disapproveContributor,
  approveUser,
  disapproveUser,
  getAllContributors,
} = require('@controllers/adminController');

const cors = require('cors');
const {
  mustHaveAdminToken,
} = require('@controllers/middlewares/mustHaveToken');
const corsOptions = require('./utils/corsConfig');

router.use(cors(corsOptions));

/**
 * Admin API
 */

// users

router.post('/admin/users', mustHaveAdminToken, sendUsers);
router.post(
  '/admin/users/makeContributor',
  mustHaveAdminToken,
  createContributor,
  makeContributor
);

router.put('/admin/users/approve', mustHaveAdminToken, approveUser);

router.put('/admin/users/disapprove', mustHaveAdminToken, disapproveUser);

router.get('/admin/contributors', mustHaveAdminToken, getAllContributors);

/**
 * Contributors' API
 */

router.put(
  '/admin/contributors/approve',
  mustHaveAdminToken,
  approveContributor
);

router.put(
  '/admin/contributors/disapprove',
  mustHaveAdminToken,
  disapproveContributor
);

router.get('/contributors', contributorsController.getAll);

module.exports = router;
