//импорт fs
import fs from 'fs'
// import { getConfig } from './config';

function getConfig(req, res){
    const homeConfig = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
    // console.log('config', getConfig)
    res.json(homeConfig)
    res.json({conf: getConfig})
}

export {
    getConfig
}