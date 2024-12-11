# nsfw-check

Paket npm untuk memeriksa apakah sebuah domain terkait dengan konten pornografi menggunakan OpenDNS.

## Instalasi

Untuk menginstal paket ini, jalankan perintah berikut:

```bash
npm install nsfw-check
```

## Penggunaan

### Contoh Dasar

```javascript
const nsfwCheck = require('nsfw-check');

const checker = new nsfwCheck();

checker.isPorn('xnxx.com').then(isPorn => {
    console.log(isPorn); 
}).catch(error => {
    console.error(error);
});
```

Pada contoh di atas, fungsi `isPorn` akan memeriksa apakah domain `'example.com'` terkait dengan konten pornografi dan mencetak hasilnya.

### Menentukan Server DNS Kustom

Atau juga bisa menentukan server DNS kustom dan waktu tunggu (timeout) yang lebih sesuai dengan kebutuhan Anda:

```javascript
const checker = new nsfwCheck({
    dnsServer: '8.8.8.8', // Menentukan server DNS kustom
    timeout: 5000 // Waktu tunggu (timeout) dalam milidetik
});

checker.isPorn('example.com').then(isPorn => {
    if (isPorn) {
        console.log('Domain ini terkait dengan konten pornografi.');
    } else {
        console.log('Domain ini tidak terkait dengan konten pornografi.');
    }
}).catch(error => {
    console.error('Terjadi kesalahan:', error);
});
```

### Opsi Konfigurasi

- **`dnsServer`**: Alamat server DNS yang digunakan untuk mencari alamat IP domain. Default: `'208.67.222.123'` (server OpenDNS).
- **`timeout`**: Waktu tunggu untuk pencarian DNS dalam milidetik. Default: `10000` ms (10 detik).

## Lisensi

Paket ini dilisensikan di bawah [Lisensi MIT](https://opensource.org/licenses/MIT).

