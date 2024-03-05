import React, {useEffect, useRef, useState, useContext} from 'react'
import {checkStatus} from '../libs/jsonparser'
import {ArrowDownward, ArrowUpward, Lock } from '@mui/icons-material';
import "../styles/SpeciesContainer.css"
import UserContext from '../contexts/UserContext';


// Shamelessly copied from stack overflow. 
var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export default function SpeciesContainer(props) {
  const {state} = useContext(UserContext); 
  const title = useRef(props.frequency === 'most' ? 'Most Common Species' : 'Rarest Species'); 
  const nums = useRef([1, 2, 3, 4, 5]); 
  const [lat, setLat] = useState(props.lat)
  const [lng, setLng] = useState(props.lng); 
  const [showList, setShowList] = useState(true); 
  const birds = useRef([]);
  const [selectedBird, setSelectedBird] = useState({
    specCode: '',
    comName: '',
    total: 0
  })

  const birdInfo = useRef({
    sciName: '',
    familyComName: '', 
    famSciName: '', 
    orderName: ''
  })
  
  // Listen... I couldn't get a good explanation on how to do simple group bys 
  // and data queries in javascript, so doing it the old fashioned way. 
  const processNearbySightings = array => {
    let speciesSightings = [] 
    const bySpecies = groupBy(array, 'speciesCode'); 
    for(let spec in bySpecies) {
      const species = bySpecies[spec];

      let speciesInfo = {
        specCode: spec,
        comName: bySpecies[spec][0].comName,
        total: 0
      }
      let count = 0
      for(let sight in species){
        const sighting = species[sight]; 
        speciesInfo.total += sighting.howMany; 
      }
      speciesSightings.push(speciesInfo); 
    }
    return speciesSightings;
  }

  const getTopBottom5 = (array, freq) => {
    let sorted = array.sort((a, b) => a.total - b.total); 
    if(freq === 'most') {
      sorted = sorted.reverse(); 
    }

    return sorted.slice(0, 5); 
  }

  useEffect(() => {
    const fetchSpecies = async () => {
      const latitude = props.mapState.latitude; 
      const longitude = props.mapState.longitude; 

      const response = await fetch(`http://localhost:3001/birds/nearby/${latitude}/${longitude}`)
        .then(checkStatus)
        .then(res => res.json())
        .then(arr => processNearbySightings(arr))
        .then((species) => getTopBottom5(species, props.frequency)); 
    
      birds.current = response;
    }

    fetchSpecies(); 
  }, [props.mapState]); 

  const processInfo = (data) => {
    const info = data[0]; 

    const newBirdInfo = {
      sciName: info.sciName,
      familyComName: info.familyComName,
      famSciName: info.familySciName, 
      orderName: info.order
    }

    return newBirdInfo;
  }

  useEffect(() => {
    const fetchInfo = async () => {
      if(selectedBird.specCode === ''){
        return
      }
      const response = await fetch(`http://localhost:3001/birds/info/${selectedBird.specCode}`)
        .then(checkStatus)
        .then(res => res.json())
        .then(data => processInfo(data))
        .catch(error => console.log(error)); 

      birdInfo.current = response; 
    }

    fetchInfo();
  }, [selectedBird]); 

  const arrowDownClicked = (bird) => {
    setShowList(false); 
    setSelectedBird(bird); 
  }

  const arrowUpClicked = () => setShowList(true); 

  if(!state.isAuthenticated){
    return (
      <div className='wrapper' style={{ marginTop:props.margin }}>
        <div className='title'>
          <div>
            <h3>{title.current}</h3>
          </div>
        </div>
        <div style={{height: "84%", overflowY: 'hidden', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Lock style={{fontSize:"80px"}}/>
        </div>
      </div>
    )
  }
  
  if(showList) {
    return (
      <div className='wrapper' style={{ marginTop:props.margin }}>
        <div className='title'>
          <div>
            <h3>{title.current}</h3>
          </div>
        </div>
        <div className='list' style={{height: "84%"}}>
        {birds.current.map((b, i) => 
          <div key={i} >
            <h4>{b.comName} <ArrowUpward onClick={() => arrowDownClicked(b)} /></h4>
          </div>
        )}
        </div>
      </div>
    ); 
  } else {
    return (
      <div className='wrapper' style={{ marginTop:props.margin }}>
        <div className='title'>
          <div>
          <h3>{selectedBird.comName} <ArrowDownward onClick={() => arrowUpClicked()}/></h3>
          </div>
        </div>
        <div className='info'>
          <p>Scientific Name: {birdInfo.current.sciName}</p>
          <p>Family: {birdInfo.current.familyComName}</p>
          <p>Family Scientific Name: {birdInfo.current.famSciName}</p>
          <p>Order: {birdInfo.current.orderName}</p>
        </div>
      </div>
    )
  }
}