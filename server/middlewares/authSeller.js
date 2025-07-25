

import jwt from 'jsonwebtoken';

const authSeller = (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.status(401).json({ success: false, message: 'Not Authorized: No token' });
  }

  try {
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
    if (decoded.email === process.env.SELLER_EMAIL) {
      req.seller = decoded;
      next();
    } else {
      return res.status(401).json({ success: false, message: 'Not Authorized: Email mismatch' });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authSeller;
