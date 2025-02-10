# Clase 4.

## Links

- https://docs.expo.dev/guides/adopting-prebuild/
- https://www.canva.com/
- https://dragonball-api.com/

## Conceptos.

### Prebuild

Prebuild es una herramienta que permite a los desarrolladores de expo tener una experiencia de desarrollo más rápida y eficiente. Prebuild se utiliza para optimizar el tiempo de compilación y el tamaño de los archivos de la aplicación.

Para utilizar Prebuild, se debe configurar el archivo `app.json` de la aplicación. En este archivo, se especifican las configuraciones de Prebuild, incluyendo la ruta de acceso al archivo de configuración de Prebuild.

Una vez que se ha configurado el archivo `app.json`, se puede utilizar el comando `expo prebuild` para ejecutar Prebuild. Este comando se ejecuta automáticamente antes de la compilación de la aplicación.

Además, Prebuild también se puede utilizar para optimizar la carga de la aplicación en el dispositivo. Para hacerlo, se debe utilizar el comando `expo prebuild --clean` para limpiar los archivos de Prebuild y luego ejecutar `expo prebuild` para volver a generar los archivos de Prebuild.

### Ejemplo de uso de Prebuild

```json
{
  "expo": {
    "name": "expo-prebuild",
    "slug": "expo-prebuild",
    "version": "1.0.0",
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "bundleIdentifier": "com.expo.prebuild",
      "buildNumber": "1.0.0"
    },
    "android": {
      "package": "com.expo.prebuild",
      "versionCode": 1
    },
    "extra": {
      "prebuild": {
        "source": "prebuild",
        "config": "prebuild.config.js"
      }
    }
  }
}
```

En este ejemplo, se utiliza el comando `expo prebuild` para ejecutar Prebuild y optimizar la carga de la aplicación en el dispositivo. Se especifica el archivo de configuración de Prebuild en la propiedad `config` del objeto `extra` de la sección `expo` del archivo `app.json`.


Una vez realizado el prebuild, es necesario ejecutar nuestro proyecto como:

```bash
$ expo run:android
$ expo run:ios
```

### EAS

Permite compilar nuestras aplicaciones de forma más rápida y eficiente en el cloud.

#### Compilar en el cloud para Android
```bash
$ eas build --platform android
```

### Icon
Es de 1024x1024 y debe ser PNG.

Usar canva para que sea rápido crearlo.

