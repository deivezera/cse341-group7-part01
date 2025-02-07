const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Adopt a Friend',
        description: 'Adopt a Friend',
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
}

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js']


swaggerAutogen(outputFile, endpointFiles, doc)