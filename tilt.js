// tilt.js
// NİHAİ ÇALIŞAN VERSİYON: DOMContentLoaded, setTimeout ve Z-0 Link Listener içerir.

document.addEventListener("DOMContentLoaded", function() {

    // -------------------------------------------------------------------------------------
    // 1. MOBİL MENÜ JS KODU
    // -------------------------------------------------------------------------------------
    const mobileMenu = document.getElementById('mobile-menu');
    const closeButton = document.getElementById('close-menu');

    document.querySelector('header button.md\\:hidden').addEventListener('click', () => {
        mobileMenu.classList.remove('-translate-x-full');
    });

    closeButton.addEventListener('click', () => {
        mobileMenu.classList.add('-translate-x-full');
    });
    
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('-translate-x-full');
        });
    });

    // -------------------------------------------------------------------------------------
    // 2. VERİ KAYNAĞI ve KART OLUŞTURMA (3D Stilleri Burada Ekleniyor)
    // -------------------------------------------------------------------------------------
    const blogPosts = [
        { title: "Tailwind CSS ve 3D Tasarım", excerpt: "Sıfırdan modern bir koyu tema ve 3D derinlik algısı nasıl oluşturulur?", buttonText: "GÖRÜNTÜLE", color: "red", imageUrl: "https://source.unsplash.com/random/400x225/?dark,abstract" },
        { title: "JavaScript ile Mobil Menü", excerpt: "Basit JS ile şık açılır-kapanır mobil menü (drawer) yapımı.", buttonText: "DEVAM", color: "indigo", imageUrl: "https://source.unsplash.com/random/400x225/?coding,neon" },
        { title: "Favicon ve OG Meta Etiketleri", excerpt: "Sitenizin tarayıcı ve sosyal medya paylaşımlarında şık görünmesi.", buttonText: "BAŞARILI", color: "blue", imageUrl: "https://source.unsplash.com/random/400x225/?ui,glitch" },
        { title: "Inter Font Entegrasyonu", excerpt: "Google Fonts'tan modern bir fontu Tailwind ile ana font yapma.", buttonText: "OKU", color: "green", imageUrl: "https://source.unsplash.com/random/400x225/?tech,pattern" }
    ];

    const kartlarContainer = document.getElementById('kartlar');

    blogPosts.forEach((post, index) => { 
        
        const delay = index * 0.15; // Animasyon gecikmesi
        
        const cardHTML = `
            <div 
                class="w-full sm:w-1/2 lg:w-1/4 p-6 rounded-lg flex flex-col gap-4 bg-gray-800 text-white 
                shadow-2xl relative" 
                style="
                    animation: fadeInUp 0.5s ease-out forwards; 
                    opacity: 0; 
                    animation-delay: ${delay}s;
                    /* 3D Görünüm İçin Gerekli Olanlar */
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

        kartlarContainer.innerHTML += cardHTML;
    });

    // -------------------------------------------------------------------------------------
    // 3. TIKLAMA OLAYI (Dinamik Başlık Kaydetme)
    // -------------------------------------------------------------------------------------
    document.querySelectorAll('#kartlar a').forEach(link => {
        link.addEventListener('click', (e) => {
            const cardTitle = link.closest('.w-full').querySelector('h2').textContent.replace('BLOG: ', '').trim();
            localStorage.setItem('currentPostTitle', cardTitle);
        });
    });

    // -------------------------------------------------------------------------------------
    // 4. GELİŞMİŞ EFEKT: MOUSE TAKİPLİ 3D TILT (Listener Z-0 linkine taşındı)
    // -------------------------------------------------------------------------------------
    
    // Kodun çalışmasını 10ms geciktirerek kartların DOM'a kesinlikle yerleşmesini sağla
    setTimeout(() => {
        
        document.querySelectorAll('#kartlar .w-full').forEach(card => {
            
            // Mouse olaylarını yakalaması gereken görünmez Z-0 linkini seç
            const interactiveElement = card.querySelector('a.absolute.inset-0'); 
            if (!interactiveElement) return; // Z-0 linki yoksa devam etme.

            // Mouse hareketini asıl tıklanabilir elementten dinle
            interactiveElement.addEventListener('mousemove', (e) => {
                
                // Tilt'i uyguladığımız card elementine müdahale et
                card.style.transition = 'transform 0s'; 

                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top; 
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = (x - centerX) / centerX * 6; 
                const rotateX = (centerY - y) / centerY * 6; 

                card.style.transform = `
                    perspective(1000px) 
                    scale(1.03) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg)
                    translateZ(20px) 
                `;
            });

            // Mouse karttan ayrıldığında eski haline döndür (mouseleave hala card'da dinlenmeli)
            card.addEventListener('mouseleave', () => { 
                card.style.transition = 'transform 0.5s ease'; 
                card.style.transform = 'perspective(1000px) scale(1) rotateX(0) rotateY(0) translateZ(0)';
            });
        });

    }, 10); // 10 milisaniye gecikme.

}); // DOMContentLoaded sonu.