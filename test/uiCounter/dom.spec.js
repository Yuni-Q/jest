import "@testing-library/jest-dom/extend-expect";
import { getByTestId, fireEvent } from "@testing-library/dom";
import { createUICounter } from "../../src/uiCounter/uiCounter";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.innerHTML = "";
});

it("생성시 버튼과 초기값을 렌더링한다.", () => {
  createUICounter(container);
  expect(getByTestId(container, "btn-inc")).toBeVisible();
  expect(getByTestId(container, "btn-dec")).toBeVisible();
  expect(getByTestId(container, "value")).toHaveTextContent("0");
});

it("+ 버튼 클릭시 1 증가한다.", () => {
  createUICounter(container);
  fireEvent.click(getByTestId(container, "btn-inc"));

  expect(getByTestId(container, "value")).toHaveTextContent("1");
});

it("- 버튼 클릭시 1 감소한다.", () => {
  createUICounter(container);
  fireEvent.click(getByTestId(container, "btn-dec"));

  expect(getByTestId(container, "value").textContent).toBe("-1");
});

it("Max값인 경우 + 버튼이 disabled 상태가 되며 클릭해도 증가하지 않는다.", () => {
  createUICounter(container, { initVal: 10, max: 10 });
  // fireEvent.click(getByTestId(container, "btn-inc"));

  expect(getByTestId(container, "btn-inc")).toBeDisabled();
});

it("Min값인 경우 - 버튼이 disabled 상태가 되며, 클릭해도 감소하지 않는다.", () => {
  createUICounter(container, { initVal: 10, min: 10 });
  // fireEvent.click(getByTestId(container, "btn-dec"));

  expect(getByTestId(container, "btn-dec")).toBeDisabled();
});
