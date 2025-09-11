import styles from "./game_over.module.css"
import {Active} from "/app/page";


export default function  Gameover(){
    return(
        <div>
            <h1 className={styles.font}
                styles ={{
                    position: "absolute",
                    zIndex:1
                }}>
            Game Over
            </h1>
        </div>
    );
}