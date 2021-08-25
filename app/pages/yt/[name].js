import GenericFeed from '../../components/GenericFeed';
import Sources from '../../public/sources.json'
import { getJson, getPaths } from '../../lib/feedpage';

export default function Youtube({ data }) {
  return (
    <>
      <GenericFeed data={data} />
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      data: await getJson(Sources.youtube, context)
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: getPaths(Sources.youtube),
    fallback: false
  }
}