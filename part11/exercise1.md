# Ejercicio 11.1: Reflexión sobre CI/CD en un entorno hipotético

Supongamos que nuestra aplicación está desarrollada en Python. A continuación, discutimos algunos puntos clave relacionados con la configuración de una tubería CI/CD para este lenguaje.

## Herramientas específicas para Python

1. **Linter**: Una herramienta común para analizar el código en Python es `pylint`. Esta verifica que el código cumpla con las reglas de estilo y detecta errores potenciales.
2. **Pruebas**: Para pruebas unitarias e integración, se usa `pytest`, que ofrece una sintaxis simple y un gran ecosistema de plugins.
3. **Construcción**: Aunque Python no necesita compilación, se pueden usar herramientas como `setuptools` o `poetry` para gestionar dependencias y empaquetar la aplicación.

## Alternativas a Jenkins y GitHub Actions

Existen varias alternativas populares para CI/CD:

- **Travis CI**: Fácil de usar y ampliamente adoptada para proyectos open source.
- **CircleCI**: Ofrece un entorno flexible y configuraciones avanzadas.
- **GitLab CI/CD**: Integrado directamente con GitLab, ideal para equipos que ya utilizan esta plataforma.

## Entorno auto-alojado vs. basado en la nube

En un entorno auto-alojado, el equipo tiene control total sobre la infraestructura, lo que es útil para aplicaciones con requisitos de privacidad o compliance. Sin embargo, esto implica mayor costo y esfuerzo en mantenimiento.

En cambio, un entorno basado en la nube, como GitHub Actions o CircleCI, es más escalable y fácil de usar, ya que no requiere mantener servidores. Para elegir entre ambos, sería necesario conocer:

- El presupuesto disponible.
- Las restricciones de privacidad o seguridad.
- El volumen de desarrollo esperado.

En este caso, dado el tamaño del equipo (6 personas) y el hecho de que la aplicación está en desarrollo activo, una solución basada en la nube sería más eficiente y rápida de implementar.
