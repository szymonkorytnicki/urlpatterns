import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getAllPatterns } from "../getAllPatterns";
import { useRouter } from "next/router";
import Link from "next/link";
import { debounce } from "../utils/debounce";
import { useEffect, useMemo, useState } from "react";
import { FaGithub, FaGoogle, FaJira } from "react-icons/fa";

export default function Home({ patterns, products }) {
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
        <meta name="description" content="URL Patterns allow you to customise the URL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="header">
        <div className="wrapper">
          <h1 className={styles.title}>URL Patterns</h1>
          <input type="search" onChange={onInput} value={value} placeholder="Search here" className={styles.search} />
          <div className={styles.description}>
            Supercharge your productivity using shortcuts for popular services. <br />
            {patterns.length} patterns available. Try <FaJira />
            <Link href="/?search=Jira">Jira</Link>, <FaGithub /> <Link href="/?search=GitHub">GitHub</Link>,{" "}
            <FaGoogle />
            <Link href="/?search=Google">Google</Link>
          </div>
        </div>
      </header>

      <div className="wrapper">
        <div className="sponsoredby">
          URLPatterns is sponsored by{" "}
          <a href="https://marketplace.atlassian.com/apps/1228725/interesting-links?tab=overview&hosting=cloud">
            Project Bookmarks for Jira
          </a>
          . <br />
          Boost productivity of your team with configurable, dynamic bookmarks!
        </div>
      </div>

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
      <div className="wrapper">
        <div className={styles.patterns}>
          {/** TODO more semantic class*/}
          {products.map((product) => {
            return (
              <div className={styles.productBox} key={product}>
                <Link href={`/product/${product.toLowerCase()}`}>{product}</Link>
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
      products: Array.from(
        patterns.reduce((acc, pattern) => {
          acc.add(pattern.product);
          return acc;
        }, new Set())
      ),
    },
  };
}
