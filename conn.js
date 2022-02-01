const mongoose = require('mongoose')
const db = 'mongodb://localhost:27017/auth'

mongoose.connect(db,{
    useNewUrlParser: true
})
.then(
    console.log('connected')
)
.catch((err)=>{
    console.log('not connected');
})