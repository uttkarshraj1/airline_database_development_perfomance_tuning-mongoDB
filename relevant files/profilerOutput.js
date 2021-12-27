{
	"op" : "command",
	"ns" : "coursework.employee",
	"command" : {
		"aggregate" : "employee",
		"pipeline" : [
			{
				"$group" : {
					"_id" : "$role",
					"total_salary" : {
						"$sum" : "$contract.salary"
					}
				}
			},
			{
				"$project" : {
					"_id" : 0,
					"role" : "$_id",
					"total_salary" : 1
				}
			}
		],
		"cursor" : {

		},
		"lsid" : {
			"id" : UUID("4f9ce602-7a46-4c58-aa70-0869e43ebfc0")
		},
		"$db" : "coursework"
	},
	"keysExamined" : 0,
	"docsExamined" : 17,
	"cursorExhausted" : true,
	"numYield" : 0,
	"nreturned" : 4,
	"locks" : {
		"ReplicationStateTransition" : {
			"acquireCount" : {
				"w" : NumberLong(2)
			}
		},
		"Global" : {
			"acquireCount" : {
				"r" : NumberLong(2)
			}
		},
		"Database" : {
			"acquireCount" : {
				"r" : NumberLong(2)
			}
		},
		"Collection" : {
			"acquireCount" : {
				"r" : NumberLong(2)
			}
		},
		"Mutex" : {
			"acquireCount" : {
				"r" : NumberLong(2)
			}
		}
	},
	"flowControl" : {

	},
	"responseLength" : 315,
	"protocol" : "op_msg",
	"millis" : 9,
	"planSummary" : "COLLSCAN",
	"ts" : ISODate("2021-12-23T11:51:30.839Z"),
	"client" : "127.0.0.1",
	"appName" : "MongoDB Shell",
	"allUsers" : [ ],
	"user" : ""
}
{
	"op" : "command",
	"ns" : "coursework.employee",
	"command" : {
		"aggregate" : "employee",
		"pipeline" : [
			{
				"$match" : {
					"first_name" : "Smith",
					"last_name" : "Johnson"
				}
			},
			{
				"$facet" : {
					"total" : [
						{
							"$lookup" : {
								"from" : "flights",
								"localField" : "_id",
								"foreignField" : "pilot",
								"as" : "pilots"
							}
						},
						{
							"$unwind" : "$pilots"
						},
						{
							"$project" : {
								"pilots.pilot" : 1,
								"pilots.distance" : 1,
								"date" : {
									"$dateFromString" : {
										"dateString" : "$pilots.destination.time"
									}
								}
							}
						},
						{
							"$match" : {
								"date" : {
									"$gte" : ISODate("2021-12-01T00:00:00Z"),
									"$lt" : ISODate("2022-01-01T00:00:00Z")
								}
							}
						},
						{
							"$group" : {
								"_id" : "$pilots.pilot",
								"total" : {
									"$sum" : "$pilots.distance"
								}
							}
						},
						{
							"$project" : {
								"_id" : 0,
								"total" : {
									"$multiply" : [
										"$total",
										2
									]
								}
							}
						},
						{
							"$addFields" : {
								"total" : "$total"
							}
						}
					],
					"co_total" : [
						{
							"$lookup" : {
								"from" : "flights",
								"localField" : "_id",
								"foreignField" : "co_pilot",
								"as" : "co_pilots"
							}
						},
						{
							"$unwind" : "$co_pilots"
						},
						{
							"$project" : {
								"co_pilots.co_pilot" : 1,
								"co_pilots.distance" : 1,
								"date" : {
									"$dateFromString" : {
										"dateString" : "$co_pilots.destination.time"
									}
								}
							}
						},
						{
							"$match" : {
								"date" : {
									"$gte" : ISODate("2021-12-01T00:00:00Z"),
									"$lt" : ISODate("2022-01-01T00:00:00Z")
								}
							}
						},
						{
							"$group" : {
								"_id" : "$co_pilots.co_pilot",
								"co_total" : {
									"$sum" : "$co_pilots.distance"
								}
							}
						},
						{
							"$project" : {
								"_id" : 0,
								"total" : {
									"$multiply" : [
										"$co_total",
										1.5
									]
								}
							}
						}
					]
				}
			},
			{
				"$unwind" : "$total"
			},
			{
				"$unwind" : "$co_total"
			},
			{
				"$project" : {
					"total" : {
						"$add" : [
							"$total.total",
							"$co_total.total"
						]
					}
				}
			}
		],
		"cursor" : {

		},
		"lsid" : {
			"id" : UUID("4f9ce602-7a46-4c58-aa70-0869e43ebfc0")
		},
		"$db" : "coursework"
	},
	"keysExamined" : 0,
	"docsExamined" : 17,
	"cursorExhausted" : true,
	"numYield" : 0,
	"nreturned" : 1,
	"queryHash" : "9D795539",
	"planCacheKey" : "9D795539",
	"locks" : {
		"ReplicationStateTransition" : {
			"acquireCount" : {
				"w" : NumberLong(7)
			}
		},
		"Global" : {
			"acquireCount" : {
				"r" : NumberLong(7)
			}
		},
		"Database" : {
			"acquireCount" : {
				"r" : NumberLong(7)
			}
		},
		"Collection" : {
			"acquireCount" : {
				"r" : NumberLong(8)
			}
		},
		"Mutex" : {
			"acquireCount" : {
				"r" : NumberLong(7)
			}
		}
	},
	"flowControl" : {

	},
	"responseLength" : 131,
	"protocol" : "op_msg",
	"millis" : 12,
	"planSummary" : "COLLSCAN",
	"ts" : ISODate("2021-12-23T11:52:01.837Z"),
	"client" : "127.0.0.1",
	"appName" : "MongoDB Shell",
	"allUsers" : [ ],
	"user" : ""
}