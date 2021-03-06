// @flow

import { compiler, beautify } from "..";

it("should handle single interface", () => {
  const ts = `
interface User {
  firstName: string
}
`;
  const result = compiler.compileDefinitionString(ts);
  expect(beautify(result)).toMatchSnapshot();
  const result2 = compiler.compileDefinitionString(ts, {
    interfaceRecords: true,
  });
  expect(beautify(result2)).toMatchSnapshot();
});

it("should handle interface inheritance", () => {
  const ts = `
interface User {
  firstName: string
}
interface SpecialUser extends User {
  nice: number
}
`;
  const result = compiler.compileDefinitionString(ts);
  expect(beautify(result)).toMatchSnapshot();
  const result2 = compiler.compileDefinitionString(ts, {
    interfaceRecords: true,
  });
  expect(beautify(result2)).toMatchSnapshot();
});

it("should handle interface merging", () => {
  const ts = `
interface User {
  firstName: string
}
interface User {
  lastName: string
}
interface User {
  username: string
}
`;
  const result = compiler.compileDefinitionString(ts);
  expect(beautify(result)).toMatchSnapshot();
  const result2 = compiler.compileDefinitionString(ts, {
    interfaceRecords: true,
  });
  expect(beautify(result2)).toMatchSnapshot();
});

it("should handle all properties", () => {
  const ts = `
interface Props {
  "aria-label": string;
  "aria-labelledby"?: number;
  color: string;
  [key: string]: string;
}
`;
  const result = compiler.compileDefinitionString(ts);
  expect(beautify(result)).toMatchSnapshot();
});

it("should support readonly modifier", () => {
  const ts = `
interface Helper {
  readonly name: string;
  readonly callback(): void;
}
`;
  const result = compiler.compileDefinitionString(ts);
  expect(beautify(result)).toMatchSnapshot();
});

it("should support call signature", () => {
  const ts = `
  declare interface ObjectSchemaConstructor {
    <T extends object>(fields?: ObjectSchemaDefinition<T>): ObjectSchema<T>;
    new (): ObjectSchema<{}>;
  }
`;
  const result = compiler.compileDefinitionString(ts);
  expect(beautify(result)).toMatchSnapshot();
});
