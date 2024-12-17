import React from "react";
import styles from "../styles/Header.module.css"

function Header(){
    return (
        <>
        <div className={styles.header}>
            <div className={styles.header_space1}>
                <img src ="https://media.istockphoto.com/id/671182996/vector/two-tickets-line-art-outline-tickets-icon-vector.jpg?s=612x612&w=0&k=20&c=6BclkDXbZ5JzOU8hKG1Z4IDNcF7_kHHC4R5EcORM8Zk=" height="100%" alt="TradeMyTicket logo" />
                <h1 id={styles.logo}>TradeMyTicket</h1>
            </div>
            <div className={styles.header_space2}>
                <p>Explore</p>
                <p>How it works!</p>
                <p>Contact Us</p>
            </div>
            <div className={styles.header_space3}>
                <button className={styles.sell_button}>sell</button>
                <p>Sign/Register</p>
            </div>
         
        </div>
        
        </>
    );
}


export default Header;