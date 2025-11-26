# CopaGuia API

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-18.x-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/mongodb-6.0-green.svg)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/express-5.1-lightgrey.svg)](https://expressjs.com/)

API REST escalable para plataforma de turismo y directorio comercial de Copacabana, Antioquia. Sistema completo de gestión de negocios, reseñas, usuarios y búsqueda geolocalizada.

**[Características](#características) • [Stack Técnico](#stack-tecnológico) • [Instalación](#instalación) • [Documentación API](#documentación-api) • [Arquitectura](#arquitectura)**

---

## Descripción del Proyecto

CopaGuia resuelve la fragmentación de información turística y comercial en Copacabana, Antioquia, mediante una plataforma centralizada que integra:

- **Directorio comercial completo** con categorización jerárquica
- **Sistema de calificaciones y reseñas** con validación de usuarios
- **Motor de búsqueda avanzado** con filtros multicriteria y full-text search
- **Geolocalización** basada en coordenadas y cálculo de proximidad



## Características

### Funcionalidades Core

**Gestión de Negocios**
- CRUD completo con validación de datos
- Categorización jerárquica por tipo de negocio
- Gestión de horarios de atención
- Información de contacto y redes sociales
- Galería de imágenes

**Sistema de Reseñas**
- Calificaciones de 1-5 estrellas
- Comentarios detallados con moderación
- Autenticación requerida para prevenir spam
- Sistema de reportes

**Gestión de Usuarios**
- Autenticación basada en JWT
- Sistema de roles (user, business_owner, admin)
- Perfiles personalizables
- Historial de actividad

**Búsqueda Avanzada**
- Filtrado por categoría, ubicación y calificación
- Búsqueda por texto en nombre y descripción
- Ordenamiento por relevancia, rating o distancia
- Paginación eficiente

**Integración Geoespacial**
- Almacenamiento de coordenadas geográficas
- Búsqueda por proximidad usando índices geoespaciales
- Cálculo de rutas y direcciones

### Aspectos Técnicos

- **Seguridad:** JWT con refresh tokens, bcrypt para passwords, rate limiting, validación con Joi, CORS configurado
- **Logging:** Sistema estructurado con Winston, niveles configurables
- **Calidad de Código:** ESLint + Prettier, arquitectura en capas
- **Testing:** Jest para pruebas unitarias e integración



## Stack Tecnológico

**Backend**
- Node.js 18+ / Express 5.1
- MongoDB 6.0 + Mongoose 9.0

**Seguridad**
- JSON Web Tokens (JWT) para autenticación
- bcryptjs para hashing de passwords
- Joi para validación de esquemas
- CORS y rate limiting

**Desarrollo**
- ESLint + Prettier para calidad de código
- Nodemon para desarrollo
- Jest para testing
- Winston para logging estructurado



---

## Instalación

### Requisitos Previos

- Node.js >= 18.0
- MongoDB >= 6.0
- npm >= 9.0

### Setup

```bash
# Clonar repositorio
git clone https://github.com/D-MachadoDev/copaguia-api.git
cd copaguia-api

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar MongoDB (en otra terminal)
mongod

# Poblar base de datos (opcional)
npm run seed

# Iniciar servidor en modo desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:4000`



### Configuración

**Variables de Entorno**

```env
# Servidor
PORT=4000
NODE_ENV=development

# Base de datos
MONGODB_URI=mongodb://localhost:27017/copaguia

# JWT
JWT_SECRET=tu_secreto_super_seguro_aqui
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000

# Logs
LOG_LEVEL=debug
```

**Generar JWT_SECRET seguro:**


**MongoDB Atlas (Cloud)**

Para usar MongoDB Atlas en lugar de una instancia local:

---

## Documentación API

**Base URL**
- Desarrollo: `http://localhost:4000/api`
- Producción: `https://api.copaguia.co/api`

### Autenticación

Rutas protegidas requieren header:

```http
Authorization: Bearer <tu_token_jwt>
```

### Endpoints

**Authentication**

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Registrar usuario | No |
| POST | `/auth/login` | Iniciar sesión | No |
| POST | `/auth/refresh` | Renovar token | Sí |
| GET | `/auth/me` | Perfil actual | Sí |

**Businesses**

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/businesses` | Listar todos | No |
| GET | `/businesses/:id` | Obtener uno | No |
| POST | `/businesses` | Crear | Owner |
| PUT | `/businesses/:id` | Actualizar | Owner |
| DELETE | `/businesses/:id` | Eliminar | Admin |
| GET | `/businesses/search` | Buscar | No |

**Reviews**

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/reviews` | Listar todas | No |
| POST | `/reviews` | Crear | Sí |
| PUT | `/reviews/:id` | Actualizar | Owner |
| DELETE | `/reviews/:id` | Eliminar | Owner |
| GET | `/businesses/:id/reviews` | De un negocio | No |

### Ejemplos de Uso

**Registro de Usuario**

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "Password123!"
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "Juan Pérez",
      "email": "juan@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Listar Negocios**

```bash
curl "http://localhost:4000/api/businesses?category=restaurant&page=1&limit=10"
```

Respuesta:
```json
{
  "success": true,
  "data": {
    "businesses": [
      {
        "id": "507f1f77bcf86cd799439012",
        "name": "Restaurante El Paisa",
        "category": "restaurant",
        "rating": 4.5,
        "location": {
          "coordinates": [-75.5812, 6.3467]
        }
      }
    ],
    "pagination": {
      "total": 45,
      "page": 1,
      "pages": 5
    }
  }
}
```

### Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Petición exitosa |
| 201 | Created - Recurso creado correctamente |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Autenticación requerida |
| 403 | Forbidden - Sin permisos suficientes |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |



---

## Arquitectura

### Estructura del Proyecto

```
copaguia-api/
├── src/
│   ├── api/                    # Capa de presentación (HTTP)
│   │   ├── controllers/        # Controladores de rutas
│   │   ├── middlewares/        # Middlewares (auth, validation)
│   │   ├── routes/             # Definición de rutas
│   │   └── validators/         # Esquemas de validación (Joi)
│   │
│   ├── domain/                 # Lógica de negocio
│   │   ├── entities/           # Entidades de dominio
│   │   └── services/           # Servicios de negocio
│   │
│   ├── infrastructure/         # Capa de datos
│   │   └── database/
│   │       ├── models/         # Modelos de Mongoose
│   │       └── repositories/   # Repositorios de datos
│   │
│   ├── shared/                 # Código compartido
│   │   ├── errors/             # Errores personalizados
│   │   └── utils/              # Utilidades
│   │
│   ├── config/                 # Configuraciones
│   │   ├── database.js         # Conexión MongoDB
│   │   └── logger.js           # Winston
│   │
│   ├── scripts/                # Scripts utilitarios
│   │   └── seed.js             # Poblar BD
│   │
│   ├── app.js                  # Configuración Express
│   └── server.js               # Punto de entrada
│
├── logs/                       # Archivos de logs
├── tests/                      # Tests
├── .env                        # Variables (NO subir)
├── .env.example                # Template
├── .eslintrc.json              # ESLint config
├── .prettierrc                 # Prettier config
├── .gitignore                  
├── package.json                
└── README.md                   
```

### Flujo de una Petición

```
┌─────────────┐
│   Cliente   │
└──────┬──────┘
       │ HTTP Request
       ▼
┌─────────────────────────────────┐
│  Routes → Middlewares           │  Valida auth, CORS, datos
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  Controller                     │  Extrae datos, llama service
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  Service (Lógica de negocio)    │  Procesa, valida, coordina
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  Repository                     │  Accede a BD
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  MongoDB                        │  Almacenamiento
└─────────────────────────────────┘
```

---

## Scripts Disponibles

```bash
npm run dev          # Desarrollo con auto-reload
npm start            # Producción
npm run seed         # Poblar BD con datos de prueba
npm run lint         # Analizar código
npm run lint:fix     # Corregir errores automáticamente
npm run format       # Formatear código con Prettier
npm test             # Ejecutar tests
npm run test:watch   # Tests en modo watch
```



---

## Roadmap

**Fase 1: MVP (Completada)**
- [x] Autenticación JWT
- [x] CRUD de negocios
- [x] Sistema de reseñas
- [x] Búsqueda básica

**Fase 2: Mejoras (En progreso)**
- [ ] Subida de imágenes (Cloudinary)
- [ ] Geolocalización avanzada
- [ ] Notificaciones por email
- [ ] Tests de integración

**Fase 3: Funcionalidades Avanzadas**
- [ ] Sistema de favoritos
- [ ] Panel de administración
- [ ] Analytics y estadísticas
- [ ] Integración con API de mapas
- [ ] Notificaciones push

**Fase 4: Escalabilidad**
- [ ] Cache con Redis
- [ ] WebSockets para actualizaciones en tiempo real
- [ ] Arquitectura de microservicios
- [ ] API GraphQL

---

## Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de tus cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

**Convención de commits:**
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Documentación
- `style:` Formateo de código
- `refactor:` Refactorización
- `test:` Añadir tests
- `chore:` Mantenimiento

---

## Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo [LICENSE](LICENSE) para más detalles.

---

## Contacto

**David Machado**
- GitHub: [@D-MachadoDev](https://github.com/D-MachadoDev)
- Email: avidmachado@gmail.com
- LinkedIn: [David Machado](https://linkedin.com/in/davidmachado-dev)

Repositorio: [https://github.com/D-MachadoDev/copaguia-api](https://github.com/D-MachadoDev/copaguia-api)

---

<div align="center">

**Hecho con ❤️ en Copacabana, Antioquia, Colombia**

⭐ Si te gusta este proyecto, dale una estrella en GitHub ⭐

[⬆ Volver arriba](#️-copaguia-api)

</div>