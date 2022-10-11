const { Link } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const QRCode = require('qrcode');

module.exports = async (req, res) => {
    console.log(req.body);
    const schema = {
        url: 'url|empty:false',
        short: 'string|optional',
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate,
        });
    }

    let { url, short } = req.body;

    if (short) {
        const oldLink = await Link.findOne({
            where: { short: short },
        })

        if (oldLink) {
            return res.status(404).json({
                status: 'error',
                message: [{
                    field: 'short',
                    message: 'short link already exists'
                }]
            });
        }
    } else {
        short = Math.random().toString(36).substring(2, 7);
    }

    const token = req.headers?.authorization;
    let userId = null
    if (token != undefined) {
        const decoded = jwt.verify(token, JWT_SECRET);
        userId = decoded.user.id;
    }

    const link = await Link.create({
        url: url,
        short: short,
        user_id: userId,
    });

    QRCode.toFile(`./public/images/qr/${link.id}.png`, `${process.env.BASE_URL}/${link.short}`, { type: 'png', errorCorrectionLevel: 'M', width: 300, margin: 1 });

    return res.status(201).json({
        status: 'success',
        data: link
    });
}