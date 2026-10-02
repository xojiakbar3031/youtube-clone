# YouTube Clone

YouTube interfeysining klon versiyasi. HTML, CSS, React (CDN orqali, build kerak emas).

## Nima bor

- Header: qidiruv, bildirishnoma, profil
- Sidebar
- Kategoriya bo'yicha filtr (Coding, Music, Gaming, Sports, News, Live)
- Video kartalar
- Video ochilganda watch sahifasi (pleer, tavsif, o'xshash videolar)
- Like/dislike, obuna, izoh, ko'rish tarixi (localStorage'da saqlanadi)

## Texnologiyalar

- React 18 (CDN, UMD)
- Babel Standalone (brauzerda JSX)
- Vanilla CSS

## Ma'lumotlar

Videolar RapidAPI (youtube-media-downloader) orqali haqiqiy YouTube'dan qidirilib olinadi
(`data.js` -> `getVideos()`). API ishlamasa (limit tugagan, internet yo'q) mock videolarga
tushib qoladi. Video ijro qilish uchun YouTube'ning o'z embed pleeri ishlatiladi.

## Ishga tushirish

`index.html`ni brauzerda ochish kifoya, yoki:

```
npx http-server .
```
