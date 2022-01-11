// REST API
import { getConfig } from '../controllers/configControllers/config.js'
import { deleteDevices, getDevices, postDevices, putDevices } from '../controllers/configControllers/devices.js'
import { getHome, putHome } from '../controllers/configControllers/home.js'
import { deleteRooms, getRooms, postRooms, putRooms } from '../controllers/configControllers/rooms.js'
import { deleteUsers, getUsers, postUsers, putUsers } from '../controllers/configControllers/users.js'


export default (app, aedes)=>{
    // app.use(verifyAccessToken)

    app.get('', (req, res)=>{
        //Обработчик. можно использоватеь MQTT aedes
        //aedes.publish  - отправляем с сервера на устройство

        //aedes.on('publish'){
        //     if(topick === 'топик /{id нужного утсройства}'){

        //     }
        // }

    })

    // ------------ Работа с Config -----------
    //------------------------------------------
    app.get('/config', getConfig)

    //Добавить пользователя в семейный доступ
    // то есть в объект users в конфиге
    app.get('/users', getUsers)
    app.post('/users', postUsers)
    app.put('/users', putUsers)
    app.delete('/users', deleteUsers)
    

    app.get('/rooms', getRooms)
    app.post('/rooms', postRooms)
    app.put('/rooms', putRooms)
    app.delete('/rooms', deleteRooms)

    //реализовать в первую очередь
    app.get('/devices', getDevices)
    app.post('/devices', postDevices)
    app.put('/devices', putDevices) //по логике не надо
    app.delete('/devices', deleteDevices)

    app.get('/home', getHome)
    app.put('/home', putHome)


}