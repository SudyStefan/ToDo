export default function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// export const wait = (ms: number) =>
//   new Promise(resolve => setTimeout(resolve, ms));