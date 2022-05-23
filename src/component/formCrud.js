import React, { useState, useEffect,useRef } from 'react'
import  Axios  from 'axios';
import ListCrud from './listCrud';

export default function FormCrud() {
    const [idEdit, setIdEdit] = useState("");
    const [titulo, setTitulo] = useState("");
    const [updateList, setUpdateList] = useState(false);
    const [editState, setEditState] = useState(false);
    
   
    useEffect(()=>{ 

        return () =>{
          
       }
     }, []);

    const addItem = () =>{
        console.log("ID EDIT EN ADD",idEdit);
        if(idEdit === "" ){
        Axios.post('http://localhost:3001/create',{
          titulo: titulo,
        }).then((respose,err)=>{
            if(respose)
            {
             setUpdateList(true); 
            }
            else{
                console.log("ERROR AL INSERTAR ITEM");
            }
        });
    } else{
     Axios.put(`http://localhost:3001/update/${idEdit}/${titulo}`,{id: idEdit,titulo: titulo}).then((response,err)=>{
      if(response)
              {
                  console.log("RESPONSE UPDATE",response);
                 setUpdateList(true);
                 setIdEdit("");
              }
              else{
                  console.log("ERROR AL INSERTAR ITEM");
              }
          });
    }
    }

    const handleEdit = (id,title, description) =>{
         
        console.log("TITULO",title);
        setTitulo(title);
        setIdEdit(id);
        console.log("TITULO",description);
        console.log("ID EDIT",id);
        Axios.get(`http://localhost:3001/getitem/${id}`,{id: id}).then((response)=>{
        console.log("ITEM A ACTUALIZAR", response.data);

        }); 
        
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addItem();
     setTitulo('');
    }


        return (
     <div>

        <div className='pb-16 pt-16 '>
           
           <input id='titulo' name='titulo' placeholder='Enter Task here...' type="text"
            className='border-2 w-[30%] mr-2 rounded-md p-2 focus:outline-none '
            onChange={(e) =>{
                setTitulo(e.target.value);
            }}
            value={titulo}
            />
       
            <button 
        className='font-bold text-white rounded-md border-2 p-2 pr-4 bg-black pl-4 border-black hover:bg-white hover:text-black'
            onClick={handleSubmit}
            >Add to list</button>
   
        </div>

          <ListCrud updateList={updateList} editState={editState} handleEdit={handleEdit} />   
       
     </div>
  )
}
