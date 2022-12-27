import styled from 'styled-components'

export const Wrapper = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  min-height: 100vh
`;


export const From = styled.form`
  border: 1px solid #eee;
  padding: 10px;
  width: 360px;
`;

export const Label = styled.label`
  display: flex;
  margin: 14px 0;
`;

export const Input = styled.input`
  width: 100%;
  line-height: 42px;
  border: 1px solid #eee;
  padding: 0 10px;
`;

export const Button = styled.button`
  width: 100%;
  background: #ff4545;
  color: #fff;
  font-weight: bold;
  border: none;
  line-height: 42px;
  cursor: pointer;
`;

export const Notification = styled.div`
  padding: 10px;
  border: 1px solid #eee;
  margin-bottom: 20px;

  &:empty {
    display: none;
  }
`;

export const Header = styled.div`
  fonnt-size: 24px;
`;