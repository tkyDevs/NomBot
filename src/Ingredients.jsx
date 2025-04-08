import {useState} from 'react'
import './assets/Ingredients.css'

function Ingredients() {
    const [ingredientsList, setIngredientsList] = useState(['Chicken', 'Milk', 'Cream', 'Most of the main spices']);
    const [recipeShown, setRecipeShown] = useState('true');

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

                    <ul>
                        {ingredientsListItems}
                    </ul>
                </div> : null}

                {ingredientsList.length > 3 && recipeShown ? <div className="submitContainer">
                    <div className="description">
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>

                    <input type="button" value="Get Recipe" id="getRecipe" onClick={toggleRecipeShown}/>                    
                </div> : 0}

                {!recipeShown ? <div className="recipe">
                    <section>
                        <h2>Chef Claude Recommends:</h2>
                        <article className="suggested-recipe-container" aria-live="polite">
                            <h3>Beef Bolognese Pasta</h3>
                            <strong>Ingredients:</strong>
                            <ul>
                                <li>1 lb. ground beef</li>
                                <li>1 onion, diced</li>
                                <li>3 cloves garlic, minced</li>
                                <li>2 tablespoons tomato paste</li>
                                <li>1 (28 oz) can crushed tomatoes</li>
                                <li>1 cup beef broth</li>
                                <li>1 teaspoon dried oregano</li>
                                <li>1 teaspoon dried basil</li>
                                <li>Salt and pepper to taste</li>
                                <li>8 oz pasta of your choice (e.g., spaghetti, penne, or linguine)</li>
                            </ul>
                            <strong>Instructions:</strong>
                            <ol>
                                <li>Bring a large pot of salted water to a boil for the pasta.</li>
                                <li>In a large skillet or Dutch oven, cook the ground beef over medium-high heat, breaking it up with a wooden spoon, until browned and cooked through, about 5-7 minutes.</li>
                                <li>Add the diced onion and minced garlic to the skillet and cook for 2-3 minutes, until the onion is translucent.</li>
                                <li>Stir in the tomato paste and cook for 1 minute.</li>
                                <li>Add the crushed tomatoes, beef broth, oregano, and basil. Season with salt and pepper to taste.</li>
                                <li>Reduce the heat to low and let the sauce simmer for 15-20 minutes, stirring occasionally, to allow the flavors to meld.</li>
                                <li>While the sauce is simmering, cook the pasta according to the package instructions. Drain the pasta and return it to the pot.</li>
                                <li>Add the Bolognese sauce to the cooked pasta and toss to combine.</li>
                                <li>Serve hot, garnished with additional fresh basil or grated Parmesan cheese if desired.</li>
                            </ol>
                        </article>
                    </section>
                </div> : null}
            </main>
        </>
    )
}

export default Ingredients