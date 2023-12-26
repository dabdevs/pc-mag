const yup = require('yup')

const productSchema = yup.object({
    name: yup.string().required("Name is required").min(10).max(150),
    description: yup.string().optional(),
    price: yup.number().integer().required(),
    images: yup.array(),
    formFactor: yup.string().required(),
    os: yup.string().required(),
    ram: yup.number().integer().required(),
    processor: yup.string().required(),
    display: yup.number().integer().required(),
    quantity: yup.number().integer().required(),
    diskType: yup.string().required(), 
    disk: yup.number().integer().required(),
    createdOn: yup.date().default(() => new Date())
});

module.exports = productSchema




