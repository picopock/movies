import Router from 'koa-router';
import root from './root.mjs';
import api from './api.mjs';

const router = Router();

router.use('/', root.routes(), root.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());

export default router;