// ========================================
// CONFIGURACIÓN DE TERRAZAS DE BAYONA
// Carga los precios desde precios.json
// ========================================

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    cargarPrecios();
});

async function cargarPrecios() {
    try {
        const response = await fetch('precios.json?' + Date.now()); // Evita caché
        if (!response.ok) throw new Error('No se pudo cargar precios.json');
        
        const precios = await response.json();
        
        // Mostrar precios en la sección
        mostrarPrecios(precios);
        
        // Actualizar precio del desayuno
        const precioDesayunoSpan = document.getElementById('precioDesayuno');
        if (precioDesayunoSpan) {
            precioDesayunoSpan.textContent = precios.precio_desayuno;
        }
        
        console.log('✅ Precios cargados correctamente');
        
    } catch (error) {
        console.error('❌ Error cargando precios:', error);
        mostrarPreciosPorDefecto();
    }
}

function mostrarPrecios(precios) {
    const container = document.getElementById('preciosContainer');
    if (!container) return;
    
    const html = `
        <div class="precio-card">
            <div class="precio-noches">1 - 6 noches</div>
            <div class="precio-valor">${precios.precio_1_6_noches} ${precios.moneda}<small>/noche</small></div>
            <ul>
                <li><i class="fas fa-check"></i> Ideal para estancias cortas</li>
                <li><i class="fas fa-check"></i> Flexibilidad total</li>
            </ul>
        </div>
        
        <div class="precio-card destacado">
            <div class="precio-noches">7 - 14 noches</div>
            <div class="precio-valor">${precios.precio_7_14_noches} ${precios.moneda}<small>/noche</small></div>
            <ul>
                <li><i class="fas fa-gift"></i> <strong>Más popular</strong></li>
                <li><i class="fas fa-check"></i> Desayuno gratis si aplica oferta</li>
            </ul>
            ${precios.oferta_activa ? '<span class="precio-badge">🔥 OFERTA ACTIVA</span>' : ''}
        </div>
        
        <div class="precio-card">
            <div class="precio-noches">15+ noches</div>
            <div class="precio-valor">${precios.precio_15_mas_noches} ${precios.moneda}<small>/noche</small></div>
            <ul>
                <li><i class="fas fa-check"></i> Mejor precio garantizado</li>
                <li><i class="fas fa-check"></i> Ideal para largas estancias</li>
            </ul>
        </div>
    `;
    
    container.innerHTML = html;
}

function mostrarPreciosPorDefecto() {
    const container = document.getElementById('preciosContainer');
    if (!container) return;
    
    // Precios de respaldo si no carga el JSON
    container.innerHTML = `
        <div class="precio-card">
            <div class="precio-noches">1 - 6 noches</div>
            <div class="precio-valor">25 USD<small>/noche</small></div>
            <ul><li><i class="fas fa-check"></i> Flexibilidad total</li></ul>
        </div>
        <div class="precio-card destacado">
            <div class="precio-noches">7 - 14 noches</div>
            <div class="precio-valor">20 USD<small>/noche</small></div>
            <ul><li><i class="fas fa-gift"></i> Más popular</li></ul>
        </div>
        <div class="precio-card">
            <div class="precio-noches">15+ noches</div>
            <div class="precio-valor">15 USD<small>/noche</small></div>
            <ul><li><i class="fas fa-check"></i> Mejor precio</li></ul>
        </div>
    `;
}

// Scroll suave para todos los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
