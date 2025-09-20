"use client"
import { useState, useEffect } from 'react';
import style from "./page.module.css";
import styles from "./obstacle/obstacle.module.css"
import {Character} from "./character/page";
import {Obstacle} from "./obstacle/page";
import {Floor} from "./floor/page";
import {Gameover} from "./game_over/page";
import {Timer} from "./timer/page";
import {Bestscore} from "./sql/page"

let isActive = true;
let save_gameover = false;
let content;

const check = ()=>{
  if(typeof window !== 'undefined'){
  const elm1 = document.getElementsByClassName(styles.obstacle);
  const elm2 = document.getElementById("chara");
  if(!elm1[0] || !elm2) return false;
  const d1 = elm1[0].getBoundingClientRect();
  const d2 = elm2.getBoundingClientRect();
  return !(
      d1.top > d2.bottom ||
      d1.right < d2.left ||
      d1.bottom < d2.top ||
      d1.left > d2.right
  )
}};

export default function Home() {
  const [message, setMessage] = useState('');
  const [gameover , setGameOver] = useState(false);
    //sleep関数を設定
  const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));
/*  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);
*/

  console.log("Now is "+gameover);

  useEffect(() => {
    (async () => {
      if(!save_gameover){
        while (!save_gameover) {
            await sleep(10);
            save_gameover = check();
            await setGameOver(save_gameover); 
            if (save_gameover) break;
        }
    }})();
  }, []);


  if(!gameover){
      content =(
      <div>
        <div className ={style.game_box}>
          <div className ={style.display}>
            <Character/>
            <Obstacle/>
          </div>
            <Floor/>
        </div>
      </div>
  )}else{
    content =( 
    <div>
      <Gameover/>
      <Bestscore/>
    </div>
  )}


  return(
    <div>
    <Timer gameover = {gameover}/>
    {content}
    </div>
  )
}

export function Active(){
  isActive = !check();
  return{
    isActive
  };
};