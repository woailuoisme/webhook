import fs from "fs";
import dayjs from "dayjs";
import {$} from 'execa';
import colors from 'colors'
import createHandler from "github-webhook-handler";
// const createHandler = require('gitee-webhook-handler')
const $$ = $({stdio: 'inherit'});
const now=dayjs().format('YYYY-MM-DD HH:mm:ss');
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const {repos}  = require("./config.json");
// const repo = process.env.REPO_NAME
// const refBranch=process.env.REPO_BRACHER ? `refs/heads/${process.env.REPO_BRACHER}`: `refs/heads/master`
// const scriptPath = `./scripts/dev-${process.env.SCRIPT_NAME}`
export const githubHandler= ({secret})=>{
    const handler = createHandler({path: '/webhook', secret })
    handler.on('error', err => {
        console.error(colors.red(`Error: ${err.message}`))
    })
    handler.on('push', async (event) => {
      console.log(`Received a push event from ${event.payload.repository.name} to ${event.payload.ref}`.green)
      await $$`sh chmod a+x ./scripts/*.sh`;
      if (repos && repos.length>0){
          for (const r of repos) {
            if (event.payload.ref === r.branch && event.payload.repository.name === r.repository) {
              if (!fs.existsSync(`./scripts/${r.script}`)) {
                console.error(`./scripts/${r.script} file is not existed !!!`.yellow)
                continue;
              }
              console.log(`###################CI start ${now} ###################`.green)
              await $$`sh ./scripts/${r.script}`;
              console.log(`###################CI ended ${now} ###################`.green)
            }
          }
      }

    })
    return handler
}

