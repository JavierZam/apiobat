# Instalasi

Clone repository ini dengan perintah berikut:.\
`git clone https://github.com/JavierZam/apiobat`

Masuk ke dalam direktori repository dengan perintah:.\
`cd apiobat`

Jalankan perintah berikut untuk menginstall dependency:.\
`npm install`

Buat file firebaseConfig.js yang berisikan 

```
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID',
};

module.exports = firebaseConfig;
```

Pastikan untuk mengganti your-api-key, your-auth-domain, your-project-id, your-storage-bucket, 
your-messaging-sender-id, your-app-id dan your_measurement_id dengan nilai yang sesuai dari akun Firebase Anda.

# Endpoints

| Method | Endpoint           | Handler                                  |
| ------ | ------------------ | ---------------------------------------- |
| GET    | /drugs             | getAllDrugs()                            |
| GET    | /drugs/:id	        | getDrugById()                            |
| POST   | /drugs             | createOrUpdateDrug()                     |
| PUT    | /drugs/:id         | updateDrug()                             |
| DELETE | /drugs/:id         | deleteDrug()                             |

# GET /drugs
Mengambil semua data obat dari database.

Response:

Success (200):
```json
{
  "data": [
    {
      "id": "1Qb597g5eG1OXxj01qqD",
      "nama": "Loratadine 10mg",
      "jenis": "Gastrointestinal",
      "stok": 50,
      "expired": "Exp. Sept'23"
    },
    {
      "id": "5vixfbmPJTOeiMpO1mJt",
      "nama": "Mefenamic Acid 500 mg",
      "jenis": "Antiinflamasi",
      "stok": 70,
      "expired": "Exp. Jun'23"
    }
    // other drugs...
  ],
  "message": "Data obat berhasil diambil",
  "code_respon": 200
}

```
Error (500):
```json
{
  "error": "Terjadi kesalahan saat mengambil data obat",
  "message": "Terjadi kesalahan saat mengambil data obat",
  "code_respon": 500
}

```

# GET /drugs/:id
Mengambil detail obat berdasarkan ID.

Response:

Success (200):
```json
{
  "data": {
    "id": "1Qb597g5eG1OXxj01qqD",
    "nama": "Loratadine 10mg",
    "jenis": "Gastrointestinal",
    "stok": 50,
    "expired": "Exp. Sept'23"
  },
  "message": "Data obat berhasil ditemukan",
  "code_respon": 200
}
```
Error (404):
```json
{
  "error": "Drug not found",
  "message": "Obat tidak ditemukan",
  "code_respon": 404
}
```
Error (500):
```json
{
  "error": "Terjadi kesalahan saat mengambil detail obat",
  "message": "Terjadi kesalahan saat mengambil detail obat",
  "code_respon": 500
}
```

# POST /drugs
Membuat obat baru atau memperbarui stok obat yang sudah ada jika nama obat sudah ada di database

Request Body:
```json
{
  "nama": "Paracetamol",
  "jenis": "Tablet",
  "stok": 100,
  "expired": "Exp. Okt'23"
}
```
Response:
Success (200):
```json
{
    "data": {
        "id": "wmQUgyfXj9Hilhq3kQBJ",
        "jenis": "Diabetes",
        "nama": "Glibenclamid 5mg",
        "stok": 175,
        "expired": "Exp. Sept'23"
    },
    "message": "Obat berhasil ditambahkan",
    "code_respon": 200
}

```

Success (200):
```json
{
    "data": {
        "id": "wmQUgyfXj9Hilhq3kQBJ",
        "jenis": "Diabetes",
        "nama": "Glibenclamid 5mg",
        "stok": 350,
        "expired": "Exp. Sept'23"
    },
    "message": "Stok obat berhasil diperbarui",
    "code_respon": 200
}
```

Error (400):
```json
{
  "error": "Data obat tidak valid",
  "message": "Data obat tidak valid",
  "code_respon": 400
}

```

Error (500):
```json
{
  "error": "Terjadi kesalahan saat menambahkan atau memperbarui stok obat",
  "message": "Terjadi kesalahan saat menambahkan atau memperbarui stok obat",
  "code_respon": 500
}

```

# PUT /drugs/:id
Memperbarui detail obat berdasarkan ID.

Request Body:
```json
{
    "nama": "Loratadine 10mg",
    "jenis": "Gastrointestinal",
    "stok": 50,
    "expired": "Exp. Sept'23"
}

```

Response:

Success (200):
```json
{
  "data": {},
  "message": "Data obat berhasil diperbarui",
  "code_respon": 200
}

```

Error (400):
```json
{
  "error": "Data obat tidak valid",
  "message": "Data obat tidak valid",
  "code_respon": 400
}

```

Error (500):
```json
{
  "error": "Terjadi kesalahan saat memperbarui detail obat",
  "message": "Terjadi kesalahan saat memperbarui detail obat",
  "code_respon": 500
}

```

# DELETE /drugs/:id
Menghapus data obat berdasarkan ID.

Response:

Success (200):
```json
{
  "data": {},
  "message": "Data obat berhasil dihapus",
  "code_respon": 200
}
```

Error (404):
```json
{
  "error": "Drug not found",
  "message": "Obat tidak ditemukan",
  "code_respon": 404
}
```

Error (500):
```json
{
  "error": "Terjadi kesalahan saat menghapus data obat",
  "message": "Terjadi kesalahan saat menghapus data obat",
  "code_respon": 500
}

```
