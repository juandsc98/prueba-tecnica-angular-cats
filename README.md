# 🐱 CatsApp - Aplicación Angular de Razas de Gatos

Aplicación web desarrollada en Angular que permite explorar y gestionar información sobre razas de gatos, con sistema de autenticación y contenedorización Docker.

## 📋 Requerimientos Implementados

### Vista 1 - Lista de Razas y Carrusel ✅
- **Lista desplegable**: Implementada con un selector que carga dinámicamente todas las razas disponibles desde The Cat API
- **Carrusel de imágenes**: Componente personalizado que muestra múltiples imágenes de la raza seleccionada con navegación
- **Información detallada**: Muestra características completas como temperamento, origen, esperanza de vida y puntuaciones de comportamiento
- **Vista de tabla**: Tabla responsive que muestra los datos más relevantes de todas las razas con paginación

### Vista 2 - Filtro de Búsqueda ✅
- **Búsqueda en tiempo real**: Implementada con un input de texto y botón de búsqueda
- **Filtrado dinámico**: Consume la API de búsqueda de The Cat API para filtrar resultados
- **Interfaz intuitiva**: Muestra resultados coincidentes en la tabla con indicadores visuales

### Vista 3 - Login ✅
- **Formulario de autenticación**: Interfaz limpia con validaciones de email y contraseña
- **Integración con backend**: Consume la API de autenticación del backend desarrollado
- **Manejo de errores**: Muestra mensajes específicos para diferentes tipos de errores
- **Navegación automática**: Redirige al perfil tras login exitoso

### Vista 4 - Registro ✅
- **Formulario completo**: Campos para nombre, email, contraseña, teléfono y edad
- **Validaciones robustas**: Validación de email, longitud de contraseña, edad mínima
- **Feedback visual**: Mensajes de éxito y error con opción de reintentar
- **Redirección automática**: Navega al perfil tras registro exitoso

### Vista 5 - Perfil Protegido ✅
- **Guardia de autenticación**: Implementado con AuthGuard que protege rutas
- **Información del usuario**: Muestra datos personales y de cuenta del usuario logueado
- **Gestión de sesión**: Manejo de tokens JWT y estado de autenticación
- **Logout funcional**: Permite cerrar sesión y limpiar datos locales

## 🚀 Características Técnicas

### Arquitectura
- **Clean Architecture**: Separación clara entre dominio, infraestructura y presentación
- **Componentes Standalone**: Uso de componentes independientes de Angular
- **Servicios inyectables**: Patrón repository para acceso a datos
- **Guards de ruta**: Protección de rutas con autenticación

### UI/UX
- **Diseño responsive**: Adaptable a móviles, tablets y desktop
- **Tailwind CSS**: Estilos modernos y consistentes
- **Animaciones**: Transiciones suaves entre vistas y carrusel interactivo
- **Navbar responsive**: Menú hamburguesa para dispositivos móviles

### Integración
- **The Cat API**: Consumo de API externa para datos de razas
- **Backend propio**: Autenticación y gestión de usuarios
- **Manejo de estados**: Gestión reactiva del estado de autenticación

## 🐳 Contenedorización Docker ✅

### Dockerfile Optimizado
- **Multi-stage build**: Construcción eficiente con Node.js y Nginx
- **Imagen ligera**: Basada en Alpine Linux para menor tamaño
- **Configuración nginx**: Optimizada para SPA routing de Angular

### Docker Compose
- **Despliegue simplificado**: Un comando para construir y ejecutar
- **Variables de entorno**: Configuración flexible para diferentes entornos
- **Puerto expuesto**: Acceso en http://localhost:8080

### Variables de Entorno
**⚠️ IMPORTANTE**: Las variables de entorno necesarias para el funcionamiento completo de la aplicación se envían por correo electrónico. Estas incluyen:

- **CAT_API_KEY**: Clave de acceso para The Cat API
- **BACKEND_API_URL**: URL del backend de autenticación
- **JWT_SECRET**: Clave secreta para tokens JWT
- **MONGODB_URI**: Cadena de conexión a MongoDB

