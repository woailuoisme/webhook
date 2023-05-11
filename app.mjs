import {config} from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
config({path: '.env'})
import http from "http";
const PORT = process.env.PORT || 8100
const secret = process.env.SECRET||'123456'

import {githubHandler} from "./handler.mjs";

const deployHandler =githubHandler({secret})

http.createServer(function (req, res) {
    deployHandler(req, res, function (err) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(PORT)
console.log(`http server started on http://127.0.0.1:${PORT}`)


