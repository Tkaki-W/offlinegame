"use client";
import{getBestScore} from "./sql";
import { useEffect, useState } from "react";

export function Bestscore() {
  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
    const score = await getBestScore();
      setBestScore(score);
    })();
  }, []);

  return <div>The Best score is {bestScore}</div>;
}
