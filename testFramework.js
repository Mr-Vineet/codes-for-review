const isEqual = (expected, actual) => actual === expected;

const areObjectsEqual = (object1, object2) => {
  const keyValuePair1 = Object.entries(object1).sort();
  const keyValuePair2 = Object.entries(object2).sort();

  return areEqual(keyValuePair1, keyValuePair2);
};

export const areEqual = (entity1, entity2) => {
  if (typeof entity2 === "object" && !Array.isArray(entity2)) {
    return areObjectsEqual(entity2, entity1);
  }

  if (!Array.isArray(entity2)) return isEqual(entity1, entity2);

  if (entity1.length !== entity2.length) return false;

  return entity2.every((element, index) => areEqual(element, entity1[index]));
};

const generateMessage = (description, expected, actual) => {
  const message =
    description + "\nExpected: " + expected + " Actual: " + actual + "\n";

  return message;
};

export const test = (description, testFn, expected, actual) => {
  const result = testFn(expected, actual);
  const mark = result ? "✅" : "❌";

  console.log(mark, generateMessage(description, expected, actual));
};
