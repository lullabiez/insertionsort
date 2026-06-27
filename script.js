const barContainer = document.getElementById("bar-container");
const btnRandom = document.getElementById("btn-random");
const btnSort = document.getElementById("btn-sort");
const speedInput = document.getElementById("speed");
const statusText = document.getElementById("status-text");

let array = [];
const NUMBER_OF_BARS = 15; // Jumlah batang data yang akan diurutkan

// Fungsi pembuat jeda waktu (delay animasi)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Generasi data acak baru
function generateRandomArray() {
    barContainer.innerHTML = "";
    array = [];
    
    for (let i = 0; i < NUMBER_OF_BARS; i++) {
        // Membuat nilai acak antara 10 sampai 100
        const value = Math.floor(Math.random() * 90) + 10;
        array.push(value);
        
        // Membuat elemen DOM batang visualisasi
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 2.5}px`; // Mengatur tinggi skala batang
        bar.innerText = value;
        bar.id = `bar-${i}`;
        barContainer.appendChild(bar);
    }
    statusText.innerText = "Data berhasil diacak. Siap untuk disortir.";
    btnSort.disabled = false;
}

// Logika Algoritma Insertion Sort dengan Visualisasi
async function insertionSort() {
    btnSort.disabled = true;
    btnRandom.disabled = true;
    speedInput.disabled = true;

    const bars = document.getElementsByClassName("bar");
    
    // Elemen pertama dianggap sudah terurut secara default
    bars[0].classList.add("sorted");

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        
        // Dapatkan kecepatan delay terbaru dari slider (dibalik agar slider kanan lebih cepat)
        let delay = 1050 - speedInput.value;

        // Tandai elemen target saat ini (Key)
        bars[i].classList.add("current");
        statusText.innerText = `Mengambil elemen ke-${i} dengan nilai ${key} sebagai 'Key'.`;
        await sleep(delay);

        while (j >= 0 && array[j] > key) {
            delay = 1050 - speedInput.value;
            
            // Tandai elemen yang sedang dibandingkan dan akan digeser
            bars[j].classList.add("active");
            statusText.innerText = `Membandingkan: Apakah ${array[j]} > ${key}? Ya, geser ${array[j]} ke kanan.`;
            await sleep(delay);

            // Geser nilai di array asli
            array[j + 1] = array[j];
            
            // Update visualisasi DOM (tinggi dan teks)
            bars[j + 1].style.height = bars[j].style.height;
            bars[j + 1].innerText = bars[j].innerText;
            
            // Ubah status kelas warna pasca pergeseran
            bars[j + 1].classList.add("sorted");
            bars[j].classList.remove("sorted");
            bars[j].classList.remove("active");

            j = j - 1;
        }
        
        // Tempatkan key pada posisi yang benar
        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 2.5}px`;
        bars[j + 1].innerText = key;
        
        // Bersihkan kelas warna pendukung
        bars[i].classList.remove("current");
        
        // Tandai kembali area yang telah berhasil diurutkan sejauh index i
        for (let k = 0; k <= i; k++) {
            bars[k].classList.add("sorted");
        }
        
        statusText.innerText = `Menyisipkan 'Key' (${key}) pada posisi indeks ke-${j + 1}.`;
        await sleep(delay);
    }

    statusText.innerText = "Proses Selesai! Semua data telah terurut secara rapi.";
    btnRandom.disabled = false;
    speedInput.disabled = false;
}

// Event Listeners
btnRandom.addEventListener("click", generateRandomArray);
btnSort.addEventListener("click", insertionSort);

// Inisialisasi awal saat halaman dimuat
window.onload = generateRandomArray;