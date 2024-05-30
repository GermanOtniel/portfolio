import { Row } from "rsuite";
import styled from "styled-components";

export const RowResponsive = styled(Row)`
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 576px) {
    width: 100%;
    flex-direction: column;
    gap: 10px;
    padding: 0px 10px;
	}
`;