"use server"
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';


 export async function addScore(value: number){
  //const sql = neon("postgresql://neondb_owner:npg_buNMyjg9GeA5@ep-broad-lake-a1vqps40-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
  const sql = neon(process.env.DATABASE_URL);
  await sql`INSERT INTO scores (score) VALUES (${value});`;
}

export async function getBestScore(){
  //const sql = neon("postgresql://neondb_owner:npg_buNMyjg9GeA5@ep-broad-lake-a1vqps40-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
   const sql = neon(process.env.DATABASE_URL);
  const rows = await sql`SELECT MAX(score) AS max_score FROM scores;`;
  const bestScore = rows[0]?.max_score; // 最大値を変数に代入
  return bestScore;
}
