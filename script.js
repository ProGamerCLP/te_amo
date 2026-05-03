/* ==========================================
   CONFIGURACIÓN Y VARIABLES GLOBALES
   ========================================== */
let phase1Stage, phase1Container, captureContainers, captureIndex;
let escena, camara, renderizador, saturno, controles, fuente;
let objectsMessage = [], objectsTextRing = [];
let audioHabilitado = false, audioReproducido = false;
let lluviaCorazonesActiva = false, contadorToques = 0;
let fase2Iniciada = false, indiceFrase = 0;
let videosArray = []; // Para gestionar el ciclo de los videos

// REPRODUCTOR GLOBAL ÚNICO (Optimización extrema para evitar Context Lost)
let globalVideoElement = document.createElement('video');
globalVideoElement.muted = true;
globalVideoElement.defaultMuted = true;
globalVideoElement.playsInline = true;
globalVideoElement.crossOrigin = "anonymous";
// Atributos estrictos para obligar al autoplay silencioso en móviles
globalVideoElement.setAttribute('playsinline', 'true');
globalVideoElement.setAttribute('webkit-playsinline', 'true');
globalVideoElement.setAttribute('muted', 'true');
let globalVideoTexture = new THREE.VideoTexture(globalVideoElement);
globalVideoTexture.minFilter = THREE.LinearFilter;
globalVideoTexture.magFilter = THREE.LinearFilter;
globalVideoTexture.generateMipmaps = false;

// Vincular al DOM (Obligatorio para algunos navegadores móviles)
globalVideoElement.style.display = 'none';
document.body.appendChild(globalVideoElement);

const cargadorTexturas = new THREE.TextureLoader();
const cargadorFuentes = new THREE.FontLoader();

