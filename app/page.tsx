"use client"
import { useState, useEffect } from 'react';
import style from "./page.module.css";
import styles from "./obstacle/obstacle.module.css"
import {Character} from "./character/character";
import {Obstacle} from "./obstacle/obstacle";
import {Floor} from "./floor/floor";

let isActive = true;
let gameover = false;

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
  const [isGameOver, setIsGameOver] = useState(false);

useEffect(()=>{
  console.log(isGameOver);
  check();
  gameover = check();
  setIsGameOver(gameover);
},[]);

/*  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);
*/

console.log("はーい");

if(gameover == true){
  return (
    <div></div>
  )
}else{
  return(
        <div>
      <div className ={style.game_box}>
        <div className ={style.display}>
          <Character/>
          <Obstacle/>
        </div>
          <Floor/>
      </div>
    </div>
  );
}
  
}

export function Active(){
  isActive = !check();
  return{
    isActive
  };
};