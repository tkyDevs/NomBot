import { isValidElement } from "react";

function IngredientsList(props) {
    return (
        <ul>
            {props.list.map((item, index) =>
                isValidElement(item) ? item : <li key={index}>{item}</li>
            )}
        </ul>
    );
}


export default IngredientsList