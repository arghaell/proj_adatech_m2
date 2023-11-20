try {
    const inputPhone = document.querySelector(".phone-mask");
    IMask(inputPhone, { mask: '(00) 0 0000-0000' });
} catch (error) {
    console.error(error);
}