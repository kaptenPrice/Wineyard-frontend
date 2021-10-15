import React from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

const Highlights = ({ wineList }: HighlightsPropsType) => {
    return (
        <Autocomplete
            id='Highlight-wines'
            style={{ width: 300 }}
            options={wineList}
            //@ts-ignore
            getOptionLabel={(option) => option?.name}
            renderInput={(params) => <TextField {...params} label='Wines' variant='outlined' margin='normal' />}
            renderOption={(option, { inputValue }) => {
                //@ts-ignore
                const matches = match(option?.name, inputValue);
                //@ts-ignore
                const parts = parse(option?.name, matches);
                return (
                    <div>
                        {parts.map((part, index) => (
                            <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                {part.text}
                            </span>
                        ))}
                    </div>
                );
            }}
        />
    );
};

export default Highlights;

type HighlightsPropsType = {
    wineList: Array<object>;
};
