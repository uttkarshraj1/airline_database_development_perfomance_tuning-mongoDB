//1
db.planes.find().sort({ last_upgraded: 1 }).limit(2).pretty()

//2
db.employee.aggregate([{ $group: { _id: '$role' , count: {$sum: 1}}}, {$project: {_id: 0, role: '$_id',count:1}}])

//3
db.employee.aggregate([{ $group: { _id: '$role', total_salary: {$sum: '$contract.salary'}}},{$project:{_id: 0, role:'$_id', total_salary:1}},{$sort:{total_salary: -1}}])

//4
db.bookings.aggregate([{ $group: { _id: '$user', total_spent: {$sum: '$total_cost'}}},{$sort: {total_spent: - 1}},{$lookup:{from:'user',localField:'_id',foreignField:'_id',as:'user'}},{$u nwind:{path:'$user'}},{$project:{_id:0,'user.first_name':1,'user.last_name':1 ,total_spent:1}}]).pretty()

//5
db.airport.aggregate( [
    { $lookup:{
        from:"flights",
        let:{airport_id:"$_id"},
        pipeline:[
            {  $match:{
                $expr:
                  { $or:[
                      {$eq:["$starting.airport", "$$airport_id"]},
                      {$eq:["$destination.airport", "$$airport_id"]}
                    ]
                    } }
                },
        { $count: "airport_usage"}
        ],
        as: "fly_data"
    }},
    {$unwind:"$fly_data"},
    { $sort:{"fly_data.airport_usage":-1}},
    { $limit: 3},
    { $project: {_id:0,name:1,airport_usage:"$fly_data.airport_usage"}}
])

//6
db.employee.aggregate( [
    { $match:{role:"pilot"}},
    { $lookup:{
        from:"flights",
        let:{pilot_id:"$_id"},
        pipeline:[
            {  $match:{
                $expr:
                  { $or:[
                      {$eq:["$pilot", "$$pilot_id"]},
                      {$eq:["$co_pilot", "$$pilot_id"]}
                ]
                } }
            },
            { $project: {distance:1}}
        ],
        as: "fly_data"
    }},
    {$unwind:"$fly_data"},
        { $group:{_id:"$_id",
    first_name:{$addToSet:"$first_name"},last_name:{$addToSet:"$last_name"},total_distance:{$sum:"$fly_data.distance"}}},
        { $sort:{"total_distance":-1}},
    { $limit: 3} 
])

//7
db.employee.aggregate({$match : {last_test: {$lt: new Date(ISODate().getTime()- 1000*60*60*24*365*3)}}}).pretty()

//8
db.employee.aggregate(
    [{ $match:
    { first_name: "Smith", last_name: "Johnson" } }, {$facet:{
    "total":[
            { $lookup: { from: "flights", localField: "_id", foreignField: "pilot"
    ,as:"pilots"}},
            { $unwind:"$pilots"},
            {
    $project:{"pilots.pilot":1,"pilots.distance":1,date:{$dateFromString:{dateString:"$pilots.destination.time"}}}},
            { $match:{"date":{$gte:new Date("2021-12-01"),$lt:new Date("2022-01-01")}}},
            { $group:{_id:"$pilots.pilot",total:{$sum: "$pilots.distance"}}},
            { $project:{_id:0,total:{$multiply:["$total",2]}}},
    { $addFields:{total:"$total"}}],
        "co_total":[
            { $lookup: { from: "flights", localField: "_id", foreignField: "co_pilot"
    ,as:"co_pilots"}},
            { $unwind:"$co_pilots"},
            {
    $project:{"co_pilots.co_pilot":1,"co_pilots.distance":1,date:{$dateFromString:{dateString:"$co_pilots.destination.time"}}}},
            { $match:{"date":{$gte:new Date("2021-12-01"),$lt:new Date("2022-01-01")}}},
            { $group:{_id:"$co_pilots.co_pilot",co_total:{$sum:
    "$co_pilots.distance"}}},
            { $project:{_id:0,total:{$multiply:["$co_total",1.5]}}}]
            }
            },
        {$unwind:"$total"},
        {$unwind:"$co_total"},
        {$project:{total:{$add:["$total.total","$co_total.total"]}}}
        ]
    )

