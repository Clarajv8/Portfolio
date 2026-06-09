document.addEventListener('DOMContentLoaded', () => {
    // === LÓGICA DE NAVEGACIÓN ===
    window.toggleSection = function(sectionId, clickedElement) {
        const container = document.getElementById('portfolio-container');
        const targetBlock = document.getElementById(sectionId + '-content');
        
        if (sectionId === 'works' && container.classList.contains('case-study-active')) {
            window.closeCaseStudy();
            return;
        }

        container.classList.remove('case-study-active');

        const isAlreadyActive = targetBlock.classList.contains('active');

        document.querySelectorAll('.content-block').forEach(block => block.classList.remove('active'));
        document.querySelectorAll('.soft-glitch-link').forEach(btn => btn.classList.remove('active-btn'));

        if (isAlreadyActive) {
            container.classList.remove('layout-split');
        } else {
            container.classList.add('layout-split');
            clickedElement.classList.add('active-btn');
            setTimeout(() => { targetBlock.classList.add('active'); }, 50); 
        }
    };

    // === LÓGICA DE PROYECTOS (CASE STUDY) ===
    window.toggleProjectDetail = function(projectId) {
        const container = document.getElementById('portfolio-container');
        const allCases = document.querySelectorAll('.project-case-study');
        const targetCase = document.getElementById('detail-' + projectId);
        
        document.querySelectorAll('.sub-link').forEach(link => {
            link.classList.remove('active-sub');
        });
        const activeLink = document.getElementById('sublink-' + projectId);
        if (activeLink) activeLink.classList.add('active-sub');

        if (container.classList.contains('case-study-active')) {
            allCases.forEach(c => c.classList.remove('active-case'));
            
            setTimeout(() => {
                if (targetCase) {
                    targetCase.classList.add('active-case');
                    targetCase.scrollTop = 0;
                }
            }, 400);

        } else {
            allCases.forEach(c => c.classList.remove('active-case'));
            if (targetCase) targetCase.classList.add('active-case');
            container.classList.add('case-study-active');
        }
    };

    window.closeCaseStudy = function() {
        const container = document.getElementById('portfolio-container');
        
        container.classList.remove('case-study-active');
        
        setTimeout(() => {
            document.querySelectorAll('.project-case-study').forEach(c => c.classList.remove('active-case'));
        }, 600);
    };


    // === FÍSICA DEL FONDO ===

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        document.querySelectorAll('.color-zone').forEach(zone => {
            let centerX, centerY;

            // Damos el centro matemático por pantalla, evitamos el "getBoundingClientRect" que colapsaba la gráfica
            if (zone.classList.contains('zone-cyan')) {
                centerX = window.innerWidth * 0.25;
                centerY = window.innerHeight * 0.25;
            } else {
                centerX = window.innerWidth * 0.75;
                centerY = window.innerHeight * 0.75;
            }

            const distX = centerX - mouseX;
            const distY = centerY - mouseY;
            const distance = Math.sqrt(distX * distX + distY * distY);

            const repulseRadius = 500; 

            if (distance < repulseRadius) {
                const force = (repulseRadius - distance) / repulseRadius; 
                const moveX = (distX / distance) * force * 80; 
                const moveY = (distY / distance) * force * 80;
                
                zone.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                zone.style.transform = 'translate(0px, 0px)';
            }
        });
    });

    document.addEventListener('click', (e) => {
        const clickX = e.clientX;
        const clickY = e.clientY;

        const split = document.createElement('div');
        split.classList.add('water-split');
        split.style.left = `${clickX}px`;
        split.style.top = `${clickY}px`;
        
        split.style.width = '100px'; 
        split.style.height = '100px';
        
        document.body.appendChild(split);

        setTimeout(() => {
            split.remove();
        }, 2500);
    });

    // === LÓGICA DE LA VENTANA EMERGENTE (LIGHTBOX GLOBAL) ===
    window.openLightbox = function(imageSrc) {
        const lightbox = document.getElementById('image-lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        
        if (lightbox && lightboxImg) {
            lightboxImg.src = imageSrc;
            lightbox.classList.add('active');
        }
    };

    window.closeLightbox = function() {
        const lightbox = document.getElementById('image-lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
        }
    };

});