// Configuración de Medios
const MEDIA_CONFIG = {
    audio: 'Manuel Carrasco - Uno X Uno.mp3',
    saturno: 'img/1.jpg', 
    mensajes: [
        "Screenshot_2026-02-14-21-47-15-870_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-02-15-19-23-29-553_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-02-16-08-44-08-781_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-02-16-08-48-46-311_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-02-23-00-42-15-844_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-02-11-40-42-825_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-02-12-39-44-264_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-02-12-40-18-570_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-02-14-32-01-628_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-02-19-27-32-882_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-04-13-32-09-925_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-04-13-42-38-677_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-09-17-37-37-994_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-11-06-02-14-441_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-12-06-26-57-250_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-12-06-38-15-391_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-13-21-15-00-750_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-13-21-20-01-880_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-14-04-13-57-386_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-14-10-01-05-484_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-14-22-07-15-955_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-17-06-20-08-064_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-17-06-45-06-864_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-17-08-21-29-604_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-17-08-39-19-650_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-17-08-41-52-920_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-17-15-03-58-145_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-17-15-14-59-261_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-17-15-23-53-975_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-17-16-13-15-712_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-17-19-43-11-305_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-19-10-40-37-017_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-19-10-57-03-439_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-19-10-59-53-928_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-19-11-07-34-540_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-19-11-10-09-237_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-19-11-22-24-275_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-19-11-25-38-969_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-19-11-32-57-883_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-19-11-53-43-778_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-19-11-54-00-314_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-19-11-57-08-243_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-19-12-35-08-491_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-19-13-45-32-141_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-19-14-01-34-439_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-19-14-13-08-140_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-19-21-34-31-831_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-19-21-38-20-517_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-20-13-50-33-509_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-20-13-50-53-861_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-20-13-56-49-477_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-20-16-29-19-610_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-20-16-47-03-158_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-20-19-05-42-930_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-20-19-05-51-522_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-23-20-21-42-124_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-23-21-24-25-954_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-23-21-26-42-599_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-25-06-24-16-975_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-25-06-27-52-159_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-25-23-37-11-228_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-25-23-51-10-492_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-27-23-38-59-814_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-29-12-05-18-124_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-30-04-38-55-482_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-30-04-43-34-731_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-30-05-50-38-557_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-30-05-56-28-805_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-30-09-22-20-769_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-30-09-26-53-617_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-03-30-09-29-21-181_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-01-11-19-51-675_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-01-12-18-38-768_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-01-12-18-40-401_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-01-18-28-02-144_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-02-06-35-19-327_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-03-10-28-51-853_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-03-10-28-52-586_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-03-10-56-18-554_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-03-11-23-17-226_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-03-11-54-26-504_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-03-12-31-02-897_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-03-20-07-10-329_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-04-07-40-29-889_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-04-07-55-48-507_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-04-08-25-27-707_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-05-13-34-31-827_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-06-11-29-55-344_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-10-10-29-55-856_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-13-03-13-02-186_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-13-03-14-34-999_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-13-06-20-50-697_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-13-12-18-17-221_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-13-21-26-52-565_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-14-17-28-31-584_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-14-17-28-33-889_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-17-19-28-20-600_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-18-05-55-02-703_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-18-06-05-42-238_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-18-06-19-32-510_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-18-06-25-51-556_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-18-08-26-35-245_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-20-04-43-56-856_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-20-05-47-17-781_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-20-06-03-55-982_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-21-06-49-12-780_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-21-06-49-27-104_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-21-06-49-50-915_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-21-06-52-24-756_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-21-06-55-19-261_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-21-06-55-39-613_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-21-06-55-58-694_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-21-06-58-17-925_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-21-06-58-38-957_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-21-13-57-29-183_com.whatsapp.jpg",
        "Screenshot_2026-04-22-05-56-59-518_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-22-09-32-36-180_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-22-22-19-34-554_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-23-03-29-28-965_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-23-03-33-16-945_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-23-03-53-17-116_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-25-17-32-22-233_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-25-20-36-17-414_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-25-20-43-35-229_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-25-20-48-32-622_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-29-15-56-25-941_com.zhiliaoapp.musically.jpg",
        "Screenshot_2026-04-29-15-56-27-725_com.zhiliaoapp.musically.jpg",
        "Screenrecorder-2026-02-06-09-47-13-757.mp4",
        "Screenrecorder-2026-02-06-12-22-23-223.mp4",
        "Screenrecorder-2026-02-14-15-00-04-474.mp4",
        "Screenrecorder-2026-02-16-19-31-30-161.mp4",
        "Screenrecorder-2026-02-19-22-25-42-887.mp4",
        "Screenrecorder-2026-02-19-22-27-18-297.mp4",
        "Screenrecorder-2026-02-19-22-35-08-217.mp4",
        "Screenrecorder-2026-02-20-09-13-16-343.mp4",
        "Screenrecorder-2026-02-20-17-54-34-633.mp4",
        "Screenrecorder-2026-02-20-18-26-44-579.mp4",
        "Screenrecorder-2026-02-20-19-01-16-22.mp4",
        "Screenrecorder-2026-02-21-08-29-41-146.mp4",
        "Screenrecorder-2026-02-22-03-37-56-979.mp4",
        "Screenrecorder-2026-02-22-17-40-30-974.mp4",
        "Screenrecorder-2026-02-23-00-42-35-259.mp4",
        "Screenrecorder-2026-02-23-00-43-48-704.mp4",
        "Screenrecorder-2026-02-23-00-49-30-788.mp4",
        "Screenrecorder-2026-02-24-01-12-56-328.mp4",
        "Screenrecorder-2026-02-24-01-14-44-940.mp4",
        "Screenrecorder-2026-02-24-01-16-01-205.mp4",
        "Screenrecorder-2026-02-24-01-16-53-870.mp4",
        "Screenrecorder-2026-02-24-17-36-30-542.mp4",
        "Screenrecorder-2026-02-24-19-14-20-122.mp4",
        "Screenrecorder-2026-02-25-08-21-40-771.mp4",
        "Screenrecorder-2026-02-25-15-48-59-340.mp4",
        "Screenrecorder-2026-02-25-16-27-04-397.mp4",
        "Screenrecorder-2026-02-25-20-46-35-252.mp4",
        "Screenrecorder-2026-02-27-07-47-18-788.mp4",
        "Screenrecorder-2026-02-27-20-37-23-724.mp4",
        "Screenrecorder-2026-02-27-21-07-12-337.mp4",
        "Screenrecorder-2026-02-28-13-44-18-854.mp4",
        "Screenrecorder-2026-03-01-10-37-37-844.mp4",
        "Screenrecorder-2026-03-01-13-30-47-358.mp4",
        "Screenrecorder-2026-03-01-14-08-14-789.mp4",
        "Screenrecorder-2026-03-01-17-45-04-459.mp4",
        "Screenrecorder-2026-03-01-22-19-01-450.mp4",
        "Screenrecorder-2026-03-03-01-10-08-478.mp4",
        "Screenrecorder-2026-03-03-23-49-32-625.mp4",
        "Screenrecorder-2026-03-04-05-17-38-989.mp4",
        "Screenrecorder-2026-03-05-07-01-48-113.mp4",
        "Screenrecorder-2026-03-05-09-33-31-207.mp4",
        "Screenrecorder-2026-03-05-10-08-18-216.mp4",
        "Screenrecorder-2026-03-05-10-49-03-318.mp4",
        "Screenrecorder-2026-03-06-05-28-02-285.mp4",
        "Screenrecorder-2026-03-06-07-13-36-923.mp4",
        "Screenrecorder-2026-03-06-15-44-25-836.mp4",
        "Screenrecorder-2026-03-06-15-52-45-735.mp4",
        "Screenrecorder-2026-03-08-05-42-39-218.mp4",
        "Screenrecorder-2026-03-09-06-22-19-289.mp4",
        "Screenrecorder-2026-03-11-05-31-06-465.mp4",
        "Screenrecorder-2026-03-11-18-13-13-897.mp4",
        "Screenrecorder-2026-03-11-23-25-33-990.mp4",
        "Screenrecorder-2026-03-14-04-15-04-629.mp4",
        "Screenrecorder-2026-03-17-19-43-23-305.mp4",
        "Screenrecorder-2026-03-18-23-35-54-506.mp4",
        "Screenrecorder-2026-03-18-23-46-45-865.mp4",
        "Screenrecorder-2026-03-19-09-44-00-859.mp4",
        "Screenrecorder-2026-03-19-10-13-33-966.mp4",
        "Screenrecorder-2026-03-19-11-24-52-435.mp4",
        "Screenrecorder-2026-03-19-11-30-05-190.mp4",
        "Screenrecorder-2026-03-19-11-39-02-557.mp4",
        "Screenrecorder-2026-03-19-11-56-19-193.mp4",
        "Screenrecorder-2026-03-19-12-11-12-653.mp4",
        "Screenrecorder-2026-03-19-13-36-56-542.mp4",
        "Screenrecorder-2026-03-19-21-20-36-545.mp4",
        "Screenrecorder-2026-03-20-16-48-39-12.mp4",
        "Screenrecorder-2026-03-22-08-10-38-347.mp4",
        "Screenrecorder-2026-03-22-21-46-03-891.mp4",
        "Screenrecorder-2026-03-23-09-23-47-827.mp4",
        "Screenrecorder-2026-03-23-09-42-17-232.mp4",
        "Screenrecorder-2026-03-23-09-54-29-326.mp4",
        "Screenrecorder-2026-03-23-12-16-27-20.mp4",
        "Screenrecorder-2026-03-23-14-14-24-945.mp4",
        "Screenrecorder-2026-03-23-14-18-39-320.mp4",
        "Screenrecorder-2026-03-24-06-08-59-77.mp4",
        "Screenrecorder-2026-03-24-06-10-24-726.mp4",
        "Screenrecorder-2026-03-24-06-13-05-622.mp4",
        "Screenrecorder-2026-03-24-06-14-43-392.mp4",
        "Screenrecorder-2026-03-24-06-17-40-289.mp4",
        "Screenrecorder-2026-03-24-06-19-33-610.mp4",
        "Screenrecorder-2026-03-24-06-20-36-923.mp4",
        "Screenrecorder-2026-03-24-22-28-58-409.mp4",
        "Screenrecorder-2026-03-25-21-32-14-770.mp4",
        "Screenrecorder-2026-03-29-01-47-56-848.mp4",
        "Screenrecorder-2026-03-29-11-30-52-207.mp4",
        "Screenrecorder-2026-03-29-11-33-06-356.mp4",
        "Screenrecorder-2026-03-30-05-53-15-966.mp4",
        "Screenrecorder-2026-03-30-21-54-43-936.mp4",
        "Screenrecorder-2026-03-31-04-59-51-542.mp4",
        "Screenrecorder-2026-04-01-18-28-13-77.mp4",
        "Screenrecorder-2026-04-02-10-54-05-508.mp4",
        "Screenrecorder-2026-04-02-10-58-24-605.mp4",
        "Screenrecorder-2026-04-04-07-51-55-48.mp4",
        "Screenrecorder-2026-04-04-08-09-14-957.mp4",
        "Screenrecorder-2026-04-04-08-14-26-686.mp4",
        "Screenrecorder-2026-04-04-08-18-20-211.mp4",
        "Screenrecorder-2026-04-04-08-30-55-642.mp4",
        "Screenrecorder-2026-04-04-19-54-38-965.mp4",
        "Screenrecorder-2026-04-05-09-36-05-806.mp4",
        "Screenrecorder-2026-04-05-16-12-16-841.mp4",
        "Screenrecorder-2026-04-06-19-10-22-522.mp4",
        "Screenrecorder-2026-04-07-11-18-30-360.mp4",
        "Screenrecorder-2026-04-08-13-30-59-54.mp4",
        "Screenrecorder-2026-04-08-13-42-36-458.mp4",
        "Screenrecorder-2026-04-08-22-00-50-887.mp4",
        "Screenrecorder-2026-04-12-08-33-02-483.mp4",
        "Screenrecorder-2026-04-12-16-33-33-65.mp4",
        "Screenrecorder-2026-04-12-16-37-59-710.mp4",
        "Screenrecorder-2026-04-12-16-41-20-189.mp4",
        "Screenrecorder-2026-04-13-03-26-51-657.mp4",
        "Screenrecorder-2026-04-13-03-28-24-733.mp4",
        "Screenrecorder-2026-04-13-03-51-35-487.mp4",
        "Screenrecorder-2026-04-13-06-26-34-271.mp4",
        "Screenrecorder-2026-04-13-18-31-32-47.mp4",
        "Screenrecorder-2026-04-17-19-10-39-552.mp4",
        "Screenrecorder-2026-04-18-06-08-14-329.mp4",
        "Screenrecorder-2026-04-19-06-10-06-775.mp4",
        "Screenrecorder-2026-04-26-07-06-42-986.mp4",
        "Screenrecorder-2026-05-01-19-06-52-957.mp4"
    ],
    frases: [
        "TE AMO", "ME ENCANTAS", "MI AMOR", "MI VIDA", "MI REINA", "MI PRINCESA", "MI MUNDO", "DUEÑA DE MI SER", "PRECIOSA REINA", "MAMASITA", "CHULA",
        "MI CIELO", "MI TESORO", "MI TODO", "MI RAZÓN DE SER", "MI LUGAR SEGURO", "MI DESTINO", "ERES MAGIA", "SIEMPRE JUNTOS", "MI PEDACITO DE CIELO",
        "MI LUZ", "MI CORAZÓN", "ERES ÚNICA", "TE ADORO", "MI BELLA", "MI COMPLEMENTO", "MI SUEÑO REALIDAD", "ERES MI VIDA", "MI PASIÓN", "MI ALEGRÍA",
        "MI ETERNIDAD", "MI BENDICIÓN", "MI ÁNGEL", "MI DULZURA", "MI REFUGIO", "MI PAZ", "MI MOTIVACIÓN", "MI INSPIRACIÓN", "MI GRAN AMOR", "MI MEJOR DECISIÓN",
        "MI COMPAÑERA", "MI ALMA GEMELA", "MI OTRA MITAD", "MI MUSA", "MI DELIRIO", "MI DESEO", "MI ADORACIÓN", "MI PRECIOSA", "MI HERMOSA", "MI LINDA",
        "MI CIELO ESTRELLADO", "MI SOL", "MI LUNA", "MI ESTRELLA", "MI CAMINO", "MI NORTE", "MI ANCLA", "MI REFLEJO", "MI VERDAD", "MI CANCIÓN",
        "MI POEMA", "MI HISTORIA", "MI PRESENTE", "MI FUTURO", "MI SIEMPRE", "MI JAMÁS SIN TI", "MI ÚNICO AMOR", "MI AMOR ETERNO", "MI AMOR PURO", "MI AMOR VERDADERO",
        "MI VIDA ENTERA", "MI MUNDO ENTERO", "MI REINA BELLA", "MI PRINCESA HERMOSA", "MI CHULA LINDA", "MI MAMASITA RICA", "MI PRECIOSA MUJER", "MI DUEÑA", "MI SEÑORA", "MI COMPAÑERA DE VIDA",
        "MI APOYO", "MI FUERZA", "MI VALOR", "MI ORGULLO", "MI TESORO DIVINO", "MI REGALO DEL CIELO", "MI MILAGRO", "MI SUERTE", "MI FORTUNA", "MI RIQUEZA",
        "MI PARAÍSO", "MI GLORIA", "MI TRIUNFO", "MI ÉXITO", "MI LOGRO", "MI SUEÑO CUMPLIDO", "MI REALIDAD PREFERIDA", "MI TODO Y MÁS", "MI INFINITO", "POR SIEMPRE TUYO"
    ]
};

