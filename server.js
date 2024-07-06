const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { Form1, Form2, Form3 } = require('./db');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/submit/personal-details', upload.single('formalPicture'), async (req, res) => {
  try {
    const formData = new Form1({
      fullName: req.body.fullName,
      email: req.body.email,
      whatsappNumber: req.body.whatsappNumber,
      cnicNumber: req.body.cnicNumber,
      gender: req.body.gender,
      country: req.body.country,
      formalPicture: req.file.path, // Save the file path
    });
    const kk = await formData.save();
    res.status(200).send({ message: 'Personal details submitted successfully', id: formData._id });


  }
  catch (er) {
    res.status(400).send('Error submitting personal details: ' + er);
  }
})

app.post('/submit/academic-details/:id', async (req, res) => {
  try {
    const formData = await Form1.findById(req.params.id);

    if (!formData) {
      return res.status(404).send('Form not found');
    }
    else {
      const academicDetails = new Form2({
        institutionName: req.body.institutionName,
        qualification: req.body.qualification,
        yearOfStudy: req.body.yearOfStudy,
      });

      await academicDetails.save();
      res.status(200).send('Academic details submitted successfully');
    }
  }
  catch (err) {
    res.status(400).send('Error submitting academic details: ' + err);
  }

})
app.post('/submit/internship/:id', upload.single('resume'), async (req, res) => {
  try {
    const formData = await Form1.findById(req.params.id);
    if (!formData) {
      return res.status(404).send('Form not found');
    }
    else {
      const internshipDetails = new Form3({
        domain: req.body.domain,
        heardAboutDep: req.body.heardAboutDep,
        resume: req.file.path,
        otherSource:req.body.otherSource,
        references:req.body.references,
        anyQuery:req.body.anyQuery,
        acknowledgement:req.body.acknowledgement,

      });
      await internshipDetails.save();
      res.status(200).send('Internship details submitted successfully');
    }
  }
  catch (err) {
    res.status(400).send('Error submitting internship details: ' + err);
  }
});

app.get('/forms1', async (req, res) => {
  try {
    const forms = await Form1.find();
    res.status(200).json(forms);
  } catch (err) {
    res.status(400).send('Error retrieving forms: ' + err);
  }
});
app.get('/forms2', async (req, res) => {
  try {
    const forms = await Form2.find();
    res.status(200).json(forms);
  } catch (err) {
    res.status(400).send('Error retrieving forms: ' + err);
  }
});
app.get('/forms3', async (req, res) => {
  try {
    const forms = await Form3.find();
    res.status(200).json(forms);
  } catch (err) {
    res.status(400).send('Error retrieving forms: ' + err);
  }
});

app.put('/update/personal-details/:id', upload.single('formalPicture'), async (req, res) => {
  try {
    const updatedData = {
      fullName: req.body.fullName,
      email: req.body.email,
      whatsappNumber: req.body.whatsappNumber,
      cnicNumber: req.body.cnicNumber,
      gender: req.body.gender,
      country: req.body.country,
    };

    if (req.file) {
      updatedData.formalPicture = req.file.path; // Update the file path if a new file is uploaded
    }

    const result = await Form1.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!result) {
      return res.status(404).send('Form not found');
    }
    res.status(200).send({ message: 'Personal details updated successfully', data: result });
  } catch (er) {
    res.status(400).send('Error updating personal details: ' + er);
  }
});

app.put('/update/academic-details/:id', async (req, res) => {
  try {
    const updatedData = {
      institutionName: req.body.institutionName,
      qualification: req.body.qualification,
      yearOfStudy: req.body.yearOfStudy,
    };

    const result = await Form2.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!result) {
      return res.status(404).send('Form not found');
    }
    res.status(200).send({ message: 'Academic details updated successfully', data: result });
  } catch (err) {
    res.status(400).send('Error updating academic details: ' + err);
  }
});

app.put('/update/internship/:id', upload.single('resume'), async (req, res) => {
  try {
    const updatedData = {
      domain: req.body.domain,
      heardAboutDep: req.body.heardAboutDep,
      otherSource: req.body.otherSource,
      references: req.body.references,
      anyQuery: req.body.anyQuery,
      acknowledgement: req.body.acknowledgement,
    };

    if (req.file) {
      updatedData.resume = req.file.path; // Update the file path if a new file is uploaded
    }

    const result = await Form3.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!result) {
      return res.status(404).send('Form not found');
    }
    res.status(200).send({ message: 'Internship details updated successfully', data: result });
  } catch (err) {
    res.status(400).send('Error updating internship details: ' + err);
  }
});

app.delete('/delete/personal-details/:id', async (req, res) => {
  try {
    const result = await Form1.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send('Form not found');
    }
    res.status(200).send({ message: 'Personal details deleted successfully' });
  } catch (er) {
    res.status(400).send('Error deleting personal details: ' + er);
  }
});

app.delete('/delete/academic-details/:id', async (req, res) => {
  try {
    const result = await Form2.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send('Form not found');
    }
    res.status(200).send({ message: 'Academic details deleted successfully' });
  } catch (err) {
    res.status(400).send('Error deleting academic details: ' + err);
  }
});

app.delete('/delete/internship/:id', async (req, res) => {
  try {
    const result = await Form3.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send('Form not found');
    }
    res.status(200).send({ message: 'Internship details deleted successfully' });
  } catch (err) {
    res.status(400).send('Error deleting internship details: ' + err);
  }
});


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Port is running on http://localhost:${port}`);
})