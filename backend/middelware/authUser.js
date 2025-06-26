import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token;
   
    if (!token) {
      return res.json({ success: false, message: "Not authorized, login again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
   console.log(decoded.id)
    next();
  } catch (error) {
    return res.json({ success: false, message: "Token is invalid or expired" });
  }
};

export default authUser;
