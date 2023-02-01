import Link from "next/link";
import styles from '@/components/footer.module.css'
import { Button } from '@mantine/core';

export default function Footer(){

    const handleMaito = () => {
        let email:string="contact@monpetitbet.fr"
        // @ts-ignore
        return window.location = 'mailto:'+ email;
    }

    return (
        <>
            <div className={styles.correct}>
                <div className={styles.container}>
                    <div className={styles.item1}>
                        <div className={styles.url1}>
                        <Button variant="light" onClick={handleMaito}>Contactez-nous</Button>
                    </div>
                        <Link href="/mentions-legales"><Button variant="light">Mentions-Légales</Button></Link>
                    </div>
                    <div className={styles.item2}>

                        <h3>MonPetitBet</h3>
                        <h3>2020-2023</h3>

                    </div>


                </div>
            </div>



        </>
    )
}