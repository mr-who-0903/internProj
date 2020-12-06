import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DrinkCard from './DrinkCard';


const App = () =>{
    
    const [name, setName] = useState("");
    const [drinkArr, setDrinkArr] = useState([]);
    const [displayDrink, setDisplayDrink] = useState([]);
    const [inputChange, setInputChange] = useState("");
    
    
    const changeEvent = (event) =>{
        setName(event.target.value);
    };
    
    
    const onClickFunction = () =>{    // will run whenever button is clicked
        
        if(name == ""){
            alert("Input required !");
            return;
        }
        
        async function getData() {   
            const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`);  // raw data 
            if(res.data == ""){
                alert("Inredient not found !");
                return;
            }
                
            setDrinkArr(res.data.drinks); 
            setInputChange(name);
            
        }
        getData();
    };
 
    
    
    useEffect(() =>{         // will run whenever input is changed
       
        const alco = document.getElementById('select1').value;  // e.g. Alcoholic
        const catg = document.getElementById('select2').value;  // e.g. Ordinary_Drink
        
        async function getFiltered() {
            
            const resAlco = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alco}`);
            const resCatg = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${catg}`);
            
            const AlcoArr = resAlco.data.drinks; 
            const CatgArr = resCatg.data.drinks;
            
            const AlcoFiltered = drinkArr.filter(item1 => AlcoArr.some(item2 => item1.idDrink === item2.idDrink));
            setDisplayDrink(AlcoFiltered.filter(item1 => CatgArr.some(item2 => item1.idDrink === item2.idDrink)));
            
        }
        getFiltered();
           
    }, [inputChange]);
    
    
   const changeDropdownState = (event) =>{      // setInputChange whenever dropdown is changed
       setInputChange(event.target.value);
   }
   
    
   function renderMessage(){
       if(displayDrink.length == 0)
           return<h1 className="sorry">Sorry, no results found :(</h1>;
       
       return null;
   }
  
    
    return(
        
        <>
        <h1 className = "heading">Cocktails</h1>
        <div className = "main-div">
            <div className="search-box">
                <input 
                    className="search-txt" 
                    type="text" 
                    placeholder="type ingredient.." 
                    onChange={changeEvent} 
                    value={name} 
                />

                <a className="search-btn"  onClick={onClickFunction}>
                    <i className="fa fa-search"></i>
                </a>
                <br/>

            </div>
            <div className="selectDiv" onChange={changeDropdownState}>
                    <select id="select1">

                        <option value="Alcoholic">Alcoholic</option>
                        <option value="Non_Alcoholic">Non-Alcoholic</option>
                    </select>
                    <select id="select2" >

                        <option value="Cocktail">Cocktail</option>
                        <option value="Ordinary_Drink">Ordinary Drink</option>
                    </select>
                </div>

            <div className="cards">
                {renderMessage()}
                {   
                    displayDrink.map((itemVal, index) =>{

                    return(
                            <DrinkCard

                                text = {itemVal.strDrink}
                                id   = {itemVal.idDrink}
                                key  = {index}
                                image= {itemVal.strDrinkThumb} 

                            />
                    );
                    })
                }
            </div>
        </div>   
        
        </>
    );
};

export default App;