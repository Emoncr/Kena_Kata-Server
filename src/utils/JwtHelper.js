import jwt from "jsonwebtoken";

// export const GenarateToken = async (email, id) => {

//   const payload = { email, id };
//   const token = await new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setExpirationTime(process.env.JWT_EXPIRES_IN)
//     .setIssuedAt()
//     .setIssuer(process.env.JWT_ISSUER)
//     .setSubject(payload)
//     .sign(secret);

//   return token;
// };

// export const VerifyToken = async (token) => {
//   const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
//   const decodedToken = await jwtVerify(token, secret);
//   return decodedToken["payload"];
// };

export const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "720h", 
    issuer: "localhost",
  });
  return token;
};
