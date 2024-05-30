import styled from "styled-components";

export const ImageResponsive = styled.img<{
  xs: { width: string; height: string; }
  sm?: { width: string; height: string; }
  md?: { width: string; height: string; }
  lg?: { width: string; height: string; }
  xl?: { width: string; height: string; }
  xxl?: { width: string; height: string; }
}>`
  @media (min-width: 577px) and (max-width: 768px) {
    width: ${p => p.sm ? p.sm.width : p.xs.width};
    height: ${p => p.sm ? p.sm.height : p.xs.height};
  }
  @media (max-width: 576px) {
    width: ${p => p.xs ? p.xs.width : "100%"};
    height: ${p => p.xs ? p.xs.height : "100%"};
	}
`;