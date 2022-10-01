import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { getAllPatterns } from "../../getAllPatterns";
import { useRouter } from "next/router";
import Link from "next/link";
import { debounce } from "../../utils/debounce";
import { useEffect, useMemo, useState } from "react";

export default function ProductPage({ patterns, productName, productNames }) {
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
        <title>URLPatterns for {productName}</title>
        <meta name="description" content="URL Patterns allow you to customise the URL" />
        <meta name="keywords" content={`URL Patterns, ${productName}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="header">
        <div className="wrapper">
          <h1 className={styles.title}>URL Patterns for {productName}</h1>
          <input type="search" onChange={onInput} value={value} placeholder="Search here" className={styles.search} />
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
      {/* <div className="wrapper">
        <h2>Other products</h2>
        <div className={styles.patterns}>
          {productNames.map(({ product }) => {
            return (
              <div className={styles.patternBox} key={product}>
                <Link href={`/product/${product}`}>{product}</Link>
              </div>
            );
          })}
        </div>
      </div> */}
    </>
  );
}

export async function getStaticProps(context) {
  const patterns = await getAllPatterns();
  const productName = patterns.find(({ product }) => product.toLowerCase() === context.params.id).product;

  const productNames = patterns.reduce((acc, current) => {
    if (acc.includes(current.product)) {
      return acc;
    }
    acc.push(current.product.toLowerCase());
    return acc;
  }, []);

  return {
    props: {
      productName,
      productNames,
      patterns: patterns
        .filter(({ product }) => product.toLowerCase() === context.params.id)
        .map(({ id, title }) => ({ id, title })),
    },
  };
}

export async function getStaticPaths() {
  const patterns = await getAllPatterns();

  const productNames = patterns.reduce((acc, current) => {
    if (acc.includes(current.product)) {
      return acc;
    }
    acc.push(current.product.toLowerCase());
    return acc;
  }, []);

  return {
    paths: productNames.map((name) => {
      return {
        params: {
          id: name,
        },
      };
    }),
    fallback: false,
  };
}

// - [ ]
// - [ ]
// - [ ]
// - [ ] wikiquote
// - [ ] wiktionary
// - [ ] https://drive.google.com/drive/search?q=test
// - [ ]
// - [ ] https://www.youtube.com/c/battlebots
// - [ ] https://www.google.pl/search?q=test&tbm=isch
// - [ ] https://pixabay.com/images/search/test/?manual_search=1
// - [ ] https://aqicn.org/search/#q=gdansk
// - [ ] https://fonts.google.com/?preview.text=test&preview.text_type=custom
// - [ ] lookup book by isbn
// - [ ] https://www.zillow.com/homes/for_sale/ny/
// - [ ] https://www.zillow.com/homes/for_rent/ny/
// - [ ]
// - [ ] https://twitter.com/intent/tweet?text=Hello%20world
// - [ ] https://www.duolingo.com/profile/SzymonK
// - [ ] https://duome.eu/SzymonK
