const express = require('express');
const router = express.Router();
const Person = require('../models/person'); // Import the Person model

const bodyParser = require('body-parser');


// post routes to add a person
// /person endpoint to get all persons  post method 
router.post('/', async (req, res) => {
    try{
        const  data = req.body; // get the data from request body
        const newperson= new Person(data);

        // save the new person to the database
        const response = await newperson.save();
        
        console.log('data saved successfully:', response);
        res.status(200).json(response);

    }catch (err) {
        console.error('Error saving person:', err);
        res.status(500).json({ error: 'Failed to save person' });
    }   
});

// Endpoint to fetch all persons from the database
router.get('/', async (req, res)=> {
    try{
      const data = await Person.find(); // Fetch all persons from the database
      console.log('Fetched persons:');

      res.status(200).json(data); // Send the fetched persons as a JSON response
    }catch (err) {
      console.error('Error fetching persons:', err);
      res.status(500).json({ error: 'Failed to fetch persons' });
    }
})

// Endpoint to fetch a person by their work type
router.get('/:worktype', async (req, res) => {
    try {
        const worktype = req.params.worktype; // Get the person ID from the request parameters
        if(worktype =='chef' || worktype=='manager'|| worktype=='waiter'){
            const response = await Person.find({  work : worktype}); // Find persons by role
            console.log(`Fetched persons with role `);
              res.status(200).json(response); // Send the fetched persons as a JSON response
        } else {
              res.status(404).json({ error: 'Person not found' }); // If no person found, send 404
        }
            } catch (err) {  
              console.error('Error fetching person by ID:', err);
              res.status(500).json({ error: 'Failed to fetch person' }); // If an error occurs, send 500
            }
});

//put or update the data base 
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        console.log('Updating person ID:', personId);
        console.log('Received updated data:', updatedPersonData);

        const response = await Person.findByIdAndUpdate(
            personId,
            updatedPersonData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Person updated successfully:', response);
        res.status(200).json(response);
    } catch (err) {
        console.error('Error updating person:', err.message);
        res.status(500).json({ error: err.message });
    }
});


// Delete a person by ID
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;

        //assuming  you hava a person model
        const response = await Person.findByIdAndDelete(personId);
        if (!response) { 
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('Person deleted successfully:');
        res.status(200).json({ message: 'Person deleted successfully' });
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: 'enternal server error' });   
    }
})

// Export the router
module.exports = router;