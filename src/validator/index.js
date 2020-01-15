import $ from 'jquery';
import {validate} from './validator';

$(() => {
  $('#my-form').on('submit', ev => {
    ev.preventDefault();

    if (validate(ev.target)) {
      alert('성공!');
    }
  });
});
