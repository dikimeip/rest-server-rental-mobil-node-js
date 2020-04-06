const express = require('express');
const app = express()
const mysql = require('mysql');
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

const Koneksi = mysql.createConnection({
    host : "localhost",
    user : "root",
    pasword : "",
    database : "rental_mobil"
})
Koneksi.connect((err) => {
    if (err) {
        console.log('Error Conection')
    }
    console.log('success connection')
})

app.get('/',(req,res)=> {
    res.send('OK')
})


// mobil 
app.get('/mobil',(req,res) => {
    Koneksi.query("SELECT * FROM mobil",(error,result,field)=> {
        if(error) throw error
        return res.send({
            status : 1,
            data : result
        })
    })
})

app.post('/mobil',(req,res) => {
    Koneksi.query("INSERT INTO mobil SET ?", {
            id_patner : req.body.idp, 
            merk_mobil : req.body.merk, 
            jenis_mobil : req.body.jenis, 
            tahun_mobil : req.body.tahun, 
            warna_mobil : req.body.warna, 
            foto_bpkb : req.body.foto, 
            nopol : req.body.nopol, 
            status : req.body.status, 
            harga_mobil:req.body.harga} ,
        (error,result,field)=> {
        if (error) throw error
        if (result.affectedRows > 0) {
            return res.send({
                status: 1,
                data: "Success Tambah Data"
            })
        } else {
            return res.send({
                status: 0,
                data: "Failed Get Data"
            })
        }
    });
})

app.put('/mobil',(req,res) => {
    const id_mobil = req.body.idm;
    const id_patner = req.body.idp;
    const merk_mobil = req.body.merk;
    const jenis_mobil = req.body.jenis;
    const tahun_mobil  = req.body.tahun;
    const warna_mobil = req.body.warna;
    const foto_bpkb = req.body.foto;
    const nopol  = req.body.nopol;
    const status = req.body.status;
    const harga_mobil = req.body.harga;

    Koneksi.query("UPDATE mobil SET id_patner = ?, merk_mobil = ?, jenis_mobil = ?, tahun_mobil = ?, warna_mobil = ?, foto_bpkb = ?, nopol = ?, status = ?, harga_mobil = ? WHERE id_mobil = ? ",[
            id_patner,
            merk_mobil,
            jenis_mobil,
            tahun_mobil,
            warna_mobil,
            foto_bpkb,
            nopol,
            status,
            harga_mobil,
            id_mobil
        ],(error,result,field)=>{
        if (error) throw error
        if (result.affectedRows > 0) {
            return res.send({
                status: 1,
                data: "Success update Data"
            })
        } else {
            return res.send({
                status: 0,
                data: "Id Not found"
            })
        }
    })
})

app.delete('/mobil',(req,res) => {
    const id_mobil = req.body.idm;
    Koneksi.query("DELETE  FROM mobil WHERE id_mobil = ? ",[id_mobil],(error,result,field)=> {
        if (error) throw error
        if (result.affectedRows > 0) {
            return res.send({
                status: 1,
                data: "Success Delete Data"
            })
        } else {
            return res.send({
                status: 0,
                data: "Id Not found"
            })
        }
    })
})

// admin 

app.post('/admin',(req,res) => {
    const uname = req.body.username;
    const password = req.body.password;

    Koneksi.query("SELECT * FROM admin WHERE username_admin = ? AND password_admin = ? ",[uname,password],(error,result,field)=> {
        if (error) throw error
        if (result == "") {
            res.send({
                status : 0,
                data : "Failed Login"
            })
        } else {
            res.send({
                status : 1,
                data : "Success Login"
            })
        }
    })
})

// USER 

app.get('/user',(req,res) => {
    Koneksi.query("SELECT * FROM user",(error,result,field) => {
        if (error) throw error
        res.send({
            status : 1,
            data : result
        })
    })
})

