import jwt from 'jsonwebtoken';

const generateJWT = (payload, secretKey = process.env.JWT_SECRET, options = { expiresIn: '1h' }) => {
  try {
    const token = jwt.sign(payload, secretKey, options);
    console.log(payload);
    return token;
  } catch (err) {
    throw new Error('Error generating JWT:', err.message);
  }
};


const verifyJWT = (req, res, next) => {
  const token = req.cookies.token; // Extract token from cookie

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Access token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.seller = decoded.sellerID;
    console.log(req.seller); // Assuming your payload contains 'seller' information
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token', error }); // Use 403 for authorization errors
  }
};

export {
  generateJWT,
  verifyJWT
};
