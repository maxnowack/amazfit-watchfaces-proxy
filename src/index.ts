import Proxifier from 'proxifier'
import './config'
import downloadCounter from './downloadCounter'
import extendWatchfaces from './extendWatchfaces'
import injectIframe from './injectIframe'
import './pac'
import setCookie from './setCookie'

const proxy = new Proxifier({
  port: 9090, // process.env.PROXY_PORT ? parseInt(process.env.PROXY_PORT, 10) : 9080,
})
proxy.configure([injectIframe, setCookie, extendWatchfaces, downloadCounter])
proxy.start()
