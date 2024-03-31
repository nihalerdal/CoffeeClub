const baseUrl = "https://api.sampleapis.com/coffee";
let icedOrHot = "hot";


// Fetch coffee data from API based on type (hot or iced)
async function getCoffees(url, type) {
    try {
        const response = await fetch(`${url}/${type}`);
        const json = await response.json();

        //Store data in cards variable to display
        let cards = document.getElementById("main");

        // Clear existing cards before adding new ones
        cards.innerHTML = '';

        for (let i = 0; i < json.length; i++) {

            // Create a container for each coffee item
            const card = document.createElement("div");
            card.classList.add("card")

            // Create an image and add it to the container
            const image = document.createElement("img");
            image.src = json[i].image;
            image.classList.add("image");
            card.appendChild(image);

            // Create a name and add it to the container
            const name = document.createElement("h4");
            name.innerText = json[i].title;
            name.classList.add("name");
            card.appendChild(name)

            // Create a description and add it to the container
            const description = document.createElement("p");
            description.innerText = json[i].description;
            description.classList.add("description");
            card.appendChild(description);

            // Create a container for ingredients 
            const ingredients = document.createElement("div");
            ingredients.classList.add("ingredients");

            // Create an ingredient header and add it to the container
            const ingredientHeader = document.createElement("h4");
            ingredientHeader.innerHTML = "Ingredients:";
            ingredientHeader.classList.add("ingredient_header");
            card.appendChild(ingredientHeader);

            // Create an item for each ingredient and add it to the ingredients container
            const item = document.createElement("span");
            item.innerText = json[i].ingredients.join(", ");
            item.classList.add("ingredient");
            ingredients.appendChild(item);

            //Add ingredients container to the container
            card.appendChild(ingredients);
            // Add the container to the main container
            cards.appendChild(card);
            //call the function for default value("hot")
            activateButton()
        }
    }

    catch (error) {
        console.error('Error fetching coffee data:', error);
    }
}

// Call the function on page load
getCoffees(baseUrl, icedOrHot)

// Event listener for the buttons
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("buttonHot").addEventListener("click", function (event) {
        event.preventDefault();
        icedOrHot = "hot";
        getCoffees(baseUrl, icedOrHot);
        activateButton()
    });

    document.getElementById("buttonIced").addEventListener("click", function (event) {
        event.preventDefault();
        icedOrHot = "iced";
        getCoffees(baseUrl, icedOrHot);
        activateButton()
    });
});

// Activate button state based on selection
function activateButton() {
    if (icedOrHot === "hot") {
        document.getElementById("buttonHot").classList.add("active");
        document.getElementById("buttonIced").classList.remove("active");
    } else {
        document.getElementById("buttonHot").classList.remove("active");
        document.getElementById("buttonIced").classList.add("active");
    }
}
