import Head from "next/head";
import { getAllPatterns } from "../../getAllPatterns";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
export default function Pattern({ title, id, tags, url, description }) {
  return (
    <div>
      <Head>
        <title>URLPatterns</title>
        <meta name="description" content="URL Patterns" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="header">
        <GoBackButton />
        <div className="wrapper">
          <h1 className={styles.title}>{title}</h1>
          <URLPattern url={url} />
        </div>
      </header>
      <div className="wrapper">
        <p>{description}</p>
      </div>
    </div>
  );
}

function URLPattern({ url }) {
  return (
    <div styles={styles.urlpattern}>
      <input type="text" value={url} readOnly />
    </div>
  );
}

function GoBackButton() {
  return (
    <Link href="/">
      <div className={styles.goBack}>Go back</div>
    </Link>
  );
}

export async function getStaticPaths() {
  const patterns = await getAllPatterns();

  return {
    paths: patterns.map((pattern) => {
      return {
        params: {
          id: pattern.id,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const patterns = await getAllPatterns();
  const pattern = patterns.find(({ id }) => id === context.params.id);

  return {
    // Passed to the page component as props
    props: { ...pattern },
  };
}
