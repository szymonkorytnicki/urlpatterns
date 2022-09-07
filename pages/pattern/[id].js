import Head from "next/head";
import { getAllPatterns } from "../../getAllPatterns";
export default function Pattern({ title, id, tags, url, description }) {
  return (
    <div>
      <Head>
        <title>URLPatterns</title>
        <meta name="description" content="URL Patterns" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{title}</h1>
      <h2>{description}</h2>
      <div>{url}</div>
    </div>
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
