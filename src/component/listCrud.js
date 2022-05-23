import React, {useState, useEffect,useImperativeHandle,forwardRef} from 'react';
import Table from 'flowbite';
import  Axios  from 'axios';
import axios from 'axios';


const ListCrud = (props,ref) =>{ 
  console.log("PROPS LISTCRUD",props);
  let items = [];
  let [listaItems, setListaItems] = useState([]);

  useEffect(()=>{ 

    showItems();
  
 }, []);
 if(props.updateList === true){
   console.log("UPDATE");
 }

  const showItems = () =>{

    Axios.get("http://localhost:3001/getitems").then((response)=>{
        setListaItems(response.data);
  }); 

}
if(props.updateList === true){
  showItems();
}


if(listaItems){
      items = listaItems;
   }
   else{
   }
   const handleDelete = id =>{
    console.log("ID A ELIMINAR",id);
    Axios.delete(`http://localhost:3001/delete/${id}`,{id: id}).then((response) =>{
      console.log("RESPONSE DELETE", response);
      showItems();
    });

  }
//   useImperativeHandle(ref, () => {
//     return ( showItems())
// });
const handleEdit = (id,title,description) =>{
  
  props.handleEdit(id,title,description);

}
  return (  
     
    <div className='text-center'>
    {items.map((item)=> (
  <div class="flex md:ml-[23%] rounded-md mb-3 md:mr-[23%] pl-8 pt-8 pb-8 pr-4 border-2 ">
  <div class="flex-1 w-full self-center text-left">
  {item.titulo}
  </div>
  <div class="flex w-fit">  

  <button className='bg-white mr-2 hover:bg-black hover:text-white rounded-md border-2 pt-[5px] pb-[5px] pl-[15px] pr-[15px]'
  onClick={() => handleEdit(item.id,item.titulo,item.descripcion)}
  >Editar</button>
  <button className='bg-red hover:bg-red-500 hover:text-white rounded-md border-2 pt-[5px] pb-[5px] pl-[15px] pr-[15px]'
  onClick={() => handleDelete(item.id)}
  >Eliminar</button>  
  </div>
  </div>  
                       
  ))}  
  </div>
)}
export default ListCrud;