import styled from "styled-components";

export const TitleStyled = styled.h1<{ 
  align?: React.CSSProperties["textAlign"]; 
}>`
  font-size: 3.5rem;
  margin: 0px 0px;
  font-weight: bolder;
  text-align: ${props => props.align ? props.align : "left"};
  @media (max-width: 1000px) {
    font-size: 2.5rem;
    line-height: 40px;
	}
  @media (max-width: 600px) {
    font-size: 2rem;
    line-height: 35px;
	}
`;

export const ParagraphStyled = styled.p<{
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  bold?: boolean;
}>`
  margin: 0px;
  font-weight: ${props => props.bold ? "bolder" : "normal"};
  font-size: ${props => {
    let size = "1rem";
    switch (props.size) {
      case "xs":
        size = ".8rem";
        break;

      case "sm":
        size = "1rem";
        break;

      case "md":
        size = "1.2rem";
        break;

      case "lg":
        size = "1.4rem";
        break;

      case "xl":
        size = "1.6rem";
        break;

      case "2xl":
        size = "2rem";
        break;

      case "3xl":
        size = "2.5rem";
        break;
    
      default:
        break;
    }
    return size;
  }};
`;