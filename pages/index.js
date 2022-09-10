import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getAllPatterns } from "../getAllPatterns";
import { useRouter } from "next/router";
import Link from "next/link";
import { debounce } from "../utils/debounce";
import { useEffect, useMemo, useState } from "react";
import { FaGithub, FaGoogle, FaJira } from "react-icons/fa";

export default function Home({ patterns }) {
  const { query, push } = useRouter();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(query?.search || "");
  }, [query]);

  function onInput(event) {
    const url = new URL(window.location.href);
    if (event.target.value) {
      url.searchParams.set("search", event.target.value);
    } else {
      url.searchParams.delete("search");
    }
    setValue(event.target.value);
    debounceSetQuery(url);
  }

  const debounceSetQuery = useMemo(() => debounce(push, 300), []);

  const foundPatterns = patterns.filter(({ title }) => {
    if (!query?.search) {
      return true;
    }
    return title.toLowerCase().includes(query.search?.toLowerCase());
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
          <input type="search" onChange={onInput} value={value} placeholder="Search here" className={styles.search} />
          <div className={styles.description}>
            {patterns.length} patterns available, including products like <FaJira />
            <Link href="/?search=Jira">Jira</Link>, <FaGithub /> <Link href="/?search=GitHub">GitHub</Link>,{" "}
            <FaGoogle />
            <Link href="/?search=Google">Google</Link>
          </div>
        </div>
      </header>

      <div className="wrapper">
        <div className={styles.patterns}>
          {foundPatterns.slice(0, 50).map((pattern) => {
            return (
              <div className={styles.patternBox} key={pattern.id}>
                <Link href={`/pattern/${pattern.id}`}>{pattern.title}</Link>
              </div>
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
