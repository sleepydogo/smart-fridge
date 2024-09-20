# Smart Fridge

**Smart Fridge** es una aplicación de código abierto que tiene como objetivo gestionar y optimizar el uso de los alimentos en tu refrigerador. La aplicación te permite llevar un control detallado de los productos almacenados, avisar sobre fechas de caducidad, y sugerir recetas basadas en los ingredientes disponibles.

Este proyecto fue presentado por **Aldana Tedesco**, **Emiliano Mengoni**, **Lisandro Vicens**, y **Tomás Schattmann**. El backend está desarrollado en **Django Rest Framework** y el frontend utiliza **Next.js** con **React**.

---

## Instalación

### Requisitos previos
- Python 3.8+
- Node.js 14+
- Django Rest Framework
- Next.js

---

### Instalación del Backend (Django Rest Framework)

1. Clona el repositorio del proyecto:

   ```bash
   cd Backend

2. Crea y activa un entorno virtual:
        
    En Linux/MacOS:

        python3 -m venv venv
        source venv/bin/activate

    En Windows:

        python -m venv venv
        venv\Scripts\activate

3. Instala las dependencias de Python:

        pip install -r requirements.txt

4. Realiza las migraciones de base de datos:

        python manage.py migrate

5. Crea un superusuario para acceder al panel de administración:

        python manage.py createsuperuser

6. Ejecuta el servidor de desarrollo de Django:

        python manage.py runserver

El backend estará corriendo en http://localhost:8000/.


## Instalación del Frontend (Next.js con React)

1. Ve al directorio del frontend:


        cd Frontend

2. Instala las dependencias de Node.js:

        npm install

3. Configura las variables de entorno:
    
    Crea un archivo .env en la raíz del proyecto con las siguientes variables:

        NEXT_PUBLIC_API_URL=http://localhost:8000/

4. Ejecuta el servidor de desarrollo de Next.js:

        npm run dev

El frontend estará corriendo en http://localhost:3000/.

## Uso

Una vez que tanto el backend como el frontend estén en funcionamiento, puedes acceder a la aplicación desde http://localhost:3000. Si necesitas acceder al panel de administración de Django, ve a http://localhost:8000/admin e inicia sesión con el superusuario que creaste.


## Contribución

Este proyecto es de código abierto. Si quieres contribuir, por favor crea un fork del repositorio, realiza tus cambios y envía un pull request. Las contribuciones son bienvenidas.

## Licencia

Smart Fridge es un proyecto de código abierto bajo la licencia MIT.
