import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// Crea una card de producto
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <img src="https://via.placeholder.com/120" alt="Imagen del producto">
    <div class="product-info">
      <h2>${product.nombre}</h2>
      <p class="description">${product.descripcion}</p>
      <p><strong>Precio regular:</strong> $${parseFloat(product.precio_regular).toFixed(2)}</p>
      <p><strong>Precio oferta:</strong> $${product.precio_oferta ? parseFloat(product.precio_oferta).toFixed(2) : '-'}</p>
      <p><strong>Estado:</strong> ${product.estado.charAt(0).toUpperCase() + product.estado.slice(1)}</p>
    </div>
  `;
  return card;
}

// Lógica para create-product.html
if (document.querySelector('.product-form')) {
  const form = document.querySelector('.product-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Submit del formulario detectado');
    const nombre = form.nombre.value.trim();
    const precio_regular = form.precio_regular.value.trim();
    const precio_oferta = form.precio_oferta.value.trim();
    const descripcion = form.descripcion.value.trim();
    const estado = form.estado.value;
    // Ignora imagen
    if (!nombre || !precio_regular || !descripcion || !estado) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }
    try {
      await addDoc(collection(db, "productos"), {
        nombre,
        precio_regular,
        precio_oferta: precio_oferta || null,
        descripcion,
        estado,
        creado: serverTimestamp()
      });
      form.reset();
      alert('¡Producto creado exitosamente!');
    } catch (err) {
      if (err && err.message && err.message.includes('permission')) {
        alert('No tienes permisos para guardar productos. Revisa las reglas de Firestore o inicia sesión si es necesario.');
      } else {
        alert('Error al guardar el producto: ' + (err.message || err));
      }
      console.error('Error al guardar el producto:', err);
    }
  });
}

// Lógica para products.html
if (document.querySelector('.products-list')) {
  const productsList = document.querySelector('.products-list');
<<<<<<< HEAD
  // Ordenar por fecha de creación descendente
  const q = query(collection(db, "productos"), orderBy("creado", "desc"));
  onSnapshot(q, (snapshot) => {
    productsList.innerHTML = '';
    if (snapshot.empty) {
      productsList.innerHTML = '<p style="text-align:center;color:#888;">No hay productos aún.</p>';
      return;
    }
    snapshot.forEach(doc => {
      const product = doc.data();
      productsList.appendChild(createProductCard(product));
    });
  }, (err) => {
    productsList.innerHTML = '<p style="color:red;">Error al cargar productos: ' + (err.message || err) + '</p>';
    console.error('Error al mostrar productos:', err);
  });
=======
  // Agregar mensaje de carga inicial
  productsList.innerHTML = '<p style="text-align:center;">Cargando productos...</p>';
  
  try {
    // Crear consulta a Firestore
    const q = query(collection(db, "productos"), orderBy("creado", "desc"));
    
    // Escuchar cambios en tiempo real
    onSnapshot(q, (snapshot) => {
      // Limpiar contenido actual
      productsList.innerHTML = '';
      
      // Si no hay productos
      if (snapshot.empty) {
        productsList.innerHTML = `
          <div style="text-align:center;">
            <p style="color:#888;">No hay productos aún.</p>
            <p style="color:#666;">¡Crea tu primer producto!</p>
          </div>
        `;
        return;
      }
      
      // Mostrar cada producto
      snapshot.forEach(doc => {
        const product = doc.data();
        productsList.appendChild(createProductCard(product));
      });
    }, (err) => {
      // Manejar errores de conexión
      productsList.innerHTML = `
        <div style="text-align:center;">
          <p style="color:red;">Error al cargar productos:</p>
          <p style="color:#999;">${err.message || err}</p>
          <p style="color:#666;">Por favor, verifica tu conexión a internet.</p>
        </div>
      `;
      console.error('Error al mostrar productos:', err);
    });
  } catch (error) {
    // Manejar errores iniciales
    productsList.innerHTML = `
      <div style="text-align:center;">
        <p style="color:red;">Error inicial:</p>
        <p style="color:#999;">${error.message || error}</p>
        <p style="color:#666;">Por favor, verifica tu conexión a internet y recarga la página.</p>
      </div>
    `;
    console.error('Error inicial:', error);
  }
>>>>>>> 8aac1ae (Vista en mostrar producto)
}
