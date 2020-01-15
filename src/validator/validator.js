const REG_SIMPLE_EMAIL = /\S+@\S+\.\S+/;
const REG_KOREAN_ONLY = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/;

export function validate(form) {
  const {name, email, password1, password2} = form.elements;

  if (!REG_KOREAN_ONLY.test(name.value)) {
    alert('이름을 한글로만 입력해주세요.');
  } else if (!REG_SIMPLE_EMAIL.test(email.value)) {
    alert('이메일 주소 형식이 잘못되었습니다.');
  } else if (password1.value.length < 5) {
    alert('패스워드를 5자 이상 입력해주세요.');
  } else if (password1.value !== password2.value) {
    alert('패스워드를 동일하게 입력해주세요.');
  } else {
    return true;
  }
  return false;
}

