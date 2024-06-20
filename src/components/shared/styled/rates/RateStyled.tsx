import { Rate } from "rsuite";
import styled from "styled-components";

type IRateResponsiveValues = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export const RateResponsive = styled(Rate)<{ visible: IRateResponsiveValues[] }>`
  @media (min-width: 0px) and (max-width: 576px) {
    display: ${(p) => p.visible.includes("xs") ? "" : "none"};
	}

  @media (min-width: 576px) and (max-width: 767px) {
    display: ${(p) => p.visible.includes("sm") ? "" : "none"};
	}

  @media (min-width: 768px) and (max-width: 991px) {
    display: ${(p) => p.visible.includes("md") ? "" : "none"};
	}

  @media (min-width: 992px) and (max-width: 1199px) {
    display: ${(p) => p.visible.includes("lg") ? "" : "none"};
	}

  @media (min-width: 1200px) and (max-width: 1399px) {
    display: ${(p) => p.visible.includes("xl") ? "" : "none"};
	}

  @media (min-width: 1400px) {
    display: ${(p) => p.visible.includes("xxl") ? "" : "none"};
	}
`;