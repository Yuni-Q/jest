import $ from 'jquery';
import {validate} from '../src/validator/validator';

const FIXTURE_FORM = `
  <form>
    <input type="text" name="name" />
    <input type="text" name="email" />
    <input type="password" name="password1" />
    <input type="password" name="password2" />
  </form>
`;

let form;

beforeEach(() => {
  form = $(FIXTURE_FORM)[0];
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

it('이름이 한글이 아닌 경우 에러 메시지를 보여준다', () => {
  form.elements.name.value = 'AAA'

  const result = validate(form);

  expect(window.alert).toHaveBeenCalledWith('이름을 한글로만 입력해주세요.');
  expect(result).toBe(false);
});

it('이메일이 유효하지 않으면 에러 메시지를 보여준다', () => {
  form.elements.name.value = '안녕'
  form.elements.email.value = 'asdf@asdf'

  const result = validate(form);

  expect(window.alert).toHaveBeenCalledWith('이메일 주소 형식이 잘못되었습니다.');
  expect(result).toBe(false);
});

it('패스워드가 5자보다 짧으면 에러 메시지를 보여준다', () => {
  form.elements.name.value = '안녕'
  form.elements.email.value = 'asdf@asdf.com'
  form.elements.password1.value = 'asdf'

  const result = validate(form);

  expect(window.alert).toHaveBeenCalledWith('패스워드를 5자 이상 입력해주세요.');
  expect(result).toBe(false);
});

it('패스워드와 패스워드 확인이 다른 경우 에러 메시지를 보여준다', () => {
  form.elements.name.value = '안녕'
  form.elements.email.value = 'asdf@asdf.com'
  form.elements.password1.value = 'asdfa'
  form.elements.password2.value = 'asdfs'

  const result = validate(form);

  expect(window.alert).toHaveBeenCalledWith('패스워드를 동일하게 입력해주세요.');
  expect(result).toBe(false);
});

it('입력이 올바르면 true를 반환한다.', () => {
  form.elements.name.value = '안녕'
  form.elements.email.value = 'asdf@asdf.com'
  form.elements.password1.value = 'asdfa'
  form.elements.password2.value = 'asdfa'

  expect(validate(form)).toBe(true);
});
