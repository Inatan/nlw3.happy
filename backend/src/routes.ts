import {Router} from 'express'
import OrphanagesController from './controller/OrphanagesController'
import multer from 'multer'

import uploadConfig from './config/upload'

const upload = multer(uploadConfig);

//index, show, create, update, delete

const routes = Router();
routes.post('/orphanages', upload.array('images') ,OrphanagesController.create);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.get('/orphanages', OrphanagesController.index);

export default routes;