import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getAllPatterns } from "../getAllPatterns";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
export default function Home({ patterns }) {
  const router = useRouter();

  function onSubmit(event) {
    event.preventDefault();

    const url = new URL(window.location);
    url.searchParams.set("search", event.target[0].value);

    router.push(url);
  }

  const foundPatterns = patterns.filter(({ title }) => {
    if (!router.query.search) {
      return true;
    }
    return title.toLowerCase().includes(router.query.search?.toLowerCase());
  });

  return (
    <>
      <Head>
        <title>URLPatterns</title>
        <meta name="description" content="URL Patterns" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="header">
        <div className="wrapper">
          <h1 className={styles.title}>URL Patterns</h1>
          <form onSubmit={onSubmit}>
            <input type="search" placeholder="Search here" className={styles.search} />
            <button>Search</button>
          </form>
        </div>
      </header>

      <div className="wrapper">
        {foundPatterns.length} patterns available
        <div className={styles.patterns}>
          {foundPatterns.slice(0, 50).map((pattern) => {
            return (
              <Link href={`/pattern/${pattern.id}`} className={styles.patternBox} key={pattern.id}>
                {pattern.title}
              </Link>
            );
          })}
        </div>
      </div>
    </>
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
