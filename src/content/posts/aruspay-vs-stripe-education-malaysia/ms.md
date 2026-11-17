---
title: "ArusPay vs Stripe: payment gateway yuran sekolah dan universiti"
description: "Payment gateway yuran sekolah: perbandingan ArusPay dan Stripe untuk institusi Malaysia, termasuk caj FPX, settlement, bil yuran dan senarai semak bursar."
primaryKeyword: "payment gateway yuran sekolah"
date: 2026-11-17
updated: 2026-11-17
tags: ["comparison", "payment-gateway", "education", "fpx"]
type: "comparison"
heroImage: "./hero.webp"
heroAlt: "Ilustrasi dua aliran hijau bertemu di hadapan bangunan universiti dengan latar krim"
sources: [{"url": "https://stripe.com/en-my/pricing", "title": "Stripe Malaysia: Pricing & Fees", "accessed": "2026-11-17"}, {"url": "https://stripe.com/en-my/invoicing/pricing", "title": "Stripe Invoicing: Pricing", "accessed": "2026-11-17"}, {"url": "https://docs.stripe.com/payments/fpx", "title": "FPX payments | Stripe Documentation", "accessed": "2026-11-17"}, {"url": "https://docs.stripe.com/payments/bank-redirects", "title": "Bank redirects | Stripe Documentation", "accessed": "2026-11-17"}]
faq: [{"q": "Adakah Stripe menyokong FPX di Malaysia?", "a": "Ya. Stripe menyenaraikan FPX untuk perniagaan yang berpangkalan di Malaysia pada harga standard 3% + RM1.00 bagi setiap transaksi berjaya, dan memerlukan Nombor Pendaftaran Perniagaan (BRN). Data setakat 17 November 2026."}, {"q": "Berapa lama Stripe mengambil masa untuk settlement bayaran FPX?", "a": "Dokumentasi FPX Stripe menyatakan settlement FPX mengambil masa sehingga 5 hari bekerja (T+5)."}, {"q": "Bolehkah pelajar membayar yuran melalui FPX berulang di Stripe?", "a": "Tidak. Dokumentasi FPX Stripe menyatakan bayaran berulang tidak disokong. Setiap bayaran FPX disahkan oleh pembayar dengan bank mereka."}, {"q": "Apa yang ArusPay tawarkan kepada sekolah dan universiti?", "a": "ArusEdu untuk bil yuran, invois dan rekod pelajar; ArusCampus untuk pelajar melihat invois, membayar melalui FPX dan memuat turun resit; dan ArusPay untuk memproses bayaran dan menyalurkan wang kepada institusi."}, {"q": "Berapa kos menggunakan ArusPay?", "a": "Harga ArusPay tidak diterbitkan dalam artikel ini. Hubungi pasukan ArusPay untuk terma terkini."}]
draft: false
---

Bagi bursar sekolah, kolej atau universiti di Malaysia, memilih payment gateway yuran sekolah antara ArusPay dan Stripe bergantung pada masalah yang hendak diselesaikan. Stripe ialah platform pembayaran global: satu integrasi untuk kad, e-dompet dan FPX, dengan harga bayar-ikut-guna yang diterbitkan. ArusPay ialah payment gateway yang dibina untuk pendidikan Malaysia, disambungkan dengan sistem bil yuran (ArusEdu) dan portal bayaran pelajar (ArusCampus).

Jika keutamaan anda ialah menerima pelbagai kaedah bayaran dari banyak negara, dan anda ada pasukan developer untuk membina aliran yuran sendiri, Stripe sesuai. Jika keutamaan anda ialah keseluruhan kitaran yuran (invois, bayaran pelajar, resit), ArusPay dibina di sekitar aliran itu.

Panduan ini membandingkan kedua-duanya berdasarkan maklumat yang diterbitkan sendiri oleh setiap penyedia.

## Kenapa pilihan payment gateway penting pada musim yuran

Kutipan yuran tidak sama seperti jualan dalam talian. Bayaran bertumpu pada awal semester atau penggal. Jumlahnya lebih besar daripada pembelian biasa. Setiap bayaran perlu dipadankan dengan pelajar dan invois tertentu, dan pasukan bendahari perlu membuat rekonsiliasi untuk semuanya.

