"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUsers = void 0;
const firebaseConfig_1 = __importDefault(require("../config/firebaseConfig"));
const getUsers = async (req, res) => {
    try {
        const db = firebaseConfig_1.default.firestore();
        const querySnapshot = await db.collection("users").get();
        let usersData = [];
        querySnapshot.forEach(doc => {
            var documentData = doc.data();
            documentData.document_id = doc.id;
            usersData.push(documentData);
        });
        const response = {
            message: 'Get succes',
            data: usersData
        };
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error fetching users');
    }
};
exports.getUsers = getUsers;
const updateUser = async (req, res) => {
    const dataPost = {
        document_id: "123",
        name: "123",
        username: "dshfkjsdf",
        country: "Indonesia",
        email: "hsib19@gmail.com",
        gender: "Male"
    };
    // const users = await admin.firestore().collection('users').doc("mzVu9pTGOX44UsC4pW1R").set(
    //     {
    //         username: "Edit2",
    //     },
    //     { merge: false },
    // );;
    console.log(dataPost);
    try {
        const response = {
            message: 'Get succes',
        };
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error fetching users');
    }
};
exports.updateUser = updateUser;
