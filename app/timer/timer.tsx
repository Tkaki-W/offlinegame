"use client"

import {useEffect, useState} from "react";
import {addScore} from "../sql/sql";

let add_checker = 0;

export function Timer({gameover}: boolean){
    const [timer, setTimer] = useState(0);
        //sleep関数を設定
    const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));
    useEffect(() => {
        (async () => {
            if(gameover){
                console.log("ブレーク");
                if(add_checker == 0){
                    add_checker = 1;
                    addScore(timer);
                    console.log(timer);
                }
            }else{
                await sleep(1000);
                if(add_checker == 0){
                await setTimer(prev=>{
                    const next = prev + 1;
                    return next;
                });
                console.log("ブレークしていない")
            }
            }
        })();
    },);
    return(
        <div>
            <h1>your score is {timer}</h1>
        </div>
    )
}