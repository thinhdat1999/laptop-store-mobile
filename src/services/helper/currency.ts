export const formatCurrency = (value: number) => {
    let re = /(\d)(?=(\d{3})+(?!\d))/g;

    return value.toString().replace(re,"$1.");
};