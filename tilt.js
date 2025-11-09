// tilt.js
// DİKKAT: Bu dosya içinde <script> etiketleri KULLANILMAMALIDIR.

// Sayfa içeriği tamamen yüklendikten sonra çalışmayı garanti eder.
document.addEventListener("DOMContentLoaded", function() {

    // -------------------------------------------------------------------------------------
    // 1. MOBİL MENÜ JS KODU
    // -------------------------------------------------------------------------------------
    const mobileMenu = document.getElementById('mobile-menu');
    const closeButton = document.getElementById('close-menu');

    // Açma butonu için
    document.querySelector('header button.md\\:hidden').addEventListener('click', () => {
        mobileMenu.classList.remove('-translate-x-full');
    });

    // Kapatma butonu için
    closeButton.addEventListener('click', () => {
        mobileMenu.classList.add('-translate-x-full');
    });
    
    // Linklere tıklayınca menüyü kapat
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('-translate-x-full');
        });
    });

    // -------------------------------------------------------------------------------------
    // 2. VERİ KAYNAĞI ve KART OLUŞTURMA
    // -------------------------------------------------------------------------------------
    const blogPosts = [
        {
            title: "Tailwind CSS ve 3D Tasarım",
            excerpt: "Sıfırdan modern bir koyu tema ve 3D derinlik algısı nasıl oluşturulur?",
            buttonText: "GÖRÜNTÜLE",
            color: "red",
            imageUrl: "https://source.unsplash.com/random/400x225/?dark,abstract" 
        },
        {
            title: "JavaScript ile Mobil Menü",
            excerpt: "Basit JS ile şık açılır-kapanır mobil menü (drawer) yapımı.",
            buttonText: "DEVAM",
            color: "indigo",
            imageUrl: "https://source.unsplash.com/random/400x225/?coding,neon" 
        },
        {
            title: "Favicon ve OG Meta Etiketleri",
            excerpt: "Sitenizin tarayıcı ve sosyal medya paylaşımlarında şık görünmesi.",
            buttonText: "BAŞARILI",
            color: "blue",
            imageUrl: "https://source.unsplash.com/random/400x225/?ui,glitch" 
        },
        {
            title: "Inter Font Entegrasyonu",
            excerpt: "Google Fonts'tan modern bir fontu Tailwind ile ana font yapma.",
            buttonText: "OKU",
            color: "green",
            imageUrl: "https://source.unsplash.com/random/400x225/?tech,pattern" 
        }
    ];

    const kartlarContainer = document.getElementById('kartlar');

    // Kartları oluştur
    blogPosts.forEach((post, index) => { 
        
        const delay = index * 0.15; // Animasyon gecikmesi
        
        const cardHTML = `
            <div 
                class="w-full sm:w-1/2 lg:w-1/4 p-6 rounded-lg flex flex-col gap-4 bg-gray-800 text-white 
                shadow-2xl relative" 
                style="
                    /* Animasyon Stilini Kartın Kendisine Uygula */
                    animation: fadeInUp 0.5s ease-out forwards; 
                    opacity: 0; 
                    animation-delay: ${delay}s;
                    /* 3D Görünüm İçin Gerekli */
                    transform-style: preserve-3d;
                    transform: perspective(1000px);
                "
            >
                <a href="post.html" class="absolute inset-0 z-0 rounded-lg"></a> 

                <img src="${post.imageUrl}" alt="${post.title} görseli" class="h-40 w-full object-cover rounded-xl" />
                <div class="flex flex-col gap-2">
                    <h2 class="text-xl font-bold">BLOG: ${post.title}</h2>
                    <p class="text-gray-400 text-sm">
                        ${post.excerpt}
                    </p>
                </div>
                <a href="post.html" class="block mt-auto z-10 relative">
                    <button class="w-full py-3 bg-${post.color}-600 text-white rounded-xl font-medium shadow-lg hover:bg-${post.color}-700 transition duration-300">
                        ${post.buttonText}
                    </button>
                </a>
            </div>
        `;

        // Oluşturulan kart HTML'ini kapsayıcıya ekle
        kartlarContainer.innerHTML += cardHTML;
    });

    // -------------------------------------------------------------------------------------
    // 3. TIKLAMA OLAYI (Dinamik Başlık Kaydetme)
    // -------------------------------------------------------------------------------------
    document.querySelectorAll('#kartlar a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Tıklanan linkin üstündeki h2 başlığını bul
            const cardTitle = link.closest('.w-full').querySelector('h2').textContent.replace('BLOG: ', '').trim();
            localStorage.setItem('currentPostTitle', cardTitle);
        });
    });

    // -------------------------------------------------------------------------------------
    // 4. GELİŞMİŞ EFEKT: MOUSE TAKİPLİ 3D TILT
    // -------------------------------------------------------------------------------------
    // Yeni oluşturulan kartları seç ve her birine olay dinleyicisi ekle
    document.querySelectorAll('#kartlar .w-full').forEach(card => {
        
        // Mouse kartın üzerine girdiğinde olay dinleyicisini tanımla
        card.addEventListener('mousemove', (e) => {
            
            // Mouse hareketi sırasında anlık tepkiyi garantilemek için geçişi sıfırla
            card.style.transition = 'transform 0s'; 

            const rect = card.getBoundingClientRect();
            
            // Mouse'un kart içindeki X ve Y koordinatlarını hesapla
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top; 
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Mouse'un merkeze olan uzaklığını ve açısını hesapla (Max 6 derece eğim)
            const rotateY = (x - centerX) / centerX * 6; 
            const rotateX = (centerY - y) / centerY * 6; 

            // CSS Transform stilini uygula
            card.style.transform = `
                perspective(1000px) 
                scale(1.03) /* Hafifçe büyüt */
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                translateZ(20px) /* Kartı öne çıkar */
            `;
        });

        // Mouse karttan ayrıldığında eski haline döndür (yumuşak geçişle)
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s ease'; // Geri dönüş yumuşak olsun
            card.style.transform = 'perspective(1000px) scale(1) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

}); // DOMContentLoaded sonu.