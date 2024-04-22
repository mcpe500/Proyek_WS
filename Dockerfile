# Gunakan gambar resmi Node.js LTS sebagai gambar dasar
FROM node:lts-alpine

# Tetapkan direktori kerja di dalam kontainer
WORKDIR /app

# Salin package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Instal dependensi
RUN npm install --production

# Salin sisa kode aplikasi ke direktori kerja
COPY . .

# Bangun aplikasi
RUN npm run build

# Buka port tempat aplikasi akan berjalan
EXPOSE 3000

# Mulai aplikasi
CMD [ "npm", "run","deploy" ]
