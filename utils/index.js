
// Function to return the highest value from the object sent 
// back from the API when detecting emotions
const findHighest = (obj) => {
  const values = Object.values(obj);
  const max = Math.max.apply(Math, values);
  for (key in obj) {
    if (obj[key] === max) {
      return {
        [key]: max,
      };
    }
  }
};


// Function to parse the emotion to a single color
const parseEmotionToColor = (emotion) => {
  const highestEmotion = Object.keys(findHighest(emotion)).toString();
  switch (highestEmotion) {
    case "Fear":
      return "#ffa500";
    case "Happy":
      return "#008000";
    case "Angry":
      return "#ff0000";
    case "Excited":
      return "#ffff00";
    case "Sad":
      return "#0000ff";
    case "Bored":
      return "#800080";
  }
};

module.exports = { parseEmotionToColor };
