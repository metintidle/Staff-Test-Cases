import Image from 'next/image'
import styles from './page.module.css'
import FirstStep from './pages/FirstStep';

export default function Home() {
  return (
    <main className={styles.main}>
      <FirstStep></FirstStep>
    </main>
  )
}
