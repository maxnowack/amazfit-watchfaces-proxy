import * as http from 'http'
import { PACServerOptions } from '../interfaces'

export default class PACServer {
  private options: PACServerOptions
  private server: http.Server

  constructor(options: PACServerOptions) {
    this.options = options
    this.server = http.createServer((request, response) => {
      response.writeHead(200, { 'Content-Type': 'application/x-ns-proxy-autoconfig' })
      response.write(`
        function FindProxyForURL(url, host) {
          ${this.options.domains.map(domain => `
            if (shExpMatch(host, "${domain}")) return "PROXY ${this.options.proxyHost}:${this.options.proxyPort}";
          `).join('')}
          return "DIRECT";
        }
      `)
      response.end()
    })
  }

  public start() {
    this.server.listen(this.options.port)
  }
}
