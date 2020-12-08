import { FieldAttributes } from "formik";
import React, { createElement } from "react";
import { SC } from "./styles";

type IconInputProps = {
    validate?: boolean;
};

const IconInput = ({
    validate,
    ...props
}: IconInputProps & FieldAttributes<any>) => {
    return (
        <>
            <SC.Container>
                <SC.IconContainer>a</SC.IconContainer>
                <SC.Input {...props} />
            </SC.Container>

            {validate ? <SC.Error name={props.name} component="div" /> : null}
        </>
    );
};

export default IconInput;