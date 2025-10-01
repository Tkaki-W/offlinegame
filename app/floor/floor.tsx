import styles from "./floor.module.css"
//要素の下に線を引くことにより床として見立てている
export function Floor(){
    return(
            <div className={styles.line}>
            </div>
    );
}