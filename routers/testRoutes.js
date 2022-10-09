import express from 'express';
import { authGoogle, getEvents, googleRedirected } from '../controllers/googleAuth';
import { homePage } from '../controllers/homepage';

const router = express.Router();


router.get('/redirect', googleRedirected);
router.post('/auth', authGoogle)
router.get('/events', getEvents);

router.get('/', homePage);

export default router;