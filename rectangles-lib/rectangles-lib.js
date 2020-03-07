exports.getCardsWithLargestArea = rects => {
  const cardsWithAreas = rects.map(r => {
    return { ...r, Area: r.Height * r.Width };
  });
  const cardsByArea = groupBy(cardsWithAreas, "Area");

  const cardCountsByArea = Object.keys(cardsByArea)
    .map(cardGroup => [cardGroup, cardsByArea[cardGroup].length])
    .sort((a, b) => a[0] * 1 - b[0] * 1);

  // assume we have 2 groups now!
  if (cardCountsByArea.length > 2) {
    console.log("got >2 cardCountsByArea", cardCountsByArea);
    throw "ARGH, not >2 different groups of cards!?";
  }

  // the largest card area is now the last item in the array
  const largestCardArea = cardCountsByArea[cardCountsByArea.length - 1];

  return cardsWithAreas.filter(c => c.Area == largestCardArea[0]);
};

exports.getCardsInSets = cardPositions => {
  const largeCards = this.getCardsWithLargestArea(cardPositions);
  // todo: decide if pick or swap! COUNT WON'T WORK!
  if (cardPositions.length === 9) {
    const xGroup = groupBy(largeCards, "TopLeftX");
    return Object.keys(xGroup).map(k => xGroup[k]);
  } else {
    const yGroup = groupBy(largeCards, "TopLeftY");
    return Object.keys(yGroup).map(k => yGroup[k]);
  }
};
//main();

exports.getPicks = cardJson => {};

const groupBy = (arr, prop) =>
  arr.reduce((collection, current) => {
    if (collection[current[prop]]) collection[current[prop]].push(current);
    else collection[current[prop]] = [current];
    return collection;
  }, {});
