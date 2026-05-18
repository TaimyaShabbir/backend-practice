const express = require("express");

const router = express.Router();

const {
  getUser,
  getPaginatedPersons,
} = require("../controllers/userController");

const {
  getSeniorityCounts,
} = require("../controllers/seniorityController");

const authMiddleware = require("../middlewares/authMiddleware");

const authorizeRoles = require("../middlewares/authorizationMiddleware");

router.get(
  "/profile",
  authMiddleware,
  authorizeRoles("user", "admin"),
  getUser
);

router.get(
  "/all-users",
  authMiddleware,
  authorizeRoles("admin"),
  getPaginatedPersons
);

router.get(
  "/seniority-counts",
  authMiddleware,
  authorizeRoles("admin"),
  getSeniorityCounts
);

module.exports = router;