import { Checkbox, CheckboxProps } from "antd";
import styled, { css } from "styled-components";

type CustomCheckboxProps = CheckboxProps & {
  backgroundColor?: string;
};
const CustomCheckbox: React.FC<CustomCheckboxProps> = styled(Checkbox)`
  ${(props) =>
    props.backgroundColor &&
    css`
      & .ant-checkbox-checked .ant-checkbox-inner {
        background-color: ${props.backgroundColor};
        border-color: ${props.backgroundColor};
      }
    `}
`;

export default CustomCheckbox;
