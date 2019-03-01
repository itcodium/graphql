
/*
  message.to='' 
  message.collapse_key=''
  message.notification.title=''
  message.notification.body=''
  message.data.my_key: 'my value',
  message.data.my_another_key: 'my another value'
*/

var FcmMan = (function () {
    function FcmMan(serverKey) {
      _this=this;
      this.registration_token=''
      this.collapse_key=''

      var FCM = new require('fcm-node');

      this.fcm = new FCM(serverKey);

      this.message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
          to: '', // registration_token
          collapse_key: '', //your_collapse_key
          notification: {
              title: '',  //Title of your push notification
              body: '' //Body of your push notification
          },
          data: {  //you can send only notification or only data(or include both)
              my_key: '', // my value
              my_another_key: '' //my another value
          }
      };

      this.send=function(callback){
        console.log("** send -> this.message -> ",this.message);
        this.fcm.send(this.message, function(err, response){
            callback(err, response);
        });
      }
       
      this.error=function(e){
          console.log('Error',e);
          var error;
          if (typeof e.message=='undefined'){
              error=e;
          }else{
            error=e.message
          }
          return {"errors": [{"code": 0,
                                "message": error}]
                    };
      }
    }
    return { FcmMan: FcmMan}
})()


module.exports = FcmMan;