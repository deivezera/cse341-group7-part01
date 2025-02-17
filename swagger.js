const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Adopt a Friend',
        description: 'Adopt a Friend',
    },
    host: 'cse341-group7.onrender.com',
    schemes: ['https']
}

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js']


swaggerAutogen(outputFile, endpointFiles, doc)