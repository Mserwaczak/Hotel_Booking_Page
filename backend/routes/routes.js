const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/signUpModels')
const hotelTemplate = require('../models/hotelModels')
const reservation = require('../models/reservationModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'fsjrtw64suetvvrevvsytru5e4s3ws3a42x4txr3qu5uvy'

router.post('/register', async(request, response) =>{

    const securePassword = await bcrypt.hash(request.body.password, 10)

    const signedUpUser = new signUpTemplateCopy({
        name:request.body.name,
        surname:request.body.surname,
        username:request.body.username,
        email:request.body.email,
        password:securePassword
    })

    const user = await signUpTemplateCopy.findOne({username: request.body.username}).exec()
    const user2 = await signUpTemplateCopy.findOne({email: request.body.email})

    if(user){
        return response.sendStatus(401)
    }else if(user2){
        return response.sendStatus(400)
    }else{
        signedUpUser.save()
            .then(data =>{
                response.json({status: "ok"})
            })
            .catch(error =>{
                response.json(error)
            })
    }


})

router.post('/login', async(request, response) =>{
    const {username, password} = request.body;
    if (!username || !password) return response.status(400).json({'message': 'Username and password are required'});

    const user = await signUpTemplateCopy.findOne({username}).exec()

    if(!user){
        return response.sendStatus(401)
    }
    const match = await bcrypt.compare(password, user.password);
    if(match){
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            JWT_SECRET,
            {expiresIn: '10s'}
        );
        const refreshToken = jwt.sign(
            {"username" : user.username},
            JWT_SECRET,
            {expiresIn: "1d"}
        );
        user.refreshToken = refreshToken;
        const result = await user.save();
        console.log(result);
        response.cookie('token', refreshToken, {httpOnly: true, secure: true, sameSite:"none", maxAge: 24*60*60*1000});

        return response.json({status: 'ok', id: user._id, username: user.username})
    }

    response.sendStatus(400)
})


router.get('/refresh', async(request, response) =>{
    const cookies = request.cookies;
    // if(!cookies?.token) return response.sendStatus(401);
    const refreshToken = cookies.token;

    const user = await signUpTemplateCopy.findOne({refreshToken}).exec();
    if(!user) return response.sendStatus(403);

    jwt.verify(refreshToken,
        JWT_SECRET,
        (err, decoded) =>{
            if (err || user.username !== decoded.username) return response.sendStatus(403);
            const accessToken = jwt.sign(
                {
                    id: user._id,
                    username: user.username
                },
                JWT_SECRET,
                {expiresIn: '10s'}
            );
            response.json({status: 'ok', data: accessToken})
        }
        )


})

router.get('/get-user-details/:username', async(request, response) =>{
    const username = request.params.username

    const userDetails = await signUpTemplateCopy.aggregate([{$match: {username: username}}, {$project:{name: 1, surname: 1, email: 1}}]).exec();

    response.json({"simple": userDetails})
})

router.get('/getall', async(request, response) =>{
    const hotels = await hotelTemplate.find().exec();

    response.json({"hotels": hotels})
})

router.get('/get-selected/:city', async(request, response) =>{
    const city = request.params.city;
    console.log(city)
    const hotels = await hotelTemplate.find({city: city}).exec();

    response.json({"hotels": hotels})
})

router.get('/get-hotel/:name', async(request, response) =>{
    const name = request.params.name;

    const hotels = await hotelTemplate.findOne({name: name}).exec();

    response.json({"hotel": hotels})
})

router.get('/get-price/:name', async(request, response) =>{
    const name = request.params.name
    var price = 0;
    var acc = 0;
    const priceRoom = []

    hotelTemplate.findOne({ name : name}, function(err, foundcategory) {
        if (err) {
            console.log(err);
        } else {
            price = foundcategory.price;

            for (i = 0; i < foundcategory.rooms.length; i++) {
                acc = foundcategory.rooms[i].accomodation;
                var wynik = price * acc;

                priceRoom.push(wynik)
            }
        }


            response.json({"price": priceRoom})
        })
    })


router.get('/get-price/:name/:number', async(request, response) =>{
    const name = request.params.name
    var price = 0;
    var acc = 0;
    var number = request.params.number

    hotelTemplate.findOne({ name : name}, function(err, foundcategory){
        if(err){
            console.log(err);
        } else {
            price = foundcategory.price;
            acc = foundcategory.rooms[number-1].accomodation;

            var wynik = price * acc;
            response.json({"price": wynik})
        }
    })

})

