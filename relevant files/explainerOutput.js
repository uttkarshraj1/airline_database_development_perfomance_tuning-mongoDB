QUERY 6 -

{
	"stages" : [
		{
			"$cursor" : {
				"queryPlanner" : {
					"plannerVersion" : 1,
					"namespace" : "coursework.employee",
					"indexFilterSet" : false,
					"parsedQuery" : {
						"role" : {
							"$eq" : "pilot"
						}
					},
					"queryHash" : "D3D43117",
					"planCacheKey" : "D3D43117",
					"winningPlan" : {
						"stage" : "PROJECTION_DEFAULT",
						"transformBy" : {
							"_id" : 1,
							"first_name" : 1,
							"fly_data.distance" : 1,
							"last_name" : 1
						},
						"inputStage" : {
							"stage" : "COLLSCAN",
							"filter" : {
								"role" : {
									"$eq" : "pilot"
								}
							},
							"direction" : "forward"
						}
					},
					"rejectedPlans" : [ ]
				},
				"executionStats" : {
					"executionSuccess" : true,
					"nReturned" : 9,
					"executionTimeMillis" : 3,
					"totalKeysExamined" : 0,
					"totalDocsExamined" : 17,
					"executionStages" : {
						"stage" : "PROJECTION_DEFAULT",
						"nReturned" : 9,
						"executionTimeMillisEstimate" : 0,
						"works" : 19,
						"advanced" : 9,
						"needTime" : 9,
						"needYield" : 0,
						"saveState" : 1,
						"restoreState" : 1,
						"isEOF" : 1,
						"transformBy" : {
							"_id" : 1,
							"first_name" : 1,
							"fly_data.distance" : 1,
							"last_name" : 1
						},
						"inputStage" : {
							"stage" : "COLLSCAN",
							"filter" : {
								"role" : {
									"$eq" : "pilot"
								}
							},
							"nReturned" : 9,
							"executionTimeMillisEstimate" : 0,
							"works" : 19,
							"advanced" : 9,
							"needTime" : 9,
							"needYield" : 0,
							"saveState" : 1,
							"restoreState" : 1,
							"isEOF" : 1,
							"direction" : "forward",
							"docsExamined" : 17
						}
					}
				}
			},
			"nReturned" : NumberLong(9),
			"executionTimeMillisEstimate" : NumberLong(0)
		},
		{
			"$lookup" : {
				"from" : "flights",
				"as" : "fly_data",
				"let" : {
					"pilot_id" : "$_id"
				},
				"pipeline" : [
					{
						"$match" : {
							"$expr" : {
								"$or" : [
									{
										"$eq" : [
											"$pilot",
											"$$pilot_id"
										]
									},
									{
										"$eq" : [
											"$co_pilot",
											"$$pilot_id"
										]
									}
								]
							}
						}
					},
					{
						"$project" : {
							"distance" : 1
						}
					}
				],
				"unwinding" : {
					"preserveNullAndEmptyArrays" : false
				}
			},
			"nReturned" : NumberLong(42),
			"executionTimeMillisEstimate" : NumberLong(2)
		},
		{
			"$group" : {
				"_id" : "$_id",
				"first_name" : {
					"$addToSet" : "$first_name"
				},
				"last_name" : {
					"$addToSet" : "$last_name"
				},
				"total_distance" : {
					"$sum" : "$fly_data.distance"
				}
			},
			"nReturned" : NumberLong(8),
			"executionTimeMillisEstimate" : NumberLong(2)
		},
		{
			"$sort" : {
				"sortKey" : {
					"total_distance" : -1
				},
				"limit" : NumberLong(3)
			},
			"nReturned" : NumberLong(3),
			"executionTimeMillisEstimate" : NumberLong(2)
		}
	],
	"serverInfo" : {
		"host" : "pc-73-96.customer.ask4.lan",
		"port" : 27017,
		"version" : "4.4.3",
		"gitVersion" : "913d6b62acfbb344dde1b116f4161360acd8fd13"
	},
	"ok" : 1
}

db.employee.createIndex({'role':1},{name:'roleIndex'})

