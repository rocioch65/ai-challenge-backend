## 🛍️ Descripción del Proyecto

Este es un proyecto full stack que simula una tienda en línea. Permite a los usuarios buscar productos y ver sus detalles. El frontend está construido con **React**, mientras que el backend utiliza **Java con Spring WebFlux** para ofrecer una API reactiva. Ambos componentes están diseñados para integrarse fácilmente en un entorno local o productivo.


## 🚀 Ejecución Local de la Aplicación (Frontend + Backend)

Este proyecto está organizado como un **monorepo** con los siguientes directorios principales:

- `backend/` → Proyecto Java Spring WebFlux
- `frontend/` → Proyecto React

---

### 📦 Prerrequisitos

Asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (recomendado: v18+)
- [Java 17](https://adoptium.net/)
- [Gradle](https://gradle.org/) (o usar `./gradlew`)

---

### 🛠️ Paso a paso para levantar la aplicación

#### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo


cd backend
./gradlew bootRun


cd frontend
npm install
npm start

🧪 Acceso a la aplicación
Frontend: http://localhost:3000

Backend API: http://localhost:8080

