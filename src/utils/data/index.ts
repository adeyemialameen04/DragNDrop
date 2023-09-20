import { imageData } from "../interfaces";

const baseImagesData = [
    { path: "/static/images/anime/anime-1.jpg", tag: "anime" },
    { path: "/static/images/coding/coding-4.webp", tag: "coding" },
    { path: "/static/images/sports/sports-3.jpg", tag: "sports" },
    { path: "/static/images/anime/anime-4.jpg", tag: "anime" },
    { path: "/static/images/coding/coding-3.jpg", tag: "coding" },
    { path: "/static/images/sports/sports-5.jpg", tag: "sports" },
    { path: "/static/images/sports/sports-4.jpg", tag: "sports" },
    { path: "/static/images/anime/anime-2.jpg", tag: "anime" },
    { path: "/static/images/animals/animal-7.jpg", tag: "animals" },
    { path: "/static/images/animals/animal-4.jpg", tag: "animals" },
    { path: "/static/images/coding/coding-1.jpg", tag: "coding" },
    { path: "/static/images/animals/animal-5.jpg", tag: "animals" },
    { path: "/static/images/anime/anime-3.jpg", tag: "anime" },
    { path: "/static/images/objects/obj-1.jpg", tag: "objects" },
    { path: "/static/images/coding/coding-2.jpg", tag: "coding" },
    { path: "/static/images/food/food-1.jpg", tag: "food" },
    { path: "/static/images/food/food-4.jpg", tag: "food" },
    { path: "/static/images/food/food-3.jpg", tag: "food" },
    { path: "/static/images/coding/coding-5.jpg", tag: "coding" },
    { path: "/static/images/food/food-5.jpg", tag: "food" },
    { path: "/static/images/objects/obj-2.jpg", tag: "objects" },
    { path: "/static/images/animals/animal-1.jpg", tag: "animals" },
    { path: "/static/images/animals/animal-2.jpg", tag: "animals" },
    { path: "/static/images/animals/animal-3.jpg", tag: "animals" },
    { path: "/static/images/animals/animal-6.jpg", tag: "animals" },
    { path: "/static/images/sports/sports-1.jpg", tag: "sports" },
    { path: "/static/images/animals/animal-8.jpg", tag: "animals" },
    { path: "/static/images/sports/sports-2.jpg", tag: "sports" },
    { path: "/static/images/food/food-2.jpeg", tag: "food" },
];

const shuffleArray = (array: imageData[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export const imagesData = shuffleArray(baseImagesData);

export const tags = [
    { tagName: "anime", id: 1 },
    { tagName: "sports", id: 2 },
    { tagName: "coding", id: 3 },
    { tagName: "food", id: 4 },
    { tagName: "objects", id: 5 },
    { tagName: "animals", id: 6 },
];
