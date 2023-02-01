import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Aside from "@/components/aside"
import styles from "@/pages/home/home.module.css"

export default function Home (){
    return (
        <>
            <Header />
            <div className={styles.correct}>
                <div className={styles.container}>
                    <Aside />
                    <div className={styles.corpus}>
                        <h1>Bienvenue sur MonPetitBet</h1>
                        <p>Découvrez sur notre site l'ensemble des offres promotionelles des Bookmakers agrées par l'ARJEL.</p>
                        <p>Dans la section débutant, vous trouverez quelques articles pour vous aider à comprendre, sur quoi portent les offres.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}