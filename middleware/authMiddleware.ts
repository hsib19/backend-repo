import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {

  const appCheckToken = req.header("X-TOKEN");

    if (!appCheckToken) {
        res.status(401);
        return next("Unauthorized");
    }

    try {
        const appCheckClaims = await admin.auth().verifyIdToken(appCheckToken);
        console.log(appCheckClaims)
        return next();
    } catch (err) {
        res.status(401);
        return next("Unauthorized");
    }
};