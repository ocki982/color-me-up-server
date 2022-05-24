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
