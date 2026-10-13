import mongoose from "mongoose";
import FakultasModel from "../model/fakultas.model.js";
import ProdiModel from "../model/prodi.model.js";
import { StoreProdiSchema, UpdateProdiSchema } from "../schemas/prodi.schema.js";
import { apiResponse, apiResponseValidation } from "../utils/response.js";

class ProdiController {
    static async store(req, res) {
    const result = StoreProdiSchema.safeParse(req.body);

    if (!result.success) {
      return apiResponseValidation({ res, errors: result.error });
    }

    const { kode, nama_prodi, fakultas_id } = result.data;

    const isExists = await FakultasModel.exists({
      _id: new mongoose.Types.ObjectId(fakultas_id),
    });

    if (!isExists) {
      return apiResponse({ res, status: 404, message: "Fakultas tidak ada", data: null });
    }

    const newProdi = await ProdiModel.create({
      kode,
      nama_prodi,
      fakultas: fakultas_id,
    });

    return apiResponse({ res, status: 201, message: "Prodi berhasil di buat", data: newProdi });
  }
    static async index(req, res) {
    // .populate("fakultas") mengubah ID fakultas menjadi objek data fakultas lengkap
    const listProdi = await ProdiModel.find().populate("fakultas");

    return apiResponse({
      res,
      status: 200,
      message: "List prodi",
      data: listProdi,
    });
  }

    static async show(req, res) {
    const prodiId = req.params.id;
    const prodi = await ProdiModel.findById(prodiId).populate('fakultas');

    if (!prodi) {
      return apiResponse({ res, status: 404, message: "Prodi tidak ada", data: null });
    }

    return apiResponse({ res, status: 200, message: "Detail prodi", data : prodi });
  }

    static async update(req, res) {
    const prodiId = req.params.id;
    const result = UpdateProdiSchema.safeParse(req.body);

    if (!result.success) {
      return apiResponseValidation({ res, errors: result.error });
    }

    const prodi = await ProdiModel.findById(prodiId);
    if (!prodi) {
      return apiResponse({ res, status: 404, message: "Prodi tidak ada", data: null });
    }

    const { kode, nama_prodi, fakultas_id } = result.data;

    if (fakultas_id) {
      const isExists = await FakultasModel.exists({
        _id: new mongoose.Types.ObjectId(fakultas_id),
      });

      if (!isExists) {
        return apiResponse({ res, status: 404, message: "Fakultas tidak ada", data: null });
      }
    }

    const updatedProdi = await ProdiModel.findByIdAndUpdate(
      prodiId,
      { kode, nama_prodi, fakultas: fakultas_id },
      { new: true }
    ).populate("fakultas");

    return apiResponse({ res, status: 200, message: "Prodi berhasil diperbarui", data: updatedProdi });
  }

      static async delete(req, res) {
    const prodiId = req.params.id;
    const prodi = await ProdiModel.findById(prodiId);

    if (!prodi) {
      return apiResponse({ res, status: 404, message: "Prodi tidak ada", data: null });
    }

    await ProdiModel.findByIdAndDelete(prodiId);
    return apiResponse({ res, status: 200, message: "Prodi berhasil dihapus", data: null });
  }
}



export default ProdiController;