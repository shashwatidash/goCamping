const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campgrounds');

//  yelp-camp: database name, campgrounds: collection name
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database Connected');
});

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}

const seedDB = async () => {

    await Campground.deleteMany({});
    for (let i = 0; i < 150; i++) {
        const random170 = Math.floor(Math.random() * 170);
        const price = Math.floor(Math.random() * 20) + 10;

        const newCamp = new Campground({
            author: '60864ba60198da1f740ac6aa',
            location: `${cities[random170].city}, ${cities[random170].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nobis expedita vitae cumque. Facilis omnis sint illum accusamus beatae doloribus voluptas minima vero, aliquam ducimus quam. Deserunt ducimus nulla inventore?',
            price,
            geometry: {
                "type": "Point",
                "coordinates": [
                    cities[random170].lng,
                    cities[random170].lat
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dzgcpe7xa/image/upload/v1619513764/YelpCamp/rejrhblmkrrfod0hicdw.webp',
                    filename: 'YelpCamp/rejrhblmkrrfod0hicdw'
                },
                {
                    url: 'https://res.cloudinary.com/dzgcpe7xa/image/upload/v1619513765/YelpCamp/j6acsovrzqkymp4vva3x.jpg',
                    filename: 'YelpCamp/j6acsovrzqkymp4vva3x'
                }
            ]
        })
        await newCamp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});