import {useState,useEffect,useContext} from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';
import Link from "next/link";
import { context } from '../context';
import { useRouter } from 'next/dist/client/router';

const Register =() =>{
    const [name,setName]=useState("ryan");
    const [email,setEmail]=useState("ryan@gmail.com");
    const [password,setPassword]=useState("rrrr");
    const [loading,setLoading]=useState(false);
    const{state:{user},}=useContext(context);


    const router =useRouter();
    useEffect(()=>{
      if(user !==null) router.push("/");
    },[user]);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
          setLoading(true);

       
        const {data} = await axios.post(`/api/register`,{name,email,password,
      }
        ); 
     //   console.log("REGISTER RESPONSE",data);
     toast.success("registration successful.please login");
     setLoading(false);
    }catch(err){
      toast.error(err.response.data);
      setLoading(false);

    }

      
    };
    return(
        <p>
           <h1 className="jumbotron  text-center bg-primary square">Register</h1>
           <div className="container col-md-4 offset-md-4 pb-5">
               <form onSubmit={handleSubmit}>
              <input type="text" className="form-control col-md-10  mb-4 p-2" value={name} onChange={e=> setName(e.target.value)}
              placeholder="enter a name"
              required
              />
                <input type="email" className="form-control col-md-10  mb-4 p-2" value={email} onChange={e=> setEmail(e.target.value)}
              placeholder="enter email"
              required
              />
                <input type="password" className="form-control col-md-10  mb-4 p-2" value={password} onChange={e=> setPassword(e.target.value)}
              placeholder="enter a password"
              required
              />
              <button type="submit" className="btn btn-block btn-primary col-md-10 mb-4 p-2"
              disabled={!name ||!email ||!password||loading}
              
              >{loading ? <SyncOutlined spin/>:"submit"}</button>

               </form>

               <p className="text-center p-3">
                 Already registered?{" "}
                 <Link href="/login"><a>LOGIN</a></Link>
               </p>
             
                
           </div>

        </p>
    );
    
    };
    export default Register;