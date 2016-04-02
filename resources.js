/*

  Resources Files
  Stores and Loads All The Needed Images
  Into The Other Scripts

*/

//

function newImage() {
  // Turns The Caller Into a New Image
  // Should only be called by NEW VARIABLES
  return new Image();
}

//

var gameBoard = new Image();
gameBoard.src = 'blank.jpg';

//

var playerImg = new Image();
playerImg.src = 'player-2.png';

//

var enemyImg = new Image();
enemyImg.src = 'ghost-2.png';

//

var jewelsImages = [
  {
    jewel: 'Red Jewel',
    image: 'red-jewel.png',
    value: 10
  },
  {
    jewel: 'Blue Jewel',
    image: 'blue-jewel.png',
    value: 20
  },
  {
    jewel: 'Green Jewel',
    image: 'green-jewel.png',
    value: 50
  },
  {
    jewel: 'Purple Jewel',
    image: 'purple-jewel.png',
    value: 100
  },
  {
    jewel: 'Crystal Jewel',
    image: 'crystal-jewel.png',
    value: 200
  },
  {
    jewel: 'Golden Jewel',
    image: 'golden-jewel.png',
    value: 500
  }
];

var jewels = [];

(function(){

  $.each(jewelsImages, function(index, item) {

    var name = item.jewel;

    var img = newImage();
    img.src = item.image;

    var value = item.value;

    jewels.push({
      jewel: name,
      image: img,
      value: value
    })

  });

  console.log(jewels);

})();
