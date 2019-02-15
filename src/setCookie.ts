import * as cookie from 'cookie'
import { Configuration } from 'proxifier'
import * as qs from 'query-string'

const config: Configuration = {
  // add download count
  match: req => req.headers.host === 'aos-us.mi-ae.com'
    && /^\/watchfaces-proxy-cookie/.test(req.url || ''),
  response: (d, s2p, p2c) => new Promise<boolean>(resolve => {
    const query = qs.parse(s2p.req.path.split('?')[1])
    console.log(query)
    p2c.writeHead(200, {
      ...s2p.headers,
      'Content-Length': 0,
      'Set-Cookie': cookie.serialize('watchfacesProxyClientId', query.id),
    })
    p2c.write('')
    return resolve(true)
  }),
}

export default config
