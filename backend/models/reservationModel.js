const mongoose = require('mongoose')

var reservationModel = new mongoose.Schema({
    name:{
        type: String
    },
    user:{
        type: String
    },
    roomNumber:{
        type: Number
    },
    from:{
        type: Date
    },
    to:{
        type: Date
    },
    status:{
        type: String
    },
    myVote:{
        type: Number
    },
    voted:{
        type: Boolean
    },
    bedNumber:{
        type: Number
    },
    cost:{
        type: Number
    }
})

module.exports = mongoose.model('Reservation', reservationModel, 'reservation')