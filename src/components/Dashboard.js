import React,{useEffect, useState} from 'react';
import { Container,Row,Col,Card,Button,Carousel,Image } from 'react-bootstrap';
import Doughnut1 from "./Doughnut1"
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
  const[employeesBarData,setEmployeesBarData]=useState([]);
  const[currentTime,setCurrentTime]=useState(new Date());
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
    const timerId=setInterval(()=>{
      setCurrentTime(new Date())
    },800)
    return ()=> clearInterval(timerId);

  },[])
  useEffect(()=>{
     let employessBarDataArr=[];
     if(employeesData !== undefined && employeesData !== null && employeesData.length > 0){
      employeesData.forEach((data)=>{
        employessBarDataArr.push(data.totalEmployees)
      })
      setEmployeesBarData(employessBarDataArr)
     }
  },[employeesData])
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    
    hours = hours % 12;
    hours = hours ? hours : 12; 
    hours = hours.toString().padStart(2, '0'); 

    
    const daySuffix = (day) => {
      if (day > 3 && day < 21) return 'th'; 
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    return `${day}${daySuffix(day)} ${month} ${year} ${hours}:${minutes} ${ampm}`;
  };
  
  return (
    <Container>
      <Row style={{padding:'1rem',backgroundImage:'linear-gradient(to bottom,rgba(183,180,226,255) 1%,rgba(156,224,252,255) 90%)',width:'100%',height:'20%'}}>
        <Col className='d-flex justify-content-between'>
        <p className='fs-5 fw-semibold mb-4' style={{color:'#5f66df'}}>Dashboard</p>
        <p style={{color:'#5f66df'}}>{formatDate(currentTime)}</p>
        </Col>
      </Row>

      <Row className='group-graph-cards1'>

        <Col sm={12} md={4} style={{marginRight:'-15px'}}>

        <Card className='w-100 h-100 shadow-sm' style={{borderRadius:'15px'}}>
        <div className='w-100 h-100 p-2'>
            <p className='border-bottom mb-3' style={{fontSize:'15px',color:'#696969'}}>Ongoging Challenges</p>
            <div className='border-darkest border-2' ></div>
            <div className='d-flex h-75 py-10' style={{gap:'5px'}}>
              <div className='rounded p-1 w-50' style={{border:'6px',borderColor:'#8de4ff',borderStyle:'solid',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'2px',textAlign:'center',fontSize:'10px',padding:'5px'}}>
               <p style={{color:'#7a12d5',marginBottom:'10px',fontSize:'22px'}}>Steps Challenge</p>
               <p style={{marginBottom:'0px',color:'#696969',fontSize:'10x'}}>Starts On</p>
               <p style={{marginBottom:'0px',color:'#696969',fontSize:'10x'}}>{`1/12/24`}</p>
               <p style={{marginBottom:'0px',color:'#696969',fontSize:'10x'}}>Ends On</p>
               <p style={{marginBottom:'0px',color:'#696969',fontSize:'10x'}}>{`12/12/24`}</p>
              </div>
              <div className='w-50' style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'2px',textAlign:'center',fontSize:'13px',padding:'5px'}}>
               <p style={{marginBottom:'1px',color:'#747474'}}>Active Participants</p>
               <p style={{marginBottom:'7px',fontSize:'22px',color:'#696969'}}>27</p>
               <p style={{marginBottom:'10px',color:'#767676'}}>Today's top Participant</p>
               <p style={{marginBottom:'1.5rem',color:'#858585'}}>Anuj Mehta</p>
               <Button style={{backgroundColor:'#8de5fe',border:'none',borderRadius:'13px',color:'#187996',padding:'8px 30px',marginBottom:'5px',alignSelf:'center',fontSize:'12px',fontWeight:'bold'}}>
                View Details
              </Button>
              </div>

            </div>
        </div>
        </Card>

        </Col>

        <Col sm={12} md={4} style={{marginRight:'-15px'}}>

        <Card className='p-2 w-100 h-100 shadow-sm' style={{borderRadius:'15px'}}>
        <p className='border-bottom mb-4' style={{fontSize:'15px',color:'#696969'}}>Overall Lifestyle Diseases</p>
        <div className='border-darkest border-2' ></div>
        <Doughnut1 graphData={graphData} labels={pieLabels}/>
        <Button style={{backgroundColor:'#8de5fe',border:'none',borderRadius:'13px',color:'#187996',padding:'8px 30px',marginBottom:'5px',alignSelf:'end',fontSize:'12px',fontWeight:'bold',transform: 'translate(-2px, -18px)'}}>
                View Details
              </Button>
        </Card>

        </Col>

        <Col sm={12} md={4}>

        <Card className='p-2 w-100 h-100 shadow-sm' style={{borderRadius:'15px'}}>
        <p className='border-bottom mb-3' style={{fontSize:'15px',color:'#696969'}}>Employees By Age</p>
        <div className='border-darkest border-2'></div>
        <VerticalBarChart graphData={employeesBarData} graphLabels={barLables}/>
        </Card>
        
        </Col>

      </Row>
      
          <Row className='row-styling'>

        <Col sm={12} lg={5} className='p-0 mb-3'>
          <Card className='p-2' style={{borderRadius:'15px'}}>
            <p className='border-bottom mt-0 mb-2' style={{fontSize:'15px',color:'#696969'}}>Active Groups</p>
            <div className='border-darkest border-2' ></div>
            <div className='d-flex justify-content-between mb-3' style={{gap:'2px'}}>            <button className='w-5' onClick={prevHandler} style={{backgroundColor:'white',border:'none',color:'#d0d1d0',fontSize:'20px'}}>
              <FaChevronLeft/>
              </button>
              <Carousel activeIndex={index} className='w-90 p-2'>
                <Carousel.Item>
              <div className='d-flex'>
                <div className='custom-border-right'>
                  <p className='mb-1' style={{fontSize:'18px',color:'#ff7700',textAlign:'center'}}>Morning Yoga</p>
                  <div>
                <p className='mb-0' style={{fontSize:'12px',textAlign:'center',color:'#7e7e7f'}}>Created On</p>
                <p className='mb-20' style={{fontSize:'12px',textAlign:'center',color:'#7e7e7f'}}>{`1/1/24`}</p>
                </div>
                  <Col className='d-flex justify-content-center align-self-center'>
                  <Image src="/images/pexels-danxavier-1239291.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'3'}}/>
                  <Image src="/images/pexels-simon-robben-55958-614810.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'2',transform:'translateX(-12px) translateY(2px)'}}/>
                  <Image src="/images/pexels-soldiervip-1468379.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'1',transform:'translateX(-18px)'}}/>
                  <p style={{color:'#0062e5',fontSize:'10px',fontWeight:'bolder',transform:'translateX(-13px) translateY(10px)'}}>{`+ 20 Members`}</p>
              </Col>
              <Button style={{backgroundColor:'#8de5fe',border:'none',borderRadius:'13px',color:'#187996',padding:'8px 30px',marginBottom:'5px',alignSelf:'center',fontSize:'12px',fontWeight:'bold'}}>
                View Details
              </Button>
              </div>
              <div>
                <p className='mb-1' style={{fontSize:'18px',color:'#fe0081',textAlign:'center'}}>Evening Yoga</p>
                 <div>
                <p className='mb-0' style={{fontSize:'12px',textAlign:'center',color:'#7e7e7f'}}>Created On</p>
                <p  className='mb-20' style={{fontSize:'12px',textAlign:'center',color:'#7e7e7f'}}>{`1/1/24`}</p>
                </div>
                  <Col className='d-flex align-self-center img-style'>
                  <Image src="/images/pexels-danxavier-1239291.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'3'}}/>
                  <Image src="/images/pexels-simon-robben-55958-614810.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'2',transform:'translateX(-12px) translateY(2px)'}}/>
                  <Image src="/images/pexels-soldiervip-1468379.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'1',transform:'translateX(-18px)'}}/>
                  <p style={{color:'#0062e5',fontSize:'10px',fontWeight:'bolder',transform:'translateX(-13px) translateY(10px)'}}>{`+ 4 Members`}</p>
              </Col>
              <Button style={{backgroundColor:'#8de5fe',border:'none',borderRadius:'13px',color:'#187996',padding:'8px 30px',marginBottom:'5px',alignSelf:'center',fontSize:'12px',translate:'18px',fontWeight:'bold'}}>
                View Details
              </Button>
              </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className='d-flex'>
                <div className='custom-border-right'>
                  <p className='mb-1' style={{fontSize:'18px',color:'#ff7700',textAlign:'center'}}>Morning Yoga</p>
                  <div>
                <p className='mb-0' style={{fontSize:'12px',textAlign:'center',color:'#7e7e7f'}}>Created On</p>
                <p className='mb-20' style={{fontSize:'12px',textAlign:'center',color:'#7e7e7f'}}>{`1/1/24`}</p>
                </div>
                  <Col className='d-flex justify-content-center align-self-center'>
                  <Image src="/images/pexels-danxavier-1239291.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'3'}}/>
                  <Image src="/images/pexels-simon-robben-55958-614810.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'2',transform:'translateX(-12px) translateY(2px)'}}/>
                  <Image src="/images/pexels-soldiervip-1468379.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'1',transform:'translateX(-18px)'}}/>
                  <p style={{color:'#0062e5',fontSize:'10px',fontWeight:'bolder',transform:'translateX(-13px) translateY(10px)'}}>{`+ 20 Members`}</p>
              </Col>
              <Button style={{backgroundColor:'#8de5fe',border:'none',borderRadius:'13px',color:'#187996',padding:'8px 30px',marginBottom:'5px',alignSelf:'center',fontSize:'12px',fontWeight:'bold'}}>
                View Details
              </Button>
              </div>
              <div>
                  <p className='mb-1' style={{fontSize:'18px',color:'#fe0081',textAlign:'center'}}>Evening Yoga</p>
                  <div>
                <p className='mb-0' style={{fontSize:'12px',textAlign:'center',color:'#7e7e7f'}}>Created On</p>
                <p  className='mb-20' style={{fontSize:'12px',textAlign:'center',color:'#7e7e7f'}}>{`1/1/24`}</p>
                </div>
                  <Col className='d-flex align-self-center img-style'>
                  <Image src="/images/pexels-danxavier-1239291.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'3'}}/>
                  <Image src="/images/pexels-simon-robben-55958-614810.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'2',transform:'translateX(-12px) translateY(2px)'}}/>
                  <Image src="/images/pexels-soldiervip-1468379.jpg" roundedCircle style={{width:'30px',height:'30px',marginBottom:'20px',zIndex:'1',transform:'translateX(-18px)'}}/>
                  <p style={{color:'#0062e5',fontSize:'10px',fontWeight:'bolder',transform:'translateX(-13px) translateY(10px)'}}>{`+ 4 Members`}</p>
              </Col>
              <Button style={{backgroundColor:'#8de5fe',border:'none',borderRadius:'13px',color:'#187996',padding:'8px 30px',marginBottom:'5px',alignSelf:'center',fontSize:'12px',translate:'18px',fontWeight:'bold'}}>
                View Details
              </Button>
              </div>
              </div>
            </Carousel.Item>
          </Carousel>
          <button className='w-5' onClick={nextHandler} style={{backgroundColor:'white',border:'none',color:'#d0d1d0',fontSize:'20px'}}>
              <FaChevronRight/>
              </button>
          </div>
          </Card>
        </Col>

        <Col className='mb-3' sm={12} lg={4}>
        <Card className='p-2 w-100 h-100' style={{borderRadius:'15px',maxHeight:'255px'}}>
        <p className='border-bottom mt-0 mb-2' style={{fontSize:'15px',color:'#696969'}}>Recommendations</p>
        <div className='border-darkest border-2' ></div>
        <div className="d-flex flex-column p-2" style={{overflowY:'scroll',gap:'10px 0px'}}>
          <Card style={{borderRadius:'5px'}}>
             <div className='d-flex p-1' style={{borderRadius:'15px',backgroundColor:'white',gap:'40px'}}>
              <div style={{width:'10%'}}>
                <Image src="/images/pexels-danxavier-1239291.jpg" roundedCircle style={{width:'50px',height:'50px'}}/>
              </div>              <div className='d-flex flex-column'>
              <p className="border-bottom border-lighter" style={{fontSize:'15px',color:'#696969'}}>Give workers more control over how they do there work</p>
              <p style={{fontSize:'12px',color:'#696969'}}>Research indiciates that having little description over {" "} 
                  <span>
                    <button className='border-0 bg-white' style={{color:'#71c3f9'}}>Read More</button>
                  </span>
                </p>
              </div>
             </div>
          </Card>
          <Card style={{borderRadius:'5px'}}>
             <div className='d-flex p-1' style={{borderRadius:'15px',backgroundColor:'white',gap:'40px'}}>
              <div style={{width:'10%'}}>
                <Image src="/images/pexels-danxavier-1239291.jpg" roundedCircle style={{width:'50px',height:'50px'}}/>
              </div>              <div className='d-flex flex-column'>
              <p className="border-bottom border-lighter" style={{fontSize:'15px',color:'#696969'}}>Give workers more control over how they do there work</p>
              <p style={{fontSize:'12px',color:'#696969'}}>Research indiciates that having little description over {" "} 
                  <span>
                    <button className='border-0 bg-white' style={{color:'#71c3f9'}}>Read More</button>
                  </span>
                </p>
              </div>
             </div>
          </Card>
          <Card style={{borderRadius:'5px'}}>
             <div className='d-flex p-1' style={{borderRadius:'15px',backgroundColor:'white',gap:'40px'}}>
              <div style={{width:'10%'}}>
                <Image src="/images/pexels-danxavier-1239291.jpg" roundedCircle style={{width:'50px',height:'50px'}}/>
              </div>
             <div className='d-flex flex-column'>
              <p className="border-bottom border-lighter" style={{fontSize:'15px',color:'#696969'}}>Give workers more control over how they do there work</p>
              <p style={{fontSize:'12px',color:'#696969'}}>Research indiciates that having little description over {" "} 
                  <span>
                    <button className='border-0 bg-white' style={{color:'#71c3f9'}}>Read More</button>
                  </span>
                </p>
              </div>
             </div>
          </Card>
          <Card style={{borderRadius:'5px'}}>
             <div className='d-flex p-1' style={{borderRadius:'15px',backgroundColor:'white',gap:'40px'}}>
              <div style={{width:'10%'}}>
                <Image src="/images/pexels-danxavier-1239291.jpg" roundedCircle style={{width:'50px',height:'50px'}}/>
              </div>              <div className='d-flex flex-column'>
              <p className="border-bottom border-lighter" style={{fontSize:'15px',color:'#696969'}}>Give workers more control over how they do there work</p>
              <p style={{fontSize:'12px',color:'#696969'}}>Research indiciates that having little description over {" "} 
                  <span>
                    <button className='border-0 bg-white' style={{color:'#71c3f9'}}>Read More</button>
                  </span>
                </p>
              </div>
             </div>
          </Card>
             </div>
          </Card>
            </Col>
            <Col sm={12} lg={3} className='p-0'>
            <Card className='p-2 w-100 h-100' style={{borderRadius:'15px',maxHeight:'255px',backgroundColor:'#fef1ab'}}>
            <p className='mb-3' style={{fontSize:'16px',color:'#616061'}}>Upcoming Events</p>
            <div className="d-flex flex-column p-2" style={{borderRadius:'15px',backgroundColor:'white'}}>
            <p className='text-primary mb-1' style={{fontSize:'20px',color:'#20aaf2'}}>Total Body Check-up</p>
            <p className='mb-1' style={{fontSize:'14px',color:'#6a6b6b'}}>Conducted by: Jupiter Hospital</p>
            <div className='d-flex flex-column'>
            <p className='mb-0' style={{fontSize:'14px',color:'#6a6b6b'}}>Date & Time: 12th Jan 2023</p>
            <p className='mb-1' style={{fontSize:'14px',color:'#6a6b6b',textAlign:'center',transform:'translateX(30px)'}}>9:00am to 5:00pm</p>
        </div>
        
            
            <p  style={{fontSize:'14px',color:'#6a6b6b'}}>Total Registrations: 12</p>
            </div>
        </Card>
        </Col>
      </Row>
   </Container>
  )
}
export default Dashboard