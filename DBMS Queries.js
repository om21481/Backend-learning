
// /?cities=Delhi,Mumbai,Chenna
const cities = req.query.cities.split(',');
const list = await Promise.all(cities.map((city) => {
    return Schema.countDocuments({city:city});
}))

// /?min=100&max=1000&limit=3
const {min, max, ...others} = req.query;
const hotels = await Schema.find({
    ...others,
    cheapestPrice:{$gt: min | 1, $lt: max || 999}
}).limit(req.query.limit)