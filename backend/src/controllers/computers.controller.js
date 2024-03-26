require('dotenv').config()
const { ObjectId } = require('mongodb')
const Computer = require('../models/Computer')
const Processor = require('../models/Processor');
const OperativeSystem = require('../models/OperativeSystem');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const S3Service = require('../services/s3');
const s3 = new S3Service()

module.exports.getAll = async (req, res) => {
    try {
        const conditions = {status: 'Published'}

        // Filters
        const { category, search, formFactor, ram, os, processor, disk, diskType, minPrice, maxPrice, page = 1, limit = process.env.RESULTS_ROWS_COUNT, orderBy } = req.query

        if (category) {
            conditions.category = category
        }

        if (search) {
            conditions.name = { '$regex': search, '$options': 'i' }
        }

        if (formFactor) {
            conditions.formFactor = Array.isArray(formFactor) ? { '$in': formFactor } : formFactor
        }

        if (ram && ram.length > 0) {
            conditions.ram = Array.isArray(ram) ? { '$in': ram } : ram
        }

        if (os && os.length > 0) {
            conditions.os = Array.isArray(os) ? { '$in': os } : os
        }

        if (processor && processor.length > 0) {
            conditions.processor = Array.isArray(processor) ? { '$in': processor } : processor
        }

        if (diskType && diskType.length > 0) {
            conditions.diskType = Array.isArray(diskType) ? { '$in': diskType } : diskType
        }

        if (disk && disk.length > 0) {
            conditions.disk = Array.isArray(disk) ? { '$in': disk } : disk
        }

        if (maxPrice) {
            conditions.price = { $lte: parseInt(maxPrice) * 100 }
        }

        if (minPrice) {
            conditions.price = { $gte: parseInt(minPrice) * 100 }
        }

        if (minPrice && maxPrice) {
            conditions.price = { $gte: parseInt(minPrice) * 100, $lte: parseInt(maxPrice) * 100 }
        }

        let sort = { createdAt: -1 }

        if (orderBy) {
            sort = { price: orderBy === 'lowest-price' ? 1 : -1 }
        }

        const [computers, rowsCount] = await Promise.all([
            Computer.aggregate([
                { $match: conditions },
                { $sort: sort },
                { $skip: (Number(page) - 1) * limit },
                { $limit: Number(limit) }
            ]),
            Computer.countDocuments(conditions)
        ]);
        return res.status(200).json({
            computers,
            rowsCount,
            totalPages: Math.ceil(rowsCount / limit),
            currentPage: Number(page)
        });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
}

module.exports.getOne = async (req, res) => {
    try {
        const id = req.params.id
        const computer = await Computer.findOne({ _id: new ObjectId(id) })

        if (!computer) {
            res.status(404).json({ message: "Computer not found!" })
        }

        const similarComputers = await Computer.find({
            _id: { $ne: new ObjectId(id) },
            $or: [
                { processor: computer.processor },
                { disk: computer.disk },
                { ram: computer.ram }
            ]
        }).limit(6)

        res.json({ computer, similarComputers })
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
}
