const mongoose = require('mongoose');
const MOOC = require('../models/mooc')

mongoose
    .connect('mongodb://localhost:27017/MOOCdb',{
        useNewUrlParser: true,
        useCreateIndex:true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Mongo Connection Open');
    })
    .catch((error) => handleError(error))

const sampleData = [
    {
        name: 'Renewable Energy',
        image:{
            url: 'https://res.cloudinary.com/dd87wt7iz/image/upload/v1618175833/LACI%20capstone/1897918_531a_3_bhswqx.jpg',
            filename: '1897918_531a_3_bhswqx.jpg'
        },
        instructors: ['EDS Global'],
        topics: ['Renewable Energy', 'LEED credential'],
        description: 'A 360 degrees appraisal of 10 different RE technologies- diving into design requirements, applications, challenges, and zooms out to assess their global potential. Renewable energy has grown to 10.4% of the global energy mix with solar photovoltaic and wind emerging as the most preferred new energy installation types. ',
        difficulty: 'Beginner',
        hosting_site: 'Udemy',
        course_link: 'https://www.udemy.com/course/renewable-energy/',
        submittedBy: '606f4b55d21e3446e81272a3'
    },
    {
        name: 'Learn TRNSYS',
        image: {
            url:'https://res.cloudinary.com/dd87wt7iz/image/upload/v1618176362/LACI%20capstone/10973_2019_8968_Fig2_HTML_snrsub.png',
            filename:'10973_2019_8968_Fig2_HTML_snrsub.png'
        },
        instructors: ['Alistair McDowell'],
        topics: ['TRNSYS', 'Energy Simulation', 'Simulation Automation'],
        description: 'A comprehensive TRNSYS course that will teach you all of the key concepts, how to use the modelling interfaces, and give you plenty of chances to practice and hone your skills. Explore all of the different component libraries available with many interesting case studies, including a building integrated PV/thermal system, and a thermal storage wall for a building.',
        difficulty: 'Intermediate',
        hosting_site: 'Udemy',
        course_link: 'https://www.udemy.com/course/learn-trnsys/',
        submittedBy: '606f4b55d21e3446e81272a3'
    },
    {
        name: 'The Future of Energy',
        image:{
            url: 'https://res.cloudinary.com/dd87wt7iz/image/upload/v1618176736/LACI%20capstone/AdobeStock_93735724-1_kpdazg.jpg',
            filename: 'AdobeStock_93735724-1_kpdazg.jpg'
        },
        instructors: ['John Clarkson'],
        topics: ['Oil Crisis', 'Climate Change'],
        description: 'This course will teach you the probably future of energy. We consider the evidence of resource depletion; potential solutions, challenges we face in implementing the solutions; and outline 3 possible energy economies, that will be mixed together to hopefully solve the loss of economically available fossil fuels.',
        difficulty: 'Beginner',
        hosting_site: 'Udemy',
        course_link: 'https://www.udemy.com/course/future-of-energy/',
        submittedBy: '606f4b55d21e3446e81272a3'
    }
]


const seedDB = async () => {
	await MOOC.deleteMany({});
	const res = await MOOC.insertMany(sampleData)
		.then((data) => console.log('Data inserted'))
		.catch((e) => console.log(e));
};

// We run our seeder function then close the database after.
seedDB().then(() => {
	mongoose.connection.close();
});
