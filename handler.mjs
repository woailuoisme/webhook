import fs from "fs";
import dayjs from "dayjs";
import {$} from 'execa';
import colors from 'colors'
import createHandler from "github-webhook-handler";
// const createHandler = require('gitee-webhook-handler')
const $$ = $({stdio: 'inherit'});
const now=dayjs().format('YYYY-MM-DD HH:mm:ss');
export const githubHandler= ({secret,refBranch,repo,scriptPath})=>{
    const handler = createHandler({path: '/webhook', secret:secret })
    handler.on('error', err => {
        console.error(colors.red(`Error: ${err.message}`))
    })
    handler.on('push', async (event) => {
        await $$`sh chmod a+x ./scripts/*.sh`;
        console.log(`Received a push event from ${event.payload.repository.name} to ${event.payload.ref}`.green)
        if (event.payload.ref === refBranch && event.payload.repository.name === repo) {
            console.log(`###################CI start ${now} ###################`.green)
            if (!fs.existsSync(scriptPath)) {
                console.log(`${scriptPath} file is not existed !!!`.yellow)
                return
            }
            await $$`sh scriptPath`;
        }
    })
    return handler
}

