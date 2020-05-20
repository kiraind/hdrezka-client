export default function parseStreams(streamsManifest) {
    return streamsManifest.split(',').map(rawVersion => {
        const [firstPart, mp4url] = rawVersion.split(' or ')

        const [qualityPre, m3u8url] = firstPart.split(']')
        const quality = qualityPre.substring(1)

        return {
            quality,
            mp4url,
            m3u8url,
        }
    })
}