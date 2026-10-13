# SPOORWIKI Tools - ID (v 2.0)

**SPOORWIKI Tools** adalah aplikasi berbasis web interaktif (*Route Map Builder*) yang dirancang khusus untuk mempermudah perancangan, penyusunan, dan pembuatan diagram skema jalur kereta api Wikipedia menggunakan sistem templat **BSicon** (*Wikipedia Route Diagram Template / RDT - {{routemap}}*).

Alat ini memungkinkan pengguna merancang peta rute rel kereta api secara visual lewat antarmuka *drag-and-drop* (seret dan lepas), lalu mengonversinya menjadi kode sintaks Wikitext siap pakai yang dapat langsung ditempelkan ke artikel Wikipedia bahasa Indonesia maupun proyek Wikimedia lainnya.

---

## 🎯 Tujuan & Manfaat

Membuat bagan jalur kereta api (*routemap*) di Wikipedia secara manual seringkali rumit karena pengguna harus mengingat ratusan kode ikon BSicon, mengelola pemisah baris (`\`), dan menangani tumpukan ikon (*overlay* `!~`). 

**SPOORWIKI Tools** menyederhanakan seluruh alur kerja tersebut:
1. **Visual & Intuitif**: Tidak perlu lagi menebak kode atau tampilan ikon. Semua bentuk rel terlihat langsung di kanvas.
2. **Otomatisasi Sintaks**: Generator otomatis menyusun format `{{routemap}}` lengkap dengan penanganan sel kosong dan tumpukan *overlay*.
3. **Penyusunan Cepat**: Lengkap dengan pencarian, pengubah tipe jalur (prefix), dan penyesuaian dimensi kanvas.

---

## ✨ Fitur-Fitur Utama

### 1. Koleksi & Katalog BSicon Lengkap
- Ikon dikelompokkan secara terstruktur berdasarkan kategori fungsional:
  - **Sepur Lurus**: Jalur utama, perlintasan sebidang, ujung rel (*buffer stop*), dan transisi.
  - **Sepur Belok (Tikungan)**: Belokan rel berbagai sudut dan arah.
  - **Wesel & Persilangan**: Percabangan rel (*switch/turnout*), persilangan sebidang (*diamond crossing*).
  - **Bangunan & Stasiun**: Stasiun besar (*BHF*), halte (*HST*), peron (*PLT*), dan depo/bangunan operasional.
  - **Paralel & Lintasan Khusus**: Jalur ganda sejajar, jembatan, dan terowongan.
- Mengambil aset gambar ikon SVG langsung dari **Wikimedia Commons** secara dinamis menggunakan algoritma *hash* MD5 MediaWiki.

### 2. Pemilih Tipe Jalur (Prefix Selector)
Pengguna dapat mengubah tipe jalur seluruh katalog ikon hanya dengan satu klik tombol:
- **Standar (`std`)**: Jalur kereta api konvensional (warna merah marun standar Wikipedia).
- **Tram (`u`)**: Jalur moda trem, LRT, atau MRT perkotaan (warna biru muda).
- **Kolong (`t`)**: Jalur bawah tanah / terowongan (warna jingga/kuning).
- **Nonaktif (`ex`)**: Jalur kereta api nonaktif / mati / bekas (warna abu-abu/garis putus-putus).
*Perakitan kode nama BSicon dilakukan secara otomatis dan rekursif sesuai kaidah penamaan Commons (misal: `STR` ➔ `uSTR`, `tSTR`, `exSTR`).*

### 3. Tampilan Sidebar Responsif & 4 Kolom
- Tampilan grid ikon diatur tepat **4 kolom per baris** pada perangkat desktop dan tablet, memberikan kerapian visual maksimal.
- Panel sidebar dapat dibuka-tutup (*collapsible*) untuk memaksimalkan ruang kerja kanvas.
- Dilengkapi **Pencarian Cepat**: Filter ikon secara instan berdasarkan nama asli maupun hasil rakitan (cth: `STR`, `BHF`, `SKRZ`). Semua akordeon kategori akan terbuka otomatis saat pencarian aktif.

### 4. Keterangan Kode BSicon Asli (Hover & Onclick)
- Arahkan kursor (*hover*) atau klik (*onclick*) pada kotak ikon untuk memunculkan tooltip mengambang berlatar gelap yang menampilkan kode asli BSicon (seperti `STR`, `ENDE@G`, `BHF`).
- Memudahkan pengguna mengenali kode resmi ikon sebelum diseret ke kanvas.

### 5. Kanvas Interaktif (Interactive Route Canvas)
- **Drag & Drop**: Seret ikon dari sidebar dan letakkan langsung pada kotak kanvas rute.
- **Dukungan Overlay Ikon (`!~`)**: Seret beberapa ikon ke dalam satu kotak sel yang sama untuk menumpuknya (misalnya menggabungkan jalur lurus dengan perlintasan atau stasiun).
- **Hapus Sel Cepat**: Klik dua kali (*double-click*) pada sel untuk membersihkan ikon di sel tersebut.
- **Ubah Ukuran Kanvas Dinamis**: Atur jumlah kolom dan baris sesuka hati. Dilengkapi modal konfirmasi keamanan jika ukuran diperkecil agar data rute tidak terhapus tanpa sengaja.
- **Kosongkan Kanvas**: Tombol pembersih seluruh kanvas dengan dialog konfirmasi aman.

### 6. Generator Ekspor Wikitext Wikipedia
- Sekali klik tombol **Ekspor**, sistem akan mengonversi posisi seluruh sel kanvas menjadi sintaks MediaWiki:
  ```wikitext
  {{routemap
  |title=Rute Saya
  |map=
  STR\STR\BHF
  STR\KRZ\STR
  }}
  ```
- Dilengkapi dialog modal dengan tombol **Salin** (*Copy to Clipboard*) langsung.

---

## 🚀 Cara Penggunaan

1. **Atur Ukuran Kanvas**: Tentukan jumlah kolom dan baris pada bilah atas kanvas sesuai kebutuhan rute yang ingin dibuat.
2. **Pilih Tipe Jalur**: Pilih salah satu tombol tipe jalur di sidebar atas (*Standar*, *Tram*, *Kolong*, atau *Nonaktif*).
3. **Cari & Pilih Ikon**: Cari ikon yang diinginkan melalui kotak pencarian atau buka menu kategori pada sidebar.
4. **Susun Rute**:
   - Tarik ikon dari sidebar ke kotak kanvas tujuan.
   - Jika ingin menumpuk ikon dalam satu kotak, seret ikon kedua ke kotak yang sama.
   - Untuk menghapus suatu kotak, klik dua kali pada kotak tersebut.
5. **Ekspor Kode**:
   - Klik tombol **Ekspor** berwarna gelap di pojok kanan toolbar.
   - Klik tombol **Salin** pada jendela modal yang muncul.
   - Tempelkan (*paste*) kode tersebut ke artikel Wikipedia yang sedang disunting.

---

## 🛠️ Teknologi yang Digunakan

- **HTML5 & Vanilla CSS**: Struktur fleksibel dengan CSS Grid, Flexbox, dan CSS Variables.
- **JavaScript Modern (ES6+)**: Logika drag-and-drop, dynamic rendering, rekursi prefix, manipulasi DOM, dan generator wikitext.
- **Bootstrap 5**: Komponen modal dialog, akordeon, sistem form, dan utilitas responsif.
- **FontAwesome 6**: Ikonografi antarmuka pengguna.
- **blueimp-md5**: Hashing MD5 sisi peramban untuk menghasilkan path direktori gambar Wikimedia Commons yang valid.
- **Wikimedia Commons API / CDN**: Sumber gambar vektor BSicon resmi.

---

## 👤 Kredit & Pengembang

- **Pembuat**: [Braverious](https://id.wikipedia.org/wiki/Pengguna:Braverious)
- **Halaman Diskusi**: [Pembicaraan Pengguna:Braverious](https://id.wikipedia.org/wiki/Pembicaraan_Pengguna:Braverious)
- **Lisensi Ikon**: Mengikuti lisensi masing-masing aset BSicon di Wikimedia Commons (Domain Publik / CC BY-SA).
