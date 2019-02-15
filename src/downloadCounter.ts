import { Configuration } from 'proxifier'
import * as qs from 'query-string'

const config: Configuration = {
  // add download count
  match: req => req.headers.host === 'aos-us.mi-ae.com'
    && /^\/discovery\/chaohu_watch_skins\/counts/.test(req.url || ''),
  response: (d, s2p, p2c) => new Promise<boolean>(resolve => {
    const body = d.toString()
    if (!body) return resolve(false)

    const query = qs.parse(s2p.req.path.split('?')[1])
    let data = JSON.parse(body)
    data = { [query['ids[]']]: { shown_pv: 32075 } }

    const newBody = JSON.stringify(data)
    p2c.writeHead(200, {
      ...s2p.headers,
      'Content-Length': newBody.length,
    })
    p2c.write(newBody)
    return resolve(true)
  }),
}

export default config
