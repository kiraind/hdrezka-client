import fetch from 'node-fetch'
import jsdom from 'jsdom'
const { JSDOM } = jsdom

import proxyAgent from './proxyAgent.js'
import parseStreams from './parseStreams.js'

const agent = process.env.NODE_ENV === 'production' ? null : proxyAgent

export default async function getFilmStreams(mainUrl) {
    // Словарь озвучек
    const dubbings = {}

    // загружаме страницу
    const responce = await fetch(mainUrl, {
        agent,    
        headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,la;q=0.6',
        },
        referrer: mainUrl,
        referrerPolicy: 'no-referrer-when-downgrade',
    })
    const html = await responce.text()

    // пробуем найти список озвучек
    const dom = new JSDOM(html)
    const listElem = dom.window.document.querySelector('ul#translators-list')

    if(listElem !== null) {
        // есть список озвучек, парсим его

        listElem.querySelectorAll('li.b-translator__item')
        .forEach(dubbing => {
            const title = dubbing.getAttribute('title')
            const streamsManifest = dubbing.getAttribute('data-cdn_url')

            dubbings[title] = parseStreams(streamsManifest)
        })

        return dubbings
    } else {
        // если нет списка озвучек, вытаскиваем дефолтную

        const initParamsJSON = html.match(/(?<=initCDNMoviesEvents\(\d+, \d+, '.*', \w+, ){.*?}(?=\))/)
    
        if(initParamsJSON === null) {
            throw new Error(`Параметры по умолчанию не найдены, проверьте прокси`)
        }

        const initParams = JSON.parse(initParamsJSON[0])
        
        dubbings.default = parseStreams(initParams.streams)

        return dubbings
    }
}