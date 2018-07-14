// A RESTful factory for retreiving mails from 'mails.json'
app.factory('mails', ['$http', function ($http) {
  var path = 'js/app/mail/mails.json';
  var mails = $http.get(path).then(function (resp) {
    return resp.data.mails;
  });

  var factory = {};
  factory.all = function () {
    return mails;
  };
  factory.get = function (id) {
    return mails.then(function(mails){
      for (var i = 0; i < mails.length; i++) {
        if (mails[i].id == id) return mails[i];
      }
      return null;
    })
  };
  return factory;
}]);

/*app.factory('ChatService', ['$timeout','$q', function ($q, $timeout) {
	
    var service = {}, listener = $q.defer(), socket = {
      client: null,
      stomp: null
    }, messageIds = [];

    service.RECONNECT_TIMEOUT = 30000;
    service.SOCKET_URL = "/service";
    service.CHAT_TOPIC = "/user/31/chat/message";
    service.CHAT_BROKER = "/user/31/chat/message";
    
    service.receive = function() {
      return listener.promise;
    };
    
    service.send = function(message,channel) {
      console.log(message);
      socket.stomp.send(channel, {}, JSON.stringify({"content":""+message+""}));//+"\u0000"
    };
    
    var reconnect = function() {
      $timeout(function() {
        initialize();
      }, this.RECONNECT_TIMEOUT);
    };
    
    var getMessage = function(data) {
    	var message = JSON.parse(data), out = {};
      console.log(message.content);
            
      out.message = message.message;
      out.time = new Date(message.time);
      if (_.contains(messageIds, message.id)) {
        out.self = true;
        messageIds = _.remove(messageIds, message.id);
      }
      return message;
    };
    
    var startListener = function() {
      socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
        listener.notify(getMessage(data.body));
      });
    };
    
    service.initialize = function(channel) {
    	console.log("socket init ");
      socket.client = new SockJS(service.SOCKET_URL);
      socket.stomp = Stomp.over(socket.client);
      
      socket.stomp.connect('', '', function(frame) {
          console.log('Connected: ' + frame);
          service.CHAT_BROKER=channel;
          socket.stomp.subscribe(channel, function(data){
        	   listener.notify(getMessage(data.body));
          });
      });
    };
    
//    initialize();
    return service;
	}]);*/
