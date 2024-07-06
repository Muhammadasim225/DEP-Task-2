
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/task2', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Successfully connected");

}).catch((e)=>{
    console.log(Error);


})


const formSchema1=new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    whatsappNumber: { type: String, required: true },
    cnicNumber: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Others'], required: true },
    country: { type: String, enum: ['Pakistani', 'International'], required: true },
    formalPicture: { type: String, required: true },

})
    // Academic-Details
    const formSchema2=new mongoose.Schema({


    institutionName: { type: String, required: false },
    qualification: { type: String, required: false },
    yearOfStudy: { type: String, required: false },
})
     // Internship Details
     const formSchema3=new mongoose.Schema({

  domain: { type: String, enum: ['Operation Managment', 'Business Analyst','Human Resources','Finance','Accounting and Bookkeeping','Email Marketing','SMM','Content Marketing'],required:true},

  heardAboutDep:{
        type: String,
        enum: ['Social Media', 'Referral', 'Other'],
        required: true
      },
      otherSource: { type: String },

      resume:{
         type: String, required: true },

      references:{
        type:String, required:true},
      anyQuery:{
        type:String, required:true},
      acknowledgement:
         { type: Boolean, required: true }
      })

const Form1=new mongoose.model('Form1',formSchema1);
const Form2=new mongoose.model('Form2',formSchema2);
const Form3=new mongoose.model('Form3',formSchema3);


module.exports = {
    Form1:Form1,
    Form2:Form2,
    Form3:Form3,
}
