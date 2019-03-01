/*
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var BackPoc     = require('../models/BackPoc');

// middleware to use for all requests
// http://localhost:3000/backpoc


var http = require("https");
var options = {
  hostname: 'api.digits.com',
  path: '/1.1/sdk/account.json',
  method: 'GET',
  protocol: 'https:',
  headers: {
      'Authorization': 'OAuth oauth_signature=jAsjY%2Fa1yIt1yYj%2Fb2gmi7paswQ%3D,oauth_nonce=2762E16D-BA89-4EB2-8A26-DFC2DB5355E2,oauth_timestamp=1477141999,oauth_consumer_key=zIRJzhMzKX32NsznWECvBzVRa,oauth_token=788752106371084289-sM9uS3EZlZPxZJZVKshYcvyoZFIAX4w,oauth_version=1.0,oauth_signature_method=HMAC-SHA1',
      'Content-Type': 'application/json',
  }
};


var req = http.request(options, function(res) {
  res.setEncoding('utf8');
  res.on('data', function (body) {

    console.log('Body: ',JSON.parse(body) );
  });
});
req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});
// write data to request body
req.write('{"string": "Hello, World"}');
req.end();




router.use(function(req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('Client IP:', ip);
    next(); 
});

router.post('/auth', function(req, res) {
  // console.log("req.body",req.body.data)
	// var cc=	req.body.data.replace("X-Auth-Service-Provider","XAuthServiceProvider")
	// cc=cc.replace("X-Verify-Credentials-Authorization","XVerifyCredentialsAuthorization");

var cc=	req.body.data.replace("\"X-Auth-Service-Provider\" =","\"X-Auth-Service-Provider\" :")
	cc=	cc.replace("\"X-Verify-Credentials-Authorization\" =","\"X-Verify-Credentials-Authorization\" :")
	  
	cc=cc.replace(/\\"/g, "")
	cc=cc.replace(";", ",")
	cc=cc.replace(";", "")
	data=JSON.parse(cc)

  console.log("Datos -> ",data['X-Verify-Credentials-Authorization'])



  return res.json({});
});

router.get('/getCentros', function(req, res) {
  BackPoc.find(function (err, collections) {
                  if (err) return next(err);
                    res.json(collections);
                });
});

  "id_str": "788752106371084289",
  "id":      788752106371084289,

  "verification_type": "sms",

Si existe:
  {
    _id:"XXXXXXXXXx",
    "id":      788752106371084289,
     "phone_number": "+541152605844",
      "nombre":"xxxx",
       "apellido":"xxx",  
       "fecha_nacimiento":"" 
       "sexo": ""  // M o F
  }  

si no existe
{
  "id":""
}

*/



var DigitsLogin = (function () {
    function DigitsLogin(req, res) {
      _this=this;
      this.https = {};
      this.model = {};
      this.options = {
        hostname: 'api.digits.com',
        path: '/1.1/sdk/account.json',
        method: 'GET',
        protocol: 'https:',
        headers: {
            'Authorization': '',
            'Content-Type': 'application/json',
        }
      };

      this.login=function(authorization){
          console.log("*** login ***");
          this.options.headers.Authorization=authorization;
          this.req = this.https.request(this.options, function(pRes) {
            //console.log('RES: ',res); 
            pRes.setEncoding('utf8');
            pRes.on('data',_this.parse_login_res);
          });
          this.req.on('error', _this.login_error);
          this.req.end();
      }
      this.parse_login_res=function(body){
          var data;
          try {
                data=JSON.parse(body)
            }
            catch(err) {
              return res.json(_this.login_error(err)); 
            }

          if(body.indexOf("errors")>-1){
            return res.json(JSON.parse(body));    
          }

          _this.buscar_usuario(data)
      }
      this.login_error=function(e){
          console.log('Error');
          return {"errors": [{"code": 0,
                                "message": e.message}]
                    };
      }

      this.buscar_usuario=function(data){
        console.log("Data -> ",data);
        
        this.model.findOne({ 'id_str': data.id_str }, '', function (err, item) {
          if (err){
           return res.json(_this.login_error(err)); 
          }
          if(!item){
            _this.guardar_usuario(data);  
          }
          res.json(item);

        })  
      }
      this.guardar_usuario=function(data){
        console.log("Data -> ",data);
        var model = new this.model({
            "id":  data.id,
            "id_str": data.id_str,
            "phone_number": data.phone_number,
            "nombre":data.nombre,
            "apellido":data.apellido,  
            "fecha_nacimiento":data.fecha_nacimiento, 
            "sexo": data.sexo
          });
        model.save(function(err, item){
              if(err){ return next(err); }
              res.json(item);
            });

      }

      

    }
   
    return { DigitsLogin: DigitsLogin}
})()


module.exports = DigitsLogin;