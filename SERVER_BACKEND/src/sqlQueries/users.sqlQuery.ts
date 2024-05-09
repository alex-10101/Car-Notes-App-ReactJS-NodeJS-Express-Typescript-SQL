import { pool } from "../config/postgreSQL.config";

/**
 * SQL query which deletes the user with the given id from the database
 * @param userId
 */
export async function deleteUserDB(userId: string): Promise<void> {
  const sqlQuery = 'DELETE FROM "users" WHERE "userId" = $1';
  await pool.query(sqlQuery, [userId]);
}

/**
 * SQL query that changes/updates the password of the user with the given id
 * @param refreshTokens
 * @param userId
 */
export async function resetPasswordDB(
  password: string,
  userId: string
): Promise<void> {
  const sqlQuery = 'UPDATE "users" SET "password" = $1 WHERE "userId" = $2';
  await pool.query(sqlQuery, [password, userId]);
}