/* ==========================================
   FASE 1: CORAZONES INFINITOS (EaselJS)
   ========================================== */
function initFase1() {
    const canvas = document.getElementById("testCanvas");
    if (!canvas) return;
    phase1Stage = new createjs.Stage(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const w = canvas.width;
    const h = canvas.height;

    phase1Container = new createjs.Container();
    phase1Stage.addChild(phase1Container);

    captureContainers = [];
    captureIndex = 0;

    for (let i = 0; i < 100; i++) {
        let heart = new createjs.Shape();
        heart.graphics.beginFill(createjs.Graphics.getHSL(Math.random() * 30 - 45, 100, 50 + Math.random() * 30));
        heart.graphics.moveTo(0, -12).curveTo(1, -20, 8, -20).curveTo(16, -20, 16, -10).curveTo(16, 0, 0, 12);
        heart.graphics.curveTo(-16, 0, -16, -10).curveTo(-16, -20, -8, -20).curveTo(-1, -20, 0, -12);
        heart.y = -100;
        phase1Container.addChild(heart);
    }

    for (let i = 0; i < 100; i++) {
        let captureContainer = new createjs.Container();
        captureContainer.cache(0, 0, w, h);
        captureContainers.push(captureContainer);
    }

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.on("tick", tickFase1);
}

function tickFase1(event) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const l = phase1Container.numChildren;

    captureIndex = (captureIndex + 1) % captureContainers.length;
    phase1Stage.removeChildAt(0);
    let captureContainer = captureContainers[captureIndex];
    phase1Stage.addChildAt(captureContainer, 0);
    captureContainer.addChild(phase1Container);

    for (let i = 0; i < l; i++) {
        let heart = phase1Container.getChildAt(i);
        if (heart.y < -50) {
            heart._x = Math.random() * w;
            heart.y = h * (1 + Math.random()) + 50;
            heart.perX = (1 + Math.random() * 2) * h;
            heart.offX = Math.random() * h;
            heart.ampX = heart.perX * 0.1 * (0.15 + Math.random());
            heart.velY = -Math.random() * 2 - 1;
            heart.scale = Math.random() * 2 + 1;
            heart._rotation = Math.random() * 40 - 20;
            heart.alpha = Math.random() * 0.75 + 0.05;
            heart.compositeOperation = Math.random() < 0.33 ? "lighter" : "source-over";
        }
        let int = (heart.offX + heart.y) / heart.perX * Math.PI * 2;
        heart.y += heart.velY * heart.scaleX / 2;
        heart.x = heart._x + Math.cos(int) * heart.ampX;
        heart.rotation = heart._rotation + Math.sin(int) * 30;
    }

    captureContainer.updateCache("source-over");
    phase1Stage.update(event);
}

