import styles from "./game_over.module.css"

//ゲームオーバーの画面を出力する
export function Gameover(){
    return(
        <div>
            <h1 className={styles.font}>
            Game Over
            </h1>
        </div>
    );
}