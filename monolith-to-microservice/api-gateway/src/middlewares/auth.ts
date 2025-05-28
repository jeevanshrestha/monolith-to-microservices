// File: src/middlewares/auth.ts
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();


declare global {
  namespace Express {
    interface Request {
      user?: any ;
    }
  }
}

export const verifyToken = ( req : any, res: any, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized: No token provided" });
    }
    
    try {
 
        // Verify the token using your secret key
        const secretKey = process.env.JWT_SECRET ;
        const decoded = jwt.verify(token, secretKey!);
        req.user = decoded; // Attach the decoded user information to the request object
        console.log("User authenticated:", req.user);
        // Call the next middleware or route handler
        console.log("Token verified successfully");
        next();
    } catch (error) {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized: Invalid token" });
    }

}