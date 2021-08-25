import { useEffect, useState } from 'react';
import GenericFeed from '../components/GenericFeed';
import Layout from '../components/Layout'

export default function Twitter() {
  const [data, setData] = useState({title: 'loading', items: [{author: {name: "loading"}}]});

  async function getJson() {
    await fetch(
      'http://localhost:3000/?action=display&bridge=Twitter&context=By+username&u=3blue1brown&format=Json'
    )
    .then(r => r.json())
    .then(d => setData(d))
    .catch(err => err.toString())
  }

  useEffect(() => getJson());

  return (
    <GenericFeed data={data} />
  );
}