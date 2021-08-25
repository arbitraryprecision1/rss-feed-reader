import GenericFeed from '../../components/GenericFeed';
import Sources from '../../public/sources.json'
import { getJson, getPaths } from '../../lib/feedpage';

export default function Hn({ data }) {
  return (
    <>
      <GenericFeed data={data} />
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      data: await getJson(Sources.hackernews, context)
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: getPaths(Sources.hackernews),
    fallback: false
  }
}