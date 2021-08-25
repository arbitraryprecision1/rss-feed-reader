import { useEffect, useState } from 'react';
import GenericFeed from '../../components/GenericFeed';
import { Button } from 'react-bootstrap';
import Sources from '../../public/sources.json'
import useRouter from 'next/router'

export default function Blogs({ data }) {
  return (
    <>
      <GenericFeed data={data} />
    </>
  );
}

export async function getStaticProps(context) {
  // get info for given name from sources
  const uriparams = Sources.blogs.filter(x => x.name === context.params.name)[0].params

  // make the uri from params
  const uri = Object
    .entries(uriparams)
    .map(p => encodeURIComponent(p[0])+"="+encodeURIComponent(p[1]))
    .reduce((accum, cur) => accum+cur+"&", "http://rss-bridge:80/?")

  const data = await fetch(uri.slice(0,-1))
    .then(r => r.json())

  return {
    props: {
      data: data
    }
  }
}

export async function getStaticPaths() {
  // all names from the json to pre render pages for
  const allnames = Sources.blogs.map(x => {return { params: { name: x.name } }})

  return {
    paths: allnames,
    fallback: false
  }
}