// *************Business Logic **********

function Recipe (title, image, link, ingredients, restrictions) {
  this.title = title;
  this.image = image;
  this.link = link;
  this.ingredients = ingredients;
  this.dietaryRestrictions = restrictions; // GF, DF, VEG
}

function User() {
  this.ingredients = [];
  this.dietaryRestrictions = [];
  this.recipeMatches = [];
}

function CookBook () {
  this.recipes = [];
}

CookBook.prototype.addRecipe = function(recipe) {
  this.recipes.push(recipe);
}

CookBook.prototype.isAcceptableRecipe = function(recipe, userDietaryRestrictions) {
  return userDietaryRestrictions.every(function(userRestriction) {
    return recipe.dietaryRestrictions.includes(userRestriction);
  });
}

CookBook.prototype.getRecipesByRestriction = function (userDietaryRestrictions) {
  if (userDietaryRestrictions.length === 0) {
    return this.recipes;
  }
  acceptableRecipes = [];
  this.recipes.forEach(function(recipe) {
    if (this.isAcceptableRecipe(recipe, userDietaryRestrictions)) {
      acceptableRecipes.push(recipe);
    }
  }, this);
  return acceptableRecipes;
};

CookBook.prototype.matches = function(ingredients, recipes) {
  let matchedRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    let recipe = recipes[i];
    let recipeIngredients = recipes[i].ingredients;
    //Return all recipes that match ingredients
    ingredients.forEach(function(ingredient){
      if (recipeIngredients.includes(ingredient) && !matchedRecipes.includes(recipe)){
        matchedRecipes.push(recipe);
      }
    });
  }
  return matchedRecipes.map(function(matchedRecipe){
    return [matchedRecipe];
  });
};

CookBook.prototype.getRecipesByIngredient = function(ingredients, recipes) {
  let matchedRecipes = this.matches(ingredients, recipes);
  for(var i = 0; i < matchedRecipes.length; i++){
    ingredients.forEach(function(ingredient){
      if (matchedRecipes[i][0].ingredients.includes(ingredient)) {
        matchedRecipes[i].push(ingredient);
      }
    });
  };
  return matchedRecipes.sort(function(a, b){
    return b.length - a.length;
  });
};

CookBook.prototype.getAllAcceptableRecipes = function (ingredients, userDietaryRestrictions) {
  return this.getRecipesByIngredient(ingredients, this.getRecipesByRestriction(userDietaryRestrictions));
};

let masterCookBook = new CookBook();

const chickenPotPie = new Recipe (
  "Chicken Pot Pie",
  "img/chickenPotPie.jpg",
  "http://www.tasteofhome.com/recipes/favorite-chicken-potpie",
  ["potato", "carrot", "onion", "peas", "corn", "chicken"],
  []
);

const roastChickenAspargus = new Recipe (
  "Roast Chicken With Rhubarb Butter And Asparagus",
  "img/roastChickenAsparagus.jpg",
  "http://www.bonappetit.com/recipe/roast-chicken-with-rhubarb-butter-and-asparagus",
  ["rhubarb", "chicken", "asparagus", "lemon"],
  ["GF"]
);

const beefStuffedEggplant = new Recipe (
  "Stuffed Baby Eggplant with Spiced Ground Beef, Bulgar, and Pine Nuts",
  "img/beefStuffedEggplant.jpg",
  "https://www.themediterraneandish.com/stuffed-eggplant-with-spiced-ground-beef-and-bulgur/",
  ["eggplant", "onion", "garlic", "beef", "bulgar", "lemon"],
  []
);

const tofuAsparagusQuiche = new Recipe (
  "Tofu Quiche with Leeks and Asparagus",
  "img/tofuAsparagusQuiche.jpg",
  "http://www.recipelink.com/cookbooks/2005/1580086187_2.html",
  ["tofu", "asparagus", "garlic", "leek"],
  ["VEG", "DF"]
);

const easyVeganFriedRice = new Recipe (
  "Easy Vegan Fried Rice",
  "img/easyVeganFriedRice.jpg",
  "http://minimalistbaker.com/easy-vegan-fried-rice/",
  ["tofu", "rice", "garlic", "green onion", "peas", "carrots"],
  ["VEG", "DF", "GF"]
);

