const yup = require('yup')

const userCreationSchema = yup.object({
    username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    role: yup.string().required('User role is required').oneOf(['user', 'admin', 'superadmin'], 'Invalid user role'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phoneNumber: yup.string().matches(/^\d{10}$/, 'Invalid phone number'),
    createdOn: yup.date().default(() => new Date(), 'Default value for createdOn'),
});

module.exports = userCreationSchema