router.get('/get-avgrate/:name', async(request, response) =>{
    const hotelID = request.params.name


    hotelTemplate.findOne({ name : hotelID}, function(err, foundcategory){
        if(err){
            console.log(err);
        } else {
            var suma = 0;
            for(i = 0; i< foundcategory.ratings.length; i++){
                suma += foundcategory.ratings[i]
            }
            var avg = suma/foundcategory.ratings.length
            response.json({"average": avg})
        }
    })

})

router.get('/get-simple/:city', async(request, response) =>{
    const city = request.params.city

    console.log(city)

    const simple = await hotelTemplate.aggregate([{$match: {city: city}}, {$project:{_id: 1, name: 1, street: 1, jpg1: 1,type: 1, avgRating: {$avg: "$ratings"},   facility: {$first:"$facilities"}, price: 1}}]).exec();

    response.json({"simple": simple})
})

router.put('/rate', async(request, response) =>{
    const hotelID = request.body.name
    const rating = parseInt(request.body.rate)
    const id = request.body.id

    console.log(hotelID, rating, id)

    hotelTemplate.updateOne({ name : hotelID}, {$push: {ratings: rating}}, function(err, result){
        if(err){
            response.send(err);
        } else {
            console.log(result)
        }

    })

    reservation.updateOne({ _id : id}, {$set: {myVote: rating, voted: true}}, function(err, result){
        if(err){
            response.send(err);
        } else {
            console.log(result)
        }
        response.send({message: "ok"})
    })


})

router.get('/count-free-room/:name', async(request, response) =>{
    const hotelID = request.params.name

    const freeRoom = await hotelTemplate.aggregate([{$match: {name: hotelID}}, {$project: {"rooms.accomodation": 1, "rooms.from": 1}}, {$unwind: {path: "$rooms"}}, {$match: {"rooms.from": {$regex: "free"}}}, {$group: {_id:"$rooms.accomodation", count: {$sum: 1}}}] ).exec();

    response.send({"free-room": freeRoom})

})

router.get('/get-free-room/:name', async(request, response) =>{
    const hotelID = request.params.name

    const freeRoom = await hotelTemplate.aggregate([{$match: {name: hotelID}}, {$project:{rooms: 1}},  {$unwind: {path: "$rooms"}}, {$match: {"rooms.from": {$regex: "free"}}}]).exec();

    response.send({"free": freeRoom})

})

router.post('/reserve', async(request, response) =>{

    const reservations = new reservation({
        name:request.body.name,
        user:request.body.user,
        roomNumber:request.body.roomNumber,
        from:request.body.from,
        to:request.body.to,
        status:"Zarezerwowany",
        myVote: 0,
        voted: false,
        bedNumber: request.body.bedNumber,
        cost: request.body.cost

    })
    reservations.save()
        .then(data =>{
            response.json(data)
        })
        .catch(error =>{
            response.json(error)
        })
})

router.get('/get-reserved-room/:user', async(request, response) =>{
    const user = request.params.user

    const reserved = await hotelTemplate.aggregate([{$match: {"rooms.user": user}}, {$unwind:{path: "$rooms"}}, {$match: {"rooms.user": user}}]).exec();

    response.send({"reserved": reserved})

})

router.get('/get-type/:city/:type', async(request, response) =>{
    const city = request.params.city
    const type = request.params.type

    const types = await hotelTemplate.aggregate([{$match: {city: city}}, {$match: {type: type}}]).exec();

    response.send({"types": types})

})

router.get('/get-type/:type', async(request, response) =>{
    const type = request.params.type

    // const types = await hotelTemplate.aggregate([{$match: {type: type}}]).exec();

    const simple = await hotelTemplate.aggregate([{$match: {type: type}}, {$project:{name: 1, street: 1, jpg1: 1, avgRating: {$avg: "$ratings"}}}]).exec();

    response.send({"simple": simple})

})

