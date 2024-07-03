Mejor explicado aqui https://docs.expo.dev/workflow/android-studio-emulator/

1. Abrir android studio
2. more -> Virtual Device

Luego...

Ir a la carpeta del proyecto y correr npx expo start
Elejir la opcion 'a'

Luego elegir opcion 'j' para poder debugear

---

Importante

en el archivo App.tsx debe tener esta forma la url:

uri: "http://192.168.10.126:3001/graphql/", (dev)

---

Produccion

uri: "http://ec2-18-206-158-105.compute-1.amazonaws.com:3001/graphql/", (prod)

build apk

1. Para crear la carpeta android y la carpeta ios ejecutar: npx expo prebuild

2. Agregar lo siguiente en AndroidManifest.xml (permitir salida internet)

<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

3. Agregar lo siguiente en AndroidManifest.xml (permitir trafico http)
   <application android:usesCleartextTraffic="true">
   </application>

4. Luego ejecutar: eas build -p android --profile production
