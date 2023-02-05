const express = require('express')
const app = express()

const port = 3005

app.use(express.json())


app.use("/inventory", require("./routes/mainList"))

app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

app.listen(port, () => {
    console.log("server is on")
})
