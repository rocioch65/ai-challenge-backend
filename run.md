# 🏃‍♀️ Run Guide – AI Challenge Project

Este documento describe cómo ejecutar localmente el proyecto **AI Challenge**, compuesto por:

- 🧠 Backend en Java 17 (Spring WebFlux)
- 🎨 Frontend en React + Vite

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

- [Java 17+](https://adoptium.net/)
- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- [Gradle](https://gradle.org/) (opcional, puedes usar `./gradlew`)

---

## 📁 Estructura del Proyecto

IAChallenge/

├── ai-challenge-backend/

│ └── src/

│ └── build.gradle

├── ai-challenge-frontend/

│ └── src/

│ └── package.json

└── run.md



---

## ▶️ Ejecución Paso a Paso

### 1️⃣ Ejecutar el Backend

1. Abre una terminal y entra a la carpeta del backend:

```bash
cd ai-challenge-backend
```
1.1. Ejecuta el backend con gradle:

```bash
./gradlew bootRun
```
En Windows: gradlew.bat bootRun

El backend quedará disponible en:
🔗 http://localhost:8080

2️⃣ Ejecutar el Frontend
Abre otra terminal y entra a la carpeta del frontend:

```bash
cd frontend
```

2. Instala las dependencias:

```bash
npm install
```
3. Ejecuta la aplicación:

```bash
./gradlew bootRun
```

🔁 Conexión entre Front y Back

La app estará disponible en: 🔗 http://localhost:3000

Por defecto, el frontend espera que el backend esté en http://localhost:8080