Di Malaysia, perbankan dalam talian FPX menjadi teras proses ini. FPX dikendalikan oleh PayNet bersama institusi kewangan Malaysia yang mengambil bahagian, dan pembayar menggunakan akaun perbankan dalam talian mereka sendiri ([dokumentasi FPX Stripe](https://docs.stripe.com/payments/fpx)). Stripe menyatakan bahawa kaedah bank redirect seperti FPX menyumbang lebih separuh daripada perdagangan dalam talian di Malaysia ([Stripe, Bank redirects](https://docs.stripe.com/payments/bank-redirects)).

Jadi soalan yang perlu ditanya mudah sahaja. Berapa kos FPX? Bila wang masuk ke akaun? Bagaimana pelajar mencari dan membayar invois mereka? Dan berapa banyak kerja bil yang perlu anda bina sendiri?

## Apa yang Stripe tawarkan kepada institusi di Malaysia

Stripe ialah platform pembayaran yang digunakan oleh perniagaan di seluruh dunia. Di [halaman harga Malaysia](https://stripe.com/en-my/pricing), Stripe menyenaraikan:

- Harga standard 3% + RM1.00 bagi setiap caj kad atau transaksi bank yang berjaya, termasuk FPX, tanpa yuran persediaan atau yuran bulanan.
- Kad domestik pada 3% + RM1.00, tambahan 1% untuk kad antarabangsa dan 2% jika penukaran mata wang diperlukan.
- E-dompet seperti GrabPay (3%) dan Alipay (2.9% + RM1.00).
- Harga khas untuk perniagaan dengan jumlah bayaran yang besar, seperti diskaun volum dan harga IC+.

Untuk bil, [Stripe Invoicing](https://stripe.com/en-my/invoicing/pricing) mengenakan 0.4% (Starter) atau 0.5% (Plus) bagi setiap invois yang dibayar, di atas harga pembayaran. Ia termasuk halaman invois yang dihoskan, portal pelanggan dan peringatan e-mel automatik.

Perkara daripada [dokumentasi FPX Stripe](https://docs.stripe.com/payments/fpx) yang penting untuk kutipan yuran:

- FPX tersedia untuk akaun Stripe milik perniagaan yang berpangkalan di Malaysia, dan Nombor Pendaftaran Perniagaan (BRN) diperlukan.
- Settlement FPX mengambil masa sehingga 5 hari bekerja (T+5).
- Bayaran FPX pengguna (B2C) adalah antara RM1 hingga RM30,000 bagi setiap transaksi.
- Bayaran berulang (recurring) tidak disokong untuk FPX, dan Stripe Invoicing menyokong FPX hanya melalui kaedah kutipan "send invoice".
- FPX tiada proses chargeback, kerana pembayar mengesahkan setiap bayaran dengan bank mereka.

## Apa yang ArusPay tawarkan kepada institusi di Malaysia

ArusPay ialah syarikat pembayaran Malaysia yang memberi tumpuan kepada pendidikan. Produknya direka untuk berfungsi bersama:

- **ArusEdu** memberi pasukan bendahari satu tempat untuk mengurus yuran pelajar, invois dan rekod pelajar.
- **ArusCampus** membolehkan pelajar melihat yuran, membayar dalam talian melalui FPX dan memuat turun resit.
- **ArusPay** memproses bayaran dan menyalurkan wang kepada institusi.

Ringkasnya: ArusEdu keluarkan bil, ArusCampus untuk pelajar bayar, ArusPay gerakkan wang. Matlamatnya satu aliran bersambung dari invois yuran ke bayaran hingga resit, dibina di Malaysia untuk pendidikan Malaysia.

Harga, tempoh settlement dan kaedah bayaran ArusPay selain FPX tidak diterbitkan dalam artikel ini. Hubungi pasukan ArusPay untuk terma terkini.

## ArusPay vs Stripe: perbandingan sebelah-menyebelah

| | Stripe | ArusPay |
|---|---|---|
| Apa itu | Platform pembayaran dalam talian global | Payment gateway yang dibina untuk pendidikan Malaysia |
| Kaedah bayaran | Kad, FPX, GrabPay, Alipay dan 100+ kaedah di peringkat global | Perbankan dalam talian FPX (kaedah lain: tidak diterbitkan) |
| Caj FPX (standard) | 3% + RM1.00 bagi setiap transaksi berjaya | Tidak diterbitkan |
| Caj kad domestik (standard) | 3% + RM1.00; +1% kad antarabangsa; +2% jika penukaran mata wang | Tidak diterbitkan |
| Yuran persediaan dan bulanan | Tiada untuk harga standard | Tidak diterbitkan |
| Settlement FPX | Sehingga 5 hari bekerja (T+5) | Tidak diterbitkan |
| Jumlah setiap bayaran FPX pengguna | RM1 hingga RM30,000 | Tidak diterbitkan |
| Bayaran FPX berulang | Tidak disokong | Tidak diterbitkan |
| Bil yuran | Stripe Invoicing: 0.4% atau 0.5% bagi setiap invois dibayar, di atas harga pembayaran | ArusEdu: yuran pelajar, invois dan rekod pelajar |
| Halaman bayaran pelajar | Halaman invois dihoskan dan portal pelanggan | ArusCampus: lihat invois, bayar melalui FPX, muat turun resit |

Data setakat 17 November 2026. Semak laman web penyedia untuk terma terkini. Angka Stripe ialah harga standard yang diterbitkan di [harga Stripe](https://stripe.com/en-my/pricing), [harga Stripe Invoicing](https://stripe.com/en-my/invoicing/pricing) dan [dokumentasi FPX Stripe](https://docs.stripe.com/payments/fpx); Stripe juga menawarkan harga khas.

## Bila Stripe sesuai

- Anda mengutip yuran daripada ramai pelajar atau ibu bapa antarabangsa yang membayar dengan kad dalam mata wang lain. Stripe menerbitkan kadar kad antarabangsa dan penukaran mata wang, serta menyokong 135+ mata wang ([harga Stripe](https://stripe.com/en-my/pricing)).
- Anda mahu e-dompet seperti GrabPay atau Alipay selain FPX.
- Anda sudah ada sistem maklumat pelajar dan pasukan developer yang boleh membina invois, padanan bayaran dan resit menggunakan API Stripe.
- Anda perlukan satu penyedia pembayaran untuk beberapa negara.

## Bila ArusPay sesuai

- Pasukan bendahari mahu bil yuran, bayaran pelajar dan resit dalam satu aliran bersambung, tanpa perlu membinanya sendiri.
- Kebanyakan pelajar membayar dalam ringgit melalui perbankan dalam talian FPX.
- Anda mahu produk yang direka khusus untuk yuran pendidikan: invois yang terikat kepada pelajar, portal pelajar dan resit yang boleh dimuat turun.
- Anda lebih selesa dengan penyedia yang dibina di Malaysia untuk pendidikan Malaysia.

## Memilih payment gateway yuran sekolah: senarai semak untuk bursar

Sebelum menandatangani dengan mana-mana penyedia, dapatkan jawapan bertulis untuk soalan berikut:

1. Berapa caj bagi setiap bayaran FPX, dan bagi setiap bayaran kad (domestik dan antarabangsa)?
2. Bila wang masuk ke akaun bank kami selepas bayaran FPX?
3. Berapa jumlah maksimum bagi setiap bayaran FPX, dan adakah ia mencukupi untuk yuran kami yang paling tinggi?
4. Bagaimana setiap bayaran dipadankan dengan pelajar dan invois?
5. Adakah pelajar menerima resit secara automatik?
6. Bolehkah kami menawarkan bayaran ansuran, dan bagaimana setiap ansuran dibayar?
7. Bagaimana bayaran balik dikendalikan, dan berapa lama prosesnya?
8. Apakah laporan yang diterima bendahari untuk rekonsiliasi dan audit?
9. Berapa banyak kerja pembangunan yang diperlukan, dan siapa yang menyelenggaranya?
10. Siapa yang boleh dihubungi pada hari yuran jika berlaku masalah?

Bandingkan jawapan dengan jadual yuran dan waktu puncak bayaran institusi anda sendiri, bukan dengan kedai dalam talian biasa.

## Kesimpulan

Kedua-dua penyedia boleh mengutip bayaran FPX daripada pelajar di Malaysia. Stripe menawarkan set alat global yang berorientasikan developer, dengan harga standard yang diterbitkan. ArusPay menawarkan aliran khusus pendidikan dari invois yuran ke bayaran hingga resit. Pilih berdasarkan kitaran yuran, profil pelajar dan pasukan yang akan menguruskannya.

Untuk melihat bagaimana aliran ArusPay sesuai dengan kitaran yuran anda, layari [aruspay.com.my](https://aruspay.com.my/) atau baca lagi di [blog ArusPay](https://aruspay.com.my/blog/).