/* ==========================================
   TRANSICIÓN Y CARGA
   ========================================== */
const btnIniciar = document.getElementById('btn-iniciar');
if (btnIniciar) {
    btnIniciar.addEventListener('click', () => {
        if (btnIniciar.disabled) return;
        btnIniciar.disabled = true;
        btnIniciar.style.opacity = '0.5';
        btnIniciar.innerText = 'Iniciando...';

        createjs.Ticker.removeAllEventListeners("tick");
        document.getElementById('fase1-container').style.opacity = '0';
        audioHabilitado = true;
        reproducirAudio();
        setTimeout(() => {
            document.getElementById('fase1-container').style.display = 'none';
            document.getElementById('cargando').style.display = 'flex';
            simularCarga();
        }, 1500);
    });
}

function simularCarga() {
    const cargadorReloj = document.getElementById('cargador-reloj');
    const textoProgreso = document.getElementById('texto-progreso');
    let progreso = 0;
    const intervalo = setInterval(() => {
        progreso += 1;
        if (progreso <= 100) {
            if (cargadorReloj) cargadorReloj.style.setProperty('--progreso', progreso + '%');
            if (textoProgreso) textoProgreso.textContent = progreso + '%';
        } else {
            clearInterval(intervalo);
            setTimeout(iniciarFase2, 500);
        }
    }, 30);
}

