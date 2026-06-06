const menuItems = [
  {
    restaurantName: "Panda Express",
    items: [
      { name: "Orange Chicken Bowl", description: "Orange chicken with chow mein or rice.", price: 9.99, category: "Bowl" },
      { name: "Beijing Beef Plate", description: "Crispy beef with peppers and onions.", price: 10.99, category: "Plate" },
      { name: "Chow Mein", description: "Stir-fried noodles with vegetables.", price: 4.99, category: "Side" },
    ],
  },
  {
    restaurantName: "Subway",
    items: [
      { name: "Turkey Sandwich", description: "Turkey sub with fresh vegetables.", price: 8.99, category: "Sandwich" },
      { name: "Italian B.M.T.", description: "Salami, pepperoni, and ham sandwich.", price: 9.49, category: "Sandwich" },
      { name: "Chocolate Chip Cookie", description: "Fresh baked cookie.", price: 1.49, category: "Dessert" },
    ],
  },
  {
    restaurantName: "Blaze Pizza",
    items: [
      { name: "Build Your Own Pizza", description: "Custom pizza with your choice of toppings.", price: 11.99, category: "Pizza" },
      { name: "Pepperoni Pizza", description: "Classic pepperoni pizza.", price: 10.99, category: "Pizza" },
      { name: "Cheesy Bread", description: "Warm bread with melted cheese.", price: 5.99, category: "Side" },
    ],
  },
  {
    restaurantName: "Chick-fil-A",
    items: [
      { name: "Chicken Sandwich", description: "Classic chicken sandwich with pickles.", price: 6.99, category: "Entree" },
      { name: "Nuggets", description: "Bite-sized chicken nuggets.", price: 5.99, category: "Entree" },
      { name: "Waffle Fries", description: "Crispy waffle fries.", price: 3.49, category: "Side" },
    ],
  },
  {
    restaurantName: "Mendocino Farms",
    items: [
      { name: "Not So Fried Chicken Sandwich", description: "Chicken sandwich with fresh toppings.", price: 13.99, category: "Sandwich" },
      { name: "Avocado Quinoa Salad", description: "Fresh salad with quinoa and avocado.", price: 12.99, category: "Salad" },
      { name: "Lemonade", description: "Fresh lemonade.", price: 3.49, category: "Drink" },
    ],
  },
  {
    restaurantName: "Karē Japanese Curry",
    items: [
        {
        name: "Chicken Katsu Curry",
        description: "Japanese curry rice topped with crispy chicken katsu.",
        price: 13.99,
        category: "Curry",
        },
        {
        name: "Beef Curry",
        description: "Savory Japanese curry with beef and rice.",
        price: 12.99,
        category: "Curry",
        },
        {
        name: "Vegetable Curry",
        description: "Japanese curry with mixed vegetables and rice.",
        price: 11.99,
        category: "Curry",
        },
    ],
  },
];

module.exports = menuItems;