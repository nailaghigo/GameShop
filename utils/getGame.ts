import games from './gamesList';

export default (gameId: string) => {
  return games.filter((game) => {
    return game.id === gameId;
  });
};
