import styled from "styled-components";

export const ArrowKeys = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 11px;
  height: auto;
`;

export const ArrowKeysRow = styled.div`
  display: flex;
  gap: 2px;
`;

export const ArrowUp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border: 2px solid #000;
  border-radius: 8px;
  background-color: #fff;
  font-size: 24px;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s, box-shadow 0.2s;
  flex: 1;
  margin-bottom: -10px;
  color: black;

  &:hover {
    background-color: #e0e0e0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

export const ArrowDown = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border: 2px solid #000;
  border-radius: 8px;
  background-color: #fff;
  font-size: 24px;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s, box-shadow 0.2s;
  flex: 1;
  color: black;

  &:hover {
    background-color: #e0e0e0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

export const ArrowLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border: 2px solid #000;
  border-radius: 8px;
  background-color: #fff;
  font-size: 24px;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s, box-shadow 0.2s;
  flex: 1;
  color: black;

  &:hover {
    background-color: #e0e0e0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

export const ArrowRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border: 2px solid #000;
  border-radius: 8px;
  background-color: #fff;
  font-size: 24px;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s, box-shadow 0.2s;
  flex: 1;
  color: black;

  &:hover {
    background-color: #e0e0e0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

export const ShootButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 75px;
  background-color: red;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.1s, box-shadow 0.1s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
  }
  &:active {
    transform: scale(0.95);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
`;