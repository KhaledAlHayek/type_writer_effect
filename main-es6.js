class TypeWriter {
  constructor(textElement, words, delay){
    this.textElement = textElement;
    this.words = words;
    this.delay = parseInt(delay, 10);
    this.text = "";
    this.wordIndex = 0;
    this.type();
    this.isDeleting = false;
  }
  type() {
    const current = this.wordIndex % this.words.length;
    const fullText = this.words[current];

    if(this.isDeleting){
      this.text = fullText.substring(0, this.text.length - 1);
    }
    else{
      this.text = fullText.substring(0, this.text.length + 1);
    }

    this.textElement.innerHTML = `<span class="text">${this.text}</span>`

    let typeSpeed = 300;

    if(this.isDeleting){
      typeSpeed /= 2; 
    }

    if(!this.isDeleting && this.text === fullText){
      typeSpeed = this.delay;
      this.isDeleting = true;
    }
    else if(this.isDeleting && this.text === ""){
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

const init = () => {
  const textElement = document.querySelector(".text-type");
  const words = JSON.parse(textElement.dataset.words);
  const delay = textElement.dataset.delay;

  new TypeWriter(textElement, words, delay);
};

document.addEventListener("DOMContentLoaded", init);