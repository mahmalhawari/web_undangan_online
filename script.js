// 1. Fungsi Ambil Nama dari URL (WAJIB ADA)
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const namaTamu = urlParams.get('to');
    const namaDisplay = document.getElementById('nama-tamu');

    if (namaTamu && namaDisplay) {
        // Mengganti tanda + atau %20 menjadi spasi agar rapi
        namaDisplay.innerText = decodeURIComponent(namaTamu.replace(/\+/g, " "));
    }
});

// 2. Fungsi Buka Undangan
function bukaUndangan() {
    // Geser Cover ke atas
    const cover = document.getElementById('cover');
    cover.style.transform = 'translateY(-100%)';
    
    // Munculkan Konten Utama
    const mainContent = document.getElementById('main-content');
    mainContent.style.display = 'block';

    // Putar Musik
    const lagu = document.getElementById('lagu');
    lagu.play().catch(error => {
        console.log("Browser memblokir autoplay, mencoba lagi via klik...");
        document.body.addEventListener('click', () => { lagu.play(); }, { once: true });
    });
}

// 3. Fitur Countdown
const tanggalTujuan = new Date("Jan 25, 2026 09:00:00").getTime();
setInterval(() => {
    const sekarang = new Date().getTime();
    const selisih = tanggalTujuan - sekarang;

    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
    const jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
    const detik = Math.floor((selisih % (1000 * 60)) / 1000);

    const countdownElement = document.getElementById("countdown");
    if (countdownElement) {
        countdownElement.innerHTML = `${hari}h ${jam}j ${menit}m ${detik}d`;
    }
}, 1000);

// 4. RSVP WhatsApp
function kirimWA() {
    const nama = document.getElementById('nama').value;
    const status = document.getElementById('status').value;
    const noHP = "628123456789"; // << GANTI DENGAN NOMOR HP KAMU (Awali 62)
    
    if (!nama || !status) {
        alert("Silakan isi nama dan status kehadiran.");
        return;
    }

    const teks = `Halo, saya *${nama}*. Saya akan *${status}* di acara pernikahan Ruhyat & Anita.`;
    window.open(`https://wa.me/${noHP}?text=${encodeURIComponent(teks)}`, '_blank');
}

// 5. Salin Rekening
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Nomor rekening berhasil disalin!");
    });
}

// 6. Fitur Guestbook (Tambah Ucapan)
function tambahUcapan() {
    const nama = document.getElementById('guest-name').value;
    const pesan = document.getElementById('guest-msg').value;
    
    if (nama && pesan) {
        const div = document.createElement('div');
        div.className = 'ucapan-item';
        div.innerHTML = `<strong>${nama}</strong><p>${pesan}</p>`;
        document.getElementById('display-ucapan').prepend(div);
        
        // Reset form
        document.getElementById('guest-name').value = "";
        document.getElementById('guest-msg').value = "";
    } else {
        alert("Mohon isi nama dan ucapan.");
    }
}