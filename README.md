<div align="center">

# 🏔️ CopaGuia API

### API REST para Plataforma de Turismo y Directorio Comercial

**Descubre los mejores negocios, restaurantes y lugares turísticos de Copacabana, Antioquia**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)](https://expressjs.com/)

[Características](#-características) •
[Tecnologías](#-tecnologías) •
[Instalación](#-instalación) •
[Uso](#-uso) •
[API Docs](#-documentación-de-la-api) •
[Contribuir](#-contribuir)

---

## 📋 Tabla de Contenidos

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Arquitectura](#-arquitectura)
- [Documentación de la API](#-documentación-de-la-api)
- [Scripts Disponibles](#-scripts-disponibles)
- [Testing](#-testing)
- [Despliegue](#-despliegue)
- [Roadmap](#-roadmap)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

---

## 🎯 Acerca del Proyecto

**CopaGuia API** es el backend de una plataforma integral de turismo y directorio comercial para Copacabana, Antioquia, Colombia. Permite a usuarios y turistas descubrir negocios locales, dejar reseñas, y explorar la riqueza cultural y comercial del municipio.

### Problema que Resuelve

- ❌ Falta de centralización de información de negocios locales
- ❌ Difícil descubrimiento de lugares turísticos y servicios
- ❌ Ausencia de sistema de reseñas confiable para la comunidad
- ❌ Navegación ineficiente sin mapas integrados

### Solución

- ✅ Directorio completo de negocios categorizados
- ✅ Sistema de reseñas verificado y calificaciones
- ✅ Búsqueda avanzada por categoría, ubicación y servicios
- ✅ Integración con mapas para ubicación precisa
- ✅ API RESTful escalable y bien documentada

---

## ✨ Características

### Core Features

- 🏢 **Gestión de Negocios**
  - CRUD completo de negocios locales
  - Categorización por tipo (restaurantes, hoteles, tiendas, etc.)
  - Horarios de atención
  - Información de contacto y redes sociales
  - Galería de imágenes

- ⭐ **Sistema de Reseñas**
  - Calificaciones de 1-5 estrellas
  - Comentarios detallados
  - Validación de usuarios autenticados
  - Sistema de reportes de reseñas

- 👤 **Gestión de Usuarios**
  - Registro y autenticación con JWT
  - Roles (user, business_owner, admin)
  - Perfiles de usuario
  - Historial de reseñas

- 🔍 **Búsqueda Avanzada**
  - Filtros por categoría, ubicación, calificación
  - Búsqueda por texto (nombre, descripción)
  - Ordenamiento (relevancia, calificación, distancia)
  - Paginación eficiente

- 🗺️ **Integración de Mapas**
  - Coordenadas geográficas (lat/lng)
  - Búsqueda por proximidad
  - Rutas y direcciones

### Características Técnicas

- 🔐 **Seguridad**
  - Autenticación JWT con refresh tokens
  - Encriptación de contraseñas (bcrypt)
  - Rate limiting anti-spam
  - Validación de datos con Joi
  - CORS configurado

- 📊 **Logging y Monitoreo**
  - Sistema de logs estructurado (Winston)
  - Niveles de log configurables
  - Registro de errores y eventos

- 🎨 **Código Limpio**
  - Arquitectura en capas
  - ESLint + Prettier configurados
  - Código modular y reutilizable
  - Documentación inline

---

## 🛠️ Tecnologías

### Backend Core

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| [Node.js](https://nodejs.org/) | ^18.0.0 | Runtime JavaScript |
| [Express](https://expressjs.com/) | ^5.1.0 | Framework web |
| [MongoDB](https://www.mongodb.com/) | ^9.0.0 | Base de datos NoSQL |
| [Mongoose](https://mongoosejs.com/) | ^9.0.0 | ODM para MongoDB |

### Autenticación y Seguridad

| Tecnología | Propósito |
|-----------|-----------|
| [JSON Web Token](https://jwt.io/) | Autenticación stateless |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs) | Hashing de contraseñas |
| [Joi](https://joi.dev/) | Validación de esquemas |
| [CORS](https://www.npmjs.com/package/cors) | Control de acceso cross-origin |

### Desarrollo

| Tecnología | Propósito |
|-----------|-----------|
| [Nodemon](https://nodemon.io/) | Auto-reload en desarrollo |
| [ESLint](https://eslint.org/) | Linter de código |
| [Prettier](https://prettier.io/) | Formateador de código |
| [Jest](https://jestjs.io/) | Framework de testing |

### Utilidades

| Tecnología | Propósito |
|-----------|-----------|
| [Winston](https://github.com/winstonjs/winston) | Sistema de logs |
| [dotenv](https://www.npmjs.com/package/dotenv) | Variables de entorno |

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 18.0.0 ([Descargar](https://nodejs.org/))
- **MongoDB** >= 6.0 ([Descargar](https://www.mongodb.com/try/download/community))
- **npm** >= 9.0.0 (viene con Node.js)
- **Git** ([Descargar](https://git-scm.com/))

### Verificar instalaciones:

```bash
node --version    # Debe mostrar v18.x.x o superior
npm --version     # Debe mostrar 9.x.x o superior
mongod --version  # Debe mostrar 6.x.x o superior
git --version     # 