/* ==========================================
   FASE 2: GALAXIA 3D (Three.js)
   ========================================== */
function iniciarFase2() {
    if (fase2Iniciada) return;
    fase2Iniciada = true;

    document.getElementById('cargando').style.display = 'none';
    document.getElementById('fase2-container').style.display = 'block';
    crearEstrellasCSS(150);
    cargadorFuentes.load('https://threejs.org/examples/fonts/gentilis_regular.typeface.json',
        (fuenteCargada) => {
            fuente = fuenteCargada;
            armarEscena3D();
            
            // INICIO SECUENCIAL DE VIDEOS: Para optimización extrema
            startSequentialVideoPlayback();
        },
        undefined,
        (err) => {
            console.warn("No font loaded, continuing without 3D text.");
            armarEscena3D();
        }
    );
}

function armarEscena3D() {
    escena = new THREE.Scene();
    camara = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camara.position.set(0, 10, 45); // Alejar cámara para ver más objetos
    renderizador = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: 'high-performance' // Pedir máximo rendimiento al hardware
    });
    renderizador.setSize(window.innerWidth, window.innerHeight);
    renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const container = document.getElementById('contenedor-escena');
    if (container) container.appendChild(renderizador.domElement);
    controles = new THREE.OrbitControls(camara, renderizador.domElement);
    controles.enableDamping = true;
    controles.autoRotate = true;
    controles.autoRotateSpeed = 0.1; // Más lento (antes 0.2)
    const luzAmbiental = new THREE.AmbientLight(0x444477, 0.4);
    escena.add(luzAmbiental);
    const luzPunto = new THREE.PointLight(0xff69b4, 1.2, 60);
    luzPunto.position.set(0, 0, 15);
    escena.add(luzPunto);
    crearSaturno();
    crearAnilloTexto();
    crearMensajesAmor();
    configurarEventosFase2();
    animarFase2();
}

