import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react';
import Card from '../components/Card';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


function Home() {
  const [results, setResults] = React.useState({text: ''});
  const [isLoading, setIsLoading] = React.useState(false);
  const [cardList, setCardList] = React.useState([]);
  const [id, setId] = React.useState(0);
  const [gptParams, setGptParams] = React.useState({
    prompt: '',
    maxTokens: 50,
  });

  const updateGPTParams = e => setGptParams({...gptParams, [e.target.name]: e.target.value});

  useEffect(() => {
    const fetchData = async () => {
      if(gptParams.prompt){
        setIsLoading(true);
        const res = await fetch("/api/gpt3", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
          },
          body: JSON.stringify({
            prompt: gptParams.prompt,
            maxTokens: parseInt(gptParams.maxTokens),
          }),
        });
        const data = await res.json();
        setResults(data);
        setIsLoading(false);
      }};

    fetchData();
  }, [gptParams.prompt]);

  function handleSubmit(e) {
    e.preventDefault();
    setCardList(cardList.concat([[id, gptParams.prompt, results.text]]));
    setId(id + 1);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>GPT-3</title>
        <meta name="description" content="GPT-3 Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Fun with GPT-3
        </h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 type="prompt_text">Enter prompt</h3>
          <textarea 
              contentEditable={true}
              onChange={updateGPTParams}
              value={gptParams.prompt}
              suppressContentEditableWarning={true}
              placeholder="Enter your prompt..." 
              type="text" id="prompt" name="prompt" 
              size="50" required />
          <h3 type="prompt_text">Select maximum number of tokens</h3>
          <select className={styles.selectTokens} name="maxTokens" value={gptParams.maxTokens} onChange={updateGPTParams}>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="500">500</option>
          </select>
          <br></br>
          <button type="submit">Submit</button>
        </form>

        {cardList.length > 0 ? (
          <div className={styles.cardList}>
            <h2 className={styles.cardListTitle}>Responses</h2>
            {cardList.map((card) =>(
              <Card key={card[0]} prompt={card[1]} answer={card[2]} />
            )).reverse()}
          </div>) : (<div><h2 className={styles.cardListTitle}>No prompts generated yet</h2></div>)}
      </main>
    </div>
  )
}

export default Home;