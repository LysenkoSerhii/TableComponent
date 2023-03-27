import styled from 'styled-components';

export const Backdrop = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  visibility: ${(props) => props.isOn ? 'visible' : 'hidden'};
  opacity: ${(props) => props.isOn ? 1 : 0};

  & > * {
    visibility: ${(props) => props.isOn ? 'visible' : 'hidden'};
    opacity: ${(props) => props.isOn ? 1 : 0};
  }
`;

export const Show = styled.div`
  visibility: visible;
  opacity: 1;
  z-index: 101;
  transition: all 0.4s ease;

  & > * {
    visibility: visible;
    opacity: 1;
  }
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  width: 100%;
  background: white;
  padding: 20px 24px;
  border-radius: 8px;
  top: 5vh;
  max-height: 90vh;
  overflow-y: auto;
`;

export const Header = styled.div`
  position: relative;
  color: rgba(0, 0, 0, 0.88);
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
  margin-bottom: 20px;
`;

export const ModalBody = styled.div`

`;

export const CloseIcon = styled.div`
  position: absolute;
  top: -10px;
  right: -15px;
  cursor: pointer;
  padding: 0 4px;
  color: rgba(0, 0, 0, 0.88);
  transition: all 0.4s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
    border-radius: 5px;
  }
`;
