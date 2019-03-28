
/* importing component that is used in server*/
import config, { nodeEnv } from "./config";
import express from 'express';
import fs from 'fs';
/* importing router from /api/index/js*/
import apiRouter from "./api";

const server = express();

/* setting up the EJS*/
server.set('view engine', 'ejs');

server.get("/", (req, res) => {
    //res.send("Hello Express");
    res.render("index", {
        content: 'Hello'
    });
});

/* use router in from /api/index.js */
server.use("/api", apiRouter);
/* express has static method that can server static file from a folder*/
server.use(express.static('public'));

//server.get("/about.html", (req, res) => {
//    fs.readFile('./about.html', (error, data) => {
//        res.send(data.toString());
//    });
//});

server.listen(config.port, () => {
    console.info("Express listening on port ", config.port);
});