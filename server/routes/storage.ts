import { Router } from 'express';
import { storageController } from '../controllers';
import requireToken from '../validator';

class StorageRoute {
    public router: Router = Router();

    constructor() {
        this.router.post('/:file', requireToken, storageController.save);
        this.router.delete('/:file', requireToken, storageController.delete);
    }
}
const storageRoute = new StorageRoute();
export const storageRouter = storageRoute.router;
