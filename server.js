const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./db'); // import the db connection
const Person = require('./models/person'); // import the Person model
const personRoutes = require('./routes/personRoutes'); // import the person routes

// ✅ Middleware should come first
app.use(express.json()); // for parsing application/json
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// ✅ Now mount the routes after parsing middlewares
app.use('/person', personRoutes); // Use the person routes under the /person path

// app.get('/',function (req, res) {
//   res.send('Hello , wellcome in our server ajay');
// });

// // /person endpoint to get all persons
// app.post('/person', async (req, res) => {
//     try{
//         const  data = req.body; // get the data from request body
//         const newperson= new Person(data);

//         // save the new person to the database
//         const response = await newperson.save();
        
//         console.log('data saved successfully:', response);
//         res.status(200).json(response);

//     }catch (err) {
//         console.error('Error saving person:', err);
//         res.status(500).json({ error: 'Failed to save person' });
//     }   
// });

// // Endpoint to fetch all persons from the database
// app.get('/person', async (req, res)=> {
//     try{
//       const data = await Person.find(); // Fetch all persons from the database
//       console.log('Fetched persons:');

//       res.status(200).json(data); // Send the fetched persons as a JSON response
//     }catch (err) {
//       console.error('Error fetching persons:', err);
//       res.status(500).json({ error: 'Failed to fetch persons' });
//     }
// })

// // Endpoint to fetch a person by their work type
// app.get('/person/:worktype', async (req, res) => {
//     try {
//         const worktype = req.params.worktype; // Get the person ID from the request parameters
//         if(worktype =='chef' || worktype=='manager'|| worktype=='waiter'){
//             const response = await Person.find({  work : worktype}); // Find persons by role
//             console.log(`Fetched persons with role `);
//               res.status(200).json(response); // Send the fetched persons as a JSON response
//         } else {
//               res.status(404).json({ error: 'Person not found' }); // If no person found, send 404
//         }
//             } catch (err) {  
//               console.error('Error fetching person by ID:', err);
//               res.status(500).json({ error: 'Failed to fetch person' }); // If an error occurs, send 500
//             }
// });
 


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});