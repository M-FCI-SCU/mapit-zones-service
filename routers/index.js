const usersRouter = require("./users.router")
const zonesRouter = require("./zones.router")

const routers = [
    usersRouter,
    zonesRouter
]


function setupRouters(app){
    routers.forEach(router => {
        app.use(router)
    });
}

module.exports = {routers, setupRouters}