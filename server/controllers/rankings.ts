import { Response, Request } from 'express';
import query from '../sql';
import { map } from 'rxjs/operators';

class RankingsController {
    list(req: Request, res: Response) {
        let qStr =
            'SELECT users.id, users.name, rankings.score FROM rankings INNER JOIN users ON rankings.user = users.id';
        const params: Array<any> = [];
        if (req.query.category) {
            qStr = qStr.concat(' WHERE category = ?');
            params.push(+req.query.category);
        }
        qStr = qStr.concat(' ORDER BY rankings.score DESC LIMIT 10');
        query(qStr, params).subscribe(data => res.json(data));
    }

    getPosition(req: Request, res: Response) {
        query('SELECT score FROM rankings WHERE id = ?', req.params.id)
            .pipe(map(_ => (_.length > 0 ? _[0].score : -1)))
            .subscribe(score => {
                if (score === -1) res.status(404).send();
                else
                    query('SELECT COUNT(*) as total FROM rankings WHERE score > ?', score)
                        .pipe(map(_ => _[0].total))
                        .subscribe(total => res.send(total));
            });
    }
}
export const rankingsController = new RankingsController();
