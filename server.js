var express = require('express');
var app = express();
var r = require('rethinkdb');
var _ = require('lodash');
var keys = require('./server_keys');
var pubnub = require("pubnub").init({
    publish_key   : keys.publish_key,
    subscribe_key : keys.subscribe_key
});
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname));

connect().then(function(conn){
  r.table('todos').changes().run(conn)
  .then(function(cursor){
    cursor.each(function(err, item){
      console.log('item: ', item);
      if(item.new_val !== undefined){
        publish(item.new_val);
      }
    });
  });
});

app.post('/todos', function(req, res, next){
  console.log('req.body: ', req.body);
  connect().then(function(conn){
    return r.table('todos').insert(req.body).run(conn);
  })
  .then(function(){
    res.end();
  })
  .catch(next);
});

app.get('/all', function(req, res, next){
  connect().then(function(conn){
    return r.table('todos').run(conn);
  })
  .then(function(cursor){
    return cursor.toArray();
  })
  .then(function(response){
    res.json(response);
  })
  .catch(next);
});

app.listen(port);
console.log('server is listening on port',port);

function connect(){
  return r.connect({ host: 'localhost',
    port: 28015,
    db: 'todo_list'
  })
};

function publish(data){
  pubnub.publish({
    channel   : 'jhe_channel',
    message   : data,
    callback  : function(e) { console.log( "SUCCESS!", e ); },
    error     : function(e) { console.log( "FAILED! RETRY PUBLISH!", e ); }
  });
}