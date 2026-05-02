/* ==========================================
   CONFIGURACIÓN Y VARIABLES GLOBALES
   ========================================== */
let phase1Stage, phase1Container, captureContainers, captureIndex;
let escena, camara, renderizador, saturno, controles, fuente;
let objectsMessage = [], objectsTextRing = [];
let audioHabilitado = false, audioReproducido = false;
let lluviaCorazonesActiva = false, contadorToques = 0;

const cargadorTexturas = new THREE.TextureLoader();
const cargadorFuentes = new THREE.FontLoader();

// Configuración de Medios
const MEDIA_CONFIG = {
    audio: 'Manuel Carrasco - Uno X Uno.mp3',
    saturno: 'galaxy-love2-main/1.jpg',
    mensajes: [
        // Lista completa de tus 122 fotos en la carpeta img/
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
        "Screenshot_2026-04-29-15-56-27-725_com.zhiliaoapp.musically.jpg"
    ],
    frases: [
        "TE AMO", "ERES MI TODO", "MI VIDA", "ME ENCANTAS", "ERES MI MUNDO", 
        "MI CIELO", "MI TESORO", "CONTIGO SIEMPRE", "MI REINA", "ERES MAGIA",
        "MI LUGAR SEGURO", "MI DESTINO", "TE ADORO", "ERES ÚNICA", "MI AMOR",
        "SIEMPRE JUNTOS", "MI PEDACITO DE CIELO", "MI RAZÓN DE SER", "ERES MI LUZ"
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
    document.getElementById('cargando').style.display = 'none';
    document.getElementById('fase2-container').style.display = 'block';
    crearEstrellasCSS(150);
    cargadorFuentes.load('https://threejs.org/examples/fonts/gentilis_regular.typeface.json', 
        (fuenteCargada) => {
            fuente = fuenteCargada;
            armarEscena3D();
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
    renderizador = new THREE.WebGLRenderer({ antialias: true, alpha: true });
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
    const geo = new THREE.SphereGeometry(4, 128, 128);
    const mat = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 20 });
    saturno = new THREE.Mesh(geo, mat);
    saturno.castShadow = true;
    saturno.receiveShadow = true;
    escena.add(saturno);
    cargadorTexturas.load(MEDIA_CONFIG.saturno, (tex) => {
        tex.anisotropy = renderizador.capabilities.getMaxAnisotropy();
        saturno.material.map = tex;
        saturno.material.needsUpdate = true;
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
    // 1. Añadir fotos reales de img/
    MEDIA_CONFIG.mensajes.forEach((filename, i) => {
        const url = 'img/' + filename;
        const tex = cargadorTexturas.load(url, (loadedTex) => {
            loadedTex.anisotropy = renderizador.capabilities.getMaxAnisotropy();
            loadedTex.minFilter = THREE.LinearMipmapLinearFilter;
            loadedTex.magFilter = THREE.LinearFilter;
        });
        
        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(4, 4), 
            new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide, transparent: true })
        );
        
        // Distribución más amplia para 122 fotos
        const dist = 15 + Math.random() * 25; 
        const ang = Math.random() * Math.PI * 2;
        const alt = (Math.random() - 0.5) * 30; 
        
        mesh.position.set(Math.cos(ang) * dist, alt, Math.sin(ang) * dist);
        escena.add(mesh);
        objectsMessage.push({ malla: mesh, alturaOriginal: alt, velocidad: 0.1 + Math.random() * 0.15, angulo: ang, distancia: dist }); // Más lento (antes 0.15-0.25)
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

function manejarToque(e) {
    if (e.target.closest('#alternar-audio') || e.target.closest('.modal')) return;
    reproducirAudio();
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
    // SALEN VARIAS PALABRAS A LA VEZ (5 FRASES)
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const div = document.createElement('div');
            div.className = 'explosion-texto';
            div.innerText = MEDIA_CONFIG.frases[Math.floor(Math.random() * MEDIA_CONFIG.frases.length)];
            
            // Dispersión de las palabras
            const offX = (Math.random() - 0.5) * 200;
            const offY = (Math.random() - 0.5) * 200;
            
            div.style.left = (x + offX) + 'px';
            div.style.top = (y + offY) + 'px';
            document.body.appendChild(div);
            setTimeout(() => div.remove(), 4000); // Más tiempo en pantalla (lento)
        }, i * 200);
    }
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
