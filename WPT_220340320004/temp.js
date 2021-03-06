
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');






app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not

const mysql = require('mysql2');

//JSON.stringify(result)

//http://localhost:8081/poc2?xyz=3

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'pleasework',
	port:3306
});



app.get('/mdel', function (req, res) {
	
	let ip=req.query.bookid;
	
	let op={status:false,bookdetails:{bookid:"",bookname:"",price:""} };

	connection.query("select * from book where bookid = ?", [ip], (err, res1) => {
        if (err) {
            
			console.log("error occured"+err);
        } else if(res1.length>0){
			op.status=true;
			console.log("success" + res1);
			op.bookdetails.bookname=res1[0].bookname;
			op.bookdetails.price=res1[0].price;
		 }
		
        res.send(op);
    });

	/*
	//testing for connection
	if(ip==op.bookdetails.bookid){
		op.status=true;
		console.log("data found");
	}
	else{
		console.log("data not found");
	}
*/
		//res.send(op);

		});
//======================================
app.get('/update', function (req, res) {
	
	let ip={bookid:req.query.bookid,bookname:req.query.bookname,price:req.query.price};
	
	let op={status:false,bookdetails:{bookid:"",bookname:"",price:""} };

	connection.query("update book set price = ? where bookid = ? and bookname=?", [ip.price,ip.bookid,ip.bookname], (err, res1) => {
        if (err) {
            
			console.log("error occured"+err);
        } else if(res1.affectedRows>0){
			op.status=true;
			console.log("success" + res1);
		}
		 res.send(op);
    });

});

app.listen(8081, function () {
    console.log("server listening at port 8081...");
});