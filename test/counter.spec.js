import { createCounter } from "../src/counter";

// Step 1
describe("옵션이 지정되지 않은 경우", () => {
  let count;
  beforeEach(() => {
    count = createCounter();
  });
  it("초기값은 0이다.", () => {
    expect(count.val()).toBe(0);
  });

  it("inc() 함수는 값을 1증가시킨다.", () => {
    count.inc();

    expect(count.val()).toBe(1);
  });

  it("dec() 함수는 값을 1감소시킨다.", () => {
    count.dec();

    expect(count.val()).toBe(-1);
  });

  it("isMax() 호출시 false를 반환한다.", () => {
    expect(count.isMax()).toBe(false);
  });

  it("isMin() 호출시 false 반환한다.", () => {
    expect(count.isMin()).toBe(false);
  });
});

// Step 2
it("initVal 옵션 사용 시 초기값이 해당 값으로 지정된다.", () => {
  const num = 10;
  const count = createCounter({ initVal: num });
  expect(count.val()).toBe(num);
});

describe("min 옵션 사용 시 현재값과 min 값이 동일하면", () => {
  it("dec() 함수를 호출해도 값이 감소하지 않는다.", () => {
    const min = 10;
    const count = createCounter({ initVal: min, min });
    count.dec();
    expect(count.val()).toBe(min);
  });

  it("isMin() 호출 시 true를 반환한다.", () => {
    const max = 10;
    const count = createCounter({ initVal: max, max });
    expect(count.isMax()).toBe(true);
  });
});

describe("max 옵션 사용 시 현재값과 max 값이 동일하면", () => {
  it("inc() 함수를 호출해도 값이 증가하지 않는다.", () => {
    const max = 10;
    const count = createCounter({ initVal: max, max });
    count.inc();
    expect(count.val()).toBe(max);
  });

  it("isMax() 호출 시 true를 반환한다.", () => {
    const max = 10;
    const count = createCounter({ initVal: max, max });
    count.inc();
    expect(count.isMax()).toBe(true);
  });
});
