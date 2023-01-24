
const router = require('express').Router()
const bcrypt = require ('bcryptjs')
const saltRounds = 10 // how many routes bcrypt run the salt
const mongoose = require ('mongoose')