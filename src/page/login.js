import template from './login.temlplate';
import axios from 'axios';
import textField from '../views/text-field.template';

export default class Login {
  #template = template;
  #data;
  #container;
  #loginFail = false;
  #fields = [];

  constructor(container, data) {
    this.#container = document.querySelector(container);
    this.#data = data;

    this.#initialize();
  }

  #initialize = () => {
    const idField = new textField('#login-fields', {
      id: 'userid', label: '아이디', type: 'text', placeholder: '아이디를 입력하세요', require: true,
    });
    const passwordField = new TextField('#logid-fields', {
      id: 'password', label: '비밀번호', type: 'password', placeholder: '********'
    });

    this.#fields.push(idField);
    this.#fields.push(passwordField);  
  }

  #onSubmit = e => { //아직 이해가 잘안된다. 좀더 공부해봐야겠다
    e.preventDefault();

    const loginData = this.#fields
      .map(field => ({ [field.name]: field.value }))
      .reduce((a, b) => ({...a, ...b}), {});

    axios.post('/api/authentication', loginData)
      .then(result => {
        return result.data.result;
      })
      .then(({ id, token }) => {
        const options = { headers: {token} };
        this.#data.store.token = token;

        return axios.all([
          axios.get(`/api/user/${id}`, options),
          axios.get(`/api/user/${id}/posts`, options),
        ]);
      })
      .then(([profile, posts]) => {
        this.#data.store.userProfile = profile.data.result;
        this.#data.store.userPosts = posts.data.result;

        location.href = '/#/profile';
      })
      .catch(error => {
        this.#loginFail = true;
        this.render();
      });
  }

  render = () => {
    this.#container.innerHTML = this.#template({ ...this.#data, loginFail: this.#loginFail });
    this.#fields.forEach(field => {
      field.render(ture);
    });

    this.#container.addEventListener('submit', this.#onSubmit);
  }
}