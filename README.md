# ionPlantApp
ionPlantApp is a hybrid mobile application build with Ionic 2 on top of Angular 2 and is intended to help in plant recognition and providing details about its structure, location and medical application.
Plant recognition is performed by service of Pl@ntNet (http://identify.plantnet-project.org). 

# How to install

**1. Install the Ionic CLI:**

    npm install -g ionic

**2. Clone repository:**

    git clone https://github.com/mustford/ionPlantApp

**3. Install the dependencies:**

    npm install

**4. Start the app in the browser:**

    ionic serve

**5. Install platform and plugins:**

    ionic platform add android

    ionic plugin add cordova-plugin-file

    ionic plugin add cordova-plugin-file-transfer

    ionic plugin add cordova-plugin-camera
    
    ionic plugin add cordova-plugin-geolocation

    ionic plugin add cordova-plugin-network-information

**6. Launch virtual device:** 

    ionic run android
    ionic run ios

    or 
    Just build installation file ..\ionPlantApp\platforms\android\build\outputs\apk and upload on mobile

    ionic build android
    ionic build ios
