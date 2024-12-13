import { Request, Response } from 'express';
import admin from '../config/firebaseConfig';

import { UserInputData } from '../shared-repo/src/userTypes';

export const getUsers = async (req: Request, res: Response) => {

  try {
    
    // Firesotre Config
    const db = admin.firestore();
    
    // Query get firestore users collection
    const querySnapshot = await db.collection("users").get();

    let dataRes: UserInputData[] = [];

    // Loop data users collection
    querySnapshot.forEach(doc => {

      var documentId = doc.id;
      var documentData = doc.data();

      const dataUser: UserInputData = {
        document_id: documentId,
        data: {
          name: documentData.name,
          country: documentData.country,
          email: documentData.email,
          gender: documentData.gender,
          username: documentData.username
        }
      }

      // Push array data
      dataRes.push(dataUser);

    });

    // Response
    const response = {
        message: 'Get succes',
        data: dataRes
    }

    res.json(response);

  } catch (error) {

    // console.error(error);

    // Handle any errors
    res.status(500).send('Error fetching users');

  }

};

export const updateUser = async (req: Request<{}, {}, UserInputData>, res: Response): Promise<void> => {

    const { document_id, data } = req.body;

    try {

      const db = admin.firestore();

      // Ref user document in firestore using the document_id
      const userRef = db.collection('users').doc(document_id);

      // Update user document data
      await userRef.update(data);

      // Response
      res.status(200).json({
        message: 'User updated successfully',
        data: { document_id, ...data }, 
      });

    } catch (error) {

      // console.error("Errors: ", error);
      
      // Handle any errors
      res.status(500).json({
        message: 'Failed to update user',
        error: error,
      });

    }

};