function crearSaturno() {
    const geo = new THREE.SphereGeometry(4, 64, 64); // Reducido de 128 a 64 para optimizar polígonos
    const mat = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 20 });
    saturno = new THREE.Mesh(geo, mat);
    saturno.castShadow = true;
    saturno.receiveShadow = true;
    escena.add(saturno);
    cargadorTexturas.load(MEDIA_CONFIG.saturno, (tex) => {
        tex.anisotropy = renderizador.capabilities.getMaxAnisotropy();
        saturno.material.map = tex;
        saturno.material.needsUpdate = true;
    }, undefined, (err) => {
        console.error("Error cargando textura de Saturno:", MEDIA_CONFIG.saturno);
        // Color de respaldo si falla la imagen
        saturno.material.color.setHex(0xff69b4);
    });
    const geoAtmosfera = new THREE.SphereGeometry(4.2, 64, 64);
    const matAtmosfera = new THREE.MeshPhongMaterial({ color: 0x88aaff, transparent: true, opacity: 0.1, side: THREE.BackSide });
    const atmosfera = new THREE.Mesh(geoAtmosfera, matAtmosfera);
    saturno.add(atmosfera);
}

function crearAnilloTexto() {
    if (!fuente) return;
    const radio = 8; // Aumentar radio
    const texto = "PARA EL AMOR DE MI VIDA - TE AMO CON TODO MI CORAZÓN";
    const paso = (Math.PI * 2) / texto.length;
    for (let i = 0; i < texto.length; i++) {
        const geo = new THREE.TextGeometry(texto[i], { font: fuente, size: 0.5, height: 0.08 });
        const mat = new THREE.MeshPhongMaterial({ color: 0xDC143C, emissive: 0x550044 });
        const mesh = new THREE.Mesh(geo, mat);
        const angulo = -i * paso;
        mesh.position.set(Math.cos(angulo) * radio, 0, Math.sin(angulo) * radio);
        mesh.rotation.y = angulo + Math.PI;
        mesh.rotation.x = Math.PI / 2;
        escena.add(mesh);
        objectsTextRing.push(mesh);
    }
}

