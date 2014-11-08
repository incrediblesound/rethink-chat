Rethink-Chat
============
Rethink-chat is a simple chat app using rethinkDB and PubNub. RethinkDB allows you to create change feeds that emit data events when changes happen on a given table. PubNub gives you a simple api that allows you to publish data in one location and subscribe to that data in another location. This app uses PubNub to publish the data from a rethinkDB changefeed on the backend and simultaneously listens for published data on the front end, creating a realtime chat experience.

This app is run on a Node.js server. To try it out, clone the repository and run `npm install` to get the required dependencies. You can get PubNub keys for free on the [PubNub](https://www.pubnub.com/) website that must be used in server.js and index.html to intialize the publish/subscribe relationship. Then run `node server.js` and point your browser to localhost:3000. You can open two browser windows and use different usernames to test the chat functionality. 
