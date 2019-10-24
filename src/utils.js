export function getRandomId(length = 8) {
  const input = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz";
  let randomId = "";
  for (var i = 0; i < length; i++) {
    randomId += input[Math.floor(Math.random() * input.length)];
  }
  return randomId;
}
