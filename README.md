# Playwright E2E Automation Framework

Framework de pruebas automatizadas End-to-End (E2E) desarrollado desde cero para la plataforma **SauceDemo**, aplicando arquitectura limpia y buenas prácticas de ingeniería de software para asegurar la máxima escalabilidad y mantenibilidad.

---

## 📌 Features
- **Page Object Model (POM):** Desacoplamiento total entre los selectores/acciones de la interfaz de usuario y la lógica de ejecución de los casos de prueba.
- **Data-Driven Testing (DDT):** Pruebas parametrizadas de forma dinámica mediante la lectura de fuentes externas de datos en formato JSON.
- **Autenticación por Estado (Storage State):** Optimización crítica de rendimiento que inyecta sesiones guardadas, evitando logins redundantes en cada test.
- **Pruebas de Flujo Completo (Happy Path & Negative):** Validación integral de procesos de negocio (compra de productos, navegación en catálogo, carrito) y pruebas de estrés ante campos obligatorios vacíos.
- **Aserciones Robustas:** Uso de validaciones nativas automáticas de Playwright para mitigar falsos positivos por latencia de red.

## 🏗️ Architecture
El proyecto sigue una estructura modular y limpia basada en separación de responsabilidades:
- **`pages/`**: Clases con los selectores y métodos específicos de cada página de la aplicación.
- **`tests/`**: Escenarios de prueba E2E orientados al comportamiento del usuario.
- **`data/`**: Datasets externos en JSON para el abastecimiento de pruebas parametrizadas.

## 🧪 Test scenarios
- Flujo de autenticación exitoso y negativo (credenciales inválidas).
- Pruebas de selección de productos, adición al carrito y gestión de artículos.
- Flujo completo de compra (*Happy Path Checkout*).
- Pruebas parametrizadas de validación de campos obligatorios en el formulario de pago mediante datos externos.

## 🛠️ Tech stack
- **Lenguaje:** TypeScript (Tipado estricto)
- **Framework de Pruebas:** Playwright Test
- **Patrón de Diseño:** Page Object Model (POM)
- **Runtime:** Node.js

## 📦 Installation
Sigue estos pasos para clonar y preparar el entorno de ejecución en tu máquina local:

1. Clona el repositorio:
   ```bash
   git clone [https://github.com/eduardoramirezrojas/Playwright-POM-TypeScritpt-Auth-Testing.git](https://github.com/eduardoramirezrojas/Playwright-POM-TypeScritpt-Auth-Testing.git)
   cd Playwright-POM-TypeScritpt-Auth-Testing