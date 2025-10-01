"use server"
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

//データベースにアクセスして、スコアを追加する。
 export async function addScore(value: number){
  if(!process.env.DATABASE_URL){
    throw new Error("database is not exist");
  }
  const sql = neon(process.env.DATABASE_URL);
  await sql`INSERT INTO scores (score) VALUES (${value});`;
}

//データベースにアクセスして、スコアを得る。
export async function getBestScore(){
  if(!process.env.DATABASE_URL){
    throw new Error("database is not exist");
  }
  const sql = neon(process.env.DATABASE_URL);
  const rows = await sql`SELECT MAX(score) AS max_score FROM scores;`;
  const bestScore = rows[0]?.max_score; // 最大値を変数に代入
  return bestScore;
}
