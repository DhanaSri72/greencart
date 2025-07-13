

import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token; // safer access

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not Authorized: No token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ success: false, message: 'Not Authorized: Invalid token' });
    }

    req.user = { _id: decoded.id };

    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Authenticated User:', req.user);
    }

    next();

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired. Please log in again.' });
    }

    console.error('❌ Token Error:', error.message);
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export default authUser;

