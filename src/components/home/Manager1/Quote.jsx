import React, {Fragment, useEffect, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {createTheme} from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider, ThemeProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {prefixer} from 'stylis'
import {InputAdornment, TextField} from "@mui/material";
import './../../../style/admin.css'
import api from "../../../api/api";
import {EnglishToPersian} from "../../../helper/EnglishToPersian";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {SeparateNumber} from "../../../helper/SeparateNumber";

// Create RTL MUI
const theme = createTheme({
    direction: 'rtl',
});

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

function RTL(props) {
    return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}

export default function Quote(props) {
    useEffect(() => {
        if (sessionStorage.getItem('role') !== "MANAGER") {
            sessionStorage.clear()
            props.history.push("/login")
        }
    }, [props.history]);

    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const constructor = () => {
        if (constructorHasRun) return;
        if (sessionStorage.getItem('role') !== "MANAGER") {
            sessionStorage.clear()
            window.location = ("/login")
        }
        setConstructorHasRun(true);
    };
    constructor()
    let [isOpen, setIsOpen] = useState(false)
    let [isOpenConfirm, setIsOpenConfirm] = useState(false)
    let [quoteBuyPrice, setQuoteBuyPrice] = useState(null)
    let [quoteSellPrice, setQuoteSellPrice] = useState(null)
    let [goldPriceHistory, setGoldPriceHistory] = useState([])

    useEffect(() => {
        const getData = async () => {
            const getGoldPriceReq = await api.get("quote")
            if (getGoldPriceReq) {
                setGoldPriceHistory(getGoldPriceReq)
            }
        }
        getData()
    }, []);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function closeModalConfirm() {
        setIsOpenConfirm(false)
        setIsOpen(true)
    }

    function openModalConfirm() {
        setIsOpen(false)
        setIsOpenConfirm(true)
    }

    async function recordNewPrice() {
        setIsOpenConfirm(false)
        await api.post("quote",
            {
                purchase : quoteBuyPrice,
                sell : quoteSellPrice
            }
        )

        const getGoldPriceReq = await api.get("quote")
        if (getGoldPriceReq) {
            setGoldPriceHistory(getGoldPriceReq)
        }
    }

    return (
        <div className="w-full bg-[#252525] mx-8 mt-8 p-4 rounded-lg overflow-scroll">
            <div className="flex flex-col space-y-4 md:flex-row items-center justify-between">
                <div className="text-white text-lg font-medium">مظنه</div>
                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md flex flex-row items-center bg-gold text-black px-4 py-2 text-sm font-medium  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="w-6 h-6 ml-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                    </svg>
                    ثبت مظنه جدید
                </button>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal} dir="rtl">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25"/>
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel
                                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-mainGray p-6 align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gold"
                                        >
                                            ثبت مظنه جدید
                                        </Dialog.Title>
                                        <div className="mt-6">
                                            <CacheProvider value={cacheRtl}>
                                                <ThemeProvider theme={theme}>
                                                    <div dir="rtl">
                                                        <div className="flex flex-col space-y-4">
                                                            <TextField
                                                                id="outlined-end-adornment"
                                                                name="price"
                                                                label="مظنه خرید"
                                                                value={quoteBuyPrice}
                                                                onChange={(e) => setQuoteBuyPrice(e.target.value)}
                                                                InputProps={{
                                                                    endAdornment: <InputAdornment position="end"><span
                                                                        style={{color: "#fff"}}>ریال</span></InputAdornment>,
                                                                }}
                                                                InputLabelProps={{
                                                                    style: {
                                                                        fontSize: "0.9rem"
                                                                    }
                                                                }}
                                                                sx={{
                                                                    label: {color: '#fff !important'},
                                                                    input: {color: '#fff !important'}
                                                                }}
                                                            />
                                                            <TextField
                                                                id="outlined-end-adornment"
                                                                name="price"
                                                                label="مظنه فروش"
                                                                value={quoteSellPrice}
                                                                onChange={(e) => setQuoteSellPrice(e.target.value)}
                                                                InputProps={{
                                                                    endAdornment: <InputAdornment position="end"><span
                                                                        style={{color: "#fff"}}>ریال</span></InputAdornment>,
                                                                }}
                                                                InputLabelProps={{
                                                                    style: {
                                                                        fontSize: "0.9rem"
                                                                    }
                                                                }}
                                                                sx={{
                                                                    label: {color: '#fff !important'},
                                                                    input: {color: '#fff !important'}
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </ThemeProvider>
                                            </CacheProvider>
                                        </div>
                                        <div className="mt-4">
                                            <div className="flex flex-row justify-evenly">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={openModalConfirm}
                                                >
                                                    ثبت
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={closeModal}
                                                >
                                                    بستن
                                                </button>
                                            </div>

                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                <Transition appear show={isOpenConfirm} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal} dir="rtl">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25"/>
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel
                                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-mainGray p-6 align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gold"
                                        >
                                            ثبت مظنه جدید
                                        </Dialog.Title>
                                        <div className="text-white mt-6">
                                            آیا از ثبت مظنه جدید مطمئن هستید؟
                                        </div>
                                        <div className="mt-4">
                                            <div className="flex flex-row justify-evenly">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-lime-400 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-lime-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={recordNewPrice}
                                                >
                                                    ثبت
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={closeModalConfirm}
                                                >
                                                    بستن
                                                </button>
                                            </div>

                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
            <table className='mt-8 text-white'>
                <thead>
                <tr>
                    <th className={'p-4'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"/>
                        </svg>
                    </th>
                    <th className={'p-4'}>تاريخ و ساعت</th>
                    <th className={'p-4'}>مظنه خرید</th>
                    <th className={'p-4'}>مظنه فروش</th>
                </tr>
                </thead>
                <tbody>
                {
                    goldPriceHistory.map((item, index) => (
                        <tr>
                            <td className={'p-3'}>{index + 1}</td>
                            <td className={'p-3'}>{EnglishToPersian(item.date)}</td>
                            <td className={'p-3'}>{EnglishToPersian(SeparateNumber(item.purchase))}</td>
                            <td className={'p-3'}>{EnglishToPersian(SeparateNumber(item.sell))}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}