### Configuración Completa
1. **Recibir variables por correo** y crear archivo `.env`
2. **Configurar backend**: Ejecutar el backend desde [prueba-tecnica-backend-cats](https://github.com/juandsc98/prueba-tecnica-backend-cats)
3. **Ejecutar frontend**: Usar Docker Compose para el frontend

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Angular 20, TypeScript, Tailwind CSS
- **APIs**: The Cat API, Backend propio (Node.js/Express)
- **Contenedorización**: Docker, Docker Compose, Nginx
- **Herramientas**: Angular CLI, RxJS, Angular Forms

## 📦 Instalación y Uso

### Desarrollo Local
```bash
npm install
npm start
```

### Con Docker (Recomendado)
```bash
# 1. Crear archivo .env con las variables recibidas por correo
cp env.example .env
# Editar .env con las variables proporcionadas

# 2. Ejecutar backend (desde repositorio separado)
git clone https://github.com/juandsc98/prueba-tecnica-backend-cats
cd prueba-tecnica-backend-cats
docker-compose up -d

# 3. Ejecutar frontend
cd ../prueba-frontend
docker-compose up --build

# 4. Acceder a la aplicación
# Frontend: http://localhost:8080
# Backend: http://localhost:3000
```

## 🎯 Funcionalidades Destacadas

- **Autenticación completa**: Login, registro y gestión de sesiones
- **Exploración de razas**: Búsqueda, filtrado y visualización detallada
- **Carrusel interactivo**: Navegación por imágenes con controles
- **Tabla responsive**: Visualización de datos con paginación
- **Diseño adaptativo**: Funciona perfectamente en todos los dispositivos
- **Contenedorización**: Despliegue simplificado con Docker

## 📧 Soporte

Para obtener las variables de entorno necesarias o soporte técnico, contactar por correo electrónico.

---

# 🐱 CatsApp - Aplicación Angular de Razas de Gatos

Aplicación web desarrollada en Angular que permite explorar y gestionar información sobre razas de gatos, con sistema de autenticación y contenedorización Docker.

## 📋 Requerimientos Implementados

### Vista 1 - Lista de Razas y Carrusel ✅
- **Lista desplegable**: Implementada con un selector que carga dinámicamente todas las razas disponibles desde The Cat API
- **Carrusel de imágenes**: Componente personalizado que muestra múltiples imágenes de la raza seleccionada con navegación
- **Información detallada**: Muestra características completas como temperamento, origen, esperanza de vida y puntuaciones de comportamiento
- **Vista de tabla**: Tabla responsive que muestra los datos más relevantes de todas las razas con paginación

### Vista 2 - Filtro de Búsqueda ✅
- **Búsqueda en tiempo real**: Implementada con un input de texto y botón de búsqueda
- **Filtrado dinámico**: Consume la API de búsqueda de The Cat API para filtrar resultados
- **Interfaz intuitiva**: Muestra resultados coincidentes en la tabla con indicadores visuales

### Vista 3 - Login ✅
- **Formulario de autenticación**: Interfaz limpia con validaciones de email y contraseña
- **Integración con backend**: Consume la API de autenticación del backend desarrollado
- **Manejo de errores**: Muestra mensajes específicos para diferentes tipos de errores
- **Navegación automática**: Redirige al perfil tras login exitoso

### Vista 4 - Registro ✅
- **Formulario completo**: Campos para nombre, email, contraseña, teléfono y edad
- **Validaciones robustas**: Validación de email, longitud de contraseña, edad mínima
- **Feedback visual**: Mensajes de éxito y error con opción de reintentar
- **Redirección automática**: Navega al perfil tras registro exitoso

### Vista 5 - Perfil Protegido ✅
- **Guardia de autenticación**: Implementado con AuthGuard que protege rutas
- **Información del usuario**: Muestra datos personales y de cuenta del usuario logueado
- **Gestión de sesión**: Manejo de tokens JWT y estado de autenticación
- **Logout funcional**: Permite cerrar sesión y limpiar datos locales

## 🚀 Características Técnicas

### Arquitectura
- **Clean Architecture**: Separación clara entre dominio, infraestructura y presentación
- **Componentes Standalone**: Uso de componentes independientes de Angular
- **Servicios inyectables**: Patrón repository para acceso a datos
- **Guards de ruta**: Protección de rutas con autenticación

### UI/UX
- **Diseño responsive**: Adaptable a móviles, tablets y desktop
- **Tailwind CSS**: Estilos modernos y consistentes
- **Animaciones**: Transiciones suaves entre vistas y carrusel interactivo
- **Navbar responsive**: Menú hamburguesa para dispositivos móviles

### Integración
- **The Cat API**: Consumo de API externa para datos de razas
- **Backend propio**: Autenticación y gestión de usuarios
- **Manejo de estados**: Gestión reactiva del estado de autenticación

## 🐳 Contenedorización Docker ✅

### Dockerfile Optimizado
- **Multi-stage build**: Construcción eficiente con Node.js y Nginx
- **Imagen ligera**: Basada en Alpine Linux para menor tamaño
- **Configuración nginx**: Optimizada para SPA routing de Angular

### Docker Compose
- **Despliegue simplificado**: Un comando para construir y ejecutar
- **Variables de entorno**: Configuración flexible para diferentes entornos
- **Puerto expuesto**: Acceso en http://localhost:8080

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Angular 20, TypeScript, Tailwind CSS
- **APIs**: The Cat API, Backend propio (Node.js/Express)
- **Contenedorización**: Docker, Docker Compose, Nginx
- **Herramientas**: Angular CLI, RxJS, Angular Forms

## 📦 Instalación y Uso

### Desarrollo Local
```bash
npm install
npm run dev
```

### Con Docker
```bash
docker-compose up --build
# Acceder a http://localhost:8080
```

## 🎯 Funcionalidades Destacadas

- **Autenticación completa**: Login, registro y gestión de sesiones
- **Exploración de razas**: Búsqueda, filtrado y visualización detallada
- **Carrusel interactivo**: Navegación por imágenes con controles
- **Tabla responsive**: Visualización de datos con paginación
- **Diseño adaptativo**: Funciona perfectamente en todos los dispositivos
- **Contenedorización**: Despliegue simplificado con Docker

---

**Desarrollado con ❤️ usando Angular y The Cat API**
