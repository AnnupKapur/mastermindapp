import Head from 'next/head'
import Image from 'next/image'
import HomeIntro from '../components/HomeIntro'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mastermind Game</title>
        {/* <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className={styles.main}>
        <HomeIntro />
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
