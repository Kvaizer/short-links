import React, {MouseEvent, useCallback} from 'react';
import {LinkType} from '../../../api/linksAPI';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import s from './Link.module.css'

type LinkItemPropsType = {
    link: LinkType
}

export const LinkItem: React.FC<LinkItemPropsType> = React.memo(({link}) => {
    const onShortClickHandler = useCallback((e: MouseEvent<HTMLTableCellElement>) => {
        navigator.clipboard.writeText('http://79.143.31.216/s/' + e.currentTarget.innerText)
    }, [])

    const onTargetClickHandler = useCallback((e: MouseEvent<HTMLTableCellElement>) => {
        navigator.clipboard.writeText(link.target)
    }, [])

    const cutLink = useCallback((link: string) => {
        if(link.length > 50) return `${link.slice(0, 51)}...`
        return link
    }, [])

    return (
        <TableRow key={link.id}>
            <TableCell
                title={link.target}
                className={s.targetCell}
                align="center"
                onClick={onTargetClickHandler}>
                {cutLink(link.target)}
            </TableCell>
            <TableCell
                className={s.shortCell}
                style={{width: 100}}
                align="center"
                onClick={onShortClickHandler}
                title='Click for copy'>
                {link.short}
            </TableCell>
            <TableCell
                style={{width: 100}}
                align="center">
                {link.counter}
            </TableCell>
        </TableRow>
    );
})

