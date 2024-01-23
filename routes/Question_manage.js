const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('Question_manage', { text: 'Hello World!' });
});

module.exports = router;