const express = require('express')();
const ejs = require('ejs');
const url = require('url');
const mysql = require('mysql');
const static = require('express-static');


var sql = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"admin",
	database:"news"
})
express.get("/",(request,response)=>{
	ejs.renderFile('html/index.html',(error,data) => {
		response.end(data);
	})
})
express.get("/jiejue",(request,response) => {
	sql.query("select * from news",(error,data) =>{
		var result = data;
		ejs.renderFile("html/jiejue.html",{data:result},(error,data) => {
			if(error){
				console.log(error)
			}
			else{
				response.end(data);
			}
		})
	})
})


//传悦后台
express.get("/getNewsData",(req,res)=>{
	sql.query(`select * from newsList`,(error,data)=>{
		res.end(JSON.stringify(data));
	})
})

// 删除某一篇文章的接口
express.get("/deleteNewsData",(request,response)=>{
	var newsId = url.parse(request.url,true).query.newsId;

	sql.query(`delete from newsList where ID=${newsId}`,(error,data)=>{
		if(!error){
			response.end("success")
		}
		else{
			response.end("error")
		}
	})
})

// 插入某个文章的接口
express.get("/insertNewsData",(req,res)=>{
	var title = url.parse(req.url,true).query.title;
	var details = url.parse(req.url,true).query.details;
	sql.query(`insert into newsList (title,details) values ("${title}","${details}")`,(error,data)=>{
		if(error){
			res.send("failed");
		}
		else{
			res.end("success")
		}
	})
})





express.listen(81);
express.use(static(__dirname + "/html"));