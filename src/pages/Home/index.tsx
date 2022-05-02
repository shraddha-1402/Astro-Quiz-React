import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { getFeaturedQuizes } from "../../handlers";
import "./style.css";
import { useDynamicTitle } from "../../hooks";

const HomePage = () => {
  const [featuredQuizes, setFeaturedQuizes] = useState<DocumentData[]>([]);
  useEffect(() => {
    (async () => {
      setFeaturedQuizes(await getFeaturedQuizes());
    })();
  }, []);

  useDynamicTitle();

  return (
    <div>
      <h1 className="center-text my-2">
        A Quiz For All The Astronomy Nerds Out There
      </h1>
      <p className="header-text">
        For as long as humans have been looking up at the twinkling stars, they
        have been fascinated by their beauty and might. But for some inquisitive
        minds, who look deeper and beyond, these stars are way more than
        twinkling bodies. This quiz here is for those nerds, who wants to feed
        more to their curious minds. So, dive down!
      </p>

      <div className="flex-row justify-center gap-2 flex-wrap my-3-5">
        {featuredQuizes.map(
          ({ data: { name, level, description, img }, id }) => {
            return (
              <div className="card quiz-card mw-16r" key={id}>
                <div className="card-img-box">
                  <img
                    src={img}
                    alt="music-albums"
                    className="card-img responsive-img quiz-card-img"
                  />
                </div>
                <div className="flex-col gap-0-25 m-0-5">
                  <h3> {name} </h3>
                  <p className="sm-text">{level}</p>
                  <p className="sm-text">{description}</p>
                  <a href="/Pages/rules.html" className="link">
                    <button className="btn btn-solid-primary mt-1 mb-0-5 w-100p quiz-card-btn">
                      Play Now
                    </button>
                  </a>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export { HomePage };
