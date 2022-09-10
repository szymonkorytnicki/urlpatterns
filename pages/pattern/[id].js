import Head from "next/head";
import { getAllPatterns } from "../../getAllPatterns";
import styles from "../../styles/Home.module.css";
import * as DropdownMenu from "../../dropdown/Dropdown";
import { FaClipboard, FaNodeJs, FaHatCowboy } from "react-icons/fa";

import Link from "next/link";
import { useState } from "react";
export default function Pattern({ title, id, tags, url, description, productPatterns }) {
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
      <div className="wrapper">
        <h2>Other patterns from this product</h2>

        <div className={styles.patterns}>
          {productPatterns.slice(0, 50).map((pattern) => {
            return (
              <div className={styles.patternBox} key={pattern.id}>
                <Link href={`/pattern/${pattern.id}`}>{pattern.title}</Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function URLPattern({ url }) {
  return (
    <div className={styles.urlpattern}>
      <input type="text" value={url} readOnly className={styles.urlpatternInput} />
      <CopyButton url={url} />
    </div>
  );
}

function CopyButton({ url }) {
  const [copyValue, setCopyValue] = useState("Copy");
  function onCopy() {
    setCopyValue("Copied!");
    setTimeout(() => {
      setCopyValue("Copy");
    }, 1500);
  }
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <FaClipboard />
        {copyValue}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <DropdownMenu.Label>Choose an option</DropdownMenu.Label>
          <DropdownMenu.Item
            onClick={() => {
              onCopy();
              navigator.clipboard.writeText(url);
            }}
          >
            <FaClipboard />
            <DropdownMenu.ItemContent>Copy</DropdownMenu.ItemContent>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => {
              onCopy();
              navigator.clipboard.writeText("`" + url + "`");
            }}
          >
            <FaNodeJs />
            <DropdownMenu.ItemContent>Copy as template string</DropdownMenu.ItemContent>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => {
              onCopy();
              navigator.clipboard.writeText(url.replaceAll("$", ""));
            }}
          >
            <FaHatCowboy />
            <DropdownMenu.ItemContent>Copy for Alfred</DropdownMenu.ItemContent>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
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
  const productPatterns = patterns.filter(({ product }) => product === pattern.product);

  return {
    // Passed to the page component as props
    props: { ...pattern, productPatterns },
  };
}
