// todo
// deno run --allow-net sniffers/getSeriesStreams.js 

const formData = new FormData()

formData.append('id',            '11658') 
formData.append('translator_id', '111')
formData.append('season',        '2')
formData.append('episode',       '1')
formData.append('action',        'get_stream')

const t = new Date().getTime()
const responce = await fetch(`https://hdrezka.cm/ajax/get_cdn_series/?t=${t}`, {
    method: 'POST',
    body: formData,
})
const series = await responce.json()

console.log(
    series
)