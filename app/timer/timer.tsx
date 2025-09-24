"use client"

import {useEffect, useState} from "react";
import {addScore} from "../sql/sql";

let add_checker = 0;

type TimerProps = {
    gameover: boolean;
};

export function Timer({gameover}: TimerProps){
    const [timer, setTimer] = useState(0);
        //sleep関数を設定
    const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));
    useEffect(() => {
        (async () => {
            if(gameover){
                if(add_checker == 0){
                    add_checker = 1;
                    addScore(timer);
                }
            }else{
                await sleep(1000);
                if(add_checker == 0){
                await setTimer(prev=>{
                    const next = prev + 1;
                    return next;
                });
            }
            }
        })();
    },);
    return(
        <div>
            <h1 style={{textAlign:"center",
                        border:"1px solid black",
                        background:"gray"
            }}>Click the Screen to Junp</h1>
            <h4>your score is {timer}</h4>
        </div>
    )
}