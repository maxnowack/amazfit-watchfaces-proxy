import { Configuration } from 'proxifier'

const config: Configuration = {
  // add custom watchfaces
  match: req => req.headers.host === 'aos-us.mi-ae.com'
    && /^\/discovery\/cards\/chaohu_watch_skins/.test(req.url || ''),
  response: (d, s2p, p2c) => new Promise<boolean>(resolve => {
    const body = d.toString()
    if (!body) return resolve(false)

    const data = JSON.parse(body)
    data.push({
      describe: 'apple',
      extensions: {
        assets: {
          bins: [
            {
              size: 28776,
              src: 'https://playlistobserver.s3.amazonaws.com/stations/797566595a6967646bd29.bin',
            }],
          id: 1,
        },
        jsbridge_auth: true,
        red_dot: {},
        use_network_type: 0,
      },
      id: 'a28201ee-5f24-11e8-8122-16a8276e0aff',
      image: 'https://amazfitwatchfaces.com/bip/resource/img/601170035a6967646bd65.gif',
      mode: 1,
      offline: '2019-05-31T16:00:00+00:00',
      online: '2018-05-23T16:00:00+00:00',
      status: 1,
      sub_title: '',
      target: '',
      title: 'Apple',
    })

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
