const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(process.cwd(), 'public')))

const PORT = 3000

app.get('/api/products/', (req, res) => {

    fs.readFile(path.join(process.cwd(), 'burgers.json'), 'utf8', (err, file) => {
        if (err) {
            res.status(400).send({ message: err.message })
            return
        }
        try {
            const data = JSON.parse(file)
            res.status(200).send({ data })
        } catch (err) {
            res.status(400).send({ message: err.message })
        }
    })

})

app.listen(PORT, () => {
    console.log(`Running server on PORT ${PORT}`)
})