import moment from 'moment';

function mostViewSort(data) {
    let initial = 0;
    let secondFirst = Math.floor(data.length / 2) - 1;
    const results = [];
    data.forEach((item, i) => {
        if (i % 2) {
            secondFirst += 1;
            results.push({ ...data[secondFirst], id: secondFirst + 1 });
        } else {
            initial += 1;
            results.push({ ...data[initial], id: initial });
        }
    });
    return results;
}

function formatDate(date) {
    return moment(date).format('LL');
}
export { mostViewSort, formatDate };
