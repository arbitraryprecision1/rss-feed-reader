export async function getJson(source, context) {
  // get info for given name from sources
  const uriparams = source.filter(x => x.name === context.params.name)[0].params

  // make the uri from params
  const uri = Object
    .entries(uriparams)
    .map(p => encodeURIComponent(p[0])+"="+encodeURIComponent(p[1]))
    .reduce((accum, cur) => accum+cur+"&", "http://rss-bridge:80/?")

  const data = await fetch(uri.slice(0,-1))
    .then(r => r.json())

  return data
}

export function getPaths(source) {
  // all names from the json to pre render pages for
  return source.map(x => {return { params: { name: x.name } }})
}