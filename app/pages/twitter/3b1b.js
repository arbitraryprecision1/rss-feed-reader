import { useEffect, useState } from 'react';

export default function threeb() {
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




  const items = data.items.map(i => (<p>({i.date_modified}): <a href={i.url}>{i.title}</a></p>))

  return (
    <div>
      <h1>{data.items[0].author.name}</h1>
      {items}
    </div>
  );
}