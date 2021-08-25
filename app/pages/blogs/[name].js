import GenericFeed from '../../components/GenericFeed';
import Sources from '../../public/sources.json'
import { getJson, getPaths } from '../../lib/feedpage';

export default function Blogs({ data }) {
  return (
    <>
      <GenericFeed data={data} />
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      data: await getJson(Sources.blogs, context)
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: getPaths(Sources.blogs),
    fallback: false
  }
}