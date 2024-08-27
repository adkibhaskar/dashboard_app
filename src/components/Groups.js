import React,{useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Container,Row,Col,Button,Form,Image} from "react-bootstrap";
import Doughnut2 from "./Doughnut2";
import Card from 'react-bootstrap/Card';
import { MdGroups } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import {data} from "../constants/constants";
import HorizontalBarChart from './HorizontalBarChart';
import {performanceData} from "../constants/constants";

const Groups = () => {
  const[groupData,setGroupData]=useState([{}]);
  const[graphData,setGraphData]=useState([]);
  const[performanceMetricData,setPerformanceMetricData]=useState([]);
  const[barData,setBarData]=useState([]);
  const labels = ["New","Active","InActive"];
  const barLabels=performanceData.map((data)=>{return data.groupName});
  const doughnutLength=data.groups.length
  const[filteredGroups,setFilteredGroups]=useState();
 
  
  useEffect(()=>{
    const fetchData=()=>{
      setGroupData(data.groups)
      setPerformanceMetricData(performanceData)
    }
      fetchData()
  },[])
  
  useEffect(()=>{
   let barDataArr=[];
   if(performanceMetricData !== undefined && performanceMetricData !== null && performanceMetricData.length>0){
    performanceMetricData.forEach((data)=>{
      barDataArr.push(data.performance)
    })
    setBarData(barDataArr)
   }
  },[performanceMetricData])

useEffect(()=>{
  let totalActiveGroups=0;
  let totalInActiveGroups=0;
  let totalNewGroups=0;
  let graphDataArray=[]
  if(groupData !== undefined && groupData !== null){
    groupData.forEach((data)=>{
      if(data.groupStatus === "active"){
        totalActiveGroups++;
      }
      else if(data.groupStatus === "inactive"){
        totalInActiveGroups++;
      }
      else{
        totalNewGroups++;
      }
    })
    graphDataArray.push(totalNewGroups);
    graphDataArray.push(totalActiveGroups);
    graphDataArray.push(totalInActiveGroups);
    console.log("The Graph Data Array is : ",graphDataArray)
    setGraphData(graphDataArray)
    
  }

},[groupData])
const handleOnChange=(e)=>{
  const input=e.target.value;
  const words=input.split(" ");
  for(let i=0;i<words.length;i++){
    if(words[i] !== ''){
      words[i]=words[i][0].toUpperCase() + words[i].toLowerCase().substr(1);
    }
  }
  const foundGroups = groupData.filter((group)=>group.groupName.split(" ").toString().includes(words.toString()));
  console.log("The foundGroups are : ",foundGroups)
  setFilteredGroups(foundGroups)
}

  return (
    <Container>
      <Row style={{padding:'1rem',backgroundImage:'linear-gradient(to bottom,rgba(183,180,226,255) 1%,rgba(156,224,252,255) 90%)',width:'100%',height:'15%'}}>
        <Col>
        <p className='fs-5 fw-semibold mb-1' style={{color:'#5c65dd'}}>Groups</p>
        </Col>
      </Row>

      <Row className='group-graph-cards'>
        <Col sm={12} md={3}>

        <Card className='p-2 w-100 h-100 shadow-sm' style={{borderRadius:'15px'}}>
        <p className='border-bottom mb-3' style={{color:'#8d8d8d'}}>Total Groups</p>
        <div className='border-darkest border-2' ></div>
        <Doughnut2 graphData={graphData} labels={labels} textData={doughnutLength}/>

        </Card>

        </Col>

        <Col sm={12} md={6}>

        <Card className='p-2 w-100 shadow-sm' style={{borderRadius:'15px'}}>
        <p className='border-bottom mb-3' style={{color:'#8d8d8d'}}>Top 5 Groups By Performance</p>
        <div className='border-darkest b' ></div>
         <HorizontalBarChart data={barData} labels={barLabels}/>
         </Card>

        </Col>

        <Col sm={12} md={3}>
        <Card className='p-2 h-100 shadow-sm d-flex flex-column justify-content-center align-items-center' style={{gap:'10px 0px',width:'80%',borderRadius:'15px'}}>
          <div className='position-relative z-index-2 mb-4'>
          <MdGroups style={{fontSize:'5rem',color:'orange'}}/>
          <Button style={{width:'3rem',height:'3rem',position:'absolute',top:'3.2rem',right:'0.9rem',zIndex:'10',backgroundColor:'white',borderRadius:'50%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',borderColor:'#ffffff',boxShadow:'4px 4px 10px rgba(0, 0, 0, 0.3)'}}>
          <FaPlus style={{fontSize:'25px',textAlign:'center',color:'#0080ff',fontWeight:'normal'}}/>
          </Button>
          </div>
          
          <p className='text-center' style={{fontSize:'17px',color:'#717171',fontWeight:'bold'}}>Create a Group</p>
          
        </Card>

        </Col>

      </Row>

     <Row className="w-100 d-flex justify-content-between align-items-center">
      
     <Col xs="auto">
          <p className='fw-semibold' style={{color:'#5961dc',padding:'10px 20px',fontSize:'20px'}}>All Groups</p>
        </Col>
        <Col xs="auto">
          <Form.Control
          type='text'
          placeholder='Search group'
          style={{borderRadius:'5px',padding:'5px 7px',backgroundColor:' #fcfcfc',color:'#aaaaaa',borderColor:'#e1e1e1',fontSize:'16px'}}
          onChange={handleOnChange}/>
          
        </Col>

     </Row>

     <Row className=' mb-5' style={{gap:'10px 0px',padding:'1rem'}}>
      {
        filteredGroups && filteredGroups.length > 0 ? (
          filteredGroups?.map((data,i)=>{
            return(
              
              <Col key={i} md={4} lg={3}>
  
              <Card className=' w-100 h-100 p-4 d-flex flex-column align-items-center'>
              <p className='fs-6 fw-semibold'  style={{color:'orange',textAlign:'center',margin:'5px'}}>{data.groupName}</p>
              <div style={{display:'flex',flexDirection:'column',textAlign:'center'}}>
                <p className='m-0' style={{fontSize:'12px',textAlign:'center',color:'#7e7e7f'}}>Created On</p>
                <p style={{fontSize:'12px',textAlign:'center',color:'#7e7e7f'}}>{`${data.createdAt}`}</p>
               </div>
              <Col className='d-flex align-items-center'>
              <Image src="/images/pexels-danxavier-1239291.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'3'}}/>
              <Image src="/images/pexels-simon-robben-55958-614810.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'2',transform:'translateX(-12px) translateY(2px)'}}/>
              <Image src="/images/pexels-soldiervip-1468379.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'1',transform:'translateX(-18px)'}}/>
              <p style={{color:'#0062e5',fontSize:'10px',fontWeight:'bolder',transform:'translateX(-13px)'}}>{`+ ${data?.usersId?.length} Members`}</p>
              </Col>
              <Button style={{backgroundColor:'#8de5fe',border:'none',borderRadius:'20px',color:'#187996',padding:'8px 30px'}}>
                View Details
              </Button>
              </Card>
              </Col>
            )
          })
        ):(
          groupData?.map((data,i)=>{
            return(
              
              <Col key={i} md={4} lg={3}>
  
              <Card className=' w-100 h-100 p-4 d-flex flex-column align-items-center'>
              <p className='fs-6 fw-semibold'  style={{color:'orange',textAlign:'center',margin:'5px'}}>{data.groupName}</p>
              <div style={{display:'flex',flexDirection:'column',textAlign:'center'}}>
                <p className='m-0' style={{fontSize:'12px',textAlign:'center',color:'#7e7e7f'}}>Created On</p>
                <p style={{fontSize:'12px',textAlign:'center',color:'#7e7e7f'}}>{`${data.createdAt}`}</p>
               </div>
              <Col className='d-flex align-items-center'>
              <Image src="/images/pexels-danxavier-1239291.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'3'}}/>
              <Image src="/images/pexels-simon-robben-55958-614810.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'2',transform:'translateX(-12px) translateY(2px)'}}/>
              <Image src="/images/pexels-soldiervip-1468379.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'1',transform:'translateX(-18px)'}}/>
              <p style={{color:'#0062e5',fontSize:'10px',fontWeight:'bolder',transform:'translateX(-13px)'}}>{`+ ${data?.usersId?.length} Members`}</p>
              </Col>
              <Button style={{backgroundColor:'#8de5fe',border:'none',borderRadius:'20px',color:'#187996',padding:'8px 30px'}}>
                View Details
              </Button>
              </Card>
              </Col>
            )

          })
          
        )
      }

     </Row>
     </Container>
     )
}







export default Groups