{
	"stages" : [
		{
			"$cursor" : {
				"queryPlanner" : {
					"plannerVersion" : 1,
					"namespace" : "coursework.employee",
					"indexFilterSet" : false,
					"parsedQuery" : {
						"role" : {
							"$eq" : "pilot"
						}
					},
					"queryHash" : "D3D43117",
					"planCacheKey" : "EB1EED8D",
					"winningPlan" : {
						"stage" : "PROJECTION_DEFAULT",
						"transformBy" : {
							"_id" : 1,
							"first_name" : 1,
							"fly_data.distance" : 1,
							"last_name" : 1
						},
						"inputStage" : {
							"stage" : "FETCH",
							"inputStage" : {
								"stage" : "IXSCAN",
								"keyPattern" : {
									"role" : 1
								},
								"indexName" : "roleIndex",
								"isMultiKey" : false,
								"multiKeyPaths" : {
									"role" : [ ]
								},
								"isUnique" : false,
								"isSparse" : false,
								"isPartial" : false,
								"indexVersion" : 2,
								"direction" : "forward",
								"indexBounds" : {
									"role" : [
										"[\"pilot\", \"pilot\"]"
									]
								}
							}
						}
					},
					"rejectedPlans" : [ ]
				},
				"executionStats" : {
					"executionSuccess" : true,
					"nReturned" : 9,
					"executionTimeMillis" : 8,
					"totalKeysExamined" : 9,
					"totalDocsExamined" : 9,
					"executionStages" : {
						"stage" : "PROJECTION_DEFAULT",
						"nReturned" : 9,
						"executionTimeMillisEstimate" : 1,
						"works" : 10,
						"advanced" : 9,
						"needTime" : 0,
						"needYield" : 0,
						"saveState" : 1,
						"restoreState" : 1,
						"isEOF" : 1,
						"transformBy" : {
							"_id" : 1,
							"first_name" : 1,
							"fly_data.distance" : 1,
							"last_name" : 1
						},
						"inputStage" : {
							"stage" : "FETCH",
							"nReturned" : 9,
							"executionTimeMillisEstimate" : 1,
							"works" : 10,
							"advanced" : 9,
							"needTime" : 0,
							"needYield" : 0,
							"saveState" : 1,
							"restoreState" : 1,
							"isEOF" : 1,
							"docsExamined" : 9,
							"alreadyHasObj" : 0,
							"inputStage" : {
								"stage" : "IXSCAN",
								"nReturned" : 9,
								"executionTimeMillisEstimate" : 1,
								"works" : 10,
								"advanced" : 9,
								"needTime" : 0,
								"needYield" : 0,
								"saveState" : 1,
								"restoreState" : 1,
								"isEOF" : 1,
								"keyPattern" : {
									"role" : 1
								},
								"indexName" : "roleIndex",
								"isMultiKey" : false,
								"multiKeyPaths" : {
									"role" : [ ]
								},
								"isUnique" : false,
								"isSparse" : false,
								"isPartial" : false,
								"indexVersion" : 2,
								"direction" : "forward",
								"indexBounds" : {
									"role" : [
										"[\"pilot\", \"pilot\"]"
									]
								},
								"keysExamined" : 9,
								"seeks" : 1,
								"dupsTested" : 0,
								"dupsDropped" : 0
							}
						}
					}
				}
			},
			"nReturned" : NumberLong(9),
			"executionTimeMillisEstimate" : NumberLong(1)
		},
		{
			"$lookup" : {
				"from" : "flights",
				"as" : "fly_data",
				"let" : {
					"pilot_id" : "$_id"
				},
				"pipeline" : [
					{
						"$match" : {
							"$expr" : {
								"$or" : [
									{
										"$eq" : [
											"$pilot",
											"$$pilot_id"
										]
									},
									{
										"$eq" : [
											"$co_pilot",
											"$$pilot_id"
										]
									}
								]
							}
						}
					},
					{
						"$project" : {
							"distance" : 1
						}
					}
				],
				"unwinding" : {
					"preserveNullAndEmptyArrays" : false
				}
			},
			"nReturned" : NumberLong(42),
			"executionTimeMillisEstimate" : NumberLong(4)
		},
		{
			"$group" : {
				"_id" : "$_id",
				"first_name" : {
					"$addToSet" : "$first_name"
				},
				"last_name" : {
					"$addToSet" : "$last_name"
				},
				"total_distance" : {
					"$sum" : "$fly_data.distance"
				}
			},
			"nReturned" : NumberLong(8),
			"executionTimeMillisEstimate" : NumberLong(4)
		},
		{
			"$sort" : {
				"sortKey" : {
					"total_distance" : -1
				},
				"limit" : NumberLong(3)
			},
			"nReturned" : NumberLong(3),
			"executionTimeMillisEstimate" : NumberLong(4)
		}
	],
	"serverInfo" : {
		"host" : "pc-73-96.customer.ask4.lan",
		"port" : 27017,
		"version" : "4.4.3",
		"gitVersion" : "913d6b62acfbb344dde1b116f4161360acd8fd13"
	},
	"ok" : 1
}

QUERY 10 -

