export type CalculatorActions =
  | "clear"
  | "("
  | ")"
  | "^"
  | "7"
  | "8"
  | "9"
  | "/"
  | "4"
  | "5"
  | "6"
  | "*"
  | "1"
  | "2"
  | "3"
  | "-"
  | "0"
  | "."
  | "="
  | "+"
  | "delmsg";

export enum EmbedLimits {
  Title = 256,
  Description = 4096,
  FieldName = 256,
  FieldValue = 1024,
  FooterText = 2048,
  AuthorName = 256,
}