app.post('/loginuser',(req,res) => {
    const uname = req.body.username;
    const password = req.body.password;

    Koneksi.query("SELECT * FROM user WHERE username_user = ? AND password_user = ? ",[uname,password],(error,result,field)=> {
        if (error) throw error
        if (result == "") {
            res.send({
                status : 0,
                data : "Failed Login"
            })
        } else {
            res.send({
                status : 1,
                data : "Success Login"
            })
        }
    })
})

app.post('/user',(req,res) => {
    Koneksi.query('INSERT INTO user SET ? ',{
        nama_user : req.body.nama, 
        alamat_user : req.body.alamat, 
        no_user : req.body.no, 
        status_user : req.body.status, 
        foto_user : req.body.foto, 
        username_user : req.body.username, 
        password_user : req.body.password 
    },(error,result,field)=>{
        if (error) throw error
        if (result.affectedRows > 0) {
            return res.send({
                status: 1,
                data: "Success Tambah Data"
            })
        } else {
            return res.send({
                status: 0,
                data: "Failed Tambah Data"
            })
        }
    })
})

app.put('/user',(req,res) => {
    const id_user = req.body.id;
    const nama_user  = req.body.nama;
    const alamat_user = req.body.alamat;
    const no_user = req.body.no;
    const status_user = req.body.status;
    const foto_user = req.body.foto;
    const username_user  = req.body.username;
    const password_user = req.body.password;

    Koneksi.query("UPDATE user SET nama_user = ?, alamat_user = ?, no_user = ?, status_user = ?, foto_user = ?, username_user = ?, password_user = ?   WHERE id_user = ? ",[
        nama_user,
        alamat_user,
        no_user,
        status_user,
        foto_user,
        username_user,
        password_user,
        id_user
    ],(error,result,field)=>{
        if (error) throw error
        if (result.affectedRows > 0) {
            return res.send({
                status: 1,
                data: "Success update Data"
            })
        } else {
            return res.send({
                status: 0,
                data: "Id Not found"
            })
        }
    })

})

app.delete('/user',(req,res)=> {
    const id_user = req.body.id;
    Koneksi.query("DELETE FROM user WHERE id_user = ?",[id_user],(error,result,field)=> {
        if (error) throw error
        if (result.affectedRows > 0) {
            return res.send({
                status: 1,
                data: "Success Hapus Data"
            })
        } else {
            return res.send({
                status: 0,
                data: "Id Not found"
            })
        }
    })
})

// PATNER 
app.get('/patner',(req,res) => {
    Koneksi.query("SELECT * FROM patner",(error,result,field) => {
        if (error) throw error
        res.send({
            status : 1,
            data : result
        })
    })
})

app.post('/patnerlogin',(req,res) => {
    const uname = req.body.username;
    const password = req.body.password;

    Koneksi.query("SELECT * FROM patner WHERE username_patner = ? AND password_patner = ? ",[uname,password],(error,result,field)=> {
        if (error) throw error
        if (result == "") {
            res.send({
                status : 0,
                data : "Failed Login"
            })
        } else {
            res.send({
                status : 1,
                data : "Success Login"
            })
        }
    })
})


app.post('/patner',(req,res) => {
    Koneksi.query("INSERT INTO patner SET ? ",{
        nama_patner : req.body.nama, 
        alamat_patner : req.body.alamat, 
        no_patner : req.body.no, 
        status_patner : req.body.status, 
        foto_ktp : req.body.ktp, 
        foto_kk : req.body.kk, 
        username_patner : req.body.username, 
        password_patner : req.body.password
    },(error,result,field) => {
        if (error) throw error
        if (result.affectedRows > 0) {
            return res.send({
                status: 1,
                data: "Success Tambah Data"
            })
        } else {
            return res.send({
                status: 0,
                data: "Failed Input data"
            })
        }
    })
})

