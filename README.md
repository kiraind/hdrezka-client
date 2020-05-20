# Воруем ворованный контент

## Reverse engineering

Прямые ссылки на видеофайлы содержатся в строках по схеме:

```
[<качество>]<ссылка на .m3u8> or <ссылка на видеофайл .mp4>, ... , ...
```

Будем называть их *StreamsManifest*, для каждой озвучки есть свой *StreamsManifest*.

### Фильмы

#### Список переводов

Список переводов есть в [основной html странице](http://hdrezka.ink/films/drama/32282-el-camino-vo-vse-tyazhkie-2019.html) в элементах `ul#translators-list li.b-translator__item`, атрибут `title` — автор озвучки, `data-cdn_url` — *StreamsManifest*. Если `ul#translators-list` отсутствует ([например](http://hdrezka.ink/films/drama/5888-doktor-streyndzhlav-ili-kak-ya-nauchilsya-ne-volnovatsya-i-polyubil-atomnuyu-bombu-1964.html)), то имеется только одна озвучка и в основной странице уже содержится ее *StreamsManifest* составе встроенного скрипта:

```js
$(function() {
        sof.tv.initCDNMoviesEvents(32282, 111, 'hdrezka.ink', false, {
            "id": "cdnplayer",
            "streams": "<искомая экранированная строка>",
            "default_quality": "480p",
            "hlsconfig": {
                "maxBufferLength": 60,
                "maxMaxBufferLength": 600,
                "maxBufferSize": 33554432000
            },
            "geo_ip": "2001:41d0:701:1100::e8c",
            "geo_iso": "de",
            "preroll": "< ... >"
        });
});
```

#### Сериалы

todo