{
  "expo": {
    "name": "cafejournal",
    "slug": "cafejournal",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "cafejournal",
    "userInterfaceStyle": "automatic",
    "ios": {
      "icon": "./assets/expo.icon"
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "predictiveBackGestureEnabled": false,
      "package": "com.cafeJournalApp",
      "config": {
        "googleMaps" : {
          "apiKey": "process.env.EXPO_PUBLIC_GOOGLE_MAP_API"
        }
      }
    },
    "web": {
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "backgroundColor": "#208AEF",
          "android": {
            "image": "./assets/images/splash-icon.png",
            "imageWidth": 76
          }
        }
      ],
      [
        "react-native-maps",
        {
          "androidGoogleMapsApiKey": "process.env.EXPO_PUBLIC_GOOGLE_MAP_API"
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    }
  }
}
