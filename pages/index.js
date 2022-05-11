import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Fun with GPT-3
        </h1>

        <form className={styles.form} action="api/gpt3" method="post">
          <h3 type="prompt_text">Enter prompt</h3>
          <textarea contentEditable={true} placeholder="Enter your prompt..." type="text" id="prompt" name="prompt" size="50" required />
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  )
}
