import $ from 'jquery';
import {createUICounter} from './uiCounter';

createUICounter($('#counter'), {
  initVal: 10,
  min: 8,
  max: 12
});
