import PACServer from './utils/PACServer'

const pac = new PACServer({
  domains: ['aos-us.mi-ae.com', 'amazfitwatchfaces.com'],
  port: process.env.PAC_PORT ? parseInt(process.env.PAC_PORT, 10) : 9080,
  proxyHost: process.env.PROXY_HOST || 'localhost',
  proxyPort: process.env.PROXY_PORT ? parseInt(process.env.PROXY_PORT, 10) : 9080,
})
pac.start()
console.log('started pac host')
