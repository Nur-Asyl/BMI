const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { format } = require("date-fns");
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

const bmiHistoryFilePath = path.join(__dirname, '../bmiHistory.json');
let bmiHistory = [];

try {
    const data = fs.readFileSync(bmiHistoryFilePath, 'utf-8');
    bmiHistory = JSON.parse(data);
} catch (error) {
    fs.writeFileSync(bmiHistoryFilePath, JSON.stringify(bmiHistory, null, 2));
}

app.get('/', function(req, res) {
    res.render('index', {"result": 0, "history": bmiHistory});
});

app.post('/', (req, res) => {
    let weight = parseFloat(req.body.weight);
    let weightType = req.body.weightType;
    let height = parseFloat(req.body.height);
    let heightType = req.body.heightType;
    let gender = req.body.gender;
    let age = req.body.age;

    if (heightType === 'Pounds') {
        height = height * 0.453592
    }

    if (weightType === 'Inches') {
        weight = weight * 0.0254
    } else if (weightType === 'Feet') {
        weight = weight * 0.3048
    }

    let bmi = parseFloat(weight/(height * height)); 

    if (gender === 'male' && age < 20) {
        bmi -= 0.1;
    } else if (gender === 'female' && age < 20) {
        bmi += 0.4;
    }

    const newEntry = { date: format(new Date(), "yyyy-MM-dd"), value: bmi.toFixed(2) };
    bmiHistory.push(newEntry);

    try {
        fs.writeFileSync(bmiHistoryFilePath, JSON.stringify(bmiHistory, null, 2));
        console.log('BMI history saved to file.');
    } catch (error) {
        console.error('Error writing BMI history file:', error.message);
    }

    if (bmi < 19) {
        res.render('index', { "result": bmi.toFixed(2) + " Underweight", "history": bmiHistory });

    } else if (19 <= bmi && bmi < 25) {
        res.render('index', { "result": bmi.toFixed(2) + " Normalweight", "history": bmiHistory });

    } else if (25 <= bmi && bmi < 30) {
        res.render('index', { "result": bmi.toFixed(2) + " Overweight", "history": bmiHistory });

    } else {
        res.render('index', { "result": bmi.toFixed(2) + " Obese", "history": bmiHistory });

    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});