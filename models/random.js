function getRandomNumberGenerator(totalCovers) {
  const covers = Array.from({ length: totalCovers }, (_, i) => i + 1);
  const shuffledCovers = covers.slice().sort(() => Math.random() - 0.5);
  let index = 0;

  return function () {
    if (index >= totalCovers) {
      return Math.floor(Math.random() * totalCovers) + 1;
    }

    return shuffledCovers[index++];
  };
}

export default getRandomNumberGenerator;
