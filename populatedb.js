#! /usr/bin/env node

const userArgs = process.argv.slice(2);

const Category = require('./models/category');
const Instrument = require('./models/instrument');

const categories = [];
const instruments = [];

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log('Debug: About to connect');
    await mongoose.connect(mongoDB);
    console.log('Debug: Should be connected?');
    await createCategories();
    await createInstruments();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
    const category = new Category({ name: name, description: description });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${category}`);
}

async function instrumentCreate(index, name, description, category, price, stock) {
    const instrument = new Instrument({ name: name, description: description, category: category, price: price, stock: stock });
    await instrument.save();
    instruments[index] = instrument;
    console.log(`Added instrument: ${name}`);
}

async function createCategories() {
    console.log('Adding categories');
    await Promise.all([
        categoryCreate(0, 
            'Strings', 
            'String instruments produce sound from vibrating strings when the performer plays it in a certain manner'
        ),
        categoryCreate(1, 
            'Woodwind', 
            'Woodwind instruments are a family of musical instruments, which include flutes and reed instruments'
        ),
        categoryCreate(2, 
            'Brass', 
            'Brass instruments produce sound by sympathetic vibration of air in a tubular resonator and the sound produced depending on the vibration of the perfomer\'s lips'
        ),
        categoryCreate(3, 
            'Keyboard', 
            'Keyboard instruments are played using a keyboard, which is a row of levers pressed by the perfomer\'s fingers'
        ),
        categoryCreate(4, 
            'Percussion', 
            'Percussion instruments are sounded by being struck or scraped by a beater, which is the object used to make the sound'
        ),
    ]);
}

async function createInstruments() {
    console.log('Adding instruments');
    await Promise.all([
        instrumentCreate(0, 
            'Violin',
            'The violin is a wooden cordophone. Most violins have a hollow wooden body. It is the smallest and thus high pitched instrument',
            categories[0],
            70.00,
            100,
        ),
        instrumentCreate(1, 
            'Guitar',
            'The guitar is a fretted musical instrument and usually has six strings. It is usually held flat against the performer\'s body and played by strumming or plucking the strings with the dominant hand, while also pressing selected strings against frets with the fingers of the opposite hand',
            categories[0],
            120.00,
            50,
        ),
        instrumentCreate(2, 
            'Flute',
            'The flute produces a sound when the performer\'s air flows across the tube. By using the hollow parts of the flute, the performer can produce different kinds of sounds',
            categories[1],
            80.00,
            10
        ),
        instrumentCreate(3, 
            'Trumpet',
            'The trumpet is commonly used for classical and jazz music performances. Historically, they were used as signalling devices for emergencies or battles',
            categories[2],
            140.00,
            200,
        ),
        instrumentCreate(4, 
            'Piano',
            'The piano is played by pressing the keys. Modern pianos have a row of 88 black and white keys (52 white and 36 black keys)',
            categories[3],
            500.00,
            4,
        ),
        instrumentCreate(5, 
            'Drum',
            'The drum consists of a membrane that is stretched over a shell and is struck, either by the performer\'s hand or with a beater',
            categories[4],
            230.00,
            35,
        ),
    ]);
}