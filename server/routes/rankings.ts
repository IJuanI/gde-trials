import { Router } from 'express';
import { rankingsController } from '../controllers';

class RankingsRoute {
    public router: Router = Router();

    constructor() {
        this.router.get('/', rankingsController.list);
        this.router.get('/:id', rankingsController.getPosition);
    }
}
const rankingsRoute = new RankingsRoute();
export const rankingsRouter = rankingsRoute.router;
