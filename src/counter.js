export function createCounter(options = {}) {
  let value = options.initVal || 0;
  let min = options.min || -9999; // 최소값으로 설정해야 함
  let max = options.max || 9999; // 최대값으로 설정해야 함
  return {
    val() {
      return value;
    },
    inc() {
      if (!this.isMax()) {
        value++;
      }
    },
    dec() {
      if (!this.isMin()) {
        value--;
      }
    },
    isMax() {
      return max === value;
    },
    isMin() {
      return min === value;
    }
  };
}
