import React from 'react';

const DrinkCard = (props) =>{
  
    return(
    <>
        <div className="card-cont">
            <div className="card">
                <img src={props.image}  alt="poster" className="img" />
                <div className="card-info">
                    <h3 className="title">{props.text}</h3>
                    <h2 className="drinkId">ID : {props.id}</h2>
                </div>
            </div>
        </div>
    </>    
    
    );
};

export default DrinkCard;