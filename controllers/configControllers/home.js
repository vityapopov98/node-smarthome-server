import fs from 'fs'

const homeConfig = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

function getHome(req, res) {
    res.json({home: homeConfig.home})
}

function putHome(req, res) {
    
}

export {
    getHome,
    putHome
}