import React from 'react'
import { useState } from 'react';
import InfinteScrollComponent from 'react-infinite-scroll-component';
import arr from './Data';
const User1 = () => {
    const [data1,setdata1]=useState(arr.slice(0,10));
    const [hasmoredata,sethasmoredata]=useState(1);
    const [page,setpage]=useState(0);
      const fetchmore=()=>{
        setTimeout(()=>{
           data1.concat(arr.slice(page*10,page*10+10));
        },500)
        setpage((prev)=>prev+1);
      }
    return (
    <div>

      <InfinteScrollComponent dataLength={data1.length} next={fetchmore} hasMore={hasmoredata} >
      
    <table>
          <thead className='t2'>
            <tr className='t2'>
                <td className='c1' >CD Rank  </td>
                <td className='c2'>College </td>
                <td className='c3'>Course Fees </td>
                <td className='c4'> Placement </td>
                <td className='c5'>User Reviews  </td>
                <td className='c6' > Ranking </td>
            </tr>
          </thead>
          <tbody>
          { data1.map((data)=>(
            
            <tr key={data.rankings.national.rank} className='tr1'>
               <td> # {data.rankings.national.rank}  </td>
               <td> <img className='img1' src={data.logolink} alt="" />  {data.collegeName}  </td>
               <td> <div> BE/Btech: {data.courseFees.undergraduate} </div>
                      <div> Mtech: {data.courseFees.postgraduate}  </div>
                 </td>
               <td><div> Average Package:{data.placementDetails.averagePackage} </div>
                    <div> Top Package: {data.placementDetails.highestPackage} </div>
                    <div> Top Recruiters: {data.placementDetails.topRecruiters.join(', ')}</div>
                    
                  </td> 
               <td> <h3> {data.averageRating}/10 </h3>  </td>    
               <td><div> {data.rankings.global.rank}</div>
                 <div> {data.rankings.global.source} </div>
                </td>
            </tr>
        ))}
          </tbody>

    </table>

      </InfinteScrollComponent>
    </div>
  )
}

export default User1
