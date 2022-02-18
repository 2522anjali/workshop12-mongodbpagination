const mongoose = require('mongoose');



 
   mongoose.connect ('mongodb+srv://anjalii:anjali2522@cluster0.r1agc.mongodb.net/workshop-12?retryWrites=true&w=majority' ,{
    useNewUrlParser: true,
    useUnifiedTopology:true
});
 const db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open',function(){
     console.log('database is connected');
 });