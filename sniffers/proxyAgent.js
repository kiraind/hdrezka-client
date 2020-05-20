import http from 'http'
import socksproxyagent from 'socks-proxy-agent'
const { SocksProxyAgent } = socksproxyagent

const proxyAgent = process.env.PROXY
    ? new SocksProxyAgent({
        host: process.env.PROXY_SOCKS5_HOST,
        port: process.env.PROXY_SOCKS5_PORT,
        userId: process.env.PROXY_SOCKS5_USERNAME,
        password: process.env.PROXY_SOCKS5_PASSWORD
    })
    : new http.Agent()

export default proxyAgent