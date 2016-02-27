var configs = {
    dev: {
        dbHost: "127.0.0.1",
        dbPort: 27017,
        dbName: "njs-blog-app-db",
        dbUser: "dbuser",
        dbPassword: "dbpassword"
    },
    heroku: {
        dbHost: "ds017248.mlab.com",
        dbPort: "17248",
        dbName: "njs-blog-app-db",
        dbUser: "dbuser",
        dbPassword: "dbpassword"
    }
}

// change this heroku deployment
var currentEnv = "dev";
myconfig = configs[currentEnv];

console.log('Current env: ' + currentEnv);
console.log('Configs are: ' + JSON.stringify(myconfig, null, 2));

module.exports = myconfig;