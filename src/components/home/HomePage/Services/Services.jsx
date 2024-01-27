import React, {useEffect, useState} from 'react';
import MainNavbar from "../MainNavbar";


const Services = () =>{
    return(
        <>
            <MainNavbar/>
            <div className="px-2 md:px-10">
                <div className="flex justify-center"><h2 className="heading-title-comment text-[2rem]">خدمـات</h2></div>
                <div className="flex justify-center m-0 md:m-10">
                    <p className="text-[0.8rem] md:text-[1rem] text-white items-center bg-mainGray bg-opacity-60 p-5  border rounded-2xl w-full md:w-2/3">
                        شرکت بنیان طلای بیست و چهار به عنوان اولین مجموعه ای جوان و خلاق دارای نگاه ارزش آفرین با رویکرد
                        نوآوری اجتماعی ، همواره خود را در معرض تغییرات جامعه قرار داده و از رشد همه جانبه و خلاقیت در
                        کسب و کارهای خود استقبال نموده و به روز بودن در امور معاملات و سرمایه گذاری در طلا را از اصلی
                        ترین پیش شرط های موفقیت سازمانی خود دانسته و همواره بدان نیز عمل نموده است. این شرکت با طراحی و
                        بنیانگذاری متخصصین داخلی از دانشگاه های تهران ، شهیدبهشتی و امیرکبیر تاسیس و از سال 1395 در
                        خدمات نوین این حوزه فعالیت خود را شروع و با استقرار نیروهای متخصص توانسته تا استراتژی های تجاری
                        و رویکرد نو آورانه را در همه ی اجزای سازمانی از ارزش های خود قرار دهد.
                        با توجه به فعالیت‌های مجازی، طلا24 سامانه ای کاملا هوشمند و همه فن حریف با محیطی ساده برای تمامی
                        اشخاص حقیقی و حقوقی راه اندازی و طراحی شده است تا لذت امنیت معامله و سرمایه گذاری طلا را در 24
                        ساعت شبانه روز برای افراد با هر سطح از توانایی مالی و به صورت خرد را تجربه و سرمایه با ارزش خود
                        را در برابر نوسان قیمت ها محفوظ نمایید.
                        بنیانگذاران طلا24 از ابتدای فعالیت این استارت آپ مجوزهای لازم را برای فعالیت قانونی تهیه کرده
                        اند.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Services;