app.put('/patner',(req,res) => {
    const nama_patner = req.body.nama;
    const alamat_patner = req.body.alamat;
    const no_patner = req.body.no;
    const status_patner = req.body.status;
    const foto_ktp = req.body.ktp;
    const foto_kk = req.body.kk;
    const username_patner = req.body.username;
    const password_patner = req.body.password;
    const id_patner = req.body.id;

    Koneksi.query("UPDATE patner SET nama_patner = ?, alamat_patner = ?, no_patner = ?, status_patner = ?, foto_ktp = ?, foto_kk = ?, username_patner = ?, password_patner = ? WHERE id_patner = ?",[
        nama_patner,
        alamat_patner,
        no_patner,
        status_patner,
        foto_ktp,
        foto_kk,
        username_patner,
        password_patner,
        id_patner
    ],(error,result,field)=> {
        if (error) throw error
        if (result.affectedRows > 0) {
            return res.send({
                status: 1,
                data: "Success update Data"
            })
        } else {
            return res.send({
                status: 0,
                data: "Id Not found"
            })
        }
    })
})

app.delete('/patner',(req,res) => {
    const id_patner = req.body.idp 
    Koneksi.query("DELETE FROM patner WHERE id_patner = ?",[id_patner],(error,result,field) => {
        if (error) throw error
        if (result.affectedRows > 0) {
            return res.send({
                status: 1,
                data: "Success Hapus Data"
            })
        } else {
            return res.send({
                status: 0,
                data: "Id Not found"
            })
        }
    })
})

// pemesanan 

app.get('/trans',(req,res) => {
    Koneksi.query("SELECT * FROM transaksi",(error,result,field) => {
        if (error) throw error
        res.send({
            status : 1,
            data : result
        })
    })
})

app.post("/trans",(req,res) => {
    Koneksi.query("INSERT INTO transaksi SET ? ",{
        id_user : req.body.ids,
        id_mobil : req.body.idm,
        tgl_pesan : req.body.pesan,
        tgl_kembali : req.body.kembali,
        biaya : req.body.biaya,
        status_trans : req.body.status,
        pembayaran : req.body.pembayaran,
        jaminan : req.body.jaminan
    },(error,result,field) => {
        if (error) throw error
        if (result.affectedRows > 0) {
            return res.send({
                status: 1,
                data: "Success Tambah Data"
            })
        } else {
            return res.send({
                status: 0,
                data: "Failed Tambah Data"
            })
        }
    })
})

app.put('/trans',(req,res) => {
    const id_user = req.body.ids;
    const id_mobil = req.body.idm;
    const tgl_pesan = req.body.pesan;
    const tgl_kembali = req.body.kembali;
    const biaya = req.body.biaya;
    const status_trans = req.body.status;
    const pembayaran = req.body.pembayaran;
    const jaminan = req.body.jaminan;
    const id_trans = req.body.idt;

    Koneksi.query("UPDATE transaksi SET id_user = ?, id_mobil = ?, tgl_pesan = ?, tgl_kembali = ?, biaya = ?, status_trans = ?, pembayaran = ?, jaminan = ? WHERE id_trans = ? ",[
        id_user,
        id_mobil,
        tgl_pesan,
        tgl_kembali,
        biaya,
        status_trans,
        pembayaran,
        jaminan,
        id_trans
    ],(error,result,field) => {
        if (error) throw error
        if (result.affectedRows > 0) {
            return res.send({
                status: 1,
                data: "Success Ubah Data"
            })
        } else {
            return res.send({
                status: 0,
                data: "Failed Ubah Data"
            })
        }
    })
})

app.delete("/trans",(req,res) => {
    const id_trans = req.body.idt;
    Koneksi.query("DELETE FROM transaksi WHERE id_trans = ?",[id_trans],(error,result,field) => {
        if (error) throw error
        if (result.affectedRows > 0) {
            return res.send({
                status: 1,
                data: "Success Hapus Data"
            })
        } else {
            return res.send({
                status: 0,
                data: "Id Not found"
            })
        }
    })
})

app.listen(4000,()=>{
    console.log('Server Running')
})
