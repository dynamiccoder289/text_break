import styled from "@emotion/styled";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

export const MuiContentEditable = styled(ContentEditable)({
  minHeight: 300,
  width: "100%",
  padding: "0 8px",
  borderRadius: 5,
  paddingTop: 2,
  paddingLeft: 10,
  position: "relative",
  outline: "none",
  wordWrap: "break-word",
  overflowWrap: "break-word",
  hyphens: "auto",
  lineHeight: "1.6",
});

export const placeHolderSx = {
  position: "absolute",
  top: 15,
  left: 10,
  userSelect: "none",
  display: "inline-block",
  pointerEvents: "none",
};
