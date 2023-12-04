import mysql from 'mysql';

const db = mysql({
  host: 'db',
  port: 3306,
  database: 'fweb',
  user: 'root',
  password: 'lemart0302',
});

export default async function excuteQuery({ query, values }) {
  
  try {
    const results = await db.query(query, values);
    await db.end();

    const plainResults = results.map(result => {
        return Object.assign({}, result);
    });

    return plainResults;
  } catch (error) {
    return { error };
  }
}