{
	"queryPlanner" : {
		"plannerVersion" : 1,
		"namespace" : "coursework.employee",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"contact_detail.email" : {
				"$regex" : "gmail"
			}
		},
		"winningPlan" : {
			"stage" : "PROJECTION_SIMPLE",
			"transformBy" : {
				"_id" : 0,
				"first_name" : 1,
				"last_name" : 1,
				"contact_detail" : 1
			},
			"inputStage" : {
				"stage" : "COLLSCAN",
				"filter" : {
					"contact_detail.email" : {
						"$regex" : "gmail"
					}
				},
				"direction" : "forward"
			}
		},
		"rejectedPlans" : [ ]
	},
	"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 4,
		"executionTimeMillis" : 7,
		"totalKeysExamined" : 0,
		"totalDocsExamined" : 17,
		"executionStages" : {
			"stage" : "PROJECTION_SIMPLE",
			"nReturned" : 4,
			"executionTimeMillisEstimate" : 0,
			"works" : 19,
			"advanced" : 4,
			"needTime" : 14,
			"needYield" : 0,
			"saveState" : 0,
			"restoreState" : 0,
			"isEOF" : 1,
			"transformBy" : {
				"_id" : 0,
				"first_name" : 1,
				"last_name" : 1,
				"contact_detail" : 1
			},
			"inputStage" : {
				"stage" : "COLLSCAN",
				"filter" : {
					"contact_detail.email" : {
						"$regex" : "gmail"
					}
				},
				"nReturned" : 4,
				"executionTimeMillisEstimate" : 0,
				"works" : 19,
				"advanced" : 4,
				"needTime" : 14,
				"needYield" : 0,
				"saveState" : 0,
				"restoreState" : 0,
				"isEOF" : 1,
				"direction" : "forward",
				"docsExamined" : 17
			}
		}
	},
	"serverInfo" : {
		"host" : "pc-73-96.customer.ask4.lan",
		"port" : 27017,
		"version" : "4.4.3",
		"gitVersion" : "913d6b62acfbb344dde1b116f4161360acd8fd13"
	},
	"ok" : 1
}

db.employee.createIndex({'contact_detail.email':1},{name: 'emailIndex'})

{
	"queryPlanner" : {
		"plannerVersion" : 1,
		"namespace" : "coursework.employee",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"contact_detail.email" : {
				"$regex" : "gmail"
			}
		},
		"winningPlan" : {
			"stage" : "PROJECTION_SIMPLE",
			"transformBy" : {
				"_id" : 0,
				"first_name" : 1,
				"last_name" : 1,
				"contact_detail" : 1
			},
			"inputStage" : {
				"stage" : "FETCH",
				"inputStage" : {
					"stage" : "IXSCAN",
					"filter" : {
						"contact_detail.email" : {
							"$regex" : "gmail"
						}
					},
					"keyPattern" : {
						"contact_detail.email" : 1
					},
					"indexName" : "emailIndex",
					"isMultiKey" : false,
					"multiKeyPaths" : {
						"contact_detail.email" : [ ]
					},
					"isUnique" : false,
					"isSparse" : false,
					"isPartial" : false,
					"indexVersion" : 2,
					"direction" : "forward",
					"indexBounds" : {
						"contact_detail.email" : [
							"[\"\", {})",
							"[/gmail/, /gmail/]"
						]
					}
				}
			}
		},
		"rejectedPlans" : [ ]
	},
	"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 4,
		"executionTimeMillis" : 3,
		"totalKeysExamined" : 7,
		"totalDocsExamined" : 4,
		"executionStages" : {
			"stage" : "PROJECTION_SIMPLE",
			"nReturned" : 4,
			"executionTimeMillisEstimate" : 0,
			"works" : 8,
			"advanced" : 4,
			"needTime" : 3,
			"needYield" : 0,
			"saveState" : 0,
			"restoreState" : 0,
			"isEOF" : 1,
			"transformBy" : {
				"_id" : 0,
				"first_name" : 1,
				"last_name" : 1,
				"contact_detail" : 1
			},
			"inputStage" : {
				"stage" : "FETCH",
				"nReturned" : 4,
				"executionTimeMillisEstimate" : 0,
				"works" : 8,
				"advanced" : 4,
				"needTime" : 3,
				"needYield" : 0,
				"saveState" : 0,
				"restoreState" : 0,
				"isEOF" : 1,
				"docsExamined" : 4,
				"alreadyHasObj" : 0,
				"inputStage" : {
					"stage" : "IXSCAN",
					"filter" : {
						"contact_detail.email" : {
							"$regex" : "gmail"
						}
					},
					"nReturned" : 4,
					"executionTimeMillisEstimate" : 0,
					"works" : 8,
					"advanced" : 4,
					"needTime" : 3,
					"needYield" : 0,
					"saveState" : 0,
					"restoreState" : 0,
					"isEOF" : 1,
					"keyPattern" : {
						"contact_detail.email" : 1
					},
					"indexName" : "emailIndex",
					"isMultiKey" : false,
					"multiKeyPaths" : {
						"contact_detail.email" : [ ]
					},
					"isUnique" : false,
					"isSparse" : false,
					"isPartial" : false,
					"indexVersion" : 2,
					"direction" : "forward",
					"indexBounds" : {
						"contact_detail.email" : [
							"[\"\", {})",
							"[/gmail/, /gmail/]"
						]
					},
					"keysExamined" : 7,
					"seeks" : 1,
					"dupsTested" : 0,
					"dupsDropped" : 0
				}
			}
		}
	},
	"serverInfo" : {
		"host" : "pc-73-96.customer.ask4.lan",
		"port" : 27017,
		"version" : "4.4.3",
		"gitVersion" : "913d6b62acfbb344dde1b116f4161360acd8fd13"
	},
	"ok" : 1
}
