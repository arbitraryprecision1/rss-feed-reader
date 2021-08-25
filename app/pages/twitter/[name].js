import GenericFeed from '../../components/GenericFeed';
import Sources from '../../public/sources.json'
import { getJson, getPaths } from '../../lib/feedpage';

export default function Twitter({ data }) {
  return (
    <>
      <GenericFeed data={data} />
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      data: await getJson(Sources.twitter, context)
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: getPaths(Sources.twitter),
    fallback: false
  }
}