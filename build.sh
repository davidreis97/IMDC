ionic cordova build android --prod --release
cd /Users/davidreis/Stuff/DCMovieRatings/platforms/android/app/build/outputs/apk/release/
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name
rm imdc.apk
zipalign -v 4 app-release-unsigned.apk imdc.apk