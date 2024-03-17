const yup = require('yup')

const computerSchema = yup.object({
    name: yup.string().required("Name is required").min(10).max(150),
    description: yup.string().nullable(),
    price: yup.number().integer().required(),
    images: yup.array(),
    formFactor: yup.string().required(),
    os: yup.string().required(),
    ram: yup.string().required(),
    processor: yup.string().required(),
    display: yup.number().integer().required(),
    quantity: yup.number().integer().required(),
    diskType: yup.string().required(), 
    disk: yup.string().required(),
    createdOn: yup.date().default(() => new Date())
});

module.exports = computerSchema




