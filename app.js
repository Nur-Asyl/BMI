const bodyParser = require('body-parser');
const express = require('express');
const health_calc = require('@widlestudiollp/health-calculation');
// const calcBmi = require('bmi-calc');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
    res.render('index', {"result": 0});
});

app.post('/', (req, res) => {
    let weight = parseFloat(req.body.weight);
    let weightType = req.body.weightType;
    let height = parseFloat(req.body.height);
    let heightType = req.body.heightType;
    let bmiResult = health_calc.bmi(weight, weightType, height, heightType); 
    res.render('index', {"result": bmiResult});
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});