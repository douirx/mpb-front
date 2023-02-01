import Link from "next/link";
import styles from './header.module.css'
import { Menu, Button, Text } from '@mantine/core';
import { IconMenu2 } from '@tabler/icons-react';

export default function Header () {
    return (
        <>
            <div className={styles.correct}>
                <div className={styles.container}>
                    <div className={styles.item1}>
                        <h1>
                            <Link href="/">MonPetitBet</Link>
                        </h1>
                    </div>

                    <div className={styles.item2}>
                        <div className={styles.menu1}>
                        <Menu>
                            <Menu.Target>
                                <Button variant="light">Bookmakers</Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item ><Link href="/blog">Betclic</Link></Menu.Item>
                                <Menu.Item ><Link href="/blog">Winamax</Link></Menu.Item>
                                <Menu.Item><Link href="/blog">Unibet</Link></Menu.Item>
                                <Menu.Divider />
                            </Menu.Dropdown>
                        </Menu>
            </div>
                        <div className={styles.menu2}>
                        <Menu>
                            <Menu.Target>
                                <Button variant="light">Débutants</Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item ><Link href="/blog">Les Paris Sportifs</Link></Menu.Item>
                                <Menu.Item ><Link href="/blog">Les Côtes</Link></Menu.Item>
                                <Menu.Divider />
                            </Menu.Dropdown>
                        </Menu>
                    </div>
                    </div>
                    <div className={styles.item3}>
                        <Link href="/"><IconMenu2 size={35} stroke={1.5} /></Link>
                    </div>
                </div>
            </div>
        </>

    )
}