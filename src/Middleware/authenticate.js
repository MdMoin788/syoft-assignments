require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) return reject(err);

      resolve(user);
    });
  });
};


module.exports = async (req, res, next) => {
  console.log('req.headers.authorization', req.headers.authorization);
  if (!req.headers.authorization)
    return res.status(400).send({
      message: "authorization token is not valid",
    });

  if (!req.headers.authorization.startsWith("Bearer "))
    return res.status(400).send({
      message: "authorization token is not valid",
    });

  const token = req.headers.authorization.split(" ")[1];

  let user;
  try {
    user = await verifyToken(token);
  } catch (err) {
    return res.status(400).send({
      message: "authorization token is not valid",
    });
  }
  console.log(' user',  user);

  req.user = user.user;
  // console.log(' req',  req.body);
  console.log(' req.user',  req.user);
  // console.log(' req after user',  req.body);


  return next();
};
