"use client"
import styles from "./character.module.css";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {Active} from "/app/page";

export function Character(){
    //useRefフックを使ってDOM(ページ内の設計図)に、アニメーションの部分があることを先におしえる
    const characterRef = useRef(null);
    const isJumping = useRef(false);


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
    


    useEffect(()=>{
        const isActive = Active().isActive;
        window.addEventListener("keydown", (e)=>{
            if(e.code === "Space"){
                jump();
        }});
        if(isActive){
            console.log("active")
        }
    })
    return(
    <div>
        <div ref={characterRef} className = {styles.character} id = "chara">
        </div>
    </div>
    );
}