function crearMensajesAmor() {
    // 1. Procesamos la lista completa para cargar las FOTOS.
    MEDIA_CONFIG.mensajes.forEach((filename, i) => {
        const isVideo = filename.toLowerCase().endsWith('.mp4');
        const url = 'img/' + filename;
        let material;

        if (isVideo) {
            // Los videos nacen como un lienzo "apagado" (púrpura muy oscuro)
            material = new THREE.MeshBasicMaterial({ 
                color: 0x1a0512, 
                side: THREE.DoubleSide, 
                transparent: true, 
                opacity: 0.8 
            });
        } else {
            // Las imágenes se cargan normalmente
            const tex = cargadorTexturas.load(url, (loadedTex) => {
                loadedTex.anisotropy = renderizador.capabilities.getMaxAnisotropy();
                loadedTex.generateMipmaps = false;
                loadedTex.minFilter = THREE.LinearFilter;
                loadedTex.magFilter = THREE.LinearFilter;
            });
            material = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide, transparent: true });
        }

        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), material);

        const dist = 15 + Math.random() * 25;
        const ang = Math.random() * Math.PI * 2;
        const alt = (Math.random() - 0.5) * 30;

        mesh.position.set(Math.cos(ang) * dist, alt, Math.sin(ang) * dist);
        escena.add(mesh);
        
        objectsMessage.push({ malla: mesh, alturaOriginal: alt, velocidad: 0.1 + Math.random() * 0.15, angulo: ang, distancia: dist });

        if (isVideo) {
            // Guardamos la malla del video en la fila de reproducción secuencial
            videosArray.push({ mesh: mesh, url: url, originalMaterial: material });
        }
    });

    // 2. Añadir frases de amor
    MEDIA_CONFIG.frases.forEach((content, i) => {
        if (!fuente) return;
        const geo = new THREE.TextGeometry(content, { font: fuente, size: 0.6, height: 0.15 });
        geo.center();
        const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0xff69b4, emissive: 0x550033 }));

        const dist = 10 + Math.random() * 10;
        const ang = Math.random() * Math.PI * 2;
        const alt = (Math.random() - 0.5) * 10;

        mesh.position.set(Math.cos(ang) * dist, alt, Math.sin(ang) * dist);
        escena.add(mesh);
        objectsMessage.push({ malla: mesh, alturaOriginal: alt, velocidad: 0.3 + Math.random() * 0.2, angulo: ang, distancia: dist });
    });
}

function configurarEventosFase2() {
    document.removeEventListener('click', manejarToque);
    document.removeEventListener('touchstart', manejarToque);
    document.addEventListener('click', manejarToque);
    document.addEventListener('touchstart', manejarToque);
    const btnAudio = document.getElementById('alternar-audio');
    if (btnAudio) btnAudio.addEventListener('click', alternarAudio);
    window.addEventListener('resize', () => {
        if (camara && renderizador) {
            camara.aspect = window.innerWidth / window.innerHeight;
            camara.updateProjectionMatrix();
            renderizador.setSize(window.innerWidth, window.innerHeight);
        }
    });
}

let ultimoToque = 0;
function manejarToque(e) {
    if (e.target.closest('#alternar-audio') || e.target.closest('.modal')) return;

    // Evitar doble disparo (click y touch)
    const ahora = Date.now();
    if (ahora - ultimoToque < 300) return;
    ultimoToque = ahora;

    reproducirAudio();
    
    // DESBLOQUEO DE VIDEO GLOBAL: Un solo elemento para ahorrar recursos
    if (globalVideoElement && globalVideoElement.src) {
        globalVideoElement.play().catch(e => console.log("Esperando carga completa para reproducir..."));
    }

    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    if (x && y) {
        crearExplosionUI(x, y);
        crearLluviaCorazonesUI();
        const indicador = document.getElementById('indicador-toque');
        if (indicador) {
            indicador.style.left = x + 'px';
            indicador.style.top = y + 'px';
            indicador.style.opacity = '1';
            setTimeout(() => { indicador.style.opacity = '0'; }, 300);
        }
    }
}

function crearExplosionUI(x, y) {
    // SOLO UN MENSAJE POR CLIC (EN ORDEN SECUENCIAL)
    const div = document.createElement('div');
    div.className = 'explosion-texto';

    // Obtener la frase actual y avanzar el índice
    div.innerText = MEDIA_CONFIG.frases[indiceFrase];
    indiceFrase = (indiceFrase + 1) % MEDIA_CONFIG.frases.length;

    // Suave dispersión
    const offX = (Math.random() - 0.5) * 100;
    const offY = (Math.random() - 0.5) * 100;

    div.style.left = (x + offX) + 'px';
    div.style.top = (y + offY) + 'px';
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 4000);
}

function crearLluviaCorazonesUI() {
    // LLUVIA REDUCIDA PARA EVITAR LAG (35 CORAZONES)
    for (let i = 0; i < 35; i++) {
        setTimeout(() => {
            const c = document.createElement('div');
            c.className = 'corazon-volador';
            c.innerHTML = '❤️';
            c.style.left = Math.random() * 100 + 'vw';
            c.style.top = Math.random() * 100 + 'vh';
            const destX = (Math.random() - 0.5) * 40;
            c.style.setProperty('--destX', destX + 'vw');
            const duracion = Math.random() * 4 + 4; // Mucho más lento (4-8s)
            c.style.fontSize = (Math.random() * 30 + 15) + 'px';
            c.style.animation = `explotarCorazon ${duracion}s ease-in-out forwards`;
            document.body.appendChild(c);
            setTimeout(() => c.remove(), duracion * 1000);
        }, i * 25);
    }
}

