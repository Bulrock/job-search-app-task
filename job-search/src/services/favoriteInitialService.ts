export default function favoriteInitialService(id: number): boolean {
  const favoritesArr = localStorage.getItem('favorites');
  const array = favoritesArr !== null ? JSON.parse(favoritesArr) : [];

  const isFavorite = array.find((vacancyId: number) => vacancyId === id);

  return isFavorite;
}
