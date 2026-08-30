# YouTube Clone

YouTube interfeysining klonlangan versiyasi — HTML, CSS va React (CDN orqali, build qadamisiz) bilan qurilgan.

## Xususiyatlar

- Header: qidiruv, ovozli qidiruv tugmasi, bildirishnoma va profil
- Sidebar: asosiy va "kashf etish" bo'limlari
- Kategoriya chiplari bo'yicha filtr (Coding, Music, Gaming, Sports, News, Live)
- Video kartalar: rasm, davomiylik belgisi, kanal, ko'rishlar soni
- Video ochilganda to'liq "watch" sahifasi: pleer, tavsif, o'xshash videolar
- Qidiruv formi

## Texnologiyalar

- React 18 (UMD, CDN orqali — build/bundler talab qilinmaydi)
- Babel Standalone (brauzerda JSX'ni transformatsiya qilish uchun)
- Vanilla CSS

## Ma'lumotlar haqida

Hozircha `data.js` faylida mock (o'ylab topilgan) video ro'yxati bor. Kelajakda buni
haqiqiy API bilan almashtirish uchun faqat `getVideos()` funksiyasi ichini
o'zgartirish kifoya — barcha komponentlar shu funksiya qaytaradigan formatga mos
ishlaydi. `data.js` faylidagi izohda YouTube Data API v3 bilan ulash namunasi bor.

## Ishga tushirish

Bu build qadamisiz statik loyiha — `index.html` faylini brauzerda ochish kifoya,
yoki lokal serverda:

```
npx http-server .
```
