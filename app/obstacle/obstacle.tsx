"use client"
import styles from "./obstacle.module.css";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {useRouter} from "next/navigation"

 let isActive = true;

export function Obstacle(){
    const obstacleRef = useRef(null);
    const [xpositions, setPositions] = useState<number[]>([]);
    const router = useRouter();
    //sleep関数を設定
    const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));

    //要素のx座標を20 msに一回20だけ動かす
    const  move_xpositions = async ()=>{  
        await sleep(20);
        setPositions(prev => prev.map(x=>x-20));
    }

    //要素を描画する
    const createObs = ()=>{
        return(
        <div>
            {xpositions.map((xpositions, i) => (
                <div 
                key={i}
                className={styles.obstacle}
                style = {{
                    position:"absolute",
                    left: `${xpositions}px  `,
                    bottom:"0"}}
                    id = "obj"
                ></div>
            ))}
        </div>
        );
    }

    //要素のx座標をxposition配列に追加する(x=1000から始まる)
    const add_xpositions = async()=>{
        const spawn_xposition = window.innerWidth;
        console.log(xpositions)
        //これで新しいxpositionが末尾に追加
        setPositions(prev =>{
            const updated = [...prev, spawn_xposition];
            return updated;
        }
        );
    };

    //要素のx座標をxposition配列から削除する
    const rem_xpositions =()=>{
        console.log(xpositions)
        setPositions(prev =>{
            const updated = prev.slice(1);
            return updated;
        }
        );
    };
    


    useEffect(()=>{
        move_xpositions();
    });

    useEffect(()=>{
            //はみ出た分は取り除く
        if(xpositions[0] <= -0.1){
            rem_xpositions();
        }
        });

    useEffect(() => {
    (async () => {
        while (isActive) {
            const delay = Math.floor(Math.random() * 2000) ; // 1〜3秒
            await sleep(delay);
            if (!isActive) break;
            add_xpositions();
        }
    })();
    return () => {
        isActive = false; // アンマウント時にループ終了
    };
    }, []);


    return(
        <div> 
            {createObs()}
        </div>
    );

}
