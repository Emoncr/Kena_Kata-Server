import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(errorResponse(401, "Please login first"));
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(errorResponse(401, "Unauthorized request"));
    }
    req.user = user;
    next();
  });
};
