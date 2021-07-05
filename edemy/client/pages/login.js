import {useState,useContext,useEffect} from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';
import Link from "next/link";
import { context } from '../context';
import { useRouter } from 'next/dist/client/router';

const Login =() =>{
    const [email,setEmail]=useState("ryan@gmail.com");
    const [password,setPassword]=useState("rrrr");
    const [loading,setLoading]=useState(false);
//state
const{state:{user},dispatch}=useContext(context);

const router =useRouter();

useEffect(()=>{
  if(user !==null) router.push("/");
},[user]);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
          setLoading(true);

       
        const {data} = await axios.post(`/api/login`,{email,password,
      }
        ); 
        dispatch({
          type:"LOGIN",
          payload:data
        }); 
       window.localStorage.setItem('user',JSON.stringify(data)) ;
       router.push('/');
  
    }catch(err){
      toast.error(err.response.data);
      setLoading(false);

    }

      
    };
    return(
        <p>
           <h1 className="jumbotron  text-center bg-primary square">Login</h1>
           <div className="container col-md-4 offset-md-4 pb-5">
               <form onSubmit={handleSubmit}>
             
                <input type="email" className="form-control col-md-10  mb-4 p-2" value={email} onChange={e=> setEmail(e.target.value)}
              placeholder="enter email"
              required
              />
                <input type="password" className="form-control col-md-10  mb-4 p-2" value={password} onChange={e=> setPassword(e.target.value)}
              placeholder="enter a password"
              required
              />
              <button type="submit" className="btn btn-block btn-primary col-md-10 mb-4 p-2"
              disabled={!email ||!password||loading}
              
              >{loading ? <SyncOutlined spin/>:"submit"}</button>

               </form>

               <p className="text-center p-3">
                 Not Yet  registered?{" "}
                 <Link href="/register"><a>REGISTER</a></Link>
               </p>
             
                
           </div>

        </p>
    );
    
    };
    export default Login;