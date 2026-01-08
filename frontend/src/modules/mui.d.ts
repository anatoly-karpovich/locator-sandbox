import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface CodePalette {
    background: string;
    border: string;
    text: string;
    placeholder: string;
    caret: string;
    keyword: string;
    page: string;
    method: string;
    string: string;
    regex: string;
    number: string;
    comment: string;
    punctuation: string;
  }

  interface Palette {
    code: CodePalette;
  }

  interface PaletteOptions {
    code?: CodePalette;
  }
}
