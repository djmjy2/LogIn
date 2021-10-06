import template from './login.temlplate';
import axios from 'axios';
import textFieldTemplate from '../views/text-field.template';

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

  #onSubmit = e => {

  }

  render = () => {
    
  }
}