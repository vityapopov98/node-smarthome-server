import { deviceIdToByte } from "../hub.js";

test("Convert symbolic Id to Bytes", () => {
  const testSymbolicId = "THS10012";
  const expectedResult = parseInt("00011100", 2);

  const convertId = deviceIdToByte(testSymbolicId);
  expect(convertId).toBe(expectedResult);
});
