let characters = [];
    let emojiIcons = ["😊", "😎", "🌟", "💖", "🌈", "✨", "🌺", "🚀", "🎉", "🦄"];

    function setup() {
      createCanvas(1700, 900);
      noStroke();
      background('#B5E8F8'); // color
      setInterval(generateCharacter, 1000); // 
    }

    function draw() {
      // updated
      for (let i = characters.length - 1; i >= 0; i--) {
        characters[i].display();
        characters[i].update();

        // removal
        if (characters[i].isOutOfBounds()) {
          characters.splice(i, 1);
        }
      }
    }

    function generateCharacter() {
      // generated
      let x = random(width);
      let y = random(height);
      let charType = random() > 0.5 ? 'char' : 'emoji';
      let newChar;

      if (charType === 'char') {
        let language = randomLanguage();
        newChar = new MultilingualChar(x, y, language);
      } else {
        newChar = new Emoji(x, y);
      }

      characters.push(newChar);
    }

    function randomLanguage() {
      let languages = ['jp', 'en', 'ar', 'tr'];
      return languages[Math.floor(random(languages.length))];
    }

    class MultilingualChar {
      constructor(x, y, language) {
        this.x = x;
        this.y = y;
        this.size = 50;
        this.language = language;
        this.char = generateRandomChar(this.language);
        this.speed = random(1, 3);
      }

      display() {
        fill(random(255), random(255), random(255));
        textSize(this.size);
        textAlign(CENTER, CENTER);
        text(this.char, this.x, this.y);
      }

      update() {
        this.y += this.speed;
      }

      isOutOfBounds() {
        return this.y > height;
      }
    }

    class Emoji extends MultilingualChar {
      constructor(x, y) {
        super(x, y, 'emoji');
        this.emojiIcon = getRandomEmoji();
      }

      display() {
        fill(random(255), random(255), random(255));
        textSize(this.size);
        textAlign(CENTER, CENTER);
        text(this.emojiIcon, this.x, this.y);
      }
    }

    function generateRandomChar(language) {
      let char;
      switch (language) {
        case 'jp':
          char = String.fromCharCode(random(0x3041, 0x30FF));
          break;
        case 'en':
          char = String.fromCharCode(random(65, 90)); 
          break;
        case 'ar':
          char = String.fromCharCode(random(0x0621, 0x0652));
          break;
        case 'tr':
          char = String.fromCharCode(random(0x0041, 0x005A)); 
          break;
      }
      return char;
    }

    function getRandomEmoji() {
      return emojiIcons[Math.floor(random(emojiIcons.length))];
    }