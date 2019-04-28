import { Response, Request } from 'express';
import { MysqlError } from 'mysql';
import { generateToken } from '../validator';
import query from '../sql';

class AuthController {
    signin(req: Request, res: Response) {
        if (req.body)
            query('SELECT id, name FROM users WHERE user = ? AND secret = ?', [req.params.user, req.body]).subscribe(
                data => {
                    if (data.length < 1) res.status(404).send();
                    else
                        res.json({
                            name: data[0].name,
                            token: generateToken(data[0].id),
                        });
                },
            );
        else res.status(400).send();
    }

    signup(req: Request, res: Response) {
        if (req.body && req.body.user && req.body.secret && req.body.email && req.body.name && req.body.cellphone)
            query('INSERT INTO users(name, user, secret, email, cellphone, token) VALUES(?, ?, ?, ?, ?, ?)', [
                req.body.name,
                req.body.user,
                req.body.secret,
                req.body.email,
                req.body.cellphone,
                Math.random() * 2147483647,
            ]).subscribe(
                _ => res.send({ token: generateToken(_.insertId) }),
                (err: MysqlError) => {
                    if (err.errno === 1062) res.status(406).send();
                    else throw err;
                },
            );
        else res.status(400).send();
    }

    changeSecret(req: Request, res: Response) {
        if (req.body)
            query('UPDATE users SET secret = ? WHERE id = ?', [req.body, req.params.id]).subscribe(_ => res.send());
        else res.status(400).send();
    }

    delete(req: Request, res: Response) {
        query('DELETE FROM users WHERE id = ?', req.params.id).subscribe(_ => res.send());
    }
}
export const authController = new AuthController();
