import mysql, { MysqlError, FieldInfo, Connection, Pool } from 'mysql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const create_users =
    'CREATE TABLE IF NOT EXISTS users (\
id INT UNSIGNED NOT NULL AUTO_INCREMENT,\
name VARCHAR(45) NOT NULL,\
user VARCHAR(45) NOT NULL,\
secret VARCHAR(45) NOT NULL,\
email VARCHAR(45) NULL,\
cellphone VARCHAR(45) NULL,\
PRIMARY KEY (id),\
UNIQUE INDEX user_UNIQUE (user ASC) VISIBLE);';

const create_rankings =
    'CREATE TABLE IF NOT EXISTS rankings (\
id INT UNSIGNED NOT NULL AUTO_INCREMENT,\
user INT UNSIGNED NOT NULL,\
score INT UNSIGNED NOT NULL DEFAULT 0,\
category MEDIUMINT NOT NULL,\
PRIMARY KEY (id),\
INDEX user_fk_idx (user ASC) VISIBLE,\
CONSTRAINT user_fk\
  FOREIGN KEY (user)\
  REFERENCES users (id)\
  ON DELETE NO ACTION\
  ON UPDATE NO ACTION);';

const create_rankings_view = `\
CREATE VIEW rankings_view AS \
    SELECT\
        users.id, \
        users.name, \
        rankings.score, \
        rankings.category\
    FROM rankings\
        INNER JOIN users ON rankings.user = users.id;`;

let pool: Pool;

export function init() {
    pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
    });

    pool.getConnection((err, conn) => {
        if (err) throw err;
        _query(conn, create_users).subscribe();
        _query(conn, create_rankings).subscribe();
        // _query(conn, create_rankings_view).subscribe(); Not allowed in database
        pool.releaseConnection(conn);
        console.log('Successfully connected to MySQL Database');
    });
}

interface ResultSet {
    results?: any;
    fields?: FieldInfo[];
}

function _query(conn: Connection | Pool, query: string, values?: any): Observable<ResultSet> {
    return new Observable(observer => {
        conn.query(query, values, (err: MysqlError, results?: any, fields?: FieldInfo[]) => {
            if (err) observer.error(err);
            else observer.next({ results, fields });
            observer.complete();
        });
    });
}

export function queryFields(query: string, values?: any): Observable<ResultSet> {
    return _query(pool, query, values);
}

function query(query: string, values?: any): Observable<any> {
    return queryFields(query, values).pipe(map(res => res.results));
}

export default query;
