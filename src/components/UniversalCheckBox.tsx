import React, {ChangeEvent, useState} from 'react';
import {Checkbox} from "@mui/material";

type UniversalCheckBoxType = {
    checked: boolean
    callback: (checked: boolean) => void

}
export const UniversalCheckBox:React.FC<UniversalCheckBoxType> = ({checked, callback}) => {


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.checked)
    }

    return (
        <Checkbox
            checked={checked}
            color="primary"
            onChange={onChangeHandler}
        />
    );
};