import React, {ChangeEvent, MouseEvent, useCallback, useState} from 'react';
import {TextField} from '@mui/material';
import Button from '@mui/material/Button';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {clearCurrentShortLink, squeezeLink} from '../../store/reducers/short-links-reducer';
import s from './LinkGenerator.module.css'

const LinkGenerator: React.FC = React.memo(() => {
    const dispatch = useAppDispatch()

    const token = useAppSelector(state => state.auth.accessToken)
    const currentShortLink = useAppSelector(state => state.links.currentShortLink)

    const template = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/
    const [userLink, setUserLink] = useState('')
    const [error, setError] = useState('')

    const onShortClickHandler = useCallback((e: MouseEvent<HTMLDivElement>) => {
        navigator.clipboard.writeText('http://79.143.31.216/s/' + e.currentTarget.innerText)
    }, [])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value.trim()
        setUserLink(newValue)
        if (!template.test(newValue)) {
            setError('Not valid')
            console.log(error)
            return
        } else {
            setError('')
        }
    }

    const onClickHandler = () => {
        dispatch(clearCurrentShortLink())
        dispatch(squeezeLink({token, link: userLink}))
    }

    return (
        <div className={s.box}>
            <TextField
                className={s.input}
                label='Enter your full link'
                margin='normal'
                required
                onChange={onChangeHandler}
                helperText={error ? error : ''}
                error={!!error}/>
            <Button
                className={s.btn}
                variant={'contained'}
                onClick={onClickHandler}
                type={'button'}
                disabled={!!error}>
                Generate short link
            </Button>
            <div
                title='Click for copy'
                onClick={onShortClickHandler}
                className={s.shortLink}>
                {currentShortLink}
            </div>
        </div>
    );
})

export default LinkGenerator;