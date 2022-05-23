import logo from './logo.svg';
import './App.css';
import FormCrud from './component/formCrud';
import Navbar from './component/header';
import ListCrud from './component/listCrud';

export default function App() {
  return (
   
   <div className='text-center' >
    <Navbar /> 
    <div className=''>
    <FormCrud  /> 
    </div>
    <div >
  
    </div>
    </div>
  )
}
