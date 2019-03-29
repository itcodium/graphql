var path = require('path')
    , rootPath = path.normalize(__dirname + '/..')

module.exports = {
    development: {
        db: 'mongodb://admin:mlab123!@ds133597.mlab.com:33597/survey0001',
        root: rootPath,
        app: {
            name: 'Development Environment',
            port: 7777
        }
    },
    test: {
        db: 'mongodb://test:123123Test@ds159025.mlab.com:59025/survey0001',
        root: rootPath,
        app: {
            name: 'Test Environment',
            port: 8888
        }
    },
    production: {
        db: 'mongodb://admin:mlab123!@ds133597.mlab.com:33597/survey0001',
        root: rootPath,
        app: {
            name: 'Production',
            port: 8080
        }
    },

}