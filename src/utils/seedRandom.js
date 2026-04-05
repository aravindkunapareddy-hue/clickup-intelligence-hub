/**
 * GTM OPERATING SYSTEM: DETERMINISTIC PRNG (LINEAR CONGRUENTIAL GENERATOR)
 * Fixed seed ensures the same high-fidelity dataset is recreated every time.
 */

export const createPRNG = (seed = 12345) => {
  let s = seed;
  return () => {
    // Standard LCG parameters (Numerical Recipes)
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
};

export const createSeededDataUtils = (seed = 12345) => {
  const next = createPRNG(seed);

  const randomInt = (min, max) => Math.floor(next() * (max - min + 1)) + min;
  const pick = (arr) => arr[Math.floor(next() * arr.length)];
  const pickWeighted = (options) => {
    const total = options.reduce((sum, opt) => sum + opt.weight, 0);
    let r = next() * total;
    for (const opt of options) {
      if (r < opt.weight) return opt.value;
      r -= opt.weight;
    }
    return options[0].value;
  };

  return { randomInt, pick, pickWeighted, next };
};
