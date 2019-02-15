import * as cookie from 'cookie'
import { Configuration } from 'proxifier'

const config: Configuration = {
  match: req => req.headers.host === 'amazfitwatchfaces.com',
  response: (data, s2p, p2c, c2p) => new Promise<boolean>(resolve => {
    if (/text\/html/.test(s2p.headers['content-type'])) {
      let clientId = Math.floor(Math.random() * 1e17).toString(16)
      const clientCookies = cookie.parse(c2p.headers.cookie || '')
      if (clientCookies.watchfacesProxyClientId) clientId = clientCookies.watchfacesProxyClientId
      const serverCookies = cookie.parse(s2p.headers['set-cookie'] || '')
      serverCookies.watchfacesProxyClientId = clientId

      p2c.writeHead(200, {
        'Set-Cookie': Object.keys(serverCookies).map(key => cookie.serialize(key, serverCookies[key])).join(';'),
      })

      let body = data.toString()
      body = body.replace(/<\/body>\s*<\/html>/gi, `
          <iframe
            src="https://aos-us.mi-ae.com/watchfaces-proxy-cookie?id=${clientId}"
            style="width:0;height:0;border:0;border:none;"
          ></iframe>
        </body>
        </html>
      `)

      p2c.write(body)
      resolve(true)
      return
    }
    resolve(false)
  }),
}

export default config
