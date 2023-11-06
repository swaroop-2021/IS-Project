const express=require('express');
const cors=require('cors');
const nodemailer=require('nodemailer');
const app=express();

app.use(cors());
app.use(express.json());


const transporter = nodemailer.createTransport({
    host: 'smtp.forwardemail.net',
    port: 465,
    secure: true,
    auth: {
      user: 'swaroopanegundi404@gmail.com',
      pass: 'icib apfh qfoi wobf',
    },
  });


app.post('/api',async(req,res,next)=>{
    console.log(req.body);

    const options = {
        from: 'swaroopanegundi404@gmail.com',
        to: 'swaroopra2001@gmail.com',
        subject: 'hello world',
        body: 'hello'
    };
      
    await transporter.sendMail(options); 
    res.status(200).send('');
})

app.listen(80,()=>{console.log('Listening on port 80')})