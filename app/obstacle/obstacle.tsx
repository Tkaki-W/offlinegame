"use client"
import styles from "./obstacle.module.css";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {useRouter} from "next/navigation"

let isActive = true;
//y座標の候補を出している
const ylist = [0,20,60];

export function Obstacle(){
    const obstacleRef = useRef(null);
    const [xpositions, setxPositions] = useState<number[]>([]);
    const [ypositions, setyPositions] = useState<number[]>([]);

    const router = useRouter();
    //sleep関数を設定
    const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));

    //要素のx座標を20 msに一回20だけ動かす
    const  move_xpositions = async ()=>{  
        while(true){
            await sleep(10);
            setxPositions(prev => prev.map(x=>x-8));
        }
    }

    //要素を描画する
    const createObs = ()=>{
        return(
        <div>
            {xpositions.map((xposition_i,i) => (
                <div 
                key={i}
                className={styles.obstacle}
                style = {{
                    position:"absolute",
                    left: `${xposition_i}px  `,
                    bottom:`${ypositions[i]}px`}}
                    id = "obj"
                >
                    {ypositions[i] === 0? 
                    <img src="./picture/tree-solid-full.svg" width="50" height="50"/>:
                    <img src="./picture/cloud-bolt-solid-full.svg" width="50" height="50"/>
                    }
                </div>
            ))}
        </div>
        );
    }

    //要素のx座標をxposition配列に追加する(x=1000から始まる)
    const add_positions = async()=>{
        //x座標は端から
        const spawn_xposition = window.innerWidth;
        //y座標はランダムで決める
        const spawn_yposition = ylist[Math.floor(Math.random()*ylist.length)];
        //これで新しいx, ypositionが末尾に追加
        setxPositions(prev =>{
            const updated = [...prev, spawn_xposition];
            return updated;
        });
        setyPositions(prev =>{
            const updated = [...prev, spawn_yposition];
            return updated;
        });
    };

    //要素のx,y座標をそれぞれの配列から削除する
    const remove =()=>{
        setxPositions(prev =>{
            const updated = prev.slice(1);
            return updated;
        });
        setyPositions(prev=>{
            const updated = prev.slice(1);
            return updated;
        })
    };
    


    useEffect(()=>{
        move_xpositions();
    },[]);

    useEffect(()=>{
            //はみ出た分は取り除く
        if(xpositions[0] <= -0.1){
            remove();
        }
        });

    useEffect(() => {
    (async () => {
        while (isActive) {
            const delay = Math.floor(Math.random() * 1000+ Math.random()*1000) ; // 1〜3秒
            await sleep(delay);
            if (!isActive) break;
            add_positions();
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
