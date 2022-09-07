const {PDFDocument} = require('pdf-lib')
const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const bodyParser = require("body-parser");
const multer = require('multer')

const upload = multer({dest: 'uploads/'})

app.set('view engine', 'ejs');
app.set('views', 'views')
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')))

// app.use(express.static(path.join(__dirname, 'node_modules', 'bootstrap-v4-rtl', 'dist')))
// app.use(express.static(path.join(__dirname, 'node_modules', 'font-awesome')))


app.post('/uploadpdf', (req, res) => {
    res.send('merged pdf test')

    console.log(req.body.file)
})


app.get('/', (req, res) => {
    res.render('index', {
        pageTitle: 'Merge PDF'
    })
})
app.listen(4000)

const run = async () => {
    const cover = await PDFDocument.load(fs.readFileSync('./133385_1.pdf'))
    const content = await PDFDocument.load(fs.readFileSync('./Node-Js-Express-www.aghazeh.com.pdf'))

    const doc = await PDFDocument.create()

    const contentPages1 = await doc.copyPages(cover, cover.getPageIndices())
    for (const page of contentPages1) {
        doc.addPage(page)
    }
    const contentPages2 = await doc.copyPages(content, content.getPageIndices())
    for (const page of contentPages2) {
        doc.addPage(page)
    }

    fs.writeFileSync(`${Date.now()}-exportpdf.pdf`, await doc.save())

}
// run()

