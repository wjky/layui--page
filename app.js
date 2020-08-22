const express = require('express')
const mockjs = require('mockjs');
const app = express()
const port = 3000

app.use(express.static('public'))

let data = mockjs.mock({
    'list|100': [
        {
            'id|+1':0,
            'title': '@csentence'
        }
    ]
});
console.log(data);

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/news', (req,res) => {
    console.log(req.query); // { curr: '1', limit: '10' }
    let curr = Number(req.query.curr);
    let limit = Number(req.query.limit);

    let start = (curr-1) * limit;
    let end = curr * limit;
    // 1,10  0=>10
    // 2,10  10=>20
    // 3,10  20=>30
    res.send(data.list.slice(start,end))
})
app.listen(port, () => console.log(`Example app listening on port port!`))