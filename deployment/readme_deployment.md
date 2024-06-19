# Panduan Deployment dengan CI/CD untuk Aplikasi Node.js

Panduan ini menjelaskan langkah-langkah untuk melakukan deployment aplikasi Node.js menggunakan Continuous Integration/Continuous Deployment (CI/CD) dengan PM2 untuk manajemen proses, dan setup webhook GitHub untuk deployment otomatis.

## Persyaratan

Sebelum memulai, pastikan Anda telah menyiapkan hal berikut:

- Node.js terpasang di server Anda
- Git terpasang di server Anda
- Repositori GitHub dengan aplikasi Node.js Anda

## Langkah-langkah Deployment

### 1. Clone Repositori

Clone repositori aplikasi Node.js Anda ke server:

```bash
git clone <repository_url>
cd <repository_directory>
```

### 2. Instal PM2

Instal PM2 secara global di server Anda. PM2 akan digunakan untuk mengelola proses aplikasi Node.js:

```bash
npm install -g pm2
```

### 3. Persiapkan Aplikasi

Pastikan aplikasi Node.js Anda siap untuk deployment. Biasanya meliputi:

- Menyiapkan kode aplikasi.
- Mengonfigurasi variabel lingkungan (jika diperlukan).
- Memverifikasi `package.json` untuk dependensi yang diperlukan.

### 4. Buat Script CI/CD (`cicd.sh`)

Buat script CI/CD (`cicd.sh`) di repositori Anda. Script ini menangani tugas deployment tanpa harus menginstal dependensi lagi:

```bash
#!/bin/bash

# Ganti dengan nilai sesungguhnya
REPO_PATH="/root/Proyek_WS"
BRANCH="main"
APP_NAME="proyek_ws"

# Masuk ke direktori repositori
cd $REPO_PATH

# Ambil perubahan terbaru dari GitHub
git pull origin $BRANCH

echo "Pull berhasil"

# Periksa apakah proses pm2 berjalan dan hentikan jika iya
if pm2 id $APP_NAME > /dev/null
then
    echo -e "\n\nMenghentikan proses pm2...\n\n"
    pm2 stop $APP_NAME
fi

# Mulai aplikasi dengan pm2
pm2 start npm --name $APP_NAME -- start

# Simpan daftar proses pm2 saat ini untuk restart saat reboot
pm2 save

# Tampilkan daftar proses pm2
pm2 list

# Paksa pm2 untuk membuka log aplikasi
pm2 logs $APP_NAME
```

- Pastikan script CI/CD dapat dieksekusi (`chmod +x cicd.sh`).
- Konfigurasi platform CI/CD Anda untuk menjalankan `cicd.sh` saat ada perubahan di repositori atau sesuai dengan pemicu deployment.

### 5. Buat file `server_webhook.js`

Tambahkan file `server_webhook.js` di direktori repositori Anda:

```javascript
const http = require("http");
const { exec } = require("child_process");

// Path ke script pull
const PULL_SCRIPT_PATH = "/root/Proyek_WS/cicd.sh";

// Fungsi untuk menangani permintaan masuk
const requestListener = (req, res) => {
  if (req.method === "POST" && req.url === "/webhook") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      console.log("Menerima payload webhook:", body);

      // Eksekusi script pull
      exec(PULL_SCRIPT_PATH, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing script: ${error.message}`);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
          return;
        }

        if (stderr) {
          console.error(`stderr: ${stderr}`);
        }

        console.log(`stdout: ${stdout}`);

        // Beri respons ke GitHub dengan status sukses
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Pull request received and processed successfully.");
      });
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
};

// Buat dan jalankan server HTTP
const server = http.createServer(requestListener);
server.listen(8999, () => {
  console.log("Server mendengarkan di port 8999...");
});
```

### 6. Mulai Webhook Server dengan PM2

Mulai server webhook (`server_webhook.js`) menggunakan PM2:

```bash
pm2 start server_webhook.js --name "proyek_ws"
```

### 7. Set Up GitHub Webhook

Untuk mengaktifkan deployment otomatis saat ada perubahan di GitHub, buat webhook:
- Buka repositori GitHub Anda > Settings > Webhooks.
- Tambahkan webhook baru dengan URL Payload mengarah ke endpoint server Anda (misalnya `http://your_server_ip:8999/webhook`).
- Atur Content type menjadi `application/json`.
- Pilih event yang ingin Anda gunakan untuk memicu deployment (misalnya `Just the push event`).
- Tambahkan webhook.

### 8. Monitor Aplikasi

Monitor aplikasi Node.js Anda menggunakan PM2:

- Lihat log: `pm2 logs`
- Periksa status: `pm2 status`
- Restart atau hentikan aplikasi: `pm2 restart <nama_aplikasi>`, `pm2 stop <nama_aplikasi>`
