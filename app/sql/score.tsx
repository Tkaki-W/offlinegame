"use client";
import{getBestScore} from "./sql";
import { useEffect, useState } from "react";


export function Bestscore() {
  //bestScoreという変数と、setBestScoreというbestScoreを変更する関数を設定。
  const [bestScore, setBestScore] = useState<number | null>(null);

  //ベストスコアを設定して、bestScoreの変数を変更する。
  useEffect(() => {
    (async () => {
    const score = await getBestScore();
      setBestScore(score);
    })();
  }, []);

  //画面に出力
  return <div>The Best score is {bestScore}</div>;
}
