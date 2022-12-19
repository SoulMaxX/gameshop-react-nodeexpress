const express = require('express') 
const app = express()


const data = {
    products:[
        {
            id: '1',
            name: 'Ps 5',
            price: 16900
        },
        {
            id: '2',
            name: 'XBOX S',
            price: 6900
        },
        {
            id: '3',
            name: 'NDS',
            price: 8900
        },
        {
            id: '4',
            name: 'PC',
            price: 27000
        },
    ]
};


// app.use(express.json());
app.use((req,res,next)=>{
    res.header('access-control-allow-origin', '*')
    res.header('access-control-allow-header','origin,X-Requested-With,content-type,accept')
    next()
})


app.get('/',(req,res)=>{
    // console.log(data)
    res.send(data)
})

app.listen(4000,()=>{
    console.log('run server success')
})