function alternarAudio() {
    audioHabilitado = !audioHabilitado;
    const btn = document.getElementById('alternar-audio');
    if (audioHabilitado) {
        btn.textContent = 'ON';
        btn.style.background = 'rgba(255, 105, 180, 0.3)';
        reproducirAudio();
    } else {
        btn.textContent = 'OFF';
        btn.style.background = 'rgba(255, 255, 255, 0.15)';
        const audio = document.getElementById('audio-fondo');
        if (audio) audio.pause();
    }
}

function reproducirAudio() {
    const audio = document.getElementById('audio-fondo');
    if (audio && audioHabilitado) {
        audio.play().then(() => { audioReproducido = true; }).catch(e => console.log("Audio unlock"));
    }
}

function crearEstrellasCSS(cant) {
    const cielo = document.getElementById('cielo-estrellas');
    if (!cielo) return;
    for (let i = 0; i < cant; i++) {
        const s = document.createElement('div');
        s.className = 'estrella';
        const sz = Math.random() * 2 + 1;
        s.style.width = s.style.height = sz + 'px';
        s.style.left = Math.random() * 100 + 'vw';
        s.style.top = Math.random() * 100 + 'vh';
        s.style.setProperty('--retraso', Math.random() * 5 + 's');
        s.style.setProperty('--duracion', (Math.random() * 4 + 2) + 's');
        cielo.appendChild(s);
    }
}

function animarFase2() {
    requestAnimationFrame(animarFase2);
    if (saturno) saturno.rotation.y += 0.0005; // Más lento (antes 0.001)
    objectsTextRing.forEach((obj, i) => {
        obj.rotation.y += 0.0005; // Más lento
        obj.position.y = Math.sin(Date.now() * 0.0005 + i * 0.1) * 0.2;
        obj.lookAt(camara.position);
    });
    const t = Date.now() * 0.001;
    objectsMessage.forEach((obj, i) => {
        obj.malla.position.y = obj.alturaOriginal + Math.sin(t * obj.velocidad + i) * 1.5;
        obj.angulo += 0.001 * obj.velocidad;
        obj.malla.position.x = Math.cos(obj.angulo) * obj.distancia;
        obj.malla.position.z = Math.sin(obj.angulo) * obj.distancia;
        obj.malla.lookAt(camara.position);
    });
    if (controles) controles.update();
    if (renderizador && escena && camara) renderizador.render(escena, camara);
}

window.onload = initFase1;

function startSequentialVideoPlayback() {
    if (videosArray.length === 0) return;
    
    let currentVideoIndex = 0;
    const playDuration = 8000;

    function playNextVideo() {
        // Apagar el video anterior
        const prevIndex = currentVideoIndex === 0 ? videosArray.length - 1 : currentVideoIndex - 1;
        const prevData = videosArray[prevIndex];
        if (prevData && prevData.mesh) {
            prevData.mesh.material = prevData.originalMaterial;
        }

        // Encender el actual
        const currentData = videosArray[currentVideoIndex];
        currentData.mesh.material = new THREE.MeshBasicMaterial({ 
            map: globalVideoTexture, 
            side: THREE.DoubleSide 
        });

        globalVideoElement.src = currentData.url;
        globalVideoElement.load();

        // Limpiar cualquier temporizador previo
        if (window.videoTimeout) clearTimeout(window.videoTimeout);

        // Si el video carga correctamente, lo reproducimos
        globalVideoElement.oncanplay = () => {
            globalVideoElement.play().catch(e => {
                console.warn("Autoplay bloqueado temporalmente. Se requiere toque en pantalla.");
            });
            // Programar el siguiente video solo si este funcionó
            window.videoTimeout = setTimeout(() => {
                currentVideoIndex = (currentVideoIndex + 1) % videosArray.length;
                playNextVideo();
            }, playDuration);
        };

        // SI HAY ERROR 404, LO SALTAMOS INMEDIATAMENTE
        globalVideoElement.onerror = () => {
            console.error("Error 404: Video no encontrado o cargando en GitHub. Saltando:", currentData.url);
            currentVideoIndex = (currentVideoIndex + 1) % videosArray.length;
            // Salto súper rápido de medio segundo para no pausar la experiencia
            window.videoTimeout = setTimeout(playNextVideo, 500); 
        };
    }

    // Arrancar el ciclo
    setTimeout(playNextVideo, 5000);
}
