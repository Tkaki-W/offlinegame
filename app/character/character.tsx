"use client"
import styles from "./character.module.css";
import {gsap} from "gsap";
import {useRef, useEffect} from "react";

export function Character(){
    //useRefフックを使ってDOM(ページ内の設計図)に、アニメーションの部分があることを先におしえる
    //とりあえず先に動く要素を宣言している感じです。
    const characterRef = useRef(null);
    const isJumping = useRef(false);

    //ジャンプにおいてcharacterがジャンプ中ならそのまんま。ジャンプしていないなら一回150 pxだけ上に移動して戻る。
    const jump = ()=>{
        if(isJumping.current == true){
            return;
        }
        isJumping.current = true;
         gsap.to(characterRef.current, {
            y: -150,
            duration:0.3,
            ease: "power2.out",
            yoyo:true,
            repeat:1,  
            onComplete:()=>{
                isJumping.current = false;
            }
        });
    }
    

    //clickを検知して、ジャンプをする。
    useEffect(()=>{
        window.addEventListener("click", ()=>{
                jump();
        });
    })

    //キャラクターとして画面を出力
    return(
    <div ref={characterRef} className = {styles.character} id = "chara">
        <img src="./picture/dog-solid-full.svg"  height="30" width="30px"/>
    </div>
    );
}