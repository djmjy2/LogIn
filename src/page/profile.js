import template from './profile.template';

export default class Profile {
  #template = template;
  #data;
  #container;

  constructor(container, data) {
    this.#container = document.querySelector(container);
    this.#data = data;

    this.#initialize();
  }

  #initialize = () => {
    if (!this.#data.store.userprofile) {
      location.href = '/';
    }
  }

  render = () => {
    this.#container.innerHTML = this.#template({
      userprofile: this.#data.store.userprofile,
      posts: this.#data.store.userPosts,
    });
  }
}