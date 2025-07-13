

import express from 'express';
import { isAuth, login, logout, register } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/is-auth', authUser, isAuth);
userRouter.get('/logout', authUser, logout);

// ✅ Add this route
userRouter.get('/me', authUser, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default userRouter;
