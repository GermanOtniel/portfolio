import { Button } from "rsuite"
import styled from "styled-components"
import { IThemeState } from "../../../../context/themeContext/Theme.Context";

export const MainButton = styled(Button)<{ theme: IThemeState["theme"] }>`
  border-color: ${p => p.theme === "dark" ? "#00ffff" : "#ff0000"};
  color: ${p => p.theme === "dark" ? "#00ffff;" : "white"};
  background-color: ${p => p.theme === "dark" ? "transparent;" : "#ff0000"};
  font-weight: ${p => p.theme === "dark" ? "normal" : "bold"};
  &:hover {
    border: 2px solid ${p => p.theme === "dark" ? "#00ffff" : "#ff0000"};
    color: ${p => p.theme === "dark" ? "#00ffff;" : "white"}
    outline: thin dotted;
    outline: 1px auto ${p => p.theme === "dark" ? "#00ffff" : "#ff0000"};
    background-color: ${p => p.theme === "dark" ? "transparent;" : "#ff0000"};
    color: ${p => p.theme === "dark" ? "#00ffff;" : "white"};
  }
  &:focus {
    border: 2px solid ${p => p.theme === "dark" ? "#00ffff" : "#ff0000"};
    color: ${p => p.theme === "dark" ? "#00ffff;" : "white"}
    outline: thin dotted;
    outline: 1px auto ${p => p.theme === "dark" ? "#00ffff" : "#ff0000"};
    background-color: ${p => p.theme === "dark" ? "transparent;" : "#ff0000"};
    color: ${p => p.theme === "dark" ? "#00ffff;" : "white"};
  }
  &:active {
    border: 2px solid ${p => p.theme === "dark" ? "#00ffff" : "#ff0000"};
    color: ${p => p.theme === "dark" ? "#00ffff;" : "white"}
    outline: thin dotted;
    outline: 1px auto ${p => p.theme === "dark" ? "#00ffff" : "#ff0000"};
    background-color: ${p => p.theme === "dark" ? "transparent;" : "#ff0000"};
    color: ${p => p.theme === "dark" ? "#00ffff;" : "white"};
  }
`;

export const ButtonResponsive = styled(Button)<{ theme: IThemeState["theme"] }>`
  @media (max-width: 576px) {
    &:after {
      content: "";
    }
	}
  @media (min-width: 577px) {
    .btn-responsive-show {
      display: none;
    }
    &:after {
      content: "Autofill";
    }
	}
`;