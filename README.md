# ionic2-buy-cheap

# build

config.xml 파일에서 버전을 올립니다. 

> ionic build android --release

배포 버전을 빌드합니다. 생성되는 위치는 `\platforms\android\build\outputs\apk` 입니다. 

> "%JAVA_HOME%"\bin\jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore jacegem-release-key.keystore android-armv7-release-unsigned.apk jacegem

> zipalign -v 4 android-armv7-release-unsigned.apk buy-cheap.apk

구글 플레이 콘솔에서 앱 업로드

![](https://goo.gl/ZMHHbS)

