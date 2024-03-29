import React, {Fragment, useEffect, useState} from "react";
import MenuItem from '@mui/material/MenuItem';
import {Dialog, Transition} from "@headlessui/react";
import {CacheProvider} from "@emotion/react";
import {TextField} from "@mui/material";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {prefixer} from 'stylis';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {EnglishToPersian} from "../../../../helper/EnglishToPersian";
import {MdArrowBackIosNew} from "react-icons/md";
import {TbEdit} from "react-icons/tb";
import {BsTrashFill} from "react-icons/bs";
import api from "../../../../api/api";
import * as yup from "yup";
import {toast} from "react-toastify";
import Divider from "@mui/material/Divider";

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

export default function Address() {


    const [addresses, setAddresses] = useState([]);
    const [isOpenAddAddress, setIsOpenAddAddress] = useState(false)
    const [isOpenEditAddress, setIsOpenEditAddress] = useState(false)
    const [isOpenDeleteAddress, setIsOpenDeleteAddress] = useState(false)
    const [searchProvince,setSearchProvince] = useState("")
    const [searchCity,setSearchCity] = useState("")
    const [state, setState] = React.useState('');
    const [city, setCity] = React.useState('');
    const [addressContent, setAddressContent] = React.useState('');
    const [postalCode, setPostalCode] = React.useState('');
    const [targetProvince,setTargetProvince] = useState("")
    const [targetAddress, setTargetAddress] = React.useState({
        province: '',
        city: '',
        detail: '',
        postalCode: '',
        id: null
    });
    const [targetAddressByDelete, setTargetAddressByDelete] = React.useState('');
    const [stateList, setStateList] = useState([])
    const [cityList, setCityList] = useState([])

    const validation = async () => {
        const addressSchema = yup.object().shape({
            province: yup.string().required("لطفا استان مورد نظر را انتخاب کنید."),
            city: yup.string().required("لطفا شهر مورد نظر را انتخاب کنید."),
            detail: yup.string().required("لطفا آدرس  مورد نظر را وارد کنید"),
            postalCode: yup.string().required("لطفا کد پستی مورد نظر را وارد کنید.").min(10, "کد پستی نمی تواند کمتر از 10 رقم باشد."),
        })

        try {
            return await addressSchema.validate({
                province: state,
                city: city,
                detail: addressContent,
                postalCode: postalCode
            }, {abortEarly: false})
        } catch (error) {
            toast.info(error.errors[0], {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }


    const editAddressValidation = async () => {
        const addressSchema = yup.object().shape({
            province: yup.string().required("لطفا استان مورد نظر را انتخاب کنید."),
            city: yup.string().required("لطفا شهر مورد نظر را انتخاب کنید."),
            detail: yup.string().required("لطفا آدرس  مورد نظر را وارد کنید"),
            postalCode: yup.string().required("لطفا کد پستی مورد نظر را وارد کنید.").min(10, "کد پستی نمی تواند کمتر از 10 رقم باشد."),
        })

        try {
            return await addressSchema.validate(targetAddress, {abortEarly: false})
        } catch (error) {
            toast.info(error.errors[0], {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }
    const resetInputAddress = () =>{
        setState("")
        setCity("")
        setAddressContent("")
        setPostalCode("")
    }
    const getAddress = async () => {
        const getAddressResponse = await api.get(`info/show/address`)
        setAddresses(getAddressResponse)
    }
    useEffect(() => {
        getAddress()
    }, []);

    const getStateList = async () => {
        const getStateResponse = await api.get(`province/provinceName?stateName=`)
        setStateList(getStateResponse)
    }


    function closeModalAddAddress() {
        setIsOpenAddAddress(false)
    }

    function openModalAddAddress() {
        getStateList()
        setIsOpenAddAddress(true)
    }

    function closeModalEditAddress() {
        setIsOpenEditAddress(false)
    }

    async function openModalEditAddress(id) {
        const targetAddress = addresses.find(address => address.id === id)
        setTargetAddress(targetAddress);
        await getStateList()
        await getCityList(targetAddress.province)
        setIsOpenEditAddress(true)
    }

    function closeModalDeleteAddress() {
        setTargetAddressByDelete('');
        setIsOpenDeleteAddress(false)
    }

    async function openModalDeleteAddress(id) {
        setTargetAddressByDelete(id);
        setIsOpenDeleteAddress(true)
    }

    const handleChangeState = async (state) => {
        setState(state.target.value);
        setTargetProvince(state.target.value)
        await getCityList(state.target.value)
    };

    const getCityList = async (state) => {
        const getCityResponse = await api.get(`province/${state}/city?cityName=`)
        setCityList(getCityResponse)
    }

    const handleChangeCity = (event) => {
        setCity(event.target.value);
    };

    const addNewAddress = async () => {
        const valid = await validation();
        if (valid !== undefined) {
            await api.post("info/address", {
                province: state,
                city: city,
                detail: addressContent,
                postalCode: postalCode
            })
            getAddress();
            resetInputAddress();
            setIsOpenAddAddress(false)
        }
    }

    const onChangeInputEditAddress = async (e) => {
        setTargetAddress({
            ...targetAddress,
            [e.target.name]: e.target.value
        })

        if(e.target.name === "province"){
            await getCityList(e.target.value)
        }
    }

    const editAddress = async () => {
        const valid = await editAddressValidation();
        console.log(targetAddress)
        if (valid !== undefined) {
            await api.put(`info/update/address/${targetAddress.id}`, targetAddress)
            getAddress();
            setIsOpenEditAddress(false)
        }

    }

    const deleteAddress = async () => {
        await api.delete(`info/${targetAddressByDelete}`)
        getAddress();
        setIsOpenDeleteAddress(false)
    }

    const handleProvinceSearch = async (e) =>{
        console.log(e.target.value)
        setSearchProvince(e.target.value)
        const getStateResponse = await api.get(`province/provinceName?stateName=${e.target.value}`)
        setStateList(getStateResponse)
    }

    const handleCitySearch = async (e) =>{
        setSearchCity(e.target.value)
        const getCityResponse = await api.get(`province/${targetProvince}/city?cityName=${e.target.value}`)
        setCityList(getCityResponse)
    }
    return (
        <>
            <div className="flex flex-col space-y-4">
                <button
                    className="bg-gold text-black p-2 rounded-md w-fit flex flex-row items-center"
                    onClick={openModalAddAddress}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-4 h-4 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                    </svg>
                    افزودن آدرس
                </button>
                <Transition appear show={isOpenAddAddress} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModalAddAddress}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
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
                                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#303030] p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-center text-lg font-medium leading-6 text-white"
                                        >
                                            افزودن آدرس
                                        </Dialog.Title>
                                        <div className="mt-6" dir="rtl">
                                            <CacheProvider value={cacheRtl}>
                                                <div className="flex flex-col space-y-4 justify-center">
                                                    <Box sx={{minWidth: 120}}
                                                         className='flex flex-row space-x-4 space-x-reverse'>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="state-select-label" sx={{
                                                                color: '#fff',
                                                                "&.Mui-focused": {color: '#fff'}
                                                            }}>استان</InputLabel>
                                                            <Select
                                                                labelId="state-select-label"
                                                                id="state-select"
                                                                value={state}
                                                                label="استان"
                                                                onChange={handleChangeState}>
                                                                {/*<div>*/}
                                                                {/*    <TextField*/}
                                                                {/*        label={"جستوجو...."}*/}
                                                                {/*        value={searchProvince}*/}
                                                                {/*        type={"number"}*/}
                                                                {/*        style={{margin:"0.5rem 0.5rem"}}*/}
                                                                {/*        sx={{*/}
                                                                {/*            label: {color: '#fff !important'},*/}
                                                                {/*            input: {color: '#fff !important'}*/}
                                                                {/*        }}*/}
                                                                {/*        onChange={(e)=>{handleProvinceSearch(e)}}/>*/}
                                                                {/*</div>*/}
                                                                <Divider/>
                                                                {
                                                                    stateList.map((item, index) => (
                                                                        <MenuItem value={item}>{item}</MenuItem>
                                                                    ))
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="city-select-label" sx={{
                                                                color: '#fff',
                                                                textAlign: 'right',
                                                                "&.Mui-focused": {color: '#fff'}}}>شهر</InputLabel>
                                                            <Select
                                                                labelId="city-select-label"
                                                                id="city-select"
                                                                value={city}
                                                                label="شهر"
                                                                onChange={handleChangeCity}
                                                                sx={{textAlign: 'right'}}>
                                                                {/*<div>*/}
                                                                {/*    <TextField*/}
                                                                {/*        label={"جستوجو...."}*/}
                                                                {/*        value={searchCity}*/}
                                                                {/*        type={"number"}*/}
                                                                {/*        style={{margin:"0.5rem 0.5rem"}}*/}
                                                                {/*        sx={{*/}
                                                                {/*            label: {color: '#fff !important'},*/}
                                                                {/*            input: {color: '#fff !important'}*/}
                                                                {/*        }}*/}
                                                                {/*        onChange={(e)=>{handleCitySearch(e)}}/>*/}
                                                                {/*</div>*/}
                                                                <Divider/>
                                                                {
                                                                    cityList?.map((item, index) => (
                                                                        <MenuItem value={item}>{item}</MenuItem>
                                                                    ))
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                    <TextField
                                                        label={"آدرس"}
                                                        value={addressContent}
                                                        type={"text"}
                                                        sx={{
                                                            label: {color: '#fff !important'},
                                                            input: {color: '#fff !important'}
                                                        }}
                                                        onChange={(e) => setAddressContent(e.target.value)}
                                                    />
                                                    <TextField
                                                        label={"کد پستی"}
                                                        // error={errors.length !== 0}
                                                        /* disabled={!firstNameAllowed}*/
                                                        value={postalCode}
                                                        type={"number"}
                                                        sx={{
                                                            label: {color: '#fff !important'},
                                                            input: {color: '#fff !important'}
                                                        }}
                                                        onChange={(e) => setPostalCode(e.target.value)}
                                                    />
                                                </div>
                                            </CacheProvider>
                                        </div>
                                        <div className="mt-4 flex flex-row justify-center">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent ml-4 bg-gold text-black px-4 py-2 text-sm font-medium"
                                                onClick={addNewAddress}
                                            >
                                                ثبت
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-dark text-white px-4 py-2 text-sm font-medium"
                                                onClick={closeModalAddAddress}
                                            >
                                                بستن
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                    {addresses.map((address, index) => (
                        <div className="rounded-2xl p-2 bg-mainGray text-white p-7">
                            <div>
                                <div className="text-center mt-2 mb-5 text-gold ">
                                    <h3 className=" font-bold text-xl">آدرس
                                        {EnglishToPersian((index + 1).toString())}</h3>
                                </div>
                                <div className='flex flex-row items-center mb-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 text-gold">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                                    </svg>
                                    <div className="request-item-title text-gold ml-4">استان :</div>
                                    <div>{address.province}</div>
                                </div>
                                <div className='flex flex-row items-center mb-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 text-gold">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                                    </svg>
                                    <div className="request-item-title text-gold ml-4">شهر :</div>
                                    <div>{address.city}</div>
                                </div>
                                <div className='flex flex-row items-center mb-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 text-gold">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                                    </svg>
                                    <div className="request-item-title text-gold ml-4 ">کد پستی:</div>
                                    <div>{EnglishToPersian(address.postalCode?.toString())}</div>
                                </div>
                                <div className='flex flex-row flex-wrap items-center mb-2'>
                                    <MdArrowBackIosNew className={"text-gold"}/>
                                    <div className="request-item-title text-gold ml-4 ">آدرس :</div>
                                    <div className="text-[0.8rem]">{EnglishToPersian(address.detail?.toString())}</div>
                                </div>
                                <div className="mt-6 flex flex-row justify-center space-x-2 space-x-reverse">
                                    <button
                                        className='bg-transparent p-3 hover:bg-bgGray hover:bg-opacity-20 rounded-2xl'
                                        onClick={() => openModalEditAddress(address.id)}>
                                        <TbEdit className="text-gold" fontSize="1.5rem"/>
                                    </button>
                                    <button
                                        className='bg-transparent p-3 hover:bg-bgGray hover:bg-opacity-20 rounded-xl'
                                        onClick={() => openModalDeleteAddress(address.id)}>
                                        <BsTrashFill className="text-red-600" fontSize="1.5rem"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Transition appear show={isOpenEditAddress} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModalEditAddress}>
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
                                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#303030] p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-center text-lg font-medium leading-6 text-white"
                                        >
                                            ویرایش آدرس
                                        </Dialog.Title>
                                        <div className="mt-6" dir="rtl">
                                            <CacheProvider value={cacheRtl}>
                                                <div className="flex flex-col space-y-4 justify-center">
                                                    <Box sx={{minWidth: 120}}
                                                         className='flex flex-row space-x-4 space-x-reverse'>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="state-select-label" sx={{
                                                                color: '#fff',
                                                                "&.Mui-focused": {color: '#fff'}
                                                            }}>استان</InputLabel>
                                                            <Select
                                                                labelId="state-select-label"
                                                                id="state-select"
                                                                value={targetAddress.province}
                                                                label="استان"
                                                                name='province'
                                                                onChange={onChangeInputEditAddress}>
                                                                {
                                                                    stateList.map((item, index) => (
                                                                        <MenuItem value={item}>{item}</MenuItem>
                                                                    ))
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="city-select-label" sx={{
                                                                color: '#fff',
                                                                textAlign: 'right',
                                                                "&.Mui-focused": {color: '#fff'}
                                                            }}>شهر</InputLabel>
                                                            <Select
                                                                labelId="city-select-label"
                                                                id="city-select"
                                                                value={targetAddress.city}
                                                                label="شهر"
                                                                name='city'
                                                                onChange={onChangeInputEditAddress}
                                                                sx={{textAlign: 'right'}}
                                                            >
                                                                {
                                                                    cityList?.map((item, index) => (
                                                                        <MenuItem value={item}>{item}</MenuItem>
                                                                    ))
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                    <TextField
                                                        label={"آدرس"}
                                                        // error={errors.length !== 0}
                                                        /* disabled={!firstNameAllowed}*/
                                                        value={targetAddress.detail}
                                                        type={"text"}
                                                        sx={{
                                                            label: {color: '#fff !important'},
                                                            input: {color: '#fff !important'}
                                                        }}
                                                        name='detail'
                                                        onChange={onChangeInputEditAddress}
                                                    />
                                                    <TextField
                                                        label={"کد پستی"}
                                                        // error={errors.length !== 0}
                                                        /* disabled={!firstNameAllowed}*/
                                                        value={targetAddress.postalCode}
                                                        type={"number"}
                                                        sx={{
                                                            label: {color: '#fff !important'},
                                                            input: {color: '#fff !important'}
                                                        }}
                                                        name='postalCode'
                                                        onChange={onChangeInputEditAddress}
                                                    />
                                                </div>
                                            </CacheProvider>
                                        </div>
                                        <div className="mt-4 flex flex-row justify-center">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent ml-4 bg-gold text-black px-4 py-2 text-sm font-medium"
                                                onClick={editAddress}
                                            >
                                                ویرایش
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-dark text-white px-4 py-2 text-sm font-medium"
                                                onClick={closeModalEditAddress}
                                            >
                                                بستن
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
                <Transition appear show={isOpenDeleteAddress} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModalDeleteAddress}>
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
                                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#303030] p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-center text-lg font-medium leading-6 text-white"
                                        >
                                            حذف آدرس
                                        </Dialog.Title>
                                        <div className="mt-6 text-center text-white">
                                            آیا از حذف آدرس مطئن هستید؟
                                        </div>
                                        <div className="mt-4 flex flex-row justify-center">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent ml-4 bg-red-600 text-white px-4 py-2 text-sm font-medium"
                                                onClick={deleteAddress}>
                                                حذف
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-dark text-white px-4 py-2 text-sm font-medium"
                                                onClick={closeModalDeleteAddress}
                                            >
                                                بستن
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    );
}