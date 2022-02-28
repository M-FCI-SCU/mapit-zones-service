exports.createZonesCollection = async (db) => {
    await db.createCollection("zones", {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: [
                    'name',
                    'userId',
                    'zone'
                ],
                properties: {
                    userId:{
                        bsonType: 'objectId',
                    },
                    name:{
                        bsonType: 'string',
                    },
                    zone: {
                        bsonType: 'object',
                        required: [
                            'type',
                            'coordinates'
                        ],
                        properties: {
                            type: {
                                bsonType: 'string',
                                'enum': [
                                    'Point',
                                    'Polygon'
                                ]
                            },
                            coordinates: {
                                bsonType: 'array',
                                items: {
                                    bsonType: 'array',
                                    minItems: 4,
                                    items: {
                                        bsonType: 'array',
                                        minItems: 2,
                                        maxItems: 2,
                                        items: [
                                            {
                                                bsonType: 'double',
                                                minimum: -180,
                                                maximum: 180
                                            },
                                            {
                                                bsonType: 'double',
                                                minimum: -90,
                                                maximum: 90
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    await db.collection("zones").createIndex({ zone: "2dsphere" })
}