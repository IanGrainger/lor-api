var expect = require("chai").expect;
var cardLib = require("../rectangles-lib/rectangles-lib.js");

it("Gets largest cards", () => {
  const input = [
    {
      CardCode: "01NX036",
      Width: 390,
      Height: 78
    },
    {
      CardCode: "01NX045",
      Width: 390,
      Height: 78
    },
    {
      CardCode: "01NX020",
      Width: 435,
      Height: 141
    },
    {
      CardCode: "01NX042",
      Width: 435,
      Height: 141
    },
    {
      CardCode: "01NX016",
      Width: 435,
      Height: 141
    },
    {
      CardCode: "01NX041",
      Width: 435,
      Height: 141
    },
    {
      CardCode: "01NX036",
      Width: 435,
      Height: 141
    },
    {
      CardCode: "01NX056",
      Width: 435,
      Height: 141
    }
  ];

  const output = cardLib.getCardsWithLargestArea(input);
  expect(output).to.have.length(6);
  const cardCodes = output.map(c => c.CardCode);
  expect(cardCodes).to.eql([
    "01NX020",
    "01NX042",
    "01NX016",
    "01NX041",
    "01NX036",
    "01NX056"
  ]);
});

it("Makes sets for hero selection", () => {
  const input = [
    {
      CardCode: "01PZ008",
      TopLeftX: 558,
      Width: 381,
      Height: 77
    },
    {
      CardCode: "01PZ027",
      TopLeftX: 558,
      Width: 381,
      Height: 77
    },
    {
      CardCode: "01PZ039",
      TopLeftX: 558,
      TopLeftY: 570,
      Width: 381,
      Height: 77
    },
    {
      CardCode: "01IO041",
      TopLeftX: 1002,
      Width: 381,
      Height: 77,
      LocalPlayer: true
    },
    {
      CardCode: "01IO008",
      TopLeftX: 1002,
      Width: 381,
      Height: 77
    },
    {
      CardCode: "01IO026",
      TopLeftX: 1002,
      Width: 381,
      Height: 77
    },
    {
      CardCode: "01FR024",
      TopLeftX: 1447,
      Width: 381,
      Height: 77
    },
    {
      CardCode: "01FR003",
      TopLeftX: 1447,
      Width: 381,
      Height: 77
    },
    {
      CardCode: "01FR050",
      TopLeftX: 1447,
      Width: 381,
      Height: 77
    }
  ];
  const output = cardLib.getCardsInSets(input);
  expect(output).to.have.length(3);
  output.map(g => expect(g).to.have.length(3));
  const cardCodeGroups = output.map(g => g.map(c => c.CardCode));
  expect(cardCodeGroups).to.eql([
    ["01PZ008", "01PZ027", "01PZ039"],
    ["01IO041", "01IO008", "01IO026"],
    ["01FR024", "01FR003", "01FR050"]
  ]);
  console.table(cardCodeGroups);
});

it("Makes sets for swaps", () => {
  const input = [
    {
      CardID: -1,
      CardCode: "01NX026",
      TopLeftX: 759,
      TopLeftY: 1105,
      Width: 379,
      Height: 191,
      LocalPlayer: true
    },
    {
      CardID: -1,
      CardCode: "01NX011",
      TopLeftX: 1209,
      TopLeftY: 1105,
      Width: 379,
      Height: 191,
      LocalPlayer: true
    },
    {
      CardID: -1,
      CardCode: "01NX033",
      TopLeftX: 759,
      TopLeftY: 890,
      Width: 379,
      Height: 191,
      LocalPlayer: true
    },
    {
      CardID: -1,
      CardCode: "01NX036",
      TopLeftX: 1209,
      TopLeftY: 890,
      Width: 379,
      Height: 191,
      LocalPlayer: true
    },
    {
      CardID: -1,
      CardCode: "01NX032",
      TopLeftX: 759,
      TopLeftY: 675,
      Width: 379,
      Height: 191,
      LocalPlayer: true
    },
    {
      CardID: -1,
      CardCode: "01NX031",
      TopLeftX: 1209,
      TopLeftY: 675,
      Width: 379,
      Height: 191,
      LocalPlayer: true
    }
  ];
  const output = cardLib.getCardsInSets(input);
  const cardCodeGroups = output.map(g => g.map(c => c.CardCode));
  expect(output).to.have.length(3);
  output.map(g => expect(g).to.have.length(2));
  expect(cardCodeGroups).to.eql([
    ["01NX032", "01NX031"],
    ["01NX033", "01NX036"],
    ["01NX026", "01NX011"]
  ]);
  console.table(cardCodeGroups);
});
