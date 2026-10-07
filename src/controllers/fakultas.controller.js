import FakultasModel from "../model/fakultas.model.js"
import { storeFakultasSchema, updateFakultasSchema } from "../schemas/fakultas.schema.js"
import { apiResponse, apiResponseValidation } from "../utils/response.js"

class FakultasController {
    static async index(req, res) {
        const listFakultas = await FakultasModel.find()
        return apiResponse({
            res,
            status: 200,
            message: "List Fakultas",
            data: listFakultas,
        })
    }

    static async show(req, res) {
        const fakultasId = req.params.id
        const fakultas = await FakultasModel.findById(fakultasId)

        if (!fakultas) {
            return apiResponse({ res, status: 404, message: 'Fakultas tidak ditemukan' })
        }

        return apiResponse({ res, status: 200, data: fakultas })
    }

    static async store(req, res) {
        const result = storeFakultasSchema.safeParse(req.body)

        if (!result.success) {
            return apiResponseValidation({
                res,
                errors: result.error
            })
        }

        const { name } = req.body
        
        const newFakultas = await FakultasModel.create({ name })
        return apiResponse({ res, status: 201, message: "Fakultas berhasil dibuat", data: newFakultas })
    }

    static async update(req, res) {
        const fakultasId = req.params.id
        const result = updateFakultasSchema.safeParse(req.body)

        if (!result.success) {
            return apiResponseValidation({
                res,
                errors: result.error
            })
        }

        const { name } = req.body

        const exists = await FakultasModel.exists({ _id: fakultasId })
        if (!exists) {
            return apiResponse({ res, status: 404, message: 'Fakultas tidak ditemukan' })
        }

        const updateFakultas = await FakultasModel.findOneAndUpdate(
            { _id: fakultasId },
            { name },
            { new: true }
        )

        return apiResponse({ res, status: 200, message: "Fakultas berhasil diupdate", data: updateFakultas })
    }

    static async delete(req, res) {
        const fakultasId = req.params.id

        const exists = await FakultasModel.exists({ _id: fakultasId })
        if (!exists) {
            return apiResponse({ res, status: 404, message: 'Fakultas tidak ditemukan' })
        }

        await FakultasModel.findOneAndDelete({ _id: fakultasId })
        return apiResponse({ res, status: 200, message: 'Fakultas berhasil dihapus', data: null })
    }
}

export default FakultasController