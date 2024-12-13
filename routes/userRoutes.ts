import { Router } from 'express';
import { getUsers, updateUser } from '../controllers/userController';
import {validateUser} from '../middleware/validateUser';

const router = Router();

router.get('/fetch-user-data', getUsers);
router.put('/update-user-data', validateUser, updateUser);

export default router;