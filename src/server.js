const express = require('express');
const cors = require('cors');
const firebase = require('firebase');
const Joi = require('joi');
require('firebase/firestore');
const firebaseConfig = require('../firebaseConfig');

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const app = express();
app.use(cors());
app.use(express.json());

// Mengambil semua data obat
app.get('/drugs', async (req, res) => {
  try {
    const snapshot = await db.collection('drugs').get();
    const drugs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({
      data: drugs,
      message: 'Data obat berhasil diambil',
      code_respon: 200,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Terjadi kesalahan saat mengambil data obat',
      code_respon: 500,
    });
  }
});

// Mendapatkan detail obat berdasarkan ID
app.get('/drugs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const drugDoc = await db.collection('drugs').doc(id).get();
    if (!drugDoc.exists) {
      res.status(404).json({
        error: 'Drug not found',
        message: 'Obat tidak ditemukan',
        code_respon: 404,
      });
    } else {
      const drugData = drugDoc.data();
      res.json({
        data: {
          id: drugDoc.id,
          ...drugData,
        },
        message: 'Data obat berhasil ditemukan',
        code_respon: 200,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Terjadi kesalahan saat mengambil detail obat',
      code_respon: 500,
    });
  }
});

// Menambahkan obat baru
// Menambahkan obat baru atau memperbarui stok obat yang ada
app.post('/drugs', async (req, res) => {
  try {
    const { error } = validateDrug(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'Data obat tidak valid',
        code_respon: 400,
      });
    }

    const { nama, jenis, stok, expired } = req.body;

    const existingDrugSnapshot = await db.collection('drugs').where('nama', '==', nama).get();
    if (!existingDrugSnapshot.empty) {
      // Obat sudah ada, perbarui stoknya
      const existingDrugDoc = existingDrugSnapshot.docs[0];
      const existingDrugData = existingDrugDoc.data();
      const updatedDrug = {
        ...existingDrugData,
        stok: existingDrugData.stok + stok, // tambahkan stok baru ke stok yang ada
      };
      await db.collection('drugs').doc(existingDrugDoc.id).set(updatedDrug, { merge: true });
      res.json({
        data: {
          id: existingDrugDoc.id,
          ...updatedDrug,
        },
        message: 'Stok obat berhasil diperbarui',
        code_respon: 200,
      });
    } else {
      // Obat belum ada, tambahkan sebagai obat baru
      const newDrug = {
        nama,
        jenis,
        stok,
        expired,
      };
      const docRef = await db.collection('drugs').add(newDrug);
      res.json({
        data: {
          id: docRef.id,
          ...newDrug,
        },
        message: 'Obat berhasil ditambahkan',
        code_respon: 200,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Terjadi kesalahan saat menambahkan atau memperbarui obat',
      code_respon: 500,
    });
  }
});

// Memperbarui detail obat berdasarkan ID
app.put('/drugs/:id', async (req, res) => {
  try {
    const { error } = validateDrug(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'Data obat tidak valid',
        code_respon: 400,
      });
    }

    const { id } = req.params;
    const { nama, jenis, stok, expired } = req.body;
    const updatedDrug = {
      nama,
      jenis,
      stok,
      expired,
    };
    await db.collection('drugs').doc(id).set(updatedDrug, { merge: true });
    res.json({
      data: {},
      message: 'Data obat berhasil diperbarui',
      code_respon: 200,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Terjadi kesalahan saat memperbarui detail obat',
      code_respon: 500,
    });
  }
});

// Menghapus data obat berdasarkan ID
app.delete('/drugs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('drugs').doc(id).delete();
    res.json({
      data: {},
      message: 'Data obat berhasil dihapus',
      code_respon: 200,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Terjadi kesalahan saat menghapus data obat',
      code_respon: 500,
    });
  }
});

// Fungsi validasi untuk data obat
function validateDrug(drug) {
  const schema = Joi.object({
    nama: Joi.string().required(),
    jenis: Joi.string().required(),
    stok: Joi.number().required(),
    expired: Joi.string().required(),
  });

  return schema.validate(drug);
}

// Menjalankan server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
