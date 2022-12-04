const roomsData = require('../src/roomsData')

exports.handler = async function(event, contenxt) {
  return {
    statusCode: 200,
    body: JSON.stringify(roomsData)
  }
}
