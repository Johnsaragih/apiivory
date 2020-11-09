const personal = require("../routes/personal.js");
const sql = require("./db.js");

//constructor
const Personal = function(personal) {
    this.nama = personal.nama;
    this.pid = personal.pid;
    this.kota = personal.kota;
    this.agama = personal.agama;
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

Personal.PersonalbyPid = (pid, result) => {
    sql.query(`SELECT nama,pid,namabag FROM totkar WHERE pid = ?`,pid,(err,res)=> {
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
Personal.login = (pid,result) => {
  // const status ='T';   
   //const nopid = pid;
    sql.query(`SELECT nama,pid,namabag from totkar WHERE pid=?`,pid, (err, res)=> {
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