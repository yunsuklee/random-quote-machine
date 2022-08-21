import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

const colors = [
  '#16A085',
  '#27AE60',
  '#2C3E50',
  '#F39C12',
  '#E74C3C',
  '#9B59B6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

function getRandomColor() {
  return Math.floor(Math.random() * colors.length);
}

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      currentQuote: '',
      currentAuthor: '',
      currentColor: colors[getRandomColor()]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getRandomQuote = this.getRandomQuote.bind(this);
  }

  getRandomQuote() {
    return this.state.quotes[Math.floor(Math.random() * this.state.quotes.length)];
  }

  handleSubmit(event) {
    event.preventDefault()

    let randomQuote = this.getRandomQuote();
    
    this.setState({
      currentQuote: randomQuote.quote,
      currentAuthor: randomQuote.author,
      currentColor: colors[getRandomColor()]
    });
  }

  componentDidMount() {
    const quotesURL = "https://gist.githubusercontent.com/johnno8/455be897f86a71a8fbdbbd49855ba83b/raw/bc042f3b2ed4f26f1b4ad54dbb2c26a385e8a287/quotes.json";

    fetch(quotesURL)
      .then(response => response.json())
      .then(data => {
        this.setState({
          quotes: data.quotes,
          currentQuote: data.quotes[Math.floor(Math.random() * data.quotes.length)].quote,
            currentAuthor: data.quotes[Math.floor(Math.random() * data.quotes.length)].author
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div 
        id="container"
        style={{ backgroundColor: this.state.currentColor, transition: '0.5s' }}
      >
        <form id="quote-box" onSubmit={this.handleSubmit} style={{ color: this.state.currentColor, transition: '0.5s' }}>
          <div class="quote-text">
            <i class="fa fa-quote-left"></i>
            <span id="text">{this.state.currentQuote}</span>
          </div>
          <p id="author">{this.state.currentAuthor}</p>
          <div class="buttons">
            <button 
              id="new-quote" 
              type="Submit"
              style={{ backgroundColor: this.state.currentColor, transition: '0.5s' }}
            >
              New quote
            </button>
            <a 
              id="tweet-quote" 
              href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
                encodeURIComponent('"' + this.state.currentQuote + '" ' + this.state.currentAuthor)}
              target="_top"
              style={{ backgroundColor: this.state.currentColor, transition: '0.5s' }}
            >
              <i class="fa-brands fa-twitter"></i>
            </a>
            <a 
              id="tumblr-quote" 
              href={'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
                encodeURIComponent(this.state.currentAuthor) +
                '&content=' +
                encodeURIComponent(this.state.currentQuote) +
                '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'} 
              target="_top"
              style={{ backgroundColor: this.state.currentColor, transition: '0.5s' }}
            >
              <i class="fa-brands fa-tumblr"></i>
            </a>
          </div>
        </form>
      </div>
    );
  }
};

ReactDOM.render(
  <Quote />,
  document.getElementById('root')
);

