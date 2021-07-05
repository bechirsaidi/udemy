import {useState,useContext,useEffect} from 'react';
import axios from "axios";

import { context } from '/context';



const UserIndex =()=>{
    //ok
    const[hidden,setHidden]=useState(true);
    const{state:{user},}=useContext(context);

    useEffect(()=>{
      
        fetchUser();

    },[]);
    const fetchUser =  async()=>{
        try{
            const {data}=await  axios.get('/api/current-user');
            console.log(data);
            setHidden(false);

        }catch(err){
            console.log(err);
            setHidden(false);
        }
    };
    return(
        <p>
        {!hidden &&(
         <h1 className="jumbotron text-center  square">
            <pre>{JSON.stringify(user,null, 4)}</pre>
        </h1>
      )}
        </p>
       
        );
};
export default UserIndex;