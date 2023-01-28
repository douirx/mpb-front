import Link from "next/link";

export default function Footer(){

    const handleMaito = () => {
        let email:string="contact@monpetitbet.fr"
        // @ts-ignore
        return window.location = 'mailto:'+ email;
    }

    // @ts-ignore
    return (
        <>
            <button onClick={handleMaito}>Contactez-nous</button>
            <Link href="/mentions-legales">Mentions-Légales</Link>
        <h3> MonPetitBet 2020-2023</h3>

        </>
    )
}