# BMI-calculator

## Installation
npm install express <br />
npm install body-parser <br />
npm install ejs <br />
npm install @widlestudiollp/health-calculation --save <br />

## Settings
port = 3000 <br />
const fs = require('fs'); <br />
const bodyParser = require('body-parser'); <br />
const express = require('express'); <br />
const health_calc = require('@widlestudiollp/health-calculation'); <br />
const app = express(); <br />

## Routes
app => { <br />
    POST('/') <br />
    GET('/') <br />
} <br />



