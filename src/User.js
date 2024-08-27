import React, { useEffect, useState } from 'react'
import arr from './Data'
import Spinner from 'react-bootstrap/Spinner';
import Dropdown from 'react-bootstrap/Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from './icon.svg'
import { FaStar } from 'react-icons/fa';
const User = () => {
    const [data1,setdata1]=useState([]);
    
    const [page,setpage]=useState(0);
    const [spin,setspin]=useState(0);
    const [query,setquery]=useState("");
    const [college,setcollege]=useState(data1);
   
    const handlescroll=()=>{
        if(window.innerHeight +document.documentElement.scrollTop+1>=document.documentElement.scrollHeight)
        {
            setpage(page+1);
        }
    }
    useEffect(()=>{
        
        window.addEventListener('scroll',handlescroll);
        setTimeout(()=>{
         
        setspin(1);
    
        },400)
       
       setdata1(data1.concat(arr.slice((page)*10,(page)*10+10)));
        
    },[page])
    const [flag,setflag]=useState(0);
    const [flag1,setflag1]=useState(0);
    const [par,setpar]=useState("averageRating");
    console.log(page);
    const [order,setorder]=useState("asc");
    const sorting=(col,order)=>{
      setpar(col);
      setflag1(true);
      if(order==="asc")
        {
          const sorted=[...data1].sort((a,b)=>
            a[col]>b[col] ? 1 :-1
          )
          setdata1(sorted)
             
        }
         if(order==="desc")
        {
          const sorted=[...data1].sort((a,b)=>
            a[col]<b[col]? 1 :-1
          )
          setdata1(sorted)   
        
          
        }
        

    }
    
   
    
    const changevalue=(e)=>{
         let str=e.target.value;
         if(str.length==0)
         { 
          setquery(str);
         }
         else {
          setflag(1);
            setquery(str[0].toUpperCase()+str.slice(1));
         }
    }
    const getorder1=(value)=>
    {     
         setorder(value);  
       sorting(par);
    }
    console.log('query',query);
    
  return (
    <div>
    <div >
    <nav class="navbar navbar-expand-lg nav3">
  <div class="container-fluid ">
    <a class="navbar-brand" href="#">CollegeDunia</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item dropdown link1">
          
          <Dropdown >
      <Dropdown.Toggle  className='btn1' variant="primary" id="dropdown-basic">
        Sort By
      </Dropdown.Toggle>

      <Dropdown.Menu >
        <Dropdown.Item onClick={()=>setpar("averageRating")} >User Review Rating</Dropdown.Item>
        
        <Dropdown.Item onClick={()=>setpar("undergraduateFees")}>Fees - Undergraduate</Dropdown.Item>
        <Dropdown.Item onClick={()=>setpar("postgraduateFees")}>Fees - Postrgraduate</Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown>
      <Dropdown.Toggle variant="primary"  className='btn1' id="dropdown-basic">
        Order By
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>sorting(par,"asc") }    >Ascending</Dropdown.Item>
        <Dropdown.Item onClick={()=>sorting(par,"desc")}  >Descending</Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>
    
          </li>
        
      </ul>
      <div className='search1'>
      <form class="d-flex search1" role="search"  >
        <input class="form-control me-2 input1" value={query} onChange={changevalue} type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success btn2"  type="submit">Search</button>
      </form>
      </div>
    </div>
  </div>
</nav>
    </div>
    <div className='btn3'>
    <div>
    </div>
    </div>
   
    
    <div className='tb1'>
    {flag1==1 ?  <div className="df1"> <h3> Sorted By: {par}</h3> <h3 className='o1'>  Order:  {order=="asc"? <h3>Ascending </h3>: <h3>descending </h3> } </h3> </div> :""}
    <table>
          <thead className='t2'>
            <tr className='t2'>
                <td className='c1' >CD Rank  </td>
                <td className='c2'>Colleges </td>
                <td className='c3'>Course Fees </td>
                <td className='c4'> Placement </td>
                <td className='c5'>User Reviews  </td>
                <td className='c6' > Ranking </td>
            </tr>
          </thead>
          <tbody>
          {console.log(college.length)}
          { data1.filter((row)=>{return query===""? row:row.collegeName.includes(query) }).map((data)=>(
            
            <tr key={data.rankings.national.rank} className='tr1'>
               <td> # {data.rankings.national.rank}  </td>
               <td className='td1'> <div className='cname'> <div className='logo1'> <div>  <img className='img1' src={data.logoLink} alt="" /></div> <div className='city1'> <div className='cname1'> <div> {data.collegeName}</div></div>
               
               </div></div></div>  <div className='location'>{data.location.city}, {data.location.state}   </div>  </td>
               <td> <div className='fees'> <div> BE/Btech: <div className='blue1'> &#8377; {data.courseFees.undergraduate} <div> (1st Year Fees) </div> </div> </div>
                      <div> Mtech: <div className='blue1'>&#8377; {data.courseFees.postgraduate} <div>(1st Year Fees) </div> </div>  </div>
                      </div>
                  </td>
               <td><div> Average Package:{data.placementDetails.averagePackage} </div>
                    <div> Top Package: {data.placementDetails.highestPackage} </div>
                    <div> Top Recruiters: {data.placementDetails.topRecruiters.join(', ')}</div>
                    
                  </td> 
               <td> <h3>  <FaStar color="yellow" />  {data.averageRating}/10 </h3>  </td>    
               <td><div> {data.rankings.global.rank} Rank In</div>
                 <div> <img className='logoimg' src="https://st.adda247.com/https://currentaffairs.adda247.com/wp-content/uploads/multisite/sites/5/2022/06/10072125/world-university-ranking-1654760144.jpg" alt="" /> 2023 </div>
                </td>
            </tr>
        ))}
          </tbody>

    </table>
    {console.log(data1.length,arr.length)
    }
   {spin===1 && data1.length!==arr.length && flag!=1 ?<Spinner animation='border'></Spinner>:""}
    </div>
    </div>
  )
}

export default User
