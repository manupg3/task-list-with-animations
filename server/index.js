const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());


app.use(express.json());

const db = mysql.createConnection({
    user:'b494b608b909a0',
    host:'us-cdbr-east-05.cleardb.net',
    password:'895a1f0c',
    database:'heroku_5a393f82bf17b47'
});

app.post('/create', (req,res) => {

  console.log("RECIBIDO EN SERVER", req.body);
  const titulo = req.body.titulo;

  db.query('INSERT INTO items (titulo) VALUES(?)', [titulo], 
(error,result)=>{
    if(error){
   
        console.Console("ERROR",error);
   
    }
    else{

        console.log("AGREGADA");
        res.send("CONSULTA AGREGADA");
    
    }
});
});

app.get('/getitems', (req,res) => {
 
    db.query('SELECT * FROM items', 
  (error,result)=>{
      if(error){
          console.Console("ERROR",error);
      }
      else{
          res.send(result);
      }
  });
  });
  app.get('/getitem/:id', (req,res) => {
    const id = req.params.id;
    console.log("ID A EDITAR",id);
    db.query('SELECT * FROM items WHERE id = ?', id, 
  (error,result)=>{
      if(error){
          console.Console("ERROR",error);
      }
      else{
          res.send(result);
      }
  });
  });

  app.put('/update/:id/:titulo', (req,res) => {
    console.log("PARAMS",req.params);
    const id = req.params.id;
    const titulo = req.params.titulo;
     db.query('UPDATE items SET titulo=? WHERE id=? ', [titulo,id], 
(error,result)=>{
       if(error){
           console.Console("ERROR",error);
       }
       else{
           res.send(result);
       }
   });
  });

  app.delete('/delete/:id', (req,res) => {
     const id = req.params.id;
     db.query("DELETE FROM items WHERE id = ?", id , (err,result ) =>
     {
        if(err){
            console.log("ERROR",err);
        }   
        else{
            res.send(result);
        }
     });

  });
  


app.listen(3001, ()=>{

    console.log("SERVER BACK RUNING PORT 3001",);

});