import Link from "next/link";

export default function Header () {
    return (
        <>
            <h1> <Link href="/">MonPetitBet</Link></h1>
            <ul>
                <li>
                    <Link href="/blog">Bookmakers</Link>
                </li>
                <li>
                    <Link href="/blog">Débutants</Link>
                </li>
            </ul>
        </>

    )
}