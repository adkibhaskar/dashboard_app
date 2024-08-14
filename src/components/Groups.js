import React,{useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Container,Row,Col,Button,Form,Image} from "react-bootstrap";
import PieChart from "./PieChart";import Card from 'react-bootstrap/Card';
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
  const labels = ["Active","InActive","New"];
  const barLabels=performanceData.map((data)=>{return data.groupName});
  const[filteredGroups,setFilteredGroups]=useState()
  
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
    graphDataArray.push(totalActiveGroups);
    graphDataArray.push(totalInActiveGroups);
    graphDataArray.push(totalNewGroups);
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
      <Row style={{padding:'1rem',backgroundImage:'linear-gradient(to bottom,rgb(207, 130, 238),rgb(0, 204, 255) 90%)',width:'100%'}}>
        <Col>
        <p className='fs-6 fw-semibold mb-4' style={{color:'#4a2eec',opacity:'0.7'}}>Groups</p>
        </Col>
      </Row>

      <Row className='group-graph-cards'>
        <Col sm={12} md={4}>

        <Card className='p-2 w-100 h-100 shadow-sm'>
        <p className='border-bottom mb-3'>Total Groups</p>
        <div className='border-darkest border-2' ></div>
        <PieChart graphData={graphData} labels={labels} isView={false}/>

        </Card>

        </Col>

        <Col sm={12} md={6}>

        <Card className='p-2 w-100 shadow-sm'>
        <p className='border-bottom mb-3'>Top 5 Groups By Performance</p>
        <div className='border-darkest border-2' ></div>
         <HorizontalBarChart data={barData} labels={barLabels}/>
         </Card>

        </Col>

        <Col sm={12} md={2}>
        <Card className='p-2 w-100 h-100 shadow-sm d-flex flex-column justify-content-center align-items-center' style={{gap:'10px 0px'}}>
          <div className='position-relative z-index-2'>
          <MdGroups style={{fontSize:'4rem',color:'orange'}}/>
          <Button style={{width:'2rem',height:'2rem',position:'absolute',top:'2.4rem',left:'1rem',zIndex:'10',backgroundColor:'white',borderRadius:'50%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <FaPlus style={{fontSize:'1rem',textAlign:'center',color:'blue'}}/>
          </Button>
          </div>
          
          <p className='text-center' style={{fontSize:'15px'}}>Create a Group</p>
          
        </Card>

        </Col>

      </Row>

     <Row className="w-100 d-flex justify-content-between align-items-center">
      
     <Col xs="auto">
          <p className='fs-6 fw-semibold' style={{color:'#4a2eec',padding:'10px 20px'}}>All Groups</p>
        </Col>
        <Col xs="auto">
          <Form.Control
          type='text'
          placeholder='Search group'
          style={{borderRadius:'5px',padding:'5px',backgroundColor:' #f0f0f0',color:'#333'}}
          onChange={handleOnChange}/>
          
        </Col>

     </Row>

     <Row className='mt-5 mb-5' style={{gap:'10px 0px'}}>
      {
        filteredGroups && filteredGroups.length > 0 ? (
          filteredGroups?.map((data,i)=>{
            return(
              <Col key={i} lg={4}>
  
              <Card className=' w-100 h-100 p-4 d-flex flex-column align-items-center'>
              <p className='fs-6 fw-semibold'  style={{color:'orange',textAlign:'center',margin:'5px'}}>{data.groupName}</p>
              <div style={{display:'flex',flexDirection:'column',textAlign:'center'}}>
                <p className='m-0'>Created On</p>
                <p>{data.CreatedAt}</p>
               </div>
              <Col className='d-flex align-items-center'>
              <Image src="/images/pexels-danxavier-1239291.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'3'}}/>
              <Image src="/images/pexels-simon-robben-55958-614810.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'2',transform:'translateX(-12px) translateY(2px)'}}/>
              <Image src="/images/pexels-soldiervip-1468379.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'1',transform:'translateX(-18px)'}}/>
              <p style={{color:'#4a2eec',fontSize:'10px',fontWeight:'bolder',transform:'translateX(-13px)'}}>{`+ ${data?.usersId?.length} Members`}</p>
              </Col>
              <Button style={{backgroundColor:'#71c3f9',border:'none',borderRadius:'13px',color:'#333',padding:'2px 10px'}}>
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
                <p className='m-0'>Created On</p>
                <p>{data.CreatedAt}</p>
               </div>
              <Col className='d-flex align-items-center'>
              <Image src="/images/pexels-danxavier-1239291.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'3'}}/>
              <Image src="/images/pexels-simon-robben-55958-614810.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'2',transform:'translateX(-12px) translateY(2px)'}}/>
              <Image src="/images/pexels-soldiervip-1468379.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'1',transform:'translateX(-18px)'}}/>
              <p style={{color:'#4a2eec',fontSize:'10px',fontWeight:'bolder',transform:'translateX(-13px)'}}>{`+ ${data?.usersId?.length} Members`}</p>
              </Col>
              <Button style={{backgroundColor:'#71c3f9',border:'none',borderRadius:'13px',color:'#333',padding:'2px 10px'}}>
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