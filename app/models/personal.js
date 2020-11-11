const personal = require("../routes/personal.js");
const sql = require("./db.js");

//constructor
const Personal = function(personal) {
    this.nama = personal.nama;
    this.pid = personal.pid;
    this.kota = personal.kota;
    this.agama = personal.agama;

};

Personal.PersonalbyPid = (pid, result) => {
    var qwr = `SELECT nama,pid,namabag \
               FROM totkar WHERE pid = ?`;

    sql.query(qwr,pid,(err,res)=> {
    if(err) {
        console.log("error:",err);
        result(err,null);
        return;
    }
    if(res.length) {
        console.log("found data:",res[0]);
        result(null, res[0]);
         return;
    }  
    result({ kind: "not_found"}, null);
});
};

Personal.tcabsen = (pid,bulan,tahun,result) => {         
        sql.query('INSERT into timecardapk(kodetc,pid,tgl,absenstatus) SELECT kodeaid,pid,tgl,jenis FROM absen WHERE pid=? AND MONTH(tgl)=? AND YEAR(tgl)=? ON DUPLICATE KEY UPDATE kodetc=VALUES(kodetc),pid=VALUES(pid),tgl=VALUES(tgl),absenstatus=VALUES(absenstatus)',pid,bulan,tahun, (err, res)=> {
          if(err) {
            console.log("error:", err);
            result (null, err);
            return;
           
        }
        if(res.length) {
            console.log("found data:",res);
            result(null, res);
             return;
        }  
        result({ kind: "not_found"}, null);
    });
   
};

Personal.tc = (pid,bulan,tahun,result) => {         
    sql.query(`SELECT tgl,checkin,checkout,overtime from timecardapk WHERE pid=? AND MONTH(tgl)=? AND YEAR(tgl)=?`,pid,bulan,tahun, (err, res)=> {
      if(err) {
        console.log("error:", err);
        result (null, err);
        return;
    }
    if(res.length) {

        
        console.log("found data:",res);
        result(null, res);
         return;
    }  
    result({ kind: "not_found"}, null);
});

};

Personal.tcweb = (pid,bulan,tahun,result) => {      
    var qw = 'insert into timecardapk(kodetc,pid,tgl,absenstatus,checkin,checkout,overtime) \
              select a.kodeat,a.pid,a.tgl,"HADIR",a.checkin,a.checkout,a.overtime \
              FROM attendance a WHERE a.pid=? AND MONTH(a.tgl)=? AND YEAR(a.tgl)=? ON DUPLICATE KEY UPDATE \
              kodetc=VALUES(kodetc),pid=VALUES(pid),tgl=VALUES(tgl),absenstatus=VALUES(absenstatus),checkin=VALUES(checkin), \
              checkout=VALUES(checkout),overtime=VALUES(overtime)';
    sql.query(qw,pid,bulan,tahun, (err, res)=> {
      if(err) {
        console.log("error:", err);
        result (null, err);
        return;
       
    }
    if(res.length) {
        console.log("found data:",res);
        result(null, res);
         return;
    }  
    result({ kind: "not_found"}, null);
});

};
Personal.getabsen = (pid,tahun,result) => {         
    sql.query(`SELECT tgl, jenis from absen WHERE pid=? AND YEAR(tgl)=?`,pid,tahun, (err, res)=> {
      
        if(err) {
        console.log("error:", err);
        result (null, err);
        return;
    }
    if(res.length) {
        console.log("found data:",res);
        result(null, res);
         return;
    }  
    result({ kind: "not_found"}, null);
});

};



Personal.getAll = result => {
    const status ='T';
    const agama = 'Kristen';
    sql.query(`SELECT nama,pid,kerja,agama from totkar WHERE kerja=? AND agama=?`,[status,agama], (err, res)=> {
        if(err) {
            console.log("error:", err);
            result (null, err);
            return;
        }
        console.log("Personal:",res);
        result(null, res);
    });
};

Personal.logos = (pid,result) => {
    const status ='f';   
    const nopid = pid;
      sql.query(`SELECT nama,pid,namabag from totkar WHERE kerja=? AND pid=?`,[status,pid], (err, res)=> {
          if(err) {
              console.log("error:", err);
              result (null, err);
              return;
          }
          if(res.length) {
              console.log("found data:",res[0]);
              result(null, res[0]);
               return;
          }  
          result({ kind: "not_found"}, null);
      });
     
  };
  Personal.logos3 = (pid,kerja,result) => {      
         
      sql.query(`SELECT * from personal WHERE agama=? AND kerja=?`,pid,kerja, (err, res)=> {
          if(err) {
              console.log("error:", err);
              result (null, err);
              return;
          }
          if(res.length) {
              console.log("found data:",res);
              result(null, res);
               return;
          }  
          result({ kind: "not_found"}, null);
      });
     
  };

Personal.findbyPid = (pid, result) => {
        sql.query(`SELECT * FROM totkar WHERE pid = ?`,pid,(err,res)=> {
        if(err) {
            console.log("error:",err);
            result(err,null);
            return;
        }
        if(res.length) {
            console.log("found data:",res[0]);
            result(null, res[0]);
             return;
        }  
        result({ kind: "not_found"}, null);
    });
};

Personal.remove = (pid, result)=> {
    sql.query("delete from absen where pid = ?", pid, (err,res)=>{
        if(err) {
            console.log("error:",err); 
            result(null, err);
            return;
        }
        if(res.affectedRows ==0) {
            result({ kind: "not_found"}, null);
            return;
        }
        console.log("delete sukses");
        result(null, res);
    });
};

Personal.updatebyPid = (pid,personal,result)=> {
    sql.query("update personal set kota =?,agama=? where pid =?",
    [personal.kota,personal.agama,pid], (err, res)=> {
        if(err) {
            console.log("error:", err);
            result(null, err);
            return;
        }
        if(res.affectedRows==0) {
            result({kind: "not_found"},null);
            return;
        }
        console.log("update sukses",{pid:pid,...personal});
        result(null,{pid:pid, ...personal});
    });    
    
};

Personal.create = (newPersonal, result) => {
    sql.query("INSERT INTO personal SET ?", newPersonal, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created customer: ", { id: res.insertId, ...newPersonal });
      result(null, { id: res.insertId, ...newPersonal });
    });
  };

  Personal.removeAll = result => {
    sql.query("DELETE FROM absen", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} personal`);
      result(null, res);
    });
  };
module.exports = Personal;