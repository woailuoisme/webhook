import {config} from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
config({
    path: '.env'
})
import http from "http";
const PORT = process.env.PORT || 10010
const repo = process.env.REPO_NAME
const secret = process.env.SECRET||'123456'
const refBranch=process.env.REPO_BRACHER ? `refs/heads/${process.env.REPO_BRACHER}`: `refs/heads/master`
const scriptPath = `./scripts/dev-${process.env.SCRIPT_NAME}`
import {githubHandler} from "./handler.mjs";

const deployHandler =githubHandler({
    scriptPath,refBranch,repo,secret
})

http.createServer(function (req, res) {
    deployHandler(req, res, function (err) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(PORT)
console.log(scriptPath,refBranch,repo,secret)
console.log(`http server started on http://127.0.0.1:${PORT}`)


