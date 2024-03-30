const baseUrl = "https://api.sampleapis.com/coffee";
let icedOrHot = "hot";


// Fetch coffee data from API based on type (hot or iced)
 async function getCoffees(url, type){
    try {
        const response = await fetch(`${url}/${type}`);
        const json = await response.json();
    
        //Store data in cards variable to display
        let cards = document.getElementById("main");

        // Clear existing cards before adding new ones
        cards.innerHTML = ''; 
            
        for(let i=0; i<json.length; i++) {

            // Create a container for each coffee item
            const card = document.createElement("div");
            card.classList.add("card")

            // Create an image and add it to the container
            const image = document.createElement("img");
            image.src = json[i].image;
            image.classList.add("image");
            card.appendChild(image);

            //Create a text container 
            const textContainer = document.createElement("div");
            textContainer.classList.add("text_container");

            // Create a name and add it to the text container
            const name = document.createElement("h4");
            name.innerText = json[i].title;
            name.classList.add("name");
            textContainer.appendChild(name)

            // Create a description and add it to the text container
            const description = document.createElement("p");
            description.innerText = json[i].description;
            description.classList.add("description");
            textContainer.appendChild(description);

            // Create a container for ingredients 
            const ingredients = document.createElement("div");
            ingredients.classList.add("ingredients");

            // Create an ingredient header and add it to the text container
            const ingredientHeader = document.createElement("h4");
            ingredientHeader.innerHTML = "Ingredients:";
            ingredientHeader.classList.add("ingredient_header");
            textContainer.appendChild(ingredientHeader);

            // Loop through each ingredient and add it to the ingredients container
            for(let j=0; j<json[i].ingredients.length; j++) {
                const item = document.createElement("p");
                item.innerText = json[i].ingredients[j];
                item.classList.add("ingredient");
                ingredients.appendChild(item);
              }
              //Add ingredients container to the text container
              textContainer.appendChild(ingredients);
              // Add text container to the card container
              card.appendChild(textContainer);
              // Add the card container to the main container
              cards.appendChild(card);
        }
    }

    catch (error) {
        console.error('Error fetching coffee data:', error);
    }
}

    // Call the function on page load
    getCoffees(baseUrl, icedOrHot)