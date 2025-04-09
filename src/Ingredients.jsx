import {useState} from 'react'
import './assets/Ingredients.css'
import IngredientsList from './IngredientsList';
import Nombot from './Nombot';
import getData from './utils/hugginFaceAI';


function Ingredients() {
    const [ingredientsList, setIngredientsList] = useState(['Chicken', 'Milk', 'Cream', 'Most of the main spices']);
    const [recipeShown, setRecipeShown] = useState('true');

    async function testing() {
        const data = await getData(ingredientsList); // Only works in an async context
        console.log(data);
    }

    testing();
    const ingredientsListItems = ingredientsList.map((item) => {
        return (
            <li key={item}>{item}</li>
        )
    })

    function toggleRecipeShown() {
        setRecipeShown(prev => !prev);
    }

    function handleSubmit(formData) {
        const ingredient = formData.get('ingredient');
        if (!ingredientsList.includes(ingredient)) {
            setIngredientsList([...ingredientsList, ingredient]);
            console.log(`Ingredient '${ingredient}' was added to the list!`);
            console.log(`${ingredientsList}`);
        }
    }

    return (
        <>
            <main className='mainContainer'>
                <form action={handleSubmit} className='userInput'>
                    <input type="text" name="ingredient" id="searchIngredients" placeholder='E.g oregano'/>
                    <input type="submit" value="+ Add Ingredient" id="addIngredients"/>
                </form>
                
                {ingredientsList.length > 0 ? <div className="ingredientsList">
                    <h2>Ingredients on hand:</h2>
                    <IngredientsList list={ingredientsListItems}/>
                </div> : null}

                {ingredientsList.length > 3 && recipeShown ? <div className="submitContainer">
                    <div className="description">
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>

                    <input type="button" value="Get Recipe" id="getRecipe" onClick={toggleRecipeShown}/>                    
                </div> : 0}

                {!recipeShown ? <Nombot/> : "Not working"}
            </main>
        </>
    )
}

export default Ingredients