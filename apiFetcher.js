const fetch = require("node-fetch");
const cardRectangles = require("./Rectangles.json"); // for testing!
const cardData = require("./set1-en_us.json");
const tierListData = require("./tierList.json");

async function main() {
  // todo: check if not ingame!
  //const cardRectangles = await getCardPositions();
  const largeCards = getCardsWithLargestArea(cardRectangles);

  // todo: work out mode? if there's 2 per row then we're trading?!
  const cardsByCode = getCardsByCode(cardData);
  const largeCardData = getCardsWithData(largeCards, cardsByCode);

  console.log(largeCardData.map(c => [c.name, c.cost, c.TopLeftY, c.TopLeftX]));
  // pair them up by TopLeftY
  const heights = largeCardData.map(c => c.TopLeftY);
  console.log(heights);
}

const getCardPositions = async () => {
  const result = await fetch("http://localhost:21337/positional-rectangles");
  const resultJson = await result.json(); // need to access result or this doesn't resolve!?
  return resultJson.Rectangles;
};

const getCardsWithData = (cardPositions, cardsByCode) => {
  return cardPositions.map(p => ({ ...p, ...cardsByCode[p.CardCode] }));
};

const getCardDataForRectangles = cardPositions => {
  const cardsByCode = getCardsByCode(cardData);
  const cardsWithData = getCardsWithData(cardPositions, cardsByCode);
  const cardsWithTierListData = addTierListData(cardsWithData, tierListData);
  return cardsWithTierListData;
};

const addTierListData = (cardsWithData, tierListData) =>
  cardsWithData.map(c => ({ ...c, tier: tierListData[c.cardCode] }));

const getCardsByCode = cards =>
  Object.fromEntries(cards.map(c => [c.cardCode, c]));

const getExpeditionState = async logLevel => {
  const result = await fetch("http://localhost:21337/expeditions-state");
  const resultJson = await result.json();
  return resultJson;
};

exports.getCardPositions = getCardPositions;
exports.getCardDataForRectangles = getCardDataForRectangles;
exports.getExpeditionState = getExpeditionState;
