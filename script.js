// 1. Fungsi Ambil Nama dari URL
document.addEventListener('DOMContentLoaded', () => {
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
    const cover = document.getElementById('cover');
    cover.style.transform = 'translateY(-100%)';
    
    const mainContent = document.getElementById('main-content');
    mainContent.style.display = 'block';

    const lagu = document.getElementById('lagu');
    lagu.play().catch(error => {
        console.log("Autoplay diblokir browser");
        document.body.addEventListener('click', () => { lagu.play(); }, { once: true });
    });
    
    // Trigger animasi scroll agar muncul kalem
    setTimeout(() => { window.dispatchEvent(new Event('scroll')); }, 100);
}

// Efek Scroll Kalem
window.addEventListener('scroll', function() {
    var sections = document.querySelectorAll('.section');
    sections.forEach(function(sec) {
        var top = window.scrollY;
        var offset = sec.offsetTop - 600;
        if (top >= offset) {
            sec.classList.add('show');
        }
    });
});

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
        countdownElement.innerHTML = `
            <div class="countdown-item"><span>${hari}</span><small>Hari</small></div>
            <div class="countdown-separator" style="font-weight:bold; color:#b08d57; align-self:center;">:</div>
            <div class="countdown-item"><span>${jam}</span><small>Jam</small></div>
            <div class="countdown-separator" style="font-weight:bold; color:#b08d57; align-self:center;">:</div>
            <div class="countdown-item"><span>${menit}</span><small>Menit</small></div>
            <div class="countdown-separator" style="font-weight:bold; color:#b08d57; align-self:center;">:</div>
            <div class="countdown-item"><span>${detik}</span><small>Detik</small></div>
        `;
    }
}, 1000);

// 4. RSVP WhatsApp
function kirimWA() {
    const nama = document.getElementById('nama').value;
    const status = document.getElementById('status').value;
    const noHP = "6285719503187"; // Nomor tujuan RSVP
    
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
        alert("Nomor berhasil disalin!");
    });
}

// 6. Fitur Guestbook
function tambahUcapan() {
    const nama = document.getElementById('guest-name').value;
    const pesan = document.getElementById('guest-msg').value;
    const display = document.getElementById('display-ucapan');
    
    if (nama && pesan) {
        const div = document.createElement('div');
        div.style.background = "#f9f9f9";
        div.style.padding = "10px";
        div.style.borderRadius = "10px";
        div.style.marginBottom = "10px";
        div.style.borderLeft = "4px solid #b08d57";
        div.innerHTML = `<strong>${nama}</strong><p style="margin:5px 0;">${pesan}</p>`;
        display.prepend(div);
        
        document.getElementById('guest-name').value = "";
        document.getElementById('guest-msg').value = "";
    } else {
        alert("Mohon isi nama dan ucapan.");
    }
}
