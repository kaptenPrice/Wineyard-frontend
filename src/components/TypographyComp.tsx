import React from 'react';
import { Typography as OrgTypography, TypographyProps } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const TypographyComp = ({ transKey, children, ...props }: TypographyPropsType) => {
    const { t } = useTranslation();
    return <OrgTypography {...props}>{transKey ? t(transKey) : children}</OrgTypography>;
};

export default TypographyComp;

interface TypographyPropsType extends TypographyProps {
    transKey?: string;
}
