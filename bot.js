const http = require('http');
const mineflayer = require('mineflayer');

// 1. Server Web Sederhana (Wajib agar Render tidak mematikan aplikasi)
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot Minecraft sedang aktif!\n');
}).listen(port, () => {
  console.log(`Server web berjalan di port ${port}`);
});

// 2. Konfigurasi & Fungsi Bot Minecraft
function buatBot() {
  const bot = mineflayer.createBot({
    host: 'dynamic-9.magmanode.com',   // Ganti dengan IP atau domain server Minecraft
    port: 25650,              // Ganti jika port berbeda
    username: 'Error', // Nama bot
    auth: 'offline',          // 'offline' untuk cracked, 'microsoft' untuk premium
    version: '26.1.2'         // Sesuaikan dengan versi server Minecraft Anda
  });

  bot.on('spawn', () => {
    console.log('Bot berhasil masuk ke server!');
    // Membuat bot lompat terus-menerus
    bot.setControlState('jump', true);
  });

  // Menyambung ulang otomatis setelah 10 detik jika terputus
  bot.on('end', () => {
    console.log('Koneksi terputus. Menyambungkan ulang dalam 10 detik...');
    setTimeout(buatBot, 10000);
  });

  bot.on('kicked', (reason) => {
    console.log('Bot di-kick:', JSON.stringify(reason, null, 2));
  });


  bot.on('error', (err) => {
    console.log('Terjadi error:', err.message);
  });
}

buatBot();