//9
db.flights.aggregate( [
    {
        $project:{"plane":1,"starting.airport":1,"destination.airport":1,start_date:{$dateF
        romString:{dateString:"$starting.time"}},end_date:{$dateFromString:{dateString:"$destination.time"}}}},
                { $match:{"end_date":{$gte:new Date("2021-12-01"),$lt:new Date("2022-01-01")}}},
                { $project
        :{plane:"$plane",start_airport:"$starting.airport",start_time:"$start_date",end_airport:"$destination.airport",end_time:"$end_date"}},
                { $sort:{"plane":1,"start_time":1}},
                { $group:{_id:"$plane", all: {$push: "$$ROOT"}}},
                {$addFields: {allWithIndex: {$zip: {inputs: ["$all", {$range: [0, {$size:
        "$all"}]}]}}}},
                {$project: {
                  pairs: {
        $map: {
            input: "$allWithIndex",
            in : {
                current: {$arrayElemAt: ["$$this", 0]},
                prev: {
                    $arrayElemAt: [
                        "$all",
        1]}, 1]}]}
        } }},
                { $unwind: "$pairs"},
                {
                    $project:{_id:1,pairs:1,"end_time_mod":{$cond:{if:{$eq:["$pairs.current._id","$pairs.prev._id"]},then:"$pairs.prev.start_time",else:"$pairs.prev.end_time"}}}},
                    { $group: {
                              _id: {plane: "$_id", aiport: "$pairs.current.start_airport"},
                              stay_time: {$sum: {$subtract: ["$pairs.current.start_time",
                    "$end_time_mod"]}},
                    }},
                            { $group: {_id:"$_id.aiport",total_stay:{$sum:"$stay_time"}}},
                            { $project: {_id:1,
                    total_stay:{$round:[{$divide:["$total_stay",3600000]},0]}}},
                            {
                    $lookup:{from:"airport",localField:"_id",foreignField:"_id",as:"airport"}},
                            { $unwind:"$airport"},
                            {
                    $project:{airport_cost:{$sum:{$multiply:["$total_stay","$airport.charge_per_hour"]}
                    }}},
                            { $group:{_id:null,total_airport_stay_cost:{$sum:"$airport_cost"}}},
                            { $lookup:{
                                from:"employee",
                                pipeline:[
                                    {$group:{_id:null,total_salary:{$sum:"$contract.salary"}}},
                                    {$project:{total_salary:1,_id:0}}
                                ],
                                as:"employee_salary"}},
                            { $unwind:"$employee_salary"},
                            { $lookup:{
                                from:"bookings",
                                pipeline:[
                                    {$group:{_id:null,income:{$sum:"$total_cost"}}},
                                    {$project:{income:1,_id:0}}
            ],
            as:"total_income"}},
        { $unwind:"$total_income"},
        { $lookup:{
            from:"flights",
            pipeline:[
                {
    $project:{"plane":1,"starting.airport":1,"destination.airport":1,start_date:{$dateFromString:{dateString:"$starting.time"}},end_date:{$dateFromString:{dateString:"$destination.time"}}}},
                    { $match:{"end_date":{$gte:new Date("2021-12-01"),$lt:new Date("2022-01-01")}}},
                    { $group:{_id:"$starting.airport",use_times:{$sum:1}}},
                    {
    $lookup:{from:"airport",localField:"_id",foreignField:"_id",as:"airport"}},
                    { $unwind:"$airport"},
                    {
    $project:{airport_cost:{$sum:{$multiply:["$use_times","$airport.charge_refuel"]}}}}
    ,
                    {
    $group:{_id:null,total_airport_fuel_cost:{$sum:"$airport_cost"}}},
                    {$project:{total_airport_fuel_cost:1,_id:0}}
                ],
                as:"total_fuel_cost"
            }},
            {$unwind:"$total_fuel_cost"},
    {$project:{revenue:{$subtract:["$total_income.income",{$add:["$total_airport_stay_cost","$total_fuel_cost.total_airport_fuel_cost","$employee_salary.total_salary"]}]}
    }}
    ]

//10
db.employee.find({'contact_detail.email':{$exists: true},'contact_detail.email':/gmail/},{_id:0,first_name: 1, last_name: 1, contact_detail: 1})

//11
db.bookings.aggregate({ $group: {_id: null, sum: { $sum: "$total_cost"}}})

//12
db.planes.find({ $where: "this.range && this.seating_capacity && this.range <= this.seating_capacity"})

//13
db.flights.aggregate(
    [
    { $lookup:{
                from:"bookings",
                let:{flight_id:"$_id"},
                pipeline:[
                    {$unwind:"$flights"},
                    {$match:{$expr:{$eq:["$flights","$$flight_id"]}}},
                    {$count:"booking_times"},
                    {$project:{_id:0,booking_times:1}}
    ],
                as:"booking_data"
            }},
            {$match:{booking_data:[]}},
            {$project:{_id:1,plane:1,starting:1,destination:1}}
        ]
    ).pretty()
    