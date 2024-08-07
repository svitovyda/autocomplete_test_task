import styled, { keyframes } from 'styled-components';

const RotateRing = keyframes`
  0% { transform: rotate(0) }
  100% { transform: rotate(360deg) }
`;

const RotateInner = keyframes`
  0% { transform: rotate(0) }
  100% { transform: rotate(-360deg) }
`;

const TextLoading = keyframes`
  0% { opacity: 0 }
  20% { opacity: 0 }
  50% { opacity: 1 }
  100% { opacity: 0 }
`;

export const LoaderContainer = styled.div`
  height: 50px;
  width: 50px;
  margin: 5px auto;
`;

export const LoaderRing = styled.div`
  position: relative;
  top: 0;
  left: 0;
  height: 50px;
  width: 50px;
  border-radius: 100%;
  border: 3px solid transparent;
  border-color: transparent lightgrey transparent lightgrey;
  animation: ${RotateRing} 2s linear 0s infinite normal;
  transform-origin: 50% 50%;
`;

export const LoaderRingInner = styled.div`
  position: relative;
  top: -52px;
  left: 5px;
  width: 43px;
  height: 43px;
  border-radius: 100%;
  border: 2px solid transparent;
  border-color: transparent lightgrey transparent lightgrey;
  animation: ${RotateInner} 1s linear 0s infinite normal;
  transform-origin: 50% 50%;
`;

export const LoaderTextContainer = styled.div`
  position: relative;
  top: -80px;
  left: -22px;
  width: 100px;
  user-select: none;
  animation: ${TextLoading} 3s linear 0s infinite normal;
  color: lightgrey;
  font:
    bold 8px 'Helvetica Neue',
    Helvetica,
    Arial,
    sans-serif;
  opacity: 0;
  text-align: center;
  text-transform: uppercase;
`;
