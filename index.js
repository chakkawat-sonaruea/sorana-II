const express = require("express")
const app = express()
const port = 55511


// Use cors to run test from htmx in `test.html`
//
const cors = require("cors")
app.use(cors({
    origin: "*"
}))

const multer = require("multer")
const upload = multer({ dest: "uploads/" })


app.post("/upload", upload.single("file"), function(req, res) {
    if (!req.file) {
        res.status(422).send({error: "Please select a file"})
    }
    else {
        let result = {
            fileName: req.file.originalname,
            size: humanFileSize(req.file.size),
            extension: req.file.originalname.substring(req.file.originalname.lastIndexOf('.') + 1)
        }
        console.log(result)
        res.status(200).send(result)
    }
})

app.listen(port, function() {
    console.log(`Example app listening on port ${port}`)
})

function humanFileSize(size) {
    const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return +((size / Math.pow(1024, i)).toFixed(2)) * 1 + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}