const onePotPasta = new Recipe (
  "Sanity-Saving One Pot Pasta",
  "img/onePotPasta.jpg",
  "https://www.mynewroots.org/site/2016/05/sanity-saving-one-pot-pasta/",
  ["pasta", "asparagus", "peas", "lemon"],
  ["VEG", "DF"]
);

const beefStew = new Recipe (
  "Beef Stew with Carrots and Potatoes",
  "img/beefStew.jpg",
  "http://www.onceuponachef.com/recipes/beef-stew-with-carrots-potatoes.html",
  ["beef", "onion", "garlic", "carrot", "potato"],
  ["DF"]
);

const blackBeanEnchilada = new Recipe (
  "Veggie Black Bean Enchiladas",
  "img/blackBeanEnchilada.jpg",
  "http://cookieandkate.com/2016/vegetarian-enchiladas-recipe/",
  ["onion", "pepper", "broccoli", "spinach"],
  ["VEG"]
);

const sobaNoodleChicken = new Recipe (
  "Soba Noodle Chicken Stir Fry",
  "img/sobaNoodleChicken.jpg",
  "http://www.cookforyourlife.org/recipes/soba-noodle-chicken-stir-fry/",
  ["pasta", "chicken", "carrot", "onion", "pepper", "cabbage"],
  ["DF"]
);

const beefAndNoodles = new Recipe (
  "Beef and Noodles",
  "img/beefandnoodles.jpg",
  "http://www.gonnawantseconds.com/2017/03/beef-and-noodles/",
  ["beef", "onion", "garlic", "pasta"],
  ["DF"]
);

const tofuWildRiceSoup = new Recipe (
  "Rustic Tofu Wild Rice Soup",
  "img/tofu-wild-rice-soup.jpg",
  "http://heartbeetkitchen.com/2017/recipes/rustic-tofu-wild-rice-soup/",
  ["tofu", "celery", "onion", "carrot", "mushroom", "rice"],
  ["VEG", "GF"]
);

const tofuAsparagus = new Recipe (
  "Chili-Glazed tofu over Asparagus and Rice",
  "img/tofu-asparagus.jpg",
  "http://www.myrecipes.com/recipe/chili-glazed-tofu-over-asparagus-rice",
  ["tofu", "asparagus", "onion", "carrot", "rice"],
  ["VEG", "DF"]
);

const tikkaMasala = new Recipe (
  "Chicken Tikka Masala",
  "img/tikka-masala.jpg",
  "http://www.savorytooth.com/instant-pot-chicken-tikka-masala/",
  ["chicken", "rice", "garlic"],
  ["GF"]
);

const mapoTofu = new Recipe (
  "Mapo Tofu",
  "img/Mapo-tofu.jpg",
  "https://redhousespice.com/mapo-tofu-authentic-way/",
  ["beef", "tofu", "rice", "onion"],
  ["DF"]
);

const sheetChicken = new Recipe (
  "Lemony Herb Sheet Pan Chicken & Vegetables",
  "img/sheet-pan.jpg",
  "http://delightfulmomfood.com/sheet-pan-chicken-vegetables/",
  ["chicken", "carrot", "broccoli", "potato", "cauliflower", "garlic"],
  ["DF", "GF"]
);

const beefAndBroccoli = new Recipe (
  "Beef and Broccoli",
  "img/beef-broccoli.jpg",
  "http://www.food.com/recipe/the-best-easy-beef-and-broccoli-stir-fry-99476",
  ["beef", "onion", "rice", "broccoli"],
  ["DF", "GF"]
);

const macAndCheese = new Recipe (
  "Mac and Cheese From Scratch",
  "img/mac.jpg",
  "http://www.myrecipes.com/recipe/classic-baked-macaroni-cheese",
  ["pasta"],
  ["VEG"]
);

