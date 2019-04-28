import { Response, Request } from 'express';
import { writeFile, unlink } from 'fs';
import { ensureDirSync } from 'fs-extra';

class StorageController {
  save(req: Request, res: Response) {
    if (!req.body) return res.status(400).send();

    let path = `${process.env.STORAGE}/${req.params.id}/${req.body.name}`;
    path = path.substr(path.lastIndexOf('/'));
    ensureDirSync(path);
    writeFile(`${process.env.STORAGE}/${req.params.id}/${req.params.file}`, req.body, err => {
      if (err) res.status(500);
      res.send();
    });
  }

  delete(req: Request, res: Response) {
    unlink(`${process.env.STORAGE}/${req.params.id}/${req.params.file}`, err => {
      if (err) res.status(500);
      res.send();
    });
  }
}
export const storageController = new StorageController();
