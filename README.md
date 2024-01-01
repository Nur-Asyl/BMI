# BMI-calculator
BMI calculator for define your heath :)
## Installation
npm install express <br />
npm install body-parser <br />
npm install ejs <br />
npm install date-fns --save


## Settings
port = 3000 <br />
const fs = require('fs'); <br />
const bodyParser = require('body-parser'); <br />
const express = require('express'); <br />
const app = express(); <br />
const { format } = require("date-fns"); <br />
const path = require('path'); <br />

## Routes
app => { <br />
    POST('/') <br />
    GET('/') <br />
} <br />

## Formula
BMI = Weight / (Height * Height) <br />

