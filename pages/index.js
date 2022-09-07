import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getAllPatterns } from "../getAllPatterns";
export default function Home({ patterns }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>URLPatterns</title>
        <meta name="description" content="URL Patterns" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      general kenobi
      {patterns.map((pattern) => {
        return (
          <div key={pattern.id}>
            <a href={`/pattern/${pattern.id}`}>{pattern.title}</a>
          </div>
        );
      })}
    </div>
  );
}

export async function getStaticProps() {
  const patterns = await getAllPatterns();
  return {
    props: {
      patterns: patterns.map(({ id, title }) => ({ id, title })),
    },
  };
}
