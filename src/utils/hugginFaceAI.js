import { HfInference } from '@huggingface/inference';

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Response must be in JSON format: E.g: {"recipe-name": "lasagna", "ingredients": ["1kg of chicken breast", "1 tablespoon of salt", "etc"], "instructions": ["1. this", "2. that", "etc"]
}`;

const test = import.meta.env.VITE_hfAPI;
const hf = new HfInference(test);

export default async function getData(ingredients) {
    const result = await getRecipeFromMistral(ingredients);
    return result;
  }

async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
      ],
      max_tokens: 1024,
    });
    return response.choices[0].message.content;
  } catch (err) {
    console.error("Error fetching recipe:", err.message);
    return "Sorry, something went wrong while generating the recipe.";
  }
}
