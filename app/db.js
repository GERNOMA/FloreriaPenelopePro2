import mysql from 'mysql';

const db = mysql.createConnection({
  host: 'db',
  port: 3306,
  database: 'fweb',
  user: 'root',
  password: 'lemart0302',
});

export default async function excuteQuery({ query, values }) {
  
  try {
    let results = await new Promise(function(resolve, reject) {
      db.query(query, values, function (err, rows, fields) {
        if (err) {
            return reject(err);
        }
        resolve(rows);
      });
    });

    const plainResults = results.map(result => {
        return Object.assign({}, result);
    });

    return plainResults;
  } catch (error) {
    return { error };
  }
  
}