const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const health_calc = require('@widlestudiollp/health-calculation');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const bmiHistoryFilePath = __dirname + '/bmiHistory.json';
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

    let bmi = parseFloat(health_calc.bmi(weight, weightType, height, heightType)); 

    if (gender === 'male' && age > 18) {
        bmi += 0.5;
    } else if (gender === 'female' && age > 18) {
        bmi -= 0.5;
    }

    const newEntry = { date: new Date(), value: bmi.toFixed(2) };
    bmiHistory.push(newEntry);

    try {
        fs.writeFileSync(bmiHistoryFilePath, JSON.stringify(bmiHistory, null, 2));
        console.log('BMI history saved to file.');
    } catch (error) {
        console.error('Error writing BMI history file:', error.message);
    }

    res.render('index', { "result": bmi.toFixed(2), "history": bmiHistory });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});