const loadedPotato = new Recipe (
  "Loaded Chili-Stuffed Baked Potatoes",
  "img/Loaded-Potato.jpg",
  "http://wickedhealthyfood.com/2017/02/07/loaded-chili-stuffed-baked-potatoes/",
  ["potato", "onion", "cabbage", "kale"],
  ["VEG", "GF"]
);

const fishTacos = new Recipe (
  "Fish Tacos with Mango Salsa and Avocado Crema",
  "img/fishTacos.jpg",
  "http://www.annies-eats.com/2015/04/24/fish-tacos-with-mango-salsa-and-avocado-cream-sauce/",
  ["pepper", "onion", "fish", "avocado", "garlic"],
  ["GF"]
);

const roastedSalmon = new Recipe (
  "Salmon Roasted in Butter",
  "img/roastedSalmon.jpg",
  "https://cooking.nytimes.com/recipes/5703-salmon-roasted-in-butter",
  ["fish"],
  ["GF","DF"]
);

const tofuSaladRolls = new Recipe (
  "Vietnamese Spring Rolls with Crispy Tofu",
  "img/tofuSaladRolls.jpg",
  "http://minimalistbaker.com/vietnamese-spring-rolls-with-crispy-tofu/",
  ["tofu","carrot","pepper","cucumber","pasta","garlic"],
  ["GF","DF","VEG"]
);

//Array of all recipes
let allRecipes = [chickenPotPie, roastChickenAspargus, beefStuffedEggplant, tofuAsparagusQuiche, easyVeganFriedRice, onePotPasta, beefStew, blackBeanEnchilada, sobaNoodleChicken, beefAndNoodles, tofuWildRiceSoup, tofuAsparagus, tikkaMasala, mapoTofu, sheetChicken, beefAndBroccoli, macAndCheese, loadedPotato, fishTacos, roastedSalmon, tofuSaladRolls];

allRecipes.forEach(function(recipe) {
  masterCookBook.addRecipe(recipe);
});

// *************User Logic **********

$(function(){
  var newUser = new User();

  var getIt = function(){
    newUser.recipeMatches = (masterCookBook.getAllAcceptableRecipes(newUser.ingredients, newUser.dietaryRestrictions));
    $("#recipe-results").empty();
    for(var i=0; i<newUser.recipeMatches.length; i++) {
      let recipeTitle = newUser.recipeMatches[i][0].title;
      let recipeLink = newUser.recipeMatches[i][0].link;
      let recipeImage = newUser.recipeMatches[i][0].image;
      $("ul#recipe-results").append(`<a class="recipeTitle" href="${recipeLink}" target="_blank">${recipeTitle} <br> <img class="recipeImage" src=${recipeImage}></a>`);
      for (var j=1; j<newUser.recipeMatches[i].length; j++){
        let matchedIngredients = newUser.recipeMatches[i][j];
        $("ul#recipe-results").append("<li> Includes: " + matchedIngredients + "</li>");
      }
      $("ul#recipe-results").append("<hr>");
    }
    if(newUser.recipeMatches.length ===0){
      $("#recipe-results").append(`<h3>Aww. Shucks. You didn't match any results.</h3> <img id="empty-image" src="img/empty.jpg">`);
    }
  }

  //Collect user input ingredients and push to newUser
  $('input[name="ingredients"]').on('click', function () {
    $(".results-column").show();
    $(".feature-recipe").hide();
    if ($(this).is(':checked')) {
      newUser.ingredients.push($(this).val());
    } else {
      if ((index =  newUser.ingredients.indexOf($(this).val())) !== -1) {
        newUser.ingredients.splice(index, 1);
      }
    }
    getIt();
  });

  //For collecting user input dietary restrictions and push to newUser.
  //Needs matches function to be created
  $('input[name="Dietary-Restrictions"]').on('click', function () {
    $(".results-column").show();
    $(".feature-recipe").hide();
    if ($(this).is(':checked')) {
      newUser.dietaryRestrictions.push($(this).val());
    } else {
      if ((index = newUser.dietaryRestrictions.indexOf($(this).val())) !== -1) {
        newUser.dietaryRestrictions.splice(index, 1);
      }
    }
    getIt();
  });
  $("#reset-button").click(function() {
    location.reload();
  });
});//ends doc ready
