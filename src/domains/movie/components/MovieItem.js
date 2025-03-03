import { Image } from '../../../components/Image';

export const MovieItem = (props) => {
  const { title, poster_path, vote_average } = props;

  const rate = vote_average.toFixed(1);

  return `
    <div class="item">
    ${Image({ src: `https://image.tmdb.org/t/p/w342${poster_path}`, alt: title, className: 'thumbnail', width: 200, height: 300 })}
    
      <div class="item-desc">
        <p class="rate">
          <img
            src="${import.meta.env.BASE_URL}assets/star_empty.png"
            class="star"
          /><span>${rate}</span>
        </p>
        <strong>${title}</strong>
      </div>
    </div>
  `;
};
