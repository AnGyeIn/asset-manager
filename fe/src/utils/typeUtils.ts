export type FieldRemoved<Type, field extends string> = {
  [Property in keyof Type as Exclude<Property, field>]: Type[Property];
};
