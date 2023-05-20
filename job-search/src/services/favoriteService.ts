export default function favoriteService(id: number): boolean {
  const favoritesArr = localStorage.getItem('favorites');
  const array = favoritesArr !== null ? JSON.parse(favoritesArr) : [];

  const isFavorite = array.find((vacancyId: number) => vacancyId === id);

  if (!isFavorite) {
    array.push(id);
    localStorage.setItem('favorites', JSON.stringify(array));
  } else {
    const filteredFavoritesArr = array.filter((vacancyId: number) => vacancyId !== id);
    localStorage.setItem('favorites', JSON.stringify(filteredFavoritesArr));
  }

  return isFavorite;
}
