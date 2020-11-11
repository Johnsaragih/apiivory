const Personal = require("../models/personal.js");

exports.PersonalPid = (req, res) => {
    Personal.PersonalbyPid(req.params.pid, (err,data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    error: 'yes'
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Personal with NO id " + req.params.pid
                });
            }
        } else {
            res.send(data);
        }
});
};
exports.timecard = (req,res) => {      
      Personal.tc([req.params.pid,req.params.bulan,req.params.tahun],(err,data)=> {
          if(err) {
              if(err.kind=="not_found") {
                  res.status(404).send({
                     message: `No Data Found..` 
                  });
              } else {
                  res.status(500).send({
                      message: "Error retieve data.." 
                  });
  
              } 
          } else {
              res.send(data);
          }
      });
  }

  exports.timecardweb = (req,res) => {      
    Personal.tcweb([req.params.pid,req.params.bulan,req.params.tahun],(err,data)=> {
        if(err) {
            if(err.kind=="not_found") {
                res.status(404).send({
                   message: `No Data Found` 
                });
            } else {
                res.status(500).send({
                    message: "Error retieve data.." 
                });

            } 
        } else {
            res.send(data);
        }
    });
}
exports.tcinputabsen = (req,res) => {      
    Personal.tcabsen([req.params.pid,req.params.bulan,req.params.tahun],(err,data)=> {
        if(err) {
            if(err.kind=="not_found") {
                res.status(404).send({
                   message: `No Data Found` 
                });
            } else {
                res.status(500).send({
                    message: "Error retieve data.." 
                });

            } 
        } else {
            res.send(data);
        }
    });
}
  exports.absen = (req,res) => {      
    Personal.getabsen([req.params.pid,req.params.tahun],(err,data)=> {
        if(err) {
            if(err.kind=="not_found") {
                res.status(404).send({
                   message: `No Data Found..` 
                });
            } else {
                res.status(500).send({
                    message: "Error retieve data.." 
                });

            } 
        } else {
            res.send(data);
        }
    });
}
exports.logon = (req,res) => {
    Personal.login(req.params.pid,(err,data)=> {
        if(err) {
            if(err.kind=="not_found") {
                res.status(404).send({
                   message: `No Data Found` 
                });
            } else {
                res.status(500).send({
                    message: "Error retieve data.." 
                });

            } 
        } else {
            res.send(data);
        }
    });
}
exports.logon2 = (req,res) => {
    // var a = req.params.pid; 
    // var b = req.params.kerja;
    Personal.logos(a,b,(err,data)=> {
        if(err) {
            if(err.kind=="not_found") {
                res.status(404).send({
                   message: `No Data Found` 
                });
            } else {
                res.status(500).send({
                    message: "Error retieve data.." 
                });

            } 
        } else {
            res.send(data);
        }
    });
}
exports.logon3 = (req,res) => {  
  //  const para = [req.params.pid,req.params.kerja];
    Personal.logos3([req.params.pid,req.params.kerja],(err,data)=> {
        if(err) {
            if(err.kind=="not_found") {
                res.status(404).send({
                   message: `No Data Found..` 
                });
            } else {
                res.status(500).send({
                    message: "Error retieve data.." 
                });

            } 
        } else {
            res.send(data);
        }
    });
}

exports.findAll = (req, res)=> {
    Personal.getAll((err, data)=> {
        if(err) {
            res.status(500).send({
                message: err.message || "Terjadi error"
            });
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req,res)=> {
    Personal.remove(req.params.pid, (err,data)=> {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found pid`
                });
            } else {
                res.status(500).send({
                    message: "Tidak dapat menghapus id"
                });
            }
        } else {
            res.send({message : `Data sudah dihapus`});
        }
    });
};

exports.update = (req, res)=> {
    //validate
    if(!req.body) {
        res.status(400).send({
            message: "Content can not empty"
        });
    }
    console.log(req.body);

    Personal.updatebyPid(req.params.pid, new Personal(req.body),(err, data)=> {
        if(err) {
            if(err.kind==="not_found") {
                res.status(404).send({
                    message: `not found id`
                });
            } else {
                res.status(500).send({
                    message: "error udpate"
                });
            }
        } else {
            res.send(data);
        }    
    });
};
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const personal = new Personal({
     nama: req.body.nama,
      pid: req.body.pid,
      kerja:req.body.kerja
      
    });
  
    // Save database
    Personal.create(personal, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while save data."
        });
      else res.send(data);
    });
  };

  exports.deleteAll = (req, res) => {
    Customer.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Customers were deleted successfully!` });
    });
  };
  