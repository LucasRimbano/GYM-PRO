# 🏋️ Gym Pro — Landing Page (Presentación + Captura de Leads)

Gym Pro es una landing page moderna y responsive pensada para **gimnasios y centros de entrenamiento**, diseñada para **convertir visitas en consultas reales**.  
Incluye secciones de presentación, beneficios, planes, testimonios, FAQ, ubicación y un formulario con validaciones.

---

## ✨ ¿Qué incluye el sitio?

✅ **Header fijo** con navegación rápida  
✅ **Hero de alto impacto** con CTA (acciones principales)  
✅ **Beneficios (Features)** con tarjetas e íconos  
✅ **Planes y precios** con diseño tipo “pricing cards”  
✅ **Historias reales / Testimonios** (prueba social)  
✅ **FAQ interactivo** con `<details>` / `<summary>`  
✅ **Ubicación con mapa** + contacto directo  
✅ **Formulario de contacto** con validaciones en JavaScript  
✅ **Estado Abierto/Cerrado automático** según horario del gimnasio  
✅ **Diseño 100% responsive** (mobile / tablet / desktop)

---

## 🎯 Objetivo del proyecto

El objetivo principal es ofrecer una página profesional para un gimnasio que:

- Genere confianza y presencia de marca
- Muestre claramente planes y beneficios
- Aumente las consultas por WhatsApp o contacto directo
- Permita capturar datos de potenciales socios de forma simple

---

## 🧠 Validaciones del formulario (JavaScript)

El formulario valida:

- Edad válida (mayor que 0)
- Peso válido
- Altura válida

Y además aplica reglas de negocio:

- ✅ Si es mayor de 18 → puede inscribirse
- ⚠️ Si pesa más de 80kg → recomendación de evaluación inicial
- ⚠️ Si es menor de 18 → requiere autorización de tutor

También muestra mensajes visuales de estado:
- `success`
- `warning`
- `error`

---

## 🕒 Estado del gimnasio: Abierto / Cerrado

En el header se muestra automáticamente el estado actual del gym:

📅 **Lunes a Viernes**  
🕗 **07:00 a 22:00**

El estado se actualiza cada 30 segundos para mantenerse siempre correcto.

---

## 🗂️ Estructura del proyecto

```bash
Gym-Pro/
│
├── index.html
├── styles.css
├── script/
│   └── main.js
└── assets/ (opcional)
    ├── hero-bg.jpg
    └── ...
🚀 Cómo ejecutar el proyecto
✅ Opción 1: Abrir directo
Descargá el proyecto

Abrí index.html en tu navegador

✅ Opción 2: Usar Live Server (recomendado)
Si usás VS Code:

Instalá Live Server

Click derecho en index.html

Open with Live Server

🛠️ Tecnologías usadas
HTML5

CSS3 (UI moderna + responsive)

JavaScript (validaciones + estado dinámico)

Diseño UI tipo Landing Premium

📌 Ideas futuras (mejoras)
Integrar envío real del formulario (EmailJS / backend)

Botón flotante de WhatsApp con mensaje automático

Slider de testimonios

Sección “Galería del Gym”

Animaciones suaves con Intersection Observer

📷 Preview
Agregá acá una captura del sitio para que se vea mejor en GitHub:

md
Copiar código
![Preview](./assets/preview.png)
👤 Autor
Lucas Rimbano
Proyecto personal para práctica de diseño web + conversión (marketing digital).
