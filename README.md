# TripFlow web app

Your travel itinerary app. It installs to the home screen on iPhone (Safari) and Android (Chrome). Free, never expires, and your trips stay on your phone.

## Files (upload all 7)

• index.html (the app)
• sw.js (lets it open offline and saves map areas you've viewed)
• manifest.webmanifest (makes it installable)
• icon2-180.png, icon2-192.png, icon2-512.png (app icon)
• README.md (this file, optional)

## Put it online with GitHub Pages (free, about 5 minutes, works from your iPhone)

1. In the Files app, tap TripFlow-web.zip to unzip it.
2. Go to github.com in Safari and sign in (or create a free account).
3. Tap **+** then **New repository**. Name it `tripflow`, set it to **Public**, tick **Add a README file**, then tap **Create repository**.
   (Public only means the app's code is visible. Your trips and QR codes are never uploaded: they live on your phone.)
4. In the repository, tap **Add file > Upload files**, choose the files from the unzipped folder, then tap **Commit changes**.
   If it asks to replace README.md, that's fine.
5. Go to **Settings > Pages**. Under Branch, pick **main** and **/ (root)**, then tap **Save**.
6. Wait a minute or two, refresh the page, and your link appears: `https://YOUR-USERNAME.github.io/tripflow/`

## Install on iPhone

1. Open your link in **Safari**.
2. Tap the **Share** button, then **Add to Home Screen**, then **Add**.
3. Open TripFlow from the new icon. Allow location when asked so the map can show where you are.

## Install on Android

1. Open your link in **Chrome**.
2. Tap **⋮**, then **Add to Home screen** or **Install app** (or tap the Install app button on My Trips).
3. Open TripFlow from the new icon and allow location when asked.

## Good to know

• **Reminders:** TripFlow shows a banner for a booked plan's reminder while the app is open. For an alert when it's closed, tap **Save & add to Calendar** on a plan, or **••• > Add all booked plans to Calendar** for the whole trip. The calendar then alerts you like any normal event, and times stay correct when your phone changes time zone abroad.
• **Backups:** your data lives inside the home screen app. Before deleting the icon or changing phone, use **••• > Back up all trips** on the My Trips screen and save the file to iCloud Drive. Restore it from the same menu.
• **Offline:** the app opens without signal, and map areas you've looked at before are saved. Search, routes and new map areas need data.
• **Updating the app:** upload a new index.html to the same repository. The app picks it up the next time it opens with internet.
• Maps come from OpenFreeMap (Standard and Simple) and Esri (Satellite); switch with the layers button on the map. Place search uses OpenStreetMap. Go opens Google Maps (the app if installed, otherwise the website) for directions.
• Share a trip: open it, tap ••• > Share this trip. Friends import it with ••• > Import a shared trip or backup on My Trips.
