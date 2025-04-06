

import MealItem from "./MealItem.jsx";
import useHttp from '../hooks/useHttp.js';
import Error from "./Error.jsx";

const requistConfig = {};

export default function Meals(){
    const {data, isLoading, error} = useHttp('http://localhost:3000/meals',requistConfig,[]);
    if(isLoading){
        return <p className="center">Loading meals...</p>
    }

    if(error){
        return <Error title='Sorry failed to load meals.' message={error}/>
    }

    return(
        <ul id='meals'>
            {data.map((meal)=>{
                return (
                <MealItem 
                    key={meal.id}
                    meal={meal}
                    />
                )
            })}
        </ul>
    )
}