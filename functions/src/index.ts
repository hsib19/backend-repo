/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import { userSchema } from '../../models/userSchema';

const app = express();
app.use(express.json());

// Initialize Firebase Admin SDK
admin.initializeApp();


// Get Firestore instance
const db = admin.firestore();

// Middleware to verify Firebase ID token
const verifyIdToken = async (req: any, res: any, next: any) => {

  const token = req.header("X-TOKEN");
  
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    // Verify ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Store decoded token in request object for use in subsequent logic
    next();  // Proceed to the next middleware (or function)
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

app.get('/fetch-user-data', async (req, res) => {
    await verifyIdToken(req, res, async () => {

        try {

            const snapshot = await db.collection('users').get();
            const data: Array<any> = [];

            snapshot.forEach((doc) => {
            data.push({
                document_id: doc.id,
                data: doc.data(),
            });
            });

            // Response
            const response = {
                message: 'Get succes',
                data: data
            }

            res.status(200).json(response);

        } catch (error) {
            console.error('Error fetching users from Firestore:', error);
            res.status(500).json({ message: 'Internal server error' });
        }

    });
});

app.put('/update-user-data', async (req, res) => {
await verifyIdToken(req, res, async () => {
    // Validate the incoming request body with Joi schema
    const { error, value } = userSchema.validate(req.body);

    // If the validation fails, send a 400 error with the validation message
    if (error) {
      res.status(400).json({
        message: 'Invalid input data',
        details: error.details,
      });
    }

    const { document_id, data } = value;  // Get the validated data

        try {
        // Reference to the user's Firestore document using the document_id (user's UID)
        const userRef = db.collection('users').doc(document_id);

        // Update the user's data in Firestore
        await userRef.update(data);

        // Response
        res.status(200).json({
            message: 'User updated successfully',
            data: { document_id, ...data }, 
        });

        } catch (error) {
        console.error('Error updating user data:', error);
        res.status(500).json({ message: 'Internal server error' });
        }

  });
});

export const api = functions.https.onRequest(app);