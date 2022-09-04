import React, {useCallback, useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getLinks, getTotalAmountOfLinks} from '../../store/reducers/short-links-reducer';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import {Paginator} from '../Pagination/Paginator';
import {LinkItem} from './Link/Link';
import LinkGenerator from '../LinkGenerator/LinkGenerator';
import {CounterSortType, ShortSortType, TargetSortType} from '../../api/linksAPI';
import { useNavigate } from 'react-router-dom';
import s from './ShortLinks.module.css'
import { setIsLoggedInFalse } from '../../store/reducers/auth-reducer';

const ShortLinks: React.FC = React.memo(() => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const links = useAppSelector(state => state.links.links)
    const totalAmountOfLinks = useAppSelector(state => state.links.totalAmountOfLinks)

    const [shortSort, setShortSort] = useState<ShortSortType | null>(null)
    const [counterSort, setCounterSort] = useState<CounterSortType | null>(null)
    const [targetSort, setTargetSort] = useState<TargetSortType | null>(null)

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    useEffect(() => {
         if(shortSort || counterSort || targetSort) {
            dispatch(getLinks({limit: rowsPerPage, offset: rowsPerPage * page, sortConfig: [shortSort, counterSort, targetSort]}))
        } else {
            dispatch(getLinks({limit: rowsPerPage, offset: rowsPerPage * page}))
        }
    }, [dispatch, rowsPerPage, page, shortSort, counterSort, targetSort])


    useEffect(() => {
        dispatch(getTotalAmountOfLinks({limit: 0, offset: 0}))
    }, [totalAmountOfLinks])

    const sortShortLinksHandler = useCallback(() => {
        if(shortSort === 'desc_short') setShortSort('asc_short')
        else setShortSort('desc_short')
    }, [shortSort])

    const sortCounter = useCallback(() => {
        if(counterSort === 'desc_counter') setCounterSort('asc_counter')
        else setCounterSort('desc_counter')
    }, [counterSort])

    const sortTargetLinksHandler = useCallback(() => {
        if(targetSort === 'desc_target') setTargetSort('asc_target')
        else setTargetSort('desc_target')
    }, [targetSort])

    const unsortHandler = useCallback(() => {
        setTargetSort(null)
        setCounterSort(null)
        setShortSort(null)
    }, [])


    const logoutHandler = () => {
        navigate('/login')
        localStorage.clear()
        // dispatch(setIsLoggedInFalse())
    }

    return (
        <div>
            <LinkGenerator/>
            <Paper className={s.table}>
                <div >
                    <TableContainer
                        component={Paper}
                        style={{marginBottom: '30px'}}>
                        <Table
                            sx={{minWidth: 300}}
                            aria-label="custom pagination table"
                            style={{tableLayout: 'fixed'}}>
                            <TableBody>
                                <TableRow style={{backgroundColor: 'rgb(184 245 213 / 54%)'}} >
                                    <TableCell
                                        align="center">
                                        Link (click on target for copy full link)
                                        <TableSortLabel
                                            onClick={sortTargetLinksHandler}
                                            active={true}
                                            direction={targetSort === 'desc_target' ? 'desc' : 'asc'}>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell
                                        align="center">
                                        ShortLink (click for copy)
                                        <TableSortLabel
                                            onClick={sortShortLinksHandler}
                                            active={true}
                                            direction={shortSort === 'desc_short' ? 'desc' : 'asc'}>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="center">
                                        Number of transitions
                                        <TableSortLabel
                                            onClick={sortCounter}
                                            active={true}
                                            direction={counterSort === 'desc_counter' ? 'desc' : 'asc'}>
                                        </TableSortLabel>
                                        <Button
                                            className={s.unsortBtn}
                                            variant={'contained'}
                                            onClick={unsortHandler}>
                                            UnSort
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                {links.map((link) => {
                                    return <LinkItem
                                        link={link}
                                        key={link.id}/>
                                })}
                            </TableBody>
                        </Table>
                        <Paginator
                            setPage={setPage}
                            page={page}
                            totalAmountOfItems={totalAmountOfLinks}
                            rowsPerPage={rowsPerPage}
                            setRowsPerPage={setRowsPerPage}/>
                    </TableContainer>
                </div>
            </Paper>
            <Button
                style={{marginLeft: '20px'}}
                variant={'contained'}
                color={'secondary'}
                onClick={logoutHandler}>
                LogOut
            </Button>
        </div>
    );
})

export default ShortLinks;