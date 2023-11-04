import {dbKey} from "../secret"
const express = require('express')
const app = express()
const port = 5000

const pgp = require("pg-promise")
const db = pgp(dbKey)

db.


app.listen(
    port,
    () => {console.log("server running on port 5000")}
)