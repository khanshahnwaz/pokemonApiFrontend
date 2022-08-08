import React,{useState} from 'react'
import Axios from 'axios'
const Main = () => {
  // variable to keep track of the entered value 
  const[pokemon,setPokemon]=useState('');
  // track if entered pokemon is found or not.In order to display the detail card
  const[pokemonFound,setPokemonFound]=useState(false)
  // setting fetched pokemon data to display in card
  const[pokemonData,setPokemonData]=useState({
    name:'',
    image:'',
    species:'',
    type:'',
    weight:''

  })
  // hook to set error message
  const[error,setError]=useState('')
  // function to handle onChange event 
  const handleChnage=(e)=>{
    // set error to null
    setError('')
    setPokemonFound(false)
    setPokemon(e);
    
  }
  // function to fetch data from the api 
  const fetchData=async()=>{
    // if empty form is submitted
    if(!pokemon){
      setError('Please enter a name.')
      return
    }
    // Get request to fetch the detail of the pokemon
    const response= await Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).catch(e=>{
      // if pokemon is not found
      setError('*Sorry! Requested pokemon details are not available.')
    })
    if(response){
      // if details fetched successfully.
      setPokemonFound(true);
      // set pokemon's desired data 
      setPokemonData({
        name:pokemon,
        image:response.data.sprites.front_default,
        species:response.data.species.name,
        type:response.data.types[0].type.name,
        
        weight:response.data.weight
      })
    }
  }
  return (
    <div className='relative top-[25%] '>
        <h1 className='text-4xl text-center font-bold trackiing-wideset'>Poke<span className='text-blue-500'>mon</span></h1>
        <p className='text-center text-lg tracking-tighter mb-5'>Let's know some details of our favourite pokemon. </p>
        <div>
        <input type='text' className='py-2 px-6 rounded-xl w-[30%] shadow-md' placeholder='Enter pokemon name' onChange={e=>{
          handleChnage(e.target.value)
        }}></input>
      
        <button className='bg-blue-500 text-white text-xl px-4 py-2 text-center rounded-2xl cursor-pointer hover:opacity-50' onClick={fetchData}>Go</button>
        {error?<div className='text-red-800 m-auto '><p className='text-center relative right-[5%]'>{error}</p></div>:null}</div>
        {pokemonFound?
        <div className='px-4 py-5 w-[20%] rounded-xl bg-white m-auto mt-5 shadow-xl'>
          <div className='bg-gray-400 rounded-xl '><img src={pokemonData.image} alt='Pokemon' className='h-32 m-auto'/></div>
          <div className='text-left'>
            <h1 className='text-3xl font-bold mb-2 text-blue-400'>Name:- {pokemonData.name}</h1>
            <p className='text-2xl  font-semibold'>Species:- {pokemonData.species}</p>
            <p className='text-2xl my-2 font-semibold'>Type:- {pokemonData.type}</p>
            
            <p className='text-2xl font-semibold'>Weight:- {pokemonData.weight}</p>



          </div>
        </div>:null}
    </div>
  );
}

export default Main;