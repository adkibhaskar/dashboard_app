import React,{useEffect, useState} from 'react';
import { Container,Row,Col,Card,Button,Carousel,Image } from 'react-bootstrap';
import PieChart from "./PieChart";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaChevronLeft,FaChevronRight  } from "react-icons/fa6";
import {diseasesData} from "../constants/constants";
import {employessInfoData} from "../constants/constants";
import VerticalBarChart from './VerticalBarChart';


const Dashboard = () => {
  const [index, setIndex] = useState(0);
  const[data,setData]=useState([]);
  const[graphData,setGraphData]=useState([]);
  const [employeesData,setEmployeesData]=useState([]);
  const[employeesBarData,setEmployeesBarData]=useState([])
  const pieLabels=diseasesData.map((data)=>{return data.diseaseName})
  const barLables=employessInfoData.map((data)=>data.age)
  const nextHandler=()=>{
    if(index < 1){
      setIndex((index)=>index+1)
    }
    
  }
  const prevHandler=()=>{
    if(index > 0){
      setIndex((index)=>index-1)
    }
  }
  useEffect(()=>{
    setData(diseasesData)
    setEmployeesData(employessInfoData)
  },[])
  useEffect(()=>{
   let graphDataArray=[];
   if(data !== undefined && data !== null && data.length > 0){
    data.forEach((data)=>{
       graphDataArray.push(data.totalPatients)
    })
    setGraphData(graphDataArray)
   }
   
  },[data])
  useEffect(()=>{
     let employessBarDataArr=[];
     if(employeesData !== undefined && employeesData !== null && employeesData.length > 0){
      employeesData.forEach((data)=>{
        employessBarDataArr.push(data.totalEmployees)
      })
      setEmployeesBarData(employessBarDataArr)
     }
  },[employeesData])
  return (
    <Container>
      <Row style={{padding:'1rem',backgroundImage:'linear-gradient(to bottom,rgb(207, 130, 238),rgb(0, 204, 255) 90%)',width:'100%'}}>
        <Col>
        <p className='fs-6 fw-semibold mb-4' style={{color:'#4a2eec',opacity:'0.7'}}>Dashboard</p>
        </Col>
      </Row>

      <Row className='group-graph-cards' style={{gap:'10px 0px'}}>

        <Col sm={12} md={4}>

        <Card className='w-100 h-100 shadow-sm'>
        <div className='w-100 h-100 p-2'>
            <p className='border-bottom mb-3'>Ongoging Challenges</p>
            <div className='border-darkest border-2' ></div>
            <div className='d-flex h-75' style={{gap:'5px'}}>
              <div className='rounded p-2' style={{width:'50%',border:'2px',borderColor:'blue',borderStyle:'solid',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'2px',textAlign:'center',fontSize:'12px',fontWeight:'bold'}}>
               <p style={{color:'purple',marginBottom:'0px'}}>Steps Challenge</p>
               <p style={{marginBottom:'0px'}}>Starts On</p>
               <p style={{marginBottom:'0px'}}>{`1/12/24`}</p>
               <p style={{marginBottom:'0px'}}>Ends On</p>
               <p style={{marginBottom:'0px'}}>{`12/12/24`}</p>
              </div>
              <div className='w-50' style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'2px',textAlign:'center',fontSize:'12px',fontWeight:'bold',boxShadow:'0 4px 8px rgba(0, 0, 0, 0.2)'}}>
               <p style={{marginBottom:'0px'}}>Active Participants</p>
               <p style={{marginBottom:'0px'}}>27</p>
               <p style={{marginBottom:'0px'}}>Today's top Participant</p>
               <p style={{marginBottom:'5px'}}>Anuj Mehta</p>
               <Button style={{backgroundColor:'#71c3f9',border:'none',borderRadius:'13px',color:'#333',padding:'2px 10px',marginBottom:'5px'}}>
                View Details
              </Button>
              </div>

            </div>
        </div>
        </Card>

        </Col>

        <Col sm={12} md={4}>

        <Card className='p-2 w-100 h-100 shadow-sm'>
        <p className='border-bottom mb-3'>Overall Lifestyle Diseases</p>
        <div className='border-darkest border-2' ></div>
        <PieChart graphData={graphData} labels={pieLabels}/>
        <Button style={{backgroundColor:'#71c3f9',border:'none',borderRadius:'13px',color:'#333',padding:'2px 10px',marginBottom:'5px',alignSelf:'end'}}>
                View Details
              </Button>
        </Card>

        </Col>

        <Col sm={12} md={4}>

        <Card className='p-2 w-100 h-100 shadow-sm'>
        <p className='border-bottom mb-3'>Employees By Age</p>
        <div className='border-darkest border-2'></div>
        <VerticalBarChart graphData={employeesBarData} graphLabels={barLables}/>
        </Card>
        
        </Col>

      </Row>
      
          <Row style={{gap:'20px',marginBottom:'20px'}}>

        <Col lg={12}>

          <Card style={{width:'100',maxHeight:'300px',boxShadow:'0 4px 8px rgba(0, 0, 0, 0.2)',padding:'9px'}}>
            <p className='border-bottom mb-4'>Active Groups</p>
            <div className='border-darkest border-2' ></div>
            <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',width:'100%'}}>
              <button onClick={prevHandler} style={{backgroundColor:'white',border:'none'}}>
              <FaChevronLeft/>
              </button>
              <Carousel activeIndex={index} style={{width:'90%'}}>
                <Carousel.Item>
              <div className='d-flex p-2 w-100 align-items-center' style={{gap:'20px'}}>
                <div className='rounded p-2 carousel-item-child'>
                  <p className='fs-6 fw-semibold'  style={{color:'orange',textAlign:'center',margin:'5px',marginBottom:'0px',width:'100%'}}>Morning Yoga</p>
                  <div style={{display:'flex',flexDirection:'column',textAlign:'center'}}>
                <p className='m-0'>Created On</p>
                <p>{`1/1/24`}</p>
                </div>
                  <Col className='d-flex align-items-center justify-content-center'>
                  <Image src="/images/pexels-danxavier-1239291.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'3'}}/>
                  <Image src="/images/pexels-simon-robben-55958-614810.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'2',transform:'translateX(-12px) translateY(2px)'}}/>
                  <Image src="/images/pexels-soldiervip-1468379.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'1',transform:'translateX(-18px)'}}/>
                  <p style={{color:'#4a2eec',fontSize:'10px',fontWeight:'bolder',transform:'translateX(-13px)'}}>{`+ 4 Members`}</p>
              </Col>
              <Button style={{backgroundColor:'#71c3f9',border:'none',borderRadius:'13px',color:'#333',padding:'2px',marginBottom:'5px',width:'120px',alignSelf:'center'}}>
                View Details
              </Button>
              </div>
              <div style={{width:'2px',height:'120px',backgroundColor:'black',opacity:'0.1',marginTop:'2px'}}></div>
              <div className='rounded p-2 carousel-item-child'>
                  <p className='fs-6 fw-semibold'  style={{color:'orange',textAlign:'center',margin:'5px',marginBottom:'0px',width:'100%'}}>Morning Running</p>
                  <div style={{display:'flex',flexDirection:'column',textAlign:'center'}}>
                <p className='m-0'>Created On</p>
                <p>{`1/1/24`}</p>
                </div>
                  <Col className='d-flex align-items-center justify-content-center'>
                  <Image src="/images/pexels-danxavier-1239291.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'3'}}/>
                  <Image src="/images/pexels-simon-robben-55958-614810.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'2',transform:'translateX(-12px) translateY(2px)'}}/>
                  <Image src="/images/pexels-soldiervip-1468379.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'1',transform:'translateX(-18px)'}}/>
                  <p style={{color:'#4a2eec',fontSize:'10px',fontWeight:'bolder',transform:'translateX(-13px)'}}>{`+ 4 Members`}</p>
              </Col>
              <Button style={{backgroundColor:'#71c3f9',border:'none',borderRadius:'13px',color:'#333',padding:'2px',marginBottom:'5px',width:'120px',alignSelf:'center'}}>
                View Details
              </Button>
              </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className='d-flex p-2 w-100 align-items-center' style={{gap:'20px'}}>
                <div className='rounded p-2 carousel-item-child'>
                  <p className='fs-6 fw-semibold'  style={{color:'orange',textAlign:'center',margin:'5px',marginBottom:'0px',width:'100%'}}>Evening Yoga</p>
                  <div style={{display:'flex',flexDirection:'column',textAlign:'center'}}>
                <p className='m-0'>Created On</p>
                <p>{`1/1/24`}</p>
                </div>
                  <Col className='d-flex align-items-center justify-content-center'>
                  <Image src="/images/pexels-danxavier-1239291.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'3'}}/>
                  <Image src="/images/pexels-simon-robben-55958-614810.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'2',transform:'translateX(-12px) translateY(2px)'}}/>
                  <Image src="/images/pexels-soldiervip-1468379.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'1',transform:'translateX(-18px)'}}/>
                  <p style={{color:'#4a2eec',fontSize:'10px',fontWeight:'bolder',transform:'translateX(-13px)'}}>{`+ 4 Members`}</p>
              </Col>
              <Button style={{backgroundColor:'#71c3f9',border:'none',borderRadius:'13px',color:'#333',padding:'2px',marginBottom:'5px',width:'120px',alignSelf:'center'}}>
                View Details
              </Button>
              </div>
              <div style={{width:'2px',height:'120px',backgroundColor:'black',opacity:'0.1',marginTop:'2px'}}></div>
              <div className='rounded p-2 carousel-item-child'>
                  <p className='fs-6 fw-semibold'  style={{color:'orange',textAlign:'center',margin:'5px',marginBottom:'0px',width:'100%'}}>Evening Running</p>
                  <div style={{display:'flex',flexDirection:'column',textAlign:'center'}}>
                <p className='m-0 fs-6'>Created On</p>
                <p>{`1/1/24`}</p>
                </div>
                  <Col className='d-flex align-items-center justify-content-center'>
                  <Image src="/images/pexels-danxavier-1239291.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'3'}}/>
                  <Image src="/images/pexels-simon-robben-55958-614810.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'2',transform:'translateX(-12px) translateY(2px)'}}/>
                  <Image src="/images/pexels-soldiervip-1468379.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'1',transform:'translateX(-18px)'}}/>
                  <p style={{color:'#4a2eec',fontSize:'10px',fontWeight:'bolder',transform:'translateX(-13px)'}}>{`+ 4 Members`}</p>
              </Col>
              <Button style={{backgroundColor:'#71c3f9',border:'none',borderRadius:'13px',color:'#333',padding:'2px',marginBottom:'5px',width:'120px',alignSelf:'center'}}>
                View Details
              </Button>
              </div>
              </div>
            </Carousel.Item>
          </Carousel>
          <button onClick={nextHandler} style={{backgroundColor:'white',border:'none'}}>
              <FaChevronRight/>
              </button>
          </div>
          
            
            
          </Card>

        </Col>

        <Col lg={6}>
        <Card className='p-2 w-100' style={{maxHeight:'300px',boxShadow:'0 4px 8px rgba(0, 0, 0, 0.2)'}}>
        <p className='border-bottom mb-4'>Recommendations</p>
        <div className='border-darkest border-2' ></div>
        <div className='d-flex flex-column align-items-center m-2 overflow-y-scroll w-80' style={{gap:'5px'}}>
          <Card className='w-100'>
             <div className='w-100 p-2 d-flex' style={{gap:'40px'}}>
              <div style={{width:'10%'}}>
                <Image src="/images/pexels-danxavier-1239291.jpg" roundedCircle style={{width:'50px',height:'50px'}}/>
              </div>
              <div style={{width:'70%'}}>
               <div className='d-flex flex-column' style={{gap:'2px'}}>
                <p className='fs-6 border-bottom'>Give workers more control over how they do there work</p>
                <div className='border-darkest border-2 w-100' ></div>
                <p>Research indiciates that having little description over {" "} 
                  <span>
                    <button className='border-0 bg-white' style={{color:'blue',opacity:'0.8'}}>Read More</button>
                  </span>
                </p>
                </div>
              </div>
             </div>
          </Card>
          <Card className='w-100'>
             <div className='w-100 p-2 d-flex' style={{gap:'40px'}}>
              <div style={{width:'10%'}}>
                <Image src="/images/pexels-danxavier-1239291.jpg" roundedCircle style={{width:'50px',height:'50px'}}/>
              </div>
              <div className='w-100'>
               <div className='d-flex flex-column' style={{gap:'2px'}}>
                <p className='fs-6 border-bottom'>Give workers more control over how they do there work</p>
                <div className='border-darkest border-2' ></div>
                <p>Research indiciates that having little description over {" "} 
                  <span>
                    <button className='border-0 bg-white' style={{color:'blue',opacity:'0.8'}}>Read More</button>
                  </span>
                </p>
                </div>
              </div>
             </div>
          </Card>
          <Card className='w-100'>
             <div className='w-100 p-2 d-flex' style={{gap:'40px'}}>
              <div style={{width:'10%'}}>
                <Image src="/images/pexels-danxavier-1239291.jpg" roundedCircle style={{width:'50px',height:'50px'}}/>
              </div>
              <div style={{width:'70%'}}>
               <div className='d-flex flex-column' style={{gap:'2px'}}>
                <p className='fs-6 border-bottom'>Give workers more control over how they do there work</p>
                <div className='border-darkest border-2' ></div>
                <p>Research indiciates that having little description over {" "} 
                  <span>
                    <button className='border-0 bg-white' style={{color:'blue',opacity:'0.8'}}>Read More</button>
                  </span>
                </p>
                </div>
              </div>
             </div>
          </Card>
          <Card className='w-100'>
             <div className='w-100 p-2 d-flex' style={{gap:'40px'}}>
              <div style={{width:'10%'}}>
                <Image src="/images/pexels-danxavier-1239291.jpg" roundedCircle style={{width:'50px',height:'50px'}}/>
              </div>
              <div style={{width:'70%'}}>
               <div className='d-flex flex-column' style={{gap:'2px'}}>
                <p className='fs-6 border-bottom'>Give workers more control over how they do there work</p>
                <div className='border-darkest border-2' ></div>
                <p>Research indiciates that having little description over {" "} 
                  <span>
                    <button className='border-0 bg-white' style={{color:'blue',opacity:'0.8'}}>Read More</button>
                  </span>
                </p>
                </div>
              </div>
             </div>
          </Card>
          <Card className='w-100'>
             <div className='w-100 p-2 d-flex' style={{gap:'40px'}}>
              <div style={{width:'10%'}}>
                <Image src="/images/pexels-danxavier-1239291.jpg" roundedCircle style={{width:'50px',height:'50px'}}/>
              </div>
              <div style={{width:'70%'}}>
               <div className='d-flex flex-column' style={{gap:'2px'}}>
                <p className='fs-6 border-bottom'>Give workers more control over how they do there work</p>
                <div className='border-darkest border-2' ></div>
                <p>Research indiciates that having little description over {" "} 
                  <span>
                    <button className='border-0 bg-white' style={{color:'blue',opacity:'0.8'}}>Read More</button>
                  </span>
                </p>
                </div>
              </div>
             </div>
          </Card>

        </div>
        
        </Card>
        
        </Col>

        <Col>

        <Card className='p-2 bg-warning h-100'>
          <p className='fs-4 fw-medium'>Upcoming Events</p>
          <Card className='p-2'>
            <p className='fs-5 text-primary'>Total Body Checkup</p>
            <p className='fs-6 mb-0'>Conducted By:Jupiter Hospital</p>
            <p className='fs-6 mb-0'>Date : 12th Jan 2023</p>
            <p className='fs-6 mb-0'>Time : 9:00am to 5:00pm</p>
            <p>Total Registration : 12</p>
          </Card>

        </Card>
        </Col>
      </Row>

    </Container>
    
  )
}

export default Dashboard