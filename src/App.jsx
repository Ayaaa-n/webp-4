import { useEffect, useState } from "react";
import { fetchImages } from "./api";
import "/styles/style.css";

function Header() {
  return (
    <header className="hero is-dark is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Amiibo Series Images</h1>
        </div>
      </div>
    </header>
  );
}

function Image(props) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
        <img src={props.src} alt="amiibo" />
        </figure>
      </div>
    </div>
  );
}

function Loading() {
  return <p>Loading...</p>;
}

function Gallery(props) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />;
  }
    return (
    <div className="columns is-vcentered is-multiline">
      {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Image src={url.image} />
          </div>
        );
      })}
    </div>
  );
}

function Form(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const { series } = event.target.elements;
    props.onFormSubmit(series.value);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select name="series" defaultValue="8-bit Mario">
                <option value="8-bit Mario">8-bit Mario</option>
                <option value="Super Smash Bros.">Super Smash Bros.</option>
                <option value="Animal Crossing">Animal Crossing</option>
                <option value="Splatoon">Splatoon</option>
                <option value="Yoshi's Woolly World">Yoshi's Woolly World</option>
                
              </select>
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-dark">
              Reload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Main() {
  const [urls, setUrls] = useState(null);
  useEffect(() => {
    fetchImages("8-bit Mario").then((urls) => {
      setUrls(urls);
    });
  }, []);
  function reloadImages(series) {
    fetchImages(series).then((urls) => {
      setUrls(urls);
    });
  }
  return (
    <main>            
      <section className="section">
        <div className="container">
        <Form onFormSubmit={reloadImages} />
        </div>
      </section>
      <section className="section">
        <div className="container">
        <Gallery urls={urls} />
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
      <p>Amiibo images are retrieved from AmiiboAPI</p>
        <p>
          <a href="https://www.amiiboapi.com/">Donate to AmiiboAPI</a>
        </p>
        <p>日本大学文理学部情報科学科 Webプログラミングの演習課題 5419053 中島綾乃</p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;