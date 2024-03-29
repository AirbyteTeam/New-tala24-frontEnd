import React from 'react';
import MainNavbar from "../MainNavbar";


const AboutUs = () => {
    return (
        <>
            <MainNavbar/>
            <div className="px-2 md:px-10">
                <div className="flex justify-center"><h2 className="heading-title-comment text-[2rem]">درباره ما</h2></div>
                <div className="flex justify-center m-0 md:m-10">
                    <p className="text-[0.8rem] md:text-[1rem] text-white items-center bg-mainGray bg-opacity-60 p-5  border rounded-2xl w-full md:w-2/3">
                        شرکت بنیان طلای بیست و چهار معاملات طلا فعالیت خود را در پارک علم وار به عنوان اولین استارت
                        فناوری دانشگاه شهیدبهشتی آغاز نموده است و با راه‌اندازی سامانه آنلاین خرید و فروش طلا ،
                        فعالیت‌های خود را به دنیای کسب‌وکارهای آنلاین و مبتنی بر اینترنت نیز گسترش داده و افراد با پس
                        اندازکردن طلا، در بازار طلا و جواهر کشور سرمایه گذاری می کنند و در بلند مدت باعث رشد اقتصادی
                        فردی و اجتماعی شخصیت های حقیقی و حقوقی ، اشتغال زایی و حمایت از تولید ملی می شوند؛ همچنین طلا24
                        در نظر دارد که بازار طلای پناور کشور ایران را با استراتژی تعیین شده به هم متصل و معاملات کاذب که
                        باعث اختلاف در قیمت های عرضه شده میشود را حذف نماید.
                    </p>
                </div>
            </div>
        </>
    )
}

export default AboutUs;