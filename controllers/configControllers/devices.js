// import fs from 'fs'

// const homeConfig = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

// function getDevices(req, res){
//     const devices = []
//     homeConfig.home.rooms.forEach(room => {
//         devices.push(...room.devices)
//     });
//     res.json({devices: devices})
// }

// function postDevices(req, res){
//     //room
//     //device id
//     const deviceId = req.body.id
//     const roomName = req.body.roomName
//     console.log('хоум конфиг', homeConfig.rooms)
//     homeConfig.home.rooms.forEach(room => {
//         console.log('рум девайсес', room.devices)
//         if(room.name === roomName){
//             const newDevice = addDevice(deviceId)
//             room.devices.splice(0,0, newDevice)
//         }
//     });
//     fs.writeFile('./config.json', JSON.stringify(homeConfig), (err)=>{
//         console.log(err)
//         res.json({status: 200})
//     })
// }

// function putDevices(req, res){

// }

// function deleteDevices(req, res){
//     const deviceId = req.query.id

//     homeConfig.home.rooms.forEach(room => {
//         let indexOfDeletedDevice = undefined
//         room.devices.forEach((device, index)=>{
//             console.log('device.id', device.id)
//             console.log('deviceId', deviceId)
//             if(device.id === deviceId){
//                 indexOfDeletedDevice = index
//                 console.log('indexOfDeletedDevice', indexOfDeletedDevice)
//             }
//         })
//         if(indexOfDeletedDevice != undefined){
//             console.log('deleting', deviceId)
//             console.log('indexOfDeletedDevice', indexOfDeletedDevice)
//             room.devices.splice(indexOfDeletedDevice, 1)
//         }
//     });
//     fs.writeFile('./config.json', JSON.stringify(homeConfig), (err)=>{
//         console.log(JSON.stringify(homeConfig))
//         console.log(err)
//         res.json({status: 200})
//     })
// }``

// function addDevice(deviceId){
//     if(deviceId.indexOf('THS') != -1){
//         return{
//             id: deviceId,
//             name: 'Термостат',
//             wishTemperature: 20,
//             type: "THS",
//             icon: 'icon/termostat.png',
//         }
//     } else if(deviceId.indexOf('IPC') != -1){
//         return {
//             id: deviceId,
//             name: `Device ${deviceId}`,
//             type: "IPC",
//             viewFromCamera: '',
//             icon: ''
//         }
//     }
//     else if(deviceId.indexOf('GTS') != -1){
//         return {
//             id: deviceId,
//             name: `Device ${deviceId}`,
//             type: "GTS",
//             position: ''
//         }
//     }
//     else if(deviceId.indexOf('ELC') != -1){
//         return {
//             id: deviceId,
//             name: `Device ${deviceId}`,
//             type: "ELC",
//             count: ''
//         }
//     }
//     else if(deviceId.indexOf('WAC') != -1){
//         return {
//             id: deviceId,
//             name: `Device ${deviceId}`,
//             type: "WAC",
//             count: ''
//         }
//     }
//     else if(deviceId.indexOf('IMC') != -1){
//         return {
//             id: deviceId,
//             name: `Device ${deviceId}`,
//             type: "IRC",
//             count: ''
//         }
//     }
// }

// export {
//     getDevices,
//     postDevices,
//     putDevices,
//     deleteDevices
// }
