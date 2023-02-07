const mongoose = require('mongoose')

var hotelModel = new mongoose.Schema({
    city:{
        type: String
    },
    street:{
        type: String
    },
    name:{
        type: String
    },
    price:{
        type: Number
    },
    jpg1:{
        type: String
    },
    jpg2:{
        type: String
    },
    jpg3:{
        type: String
    },
    jpg4:{
        type: String
    },
    description:{
        type: String
    },
    ratings:{
        type: Array
    },
    facilities:{
        type: Array
    },
    rooms: [{
        number:{
            type: Number
        },
        accomodation:{
            type: Number
        },
        bed:{
            type: Number
        },
        user:{
            type: String
        },
        from:{
            type: String
        },
        to:{
            type: String
        }
    }]
})

module.exports = mongoose.model('HOtel', hotelModel, 'hotels')