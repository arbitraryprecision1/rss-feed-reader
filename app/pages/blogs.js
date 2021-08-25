import { useEffect, useState } from 'react';
import GenericFeed from '../components/GenericFeed';
import { Button } from 'react-bootstrap';
import Layout from '../components/Layout'

export default function threeb() {
  const [data, setData] = useState({title: 'loading', items: [{author: {name: "loading"}}]});
  const [uri, setURI] = useState('https://mathwithbaddrawings.com/feed');


  async function getJson() {
    await fetch(
      'http://localhost:3000/?action=display&bridge=FeedExpanderBridge&feeduri='+encodeURI(uri)+'&format=Json'
    )
    .then(r => r.json())
    .then(d => setData(d))
    .catch(err => err.toString())
  }

  useEffect(() => getJson());

  const p = (
    <div>
      <GenericFeed data={data} />
      <Button onClick={() => {setURI("https://www.math3ma.com/blog/rss.xml"); getJson()}}></Button>
    </div>
  );

  return (
    <Layout mainComponent={p} />
  );
}