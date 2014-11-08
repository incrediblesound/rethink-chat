Rethink-Chat
============
Rethink-chat is a simple chat app using rethinkDB changefeed and PubNub. RethinkDB allows you to create change feeds that emit data events when changes happen on a given table. PubNub gives you a simple api that allows you to publish data in one location and subscribe to that data in another location. This app uses PubNub to publish the data from a rethinkDB changefeed on the backend and simultaneously listens for published data on the front end, creating a realtime chat experience.
