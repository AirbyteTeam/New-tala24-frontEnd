import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import api from "../../../../api/api";

function UserTicket(props) {
    useEffect(() => {
        if (localStorage.getItem('role') !== "USER") {
            localStorage.clear()
            props.history.push("/login")
        }
    }, [props.history]);

    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const constructor = () => {
        if (constructorHasRun) return;
        if (localStorage.getItem('role') !== "USER") {
            localStorage.clear()
            window.location = ("/login")
        }
        setConstructorHasRun(true);
    };
    constructor()

    const [title, setTitle] = useState("");
    const getTickets = async () => {
        const getTicketsResponse = await api.get(`ticket/search?userId=${localStorage.getItem("username")}`)
        setTickets(getTicketsResponse)
    }

    useEffect(() => {
        getTickets()
    }, []);

    const [tickets, setTickets] = useState([])
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmitTicket = async () => {
        const accountResponse = await api.get(`account/user/${localStorage.getItem("username")}`)
        await api.post("ticket", {
            accountId: accountResponse.id,
            userId: localStorage.getItem("username"),
            title: title,
            status: "pending"
        })
        getTickets()
        handleClose()

    }


    return (
        <div className="mx-9 mt-5 text-white bg-[#141414] mt-10 rounded-[8px] p-5 font-bold">
            <div className="flex flex-row justify-between items-center mb-6">
                <h2 className="text-xl font-medium">
                    سوابق تیکت ها
                </h2>
                <button  className='bg-gold text-black px-2 py-1 font-normal rounded hover:cursor-pointer transition' onClick={handleClickOpen}>ثبت تیکت جدید</button>
                <Dialog open={open} onClose={handleClose} PaperProps={{
                        style: {
                            backgroundColor: '#303030',
                            color:"#fff"
                        },}}>
                    <DialogTitle>عنوان تیکت</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <span className="text-white">لطفا عنوان تیکت خود را وارد کنید</span>
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            id="name"
                            label=""
                            type="text"
                            fullWidth
                            value={title}
                            variant="standard"
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <div className="flex justify-center w-full">
                            <button onClick={handleSubmitTicket} className="text-black bg-gold p-2 rounded mx-2">
                                ثبت تیکت
                            </button>
                            {/*<Button onClick={handleClose}>ثبت تیکت</Button>*/}
                            <button onClick={handleClose} className="bg-dark p-2 rounded mx-2">بستن</button>
                        </div>

                    </DialogActions>
                </Dialog>
            </div>

            <div className="table w-full shadow-sm overflow-hidden">
                <div className="table-header-group bg-[#2a2a2a] font-medium shadow-sm overflow-hidden">
                    <div className="table-row">
                        <div className="table-cell p-4 rounded-r-lg">#</div>
                        <div className="table-cell p-4">عنوان</div>
                        <div className="table-cell p-4">وضعیت</div>
                        <div className="table-cell p-4">تاریخ</div>
                        <div className="table-cell p-4 rounded-l-lg">عملیات</div>
                    </div>
                </div>
                <div className="table-row-group p-4 text-sm font-medium">
                    {
                        tickets.map((t, i) => (
                            <div className="table-row text-white transition">
                                <div
                                    className="table-cell border-b-[1px] border-[#ddd] border-solid px-2 py-3">{i + 1}</div>
                                <div
                                    className="table-cell border-b-[1px] border-[#ddd] border-solid px-2 py-3">{t.title}</div>
                                <div
                                    className="table-cell border-b-[1px] border-[#ddd] border-solid px-2 py-3">{
                                    t.status === "pending" ? "در حال بررسی" : t.status === "answered" ? "پاسخ داده شده" : null
                                }</div>
                                <div

                                    className="table-cell border-b-[1px] border-[#ddd] border-solid px-2 py-3">{t.date}</div>
                                <div
                                    className="table-cell border-b-[1px] border-[#ddd] border-solid px-2 py-3">
                                    <Link to={t.id}>
                                        <button
                                            className='bg-gold text-black px-2 py-1 font-normal rounded hover:cursor-pointer transition'>مشاهده
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default UserTicket