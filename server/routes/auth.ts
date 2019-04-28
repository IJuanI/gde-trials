import { Router } from 'express';
import { authController } from '../controllers';
import requireToken from '../validator';

class AuthRoute {
    public router: Router = Router();

    constructor() {
        this.router.get('/:user', authController.signin);
        this.router.post('/', authController.signup);
        this.router.put('/', requireToken, authController.changeSecret);
        this.router.delete('/', requireToken, authController.delete);
    }
}
const authRoute = new AuthRoute();
export const authRouter = authRoute.router;
