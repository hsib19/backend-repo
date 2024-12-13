"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get('/fetch-user-data', userController_1.getUsers);
router.post('/update-user-data', userController_1.updateUser);
exports.default = router;
