import React from 'react';
import {useTranslation} from 'react-i18next';
import {FormControl, MenuItem, Select, SelectChangeEvent} from '@mui/material';

export const LanguageSelect = () => {
    const {i18n} = useTranslation();
    const handleChange = async ({target: {value}}: SelectChangeEvent<string>) => {
        await i18n.changeLanguage(value);
    };

    return (
        <FormControl sx={{minWidth: 150}} size="small">
            <Select value={i18n.language} onChange={handleChange} displayEmpty>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="ru">Русский</MenuItem>
            </Select>
        </FormControl>
    );
};
