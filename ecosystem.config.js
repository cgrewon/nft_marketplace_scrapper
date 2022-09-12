module.exports = {
    apps:[
        {
            name:"opensa_scan",
            script:"C:\\Users\\jhulius\\Documents\\tribeone-opensea-scrapper-nest\\dist\\main.js",
            env:{
                NODE_ENV:"development"
            },
            env_production:{
                NODE_ENV:"production"
            },
            instances:1,
            exec_mode: "fork"
        }
    ]
}