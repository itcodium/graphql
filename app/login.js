
var DigitsLogin = (function () {
  function DigitsLogin (req, res) {
    _this = this;
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

    this.login = function (authorization) {
      console.log("*** login ***");
      this.options.headers.Authorization = authorization;
      this.req = this.https.request(this.options, function (pRes) {
        //console.log('RES: ',res);
        pRes.setEncoding('utf8');
        pRes.on('data', _this.parse_login_res);
      });
      this.req.on('error', _this.login_error);
      this.req.end();
    }
    this.parse_login_res = function (body) {
      var data;
      try {
        data = JSON.parse(body)
      }
      catch (err) {
        return res.json(_this.login_error(err));
      }

      if (body.indexOf("errors") > -1) {
        return res.json(JSON.parse(body));
      }

      _this.buscar_usuario(data)
    }
    this.login_error = function (e) {
      console.log('Error');
      return {
        "errors": [{
          "code": 0,
          "message": e.message
        }]
      };
    }

    this.buscar_usuario = function (data) {
      console.log("Data -> ", data);
      this.model.findOne({ 'id_str': data.id_str }, '', function (err, item) {
        if (err) {
          return res.json(_this.login_error(err));
        }
        if (!item) {
          _this.guardar_usuario(data);
        }
        res.json(item);

      })
    }
    this.guardar_usuario = function (data) {
      console.log("Data -> ", data);
      var model = new this.model({
        "id": data.id,
        "id_str": data.id_str,
        "phone_number": data.phone_number,
        "nombre": data.nombre,
        "apellido": data.apellido,
        "fecha_nacimiento": data.fecha_nacimiento,
        "sexo": data.sexo
      });
      model.save(function (err, item) {
        if (err) { return next(err); }
        res.json(item);
      });

    }
  }

  return { DigitsLogin: DigitsLogin }
})()


module.exports = DigitsLogin;