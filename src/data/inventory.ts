export type Category = "cold" | "pastry" | "kakanin";

export interface DessertItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  serving: string;
  image?: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  cold: "Cold Treats",
  pastry: "Pastries",
  kakanin: "Classic Kakanin",
};

export const INVENTORY: DessertItem[] = [
  {
    id: "halo-halo",
    name: "Halo-Halo",
    description: "Shaved ice with ube, leche flan, beans, and sweet fruits",
    price: 125,
    category: "cold",
    serving: "per serving",
    image: "https://graceland.ph/wp-content/uploads/2023/05/HALO-HALO-SUPREME.jpg",
  },
  {
    id: "leche-flan",
    name: "Leche Flan",
    description: "Creamy caramel custard",
    price: 95,
    category: "pastry",
    serving: "per slice",
    image: "https://salu-salo.com/wp-content/uploads/2014/09/Leche-Flan-with-Cream-Cheese-7.jpg",
  },
  {
    id: "ube-cake",
    name: "Ube Cake",
    description: "Purple yam chiffon with buttercream",
    price: 350,
    category: "pastry",
    serving: "whole",
    image: "https://newgenbaker.com/wp-content/uploads/2018/08/ube-flan.jpg",
  },
  {
    id: "buko-pandan",
    name: "Buko Pandan",
    description: "Young coconut and pandan jelly in cream",
    price: 110,
    category: "cold",
    serving: "per serving",
    image: "https://www.recipesbynora.com/wp-content/uploads/2022/03/buko-pandan-featured-image.jpg",
  },
  {
    id: "turon",
    name: "Turon",
    description: "Fried banana and jackfruit spring rolls",
    price: 45,
    category: "pastry",
    serving: "per piece",
    image: "https://themayakitchen.com/wp-content/uploads/2019/10/TURON-500x500.jpg",
  },
  {
    id: "sans-rival",
    name: "Sans Rival",
    description: "Layered cashew meringue with buttercream",
    price: 280,
    category: "pastry",
    serving: "per slice",
    image: "https://yummykitchentv.com/wp-content/uploads/2021/05/no-bake-sans-rival-recipe.jpg",
  },
  {
    id: "bibingka",
    name: "Bibingka",
    description: "Rice cake with salted egg and cheese",
    price: 85,
    category: "kakanin",
    serving: "per slice",
    image: "https://panlasangpinoy.com/wp-content/uploads/2010/03/How-to-Make-Rice-Cake-Bibingka-jpg.webp",
  },
  {
    id: "puto",
    name: "Puto",
    description: "Steamed rice cakes",
    price: 35,
    category: "kakanin",
    serving: "per piece",
    image: "https://deliciouslyrushed.com/wp-content/uploads/2024/06/Puto-close-up-2-1.jpg",
  },
  {
    id: "kutsinta",
    name: "Kutsinta",
    description: "Brown rice steamed cakes with coconut",
    price: 40,
    category: "kakanin",
    serving: "per piece",
    image: "https://eatlikepinoy.com/wp-content/uploads/2020/05/2387283464_81b2e06309_c-1.jpg",
  },
  {
    id: "sapin-sapin",
    name: "Sapin-Sapin",
    description: "Layered sticky rice cake in ube, pandan, and coconut",
    price: 75,
    category: "kakanin",
    serving: "per slice",
    image: "https://www.latestrecipes.net/wp-content/uploads/2012/04/sapinsapinlayeredstickyricecake1200.jpg",
  },
  {
    id: "mais-con-yelo",
    name: "Mais con Yelo",
    description: "Sweet corn with shaved ice and milk",
    price: 65,
    category: "cold",
    serving: "per serving",
    image: "https://hicaps.com.ph/wp-content/uploads/2023/03/mais-con-yelo.jpg",
  },
  {
    id: "mango-float",
    name: "Mango Float",
    description: "Graham layers with cream and ripe mango",
    price: 195,
    category: "cold",
    serving: "per tray",
    image: "https://bakewithzoha.com/wp-content/uploads/2024/05/mango-float-featured.jpg",
  },
  {
    id: "ensaymada",
    name: "Ensaymada",
    description: "Brioche with butter and cheese",
    price: 55,
    category: "pastry",
    serving: "per piece",
    image: "https://curiousflavors.com/wp-content/uploads/2023/11/Untitled-design-2023-11-20T110145.001.jpg",
  },
  {
    id: "pichi-pichi",
    name: "Pichi-Pichi",
    description: "Steamed cassava with latik",
    price: 50,
    category: "kakanin",
    serving: "per serving",
    image: "https://themayakitchen.com/wp-content/uploads/2018/10/PICHI-PICHI.jpg",
  },
  {
    id: "buko-salad",
    name: "Buko Salad",
    description: "Young coconut, fruits, and cream",
    price: 130,
    category: "cold",
    serving: "per serving",
    image: "https://kusinasecrets.com/wp-content/uploads/2024/11/u3317447599_httpss.mj_.runshvWL2PHCoU_Hyperrealistic_tclose_up_5fb05b1c-f26f-4161-a07d-6855ac864fe8_0.webp",
  },
  {
    id: "palitaw",
    name: "Palitaw",
    description: "Rice dough with coconut and sesame",
    price: 40,
    category: "kakanin",
    serving: "per piece",
    image: "https://yummykitchentv.com/wp-content/uploads/2020/10/palitaw-recipe.jpg",
  },
];

export function getItemById(id: string): DessertItem | undefined {
  return INVENTORY.find((item) => item.id === id);
}
