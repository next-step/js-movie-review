import { movieValidation } from '../../validation';

/**
 * API 도메인별로 받아온 data를 정해진 Interface로 정형화합니다.
 */
export class Movie {
  #title;
  #thumbnail;
  #rating;
  #description;

  constructor({ title, thumbnail, rating, description }) {
    movieValidation({ title, thumbnail, rating, description });

    this.#title = title;
    this.#thumbnail = thumbnail;
    this.#rating = rating;
    this.#description = description;
  }

  getData() {
    return {
      title: this.#title,
      thumbnail: this.#thumbnail,
      rating: this.#rating,
      description: this.#description,
    };
  }
}