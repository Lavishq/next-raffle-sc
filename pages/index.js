import Head from "next/head"
import Image from "next/image"
// import Header from "../components/ManualHeader"
import Header from "../components/Header"
import styles from "../styles/Home.module.css"
import RaffleEntrance from "../components/RaffleEntrance"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Raffle App</title>
                <meta
                    name="description"
                    content="Raffle app userinterface to interact with raffle smartcontract"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <RaffleEntrance />
        </div>
    )
}
