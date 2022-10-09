import express from 'express';
import { homePage } from '../controllers/homepage';

const router = express.Router();

router.get('/',homePage);

export default router;