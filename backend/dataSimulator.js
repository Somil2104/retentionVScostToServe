const fs = require('fs');
const moment = require('moment');

function generateRandomSales() {
    return Math.floor(Math.random() * 20000);
}
function generateData() {
    const stores = [1, 2];
    const depts = [1, 2];
    const weeks = Array.from({ length: 52 }, (_, i) => i + 1);

    const data = [];
    for (let store of stores) {
        for (let dept of depts) {
            for (let week of weeks) {
                data.push({
                    store,
                    dept,
                    week,
                    sales: generateRandomSales(),
                    date: moment().subtract(weeks.length - week, 'weeks').format('YYYY-MM-DD')
                });
            }
        }
    }

    return data;
}

function saveData() {
    const data = generateData();
    fs.writeFileSync('sales_data.json', JSON.stringify(data, null, 2));
}
setInterval(saveData, 3600);
saveData();