router.get('/get-available/:name/:from/:to', async(request, response) =>{
    const name = request.params.name
    const from = request.params.from
    const to = request.params.to

    var liczby = []

    const simple = await hotelTemplate.aggregate([{$match: {name: name}}, {$unwind:{path: "$rooms"}}, {$lookup:{from: "reservation", let:{name: "$name", number: "$rooms.number"}, pipeline: [{$match:{$expr:{$and:[{$eq:["$name", "$$name"]}, {$eq: ["$roomNumber", "$$number"]}]}}}], as: "result"}}, {$unwind:{path: "$result", preserveNullAndEmptyArrays: true}}, {$group:{_id: "$rooms.number", count: {$sum:1}}}, {$sort:{_id:1}}]).exec();
    const simple2 = await hotelTemplate.aggregate([{$match: {name: name}},{$unwind:{path:"$rooms"}},{$lookup:{from: "reservation", let:{name: "$name", number: "$rooms.number"}, pipeline: [{$match:{$expr:{$and:[{$eq:["$name", "$$name"]}, {$eq: ["$roomNumber", "$$number"]}]}}}], as: "result"}},{$unwind:{path: "$result", preserveNullAndEmptyArrays: true}},{$match:{"result.from": {$not:{$gte:new Date(from), $lte:new Date(to)}}}},{$match:{ "result.to": {$not:{$gte:new Date(from), $lte:new Date(to)}}}},{$match:{$or:[ {"result.from":{$not:{$lt:new Date(from)}}},{"result.to":{$not:{$gt:new Date(to)}}}]}}, {$project:{"rooms.number":1}}, {$group:{_id: "$rooms.number", count:{$sum:1}}}, {$sort:{_id:1}}]).exec();
    console.log({"length": simple.length})
    for(i=0; i<simple2.length; i++){
        if(simple[i].count != simple2[i].count){
            liczby.push(i+1)
        }

    }


    const simple3 = await hotelTemplate.aggregate([{$match: {name: name}},{$unwind:{path:"$rooms"}},{$lookup:{from: "reservation", let:{name: "$name", number: "$rooms.number"}, pipeline: [{$match:{$expr:{$and:[{$eq:["$name", "$$name"]}, {$eq: ["$roomNumber", "$$number"]}]}}}], as: "result"}},{$unwind:{path: "$result", preserveNullAndEmptyArrays: true}},{$match:{"result.from": {$not:{$gte:new Date(from), $lte:new Date(to)}}}},{$match:{ "result.to": {$not:{$gte:new Date(from), $lte:new Date(to)}}}},{$match:{$or:[ {"result.from":{$not:{$lt:new Date(from)}}},{"result.to":{$not:{$gt:new Date(to)}}}]}}, {$match:{"result.roomNumber":{$nin:liczby}}}, {$project:{name: 1, street:1, jpg1:1,jpg2:1, jpg3:1,jpg4:1,description:1, facilities:1, "rooms.number":1, "rooms.accomodation":1, "rooms.bed":1, "rooms.price":{$multiply:["$rooms.accomodation", "$price"]}}}, {$group:{_id:"$_id", "name":{$first:"$name"}, "street":{$first:"$street"}, "jpg1":{$first:"$jpg1"},"jpg2":{$first:"$jpg2"},"jpg3":{$first:"$jpg3"},"jpg4":{$first:"$jpg4"},"description":{$first:"$description"},"facilities":{$first:"$facilities"}, "rooms":{"$addToSet": "$rooms"}}}, {$unwind: {path: "$rooms"}}, {$sort:{"rooms.number":1}}, {$group:{_id:"$_id", "name":{$first:"$name"}, "street":{$first:"$street"}, "jpg1":{$first:"$jpg1"},"jpg2":{$first:"$jpg2"},"jpg3":{$first:"$jpg3"},"jpg4":{$first:"$jpg4"},"description":{$first:"$description"},"facilities":{$first:"$facilities"}, "rooms":{"$push": "$rooms"}}}] ).exec();

    // console.log(simple[1]._id)
    // console.log(simple2[1]._id)
    // console.log(liczby)

    response.send({"simple": simple3})

})

router.get('/get-my-vote/:id', async(request, response) =>{
    const id = request.params.id

    const test = await reservation.find({user: id}).exec();
    response.send({"test": test})

})


router.get('/get-my-reservation/:username', async(request, response) =>{
    const username = request.params.username

    const simple = await reservation.aggregate([{$match:{user: username}}, {$lookup:{from:"users", localField:"user", foreignField:"username", as:"details"}}, {$project:{name:1,roomNumber:1, bedNumber:1, from:1, to:1, status:1,cost: 1, "details.name":1, "details.surname":1}}]).exec();
    response.send({"reservation": simple})

})

router.get('/get-all-reservation', async(request, response) =>{
    const simple = await reservation.aggregate([{$lookup:{from:"users", localField:"user", foreignField:"username", as:"details"}}, {$project:{user: 1, name:1,roomNumber:1, bedNumber:1, from:1, to:1, status:1,cost: 1, "details.name":1, "details.surname":1}}]).exec();
    response.send({"reservation": simple})

})

router.put('/change-status', async(request, response) =>{
    const id = request.body.id
    const status = request.body.status

    reservation.updateOne({ _id : id}, {$set: {status: status}}, function(err, result){
        if(err){
            response.send(err);
        } else {
            console.log(result)
        }
        response.send({message: "ok"})
    })


})

router.delete('/delete-reservation/:id', async(request, response) =>{
    const id = request.params.id



    const resp = reservation.findOne({_id: id}).remove().exec()
    console.log(id, resp)

    response.send({message: "usunieto"})

})

module.exports = router