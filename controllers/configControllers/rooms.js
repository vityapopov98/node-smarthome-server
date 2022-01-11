import fs from 'fs'

const homeConfig = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

function getRooms(req, res){
    console.log('rooms')
    const rooms = []
    homeConfig.home.rooms.forEach(room => {
        rooms.push({
            name: room.name,
            icon: room.icon
        })
    });
    res.json({rooms: rooms})
}

function postRooms(req, res){
    
}

function putRooms(req, res){
    
}

function deleteRooms(req, res){
    
}

export {
    getRooms, 
    postRooms, 
    putRooms, 
    deleteRooms
}