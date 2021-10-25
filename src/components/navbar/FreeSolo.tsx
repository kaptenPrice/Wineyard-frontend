import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const FreeSolo = ({ list, TextFieldProps }: HighlightsPropsType) => {
    return (
        <Autocomplete
            freeSolo
            style={{ width: 300 }}
            options={list}
            getOptionLabel={(option) => option.name}
            //@ts-ignore
            onChange={(_,option) => console.log('option', option._id)}
            renderInput={(params) => (
                <TextField
                    label='Wines'
                    variant='outlined'
                    margin='normal'
                    InputProps={{ ...params.InputProps }}
                    {...TextFieldProps}
                    {...params}
                />
            )}
            ListboxProps={(onclick = () => console.log('Click'))}
        />
    );
};

export default FreeSolo;

type HighlightsPropsType = {
    list: Array<{ name: string }>;
    TextFieldProps: TextFieldProps;
    // onClick:(e:any)=>void
};
