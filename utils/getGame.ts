import games from './games';

export default (gameId: string) => {
  console.log('games', games);
  console.log('gameId', gameId);

  return games.filter((game) => {
    return game.id === gameId;
  });
};
