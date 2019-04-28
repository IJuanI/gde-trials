import { verify, VerifyErrors, sign } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function generateToken(id: number): string {
    return sign({ id }, process.env.SECRET_KEY, { expiresIn: 86400 });
}

function requireToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-access-token'] as string;
    if (!token) return res.status(403).send();
    verify(token, process.env.SECRET_KEY, (err: VerifyErrors, decoded: any) => {
        if (err) return res.status(500).send();
        req.params.id = decoded.id;
        next();
    });
}

export default requireToken;
