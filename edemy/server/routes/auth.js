import express from "express";
const router = express.Router();


import { resquireSignin } from "../middlewares";

import {register, login,logout,currentUser} from '../controllers/auth';
router.post("/register",register);

router.post("/login",login);
router.get("/logout",logout);
router.get("/current-user",resquireSignin,currentUser);



   
module.exports = router;
