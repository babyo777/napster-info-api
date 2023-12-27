const express = require('express')
const app =  express()
const playlist = require('./routes/playlist')
const cors = require('cors')
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({extended: true}))

app.use(playlist)

app.use((req,res)=>{
  res.json({ Page:"Not Found"})
})
app.listen(PORT,()=>{
  console.log(`http://localhost:${PORT}`);
})

module.exports = app